import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import SignUpForm from "../components/AuthForm/SignUpForm";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Reels from "../components/SideBar/Reels/Reels";
import Settings from "../pages/Settings/Settings";
import Messages from "../pages/Messages/Messages";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import About from "../pages/About/About";

export const protectedRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/:username",
    element: Profile,
  },
  {
    path: "/editprofile",
    element: EditProfile,
  },
  {
    path: "/reels",
    element: Reels
  },
  {
    path: "/settings",
    element: Settings
  },
  {
    path: "/messages",
    element: Messages,
  },
  {
    path: "/messages/:username",
    element: Messages,
  },
  {
    path: "*",
    element: ErrorPage
  }
];

export const publicRoutes = [
  {
    path: "/login",
    element: Auth,
  },
  {
    path: "/signup",
    element: SignUpForm,
  },
  {
    path: "/about",
    element: About
  },
  {
    path: "*",
    element: ErrorPage
  }
];