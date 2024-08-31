import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import ErrorPage from "./pages/ErrorPage";
import SignInPage from "./pages/SignInPage";
import { Dashboard } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SignInPage /> },
      { path: "/sign-up", element: <RegistrationPage /> },
      {
        element: <PrivateRoutes />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);

export default router;
