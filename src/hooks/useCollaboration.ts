import { useCallback, useEffect, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import * as Y from 'yjs';

interface Message {
  type: 'content-update' | 'content-sync' | 'initial-content' | 'ack';
  content?: string;
  id?: number;
}

interface CollaborationState {
  isConnected: boolean;
  shareUrl: string | null;
  roomId: string | null;
  connectedPeers: number;
}

const generateRoomId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const getUrlParams = (): { room: string | null; peer: string | null } => {
  const params = new URLSearchParams(window.location.search);
  return {
    room: params.get('room'),
    peer: params.get('peer'),
  };
};

export const useCollaboration = (content: string, onContentChange: (content: string) => void) => {
  const [state, setState] = useState<CollaborationState>({
    isConnected: false,
    shareUrl: null,
    roomId: null,
    connectedPeers: 0,
  });

  const peerRef = useRef<Peer | null>(null);
  const peerIdRef = useRef<string | null>(null);
  const yDocRef = useRef<Y.Doc>(new Y.Doc());
  const yTextRef = useRef<Y.Text>(yDocRef.current.getText('shared-content'));
  const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
  const isInitializedRef = useRef(false);
  const hasAutoConnectedRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef<string>('');
  const messageIdRef = useRef<number>(0);
  const pendingMessagesRef = useRef<Map<number, Message>>(new Map());

  const sendMessage = useCallback((message: Message) => {
    if (connectionsRef.current.size === 0) return;
    
    connectionsRef.current.forEach((conn) => {
      if (conn.open) {
        try {
          conn.send(message);
        } catch (err) {
          console.error('Error sending message:', err);
        }
      }
    });
  }, []);

  const broadcastUpdate = useCallback((text: string) => {
    if (connectionsRef.current.size === 0) return;

    const messageId = ++messageIdRef.current;
    const message: Message = {
      type: 'content-update',
      content: text,
      id: messageId,
    };

    pendingMessagesRef.current.set(messageId, message);
    sendMessage(message);

    setTimeout(() => {
      pendingMessagesRef.current.delete(messageId);
    }, 5000);
  }, [sendMessage]);

  const createShareUrl = useCallback((peerId: string, roomId: string): string => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?room=${roomId}&peer=${peerId}`;
  }, []);

  const createSession = useCallback(() => {
    const newRoomId = generateRoomId();
    
    if (peerIdRef.current) {
      const shareUrl = createShareUrl(peerIdRef.current, newRoomId);
      setState((prev) => ({
        ...prev,
        roomId: newRoomId,
        shareUrl,
      }));
      return { roomId: newRoomId, shareUrl };
    }
    
    setState((prev) => ({
      ...prev,
      roomId: newRoomId,
      shareUrl: null,
    }));
    return { roomId: newRoomId, shareUrl: null };
  }, [createShareUrl]);

  const joinSession = useCallback((roomId: string) => {
    setState((prev) => ({
      ...prev,
      roomId,
    }));
  }, []);

  const handleConnection = useCallback(
    (conn: DataConnection, isInitiator: boolean) => {
      connectionsRef.current.set(conn.peer, conn);

      conn.on('open', () => {
        setState((prev) => ({
          ...prev,
          isConnected: true,
          connectedPeers: prev.connectedPeers + 1,
        }));

        const syncMessage: Message = isInitiator
          ? { type: 'content-sync', content }
          : { type: 'initial-content', content };

        try {
          conn.send(syncMessage);
        } catch (err) {
          console.error('Error sending sync message:', err);
        }
      });

      conn.on('data', (data: unknown) => {
        const messageData = data as Message;
        if (messageData.type === 'content-update' || messageData.type === 'content-sync' || messageData.type === 'initial-content') {
          if (messageData.content && messageData.content !== content) {
            onContentChange(messageData.content);
          }
        }
      });

      conn.on('close', () => {
        connectionsRef.current.delete(conn.peer);
        setState((prev) => ({
          ...prev,
          isConnected: connectionsRef.current.size > 0,
          connectedPeers: Math.max(0, prev.connectedPeers - 1),
        }));
      });

      conn.on('error', (err) => {
        console.error('Connection error:', err);
        connectionsRef.current.delete(conn.peer);
      });
    },
    [content, onContentChange]
  );

  const connectToPeer = useCallback(
    (peerId: string) => {
      if (!peerRef.current || connectionsRef.current.has(peerId)) return;

      const conn = peerRef.current.connect(peerId);
      handleConnection(conn, true);
    },
    [handleConnection]
  );

  const initializePeer = useCallback(() => {
    if (peerRef.current) return;

    const peer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
        ],
      },
    });
    peerRef.current = peer;

    const { room: urlRoomId } = getUrlParams();

    peer.on('open', (peerId) => {
      peerIdRef.current = peerId;
      localStorage.setItem('peer-id', peerId);

      if (urlRoomId) {
        joinSession(urlRoomId);
      } else {
        const newRoomId = generateRoomId();
        const shareUrl = createShareUrl(peerId, newRoomId);
        setState((prev) => ({
          ...prev,
          roomId: newRoomId,
          shareUrl,
        }));
        localStorage.setItem('room-id', newRoomId);
      }
    });

    peer.on('connection', (conn) => {
      handleConnection(conn, false);
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
    });
  }, [joinSession, createShareUrl, handleConnection]);

  const shareSession = useCallback(() => {
    if (!state.roomId && peerIdRef.current) {
      const { roomId, shareUrl } = createSession();
      return { roomId, shareUrl };
    }
    
    if (state.roomId && !state.shareUrl && peerIdRef.current) {
      const shareUrl = createShareUrl(peerIdRef.current, state.roomId);
      setState((prev) => ({
        ...prev,
        shareUrl,
      }));
      return { roomId: state.roomId, shareUrl };
    }
    
    return { roomId: state.roomId, shareUrl: state.shareUrl };
  }, [state.roomId, state.shareUrl, createSession, createShareUrl]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      initializePeer();
    }
  }, [initializePeer]);

  useEffect(() => {
    const { peer: hostPeerId } = getUrlParams();
    
    if (
      hostPeerId && 
      peerIdRef.current && 
      peerRef.current && 
      !hasAutoConnectedRef.current
    ) {
      hasAutoConnectedRef.current = true;
      setTimeout(() => {
        connectToPeer(hostPeerId);
      }, 800);
    }
  }, [connectToPeer]);

  useEffect(() => {
    if (connectionsRef.current.size === 0) return;

    lastContentRef.current = content;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (lastContentRef.current === content && connectionsRef.current.size > 0) {
        broadcastUpdate(content);
      }
    }, 150);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [content, broadcastUpdate]);

  useEffect(() => {
    yTextRef.current.observe((event) => {
      const newContent = yTextRef.current.toString();
      if (newContent !== content) {
        onContentChange(newContent);
      }
    });
  }, [content, onContentChange]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    ...state,
    createSession,
    joinSession,
    connectToPeer,
    shareSession,
    broadcastUpdate,
  };
};
