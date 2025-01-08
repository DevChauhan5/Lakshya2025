import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [] },
  { path: "about", element: <h1>About</h1>, children: [] },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
