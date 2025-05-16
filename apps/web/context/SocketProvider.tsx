// SocketProvider.tsx
"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => void;
  lastMessage: string | null;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("📩 Message from server:", event.data);
      setLastMessage(event.data);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.warn("WebSocket is not open.");
    }
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, lastMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
