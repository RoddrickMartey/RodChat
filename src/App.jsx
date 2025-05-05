import { Route, Routes } from "react-router";
import Protect from "./pages/auth/Protect";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/layout/MainPage";
import { Toaster } from "sonner";
import WelcomeRoute from "./pages/routes/WelcomeRoute";
import Profile from "./pages/routes/Profile";
import Wallpaper from "./pages/routes/Wallpaper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<Protect />}>
          <Route element={<MainPage />}>
            <Route path="/" element={<WelcomeRoute />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallpaper" element={<Wallpaper />} />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
