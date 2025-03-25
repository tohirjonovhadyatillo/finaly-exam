import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayouts from "./Layouts/MainLayouts";
import Home, { action as HomeAction } from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LikedImages from "./pages/LikedImages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Download from "./pages/Download"; 
import MyProfile from "./pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <div className="container mx-auto mt-5">
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className="container mx-auto mt-5">
        <Register />
      </div>
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: (
          <div className="container mx-auto mt-5">
            <MainLayouts>
              <Home />
            </MainLayouts>
          </div>
        ),
        action: HomeAction,
      },
      {
        path: "/about",
        element: (
          <div className="container mx-auto mt-5">
            <MainLayouts>
              <About />
            </MainLayouts>
          </div>
        ),
      },
      {
        path: "/contact",
        element: (
          <div className="container mx-auto mt-5">
            <MainLayouts>
              <Contact />
            </MainLayouts>
          </div>
        ),
      },
      {
        path: "/likedImages",
        element: (
          <div className="container mx-auto mt-5">
            <MainLayouts>
              <LikedImages />
            </MainLayouts>
          </div>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <div className="container mx-auto mt-5">
            <MainLayouts>
              <MyProfile />
            </MainLayouts>
          </div>
        ),
      },
      {
        path: "/downloads",
        element: (
          <div className="container mx-auto mt-5">
            <MainLayouts>
              <Download />
            </MainLayouts>
          </div>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
