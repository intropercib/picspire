import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import SignUpForm from "../components/AuthForm/SignUpForm";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Explore from "../components/SideBar/Explore/Explore";
import Reels from "../components/SideBar/Reels/Reels";
import About from "../pages/About/About";
import Settings from "../pages/Settings/Settings";
import Messages from "../pages/Messages/Messages";
import { Children } from "react";
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
    path: "/explore",
    element: Explore
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
  }
];