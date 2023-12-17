import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import { Suspense } from "react";
import Chat from "../pages/chat";
import ProtectedComponents from "../components/ProtectedComponents";
import { WebSocketProvider } from "../components/WebScoketContext";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<>🌀 Loading...</>}>
        <Home />
      </Suspense>
    ),
    errorElement: <div>Error</div>,
  },
  {
    path: "/chat",
    element: (
      <ProtectedComponents>
        <Suspense fallback={<>🌀 Loading...</>}>
          <Chat />
        </Suspense>
      </ProtectedComponents>
    ),
  },
]);
