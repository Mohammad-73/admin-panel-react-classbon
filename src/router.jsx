import { createBrowserRouter } from "react-router-dom";
import Login from "./features/identity/components/login";
import Register from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/main-layout";
import Courses from "./pages/courses";
import CoursesCategories from "./pages/course-categories";
import { coursesLoader } from "./pages/_api/courses-loader";
import { loginAction } from "./features/identity/components/_api/login-action";
import { registerAction } from "./features/identity/components/_api/register-action";
import CourseDetails from "./features/courses/components/course-details";
import { courseDetailsLoader } from "./features/courses/components/_api/course-details-loader";
import { categoriesLoader } from "./pages/_api/categories-loader";
import { CategoryProvider } from "./features/categories/category-context";
import NotFound from "./pages/not-found";
import UnhandledException from "./pages/unhandled-exception";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        path: "course-categories",
        element: (
          <CategoryProvider>
            <CoursesCategories />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    errorElement: <UnhandledException />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
