import { createBrowserRouter } from "react-router-dom";
import Login from "./features/identity/components/login";
import Register from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import { registerAction } from "./features/identity/components/_api/registerAction";
import MainLayout from "./layouts/mainLayout/main-layout";
import Courses from "./pages/courses";
import { loginAction } from "./features/identity/components/_api/loginAction";
import { coursesLoader } from "./pages/_api/coursesLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);

export default router;
