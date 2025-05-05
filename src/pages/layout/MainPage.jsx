import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

function MainPage() {
  const { currentWallpaper, wallpapers } = useSelector(
    (state) => state.wallpaper
  );

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${wallpapers[currentWallpaper]})` }}
    >
      <Outlet />
    </section>
  );
}

export default MainPage;
