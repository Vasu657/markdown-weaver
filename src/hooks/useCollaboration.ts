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

const getUrlRoomId = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('room');
};

export const useCollaboration = (content: string, onContentChange: (content: string) => void) => {
  const [state, setState] = useState<CollaborationState>({
    isConnected: false,
    shareUrl: null,
    roomId: null,
    connectedPeers: 0,
  });

  const peerRef = useRef<Peer | null>(null);
  const yDocRef = useRef<Y.Doc>(new Y.Doc());
  const yTextRef = useRef<Y.Text>(yDocRef.current.getText('shared-content'));
  const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
  const isInitializedRef = useRef(false);

  const broadcastUpdate = useCallback((text: string) => {
    if (connectionsRef.current.size > 0) {
      connectionsRef.current.forEach((conn) => {
        if (conn.open) {
          conn.send({ type: 'content-update', content: text });
        }
      });
    }
  }, []);

  const createSession = useCallback(() => {
    const newRoomId = generateRoomId();
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?room=${newRoomId}`;

    setState((prev) => ({
      ...prev,
      roomId: newRoomId,
      shareUrl,
    }));

    return { roomId: newRoomId, shareUrl };
  }, []);

  const joinSession = useCallback((roomId: string) => {
    setState((prev) => ({
      ...prev,
      roomId,
    }));
  }, []);

  const initializePeer = useCallback(() => {
    if (peerRef.current) return;

    const peer = new Peer();
    peerRef.current = peer;

    const roomId = getUrlRoomId();
    const currentRoomId = roomId || generateRoomId();

    peer.on('open', (peerId) => {
      if (roomId) {
        joinSession(roomId);
      } else {
        const newRoomId = generateRoomId();
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?room=${newRoomId}`;
        setState((prev) => ({
          ...prev,
          roomId: newRoomId,
          shareUrl,
        }));
      }

      localStorage.setItem('peer-id', peerId);
      localStorage.setItem('room-id', roomId || currentRoomId);
    });

    peer.on('connection', (conn) => {
      handleConnection(conn, false);
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
    });
  }, [joinSession]);

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

      conn.on('data', (data: any) => {
        if (data.type === 'content-update' || data.type === 'content-sync' || data.type === 'initial-content') {
          if (data.content !== content) {
            onContentChange(data.content);
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

  const shareSession = useCallback(() => {
    if (!state.roomId) {
      const { roomId, shareUrl } = createSession();
      return { roomId, shareUrl };
    }
    return { roomId: state.roomId, shareUrl: state.shareUrl };
  }, [state.roomId, state.shareUrl, createSession]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      initializePeer();
    }
  }, [initializePeer]);

  useEffect(() => {
    yTextRef.current.observe((event) => {
      const newContent = yTextRef.current.toString();
      if (newContent !== content) {
        onContentChange(newContent);
        broadcastUpdate(newContent);
      }
    });
  }, [content, onContentChange, broadcastUpdate]);

  return {
    ...state,
    createSession,
    joinSession,
    connectToPeer,
    shareSession,
    broadcastUpdate,
  };
};
