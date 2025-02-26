import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Activity } from '../schema';

interface WebSocketContextType {
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType>({ connected: false });

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const queryClient = useQueryClient();

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected, attempting to reconnect...');
      setTimeout(connect, 3000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEW_ACTIVITY') {
          // Update activities in react-query cache
          queryClient.setQueryData<Activity[]>(['/api/activities'], (old = []) => {
            return [data.activity, ...old];
          });
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    return () => {
      ws.close();
    };
  }, [queryClient]);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  return (
    <WebSocketContext.Provider value={{ connected }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
