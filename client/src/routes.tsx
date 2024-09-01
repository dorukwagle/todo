import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import ErrorPage from "./pages/ErrorPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";

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
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "search", element: <SearchPage /> }
        ],
      },
    ],
  },
]);

export default router;
