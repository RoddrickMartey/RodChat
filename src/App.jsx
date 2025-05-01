import { Route, Routes } from "react-router";
import Protect from "./pages/auth/Protect";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/home/MainPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<Protect />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
