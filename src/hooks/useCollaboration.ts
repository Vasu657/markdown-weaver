import { useCallback, useEffect, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import * as Y from 'yjs';

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

  const broadcastUpdate = useCallback((text: string) => {
    if (connectionsRef.current.size > 0) {
      connectionsRef.current.forEach((conn) => {
        if (conn.open) {
          conn.send({ type: 'content-update', content: text });
        }
      });
    }
  }, []);

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

        if (isInitiator) {
          conn.send({ type: 'content-sync', content });
        } else {
          conn.send({ type: 'initial-content', content });
        }
      });

      conn.on('data', (data: unknown) => {
        const messageData = data as { type: string; content: string };
        if (messageData.type === 'content-update' || messageData.type === 'content-sync' || messageData.type === 'initial-content') {
          if (messageData.content !== content) {
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

    const peer = new Peer();
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
    if (connectionsRef.current.size > 0) {
      broadcastUpdate(content);
    }
  }, [content, broadcastUpdate]);

  useEffect(() => {
    yTextRef.current.observe((event) => {
      const newContent = yTextRef.current.toString();
      if (newContent !== content) {
        onContentChange(newContent);
      }
    });
  }, [content, onContentChange]);

  return {
    ...state,
    createSession,
    joinSession,
    connectToPeer,
    shareSession,
    broadcastUpdate,
  };
};
