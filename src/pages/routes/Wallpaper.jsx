import { setWallpaper } from "@/features/wallpaperSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

function Wallpaper() {
  const { currentWallpaper, wallpapers } = useSelector(
    (state) => state.wallpaper
  );

  const dispatch = useDispatch();

  const wallpaperEntries = Object.entries(wallpapers); // [ [1, url], [2, url], ... ]

  if (wallpaperEntries.length === 0) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <p>No wallpapers found.</p>
      </section>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col items-center py-7 overflow-y-auto px-4 scrollbar-blue">
      <h1 className="text-xl font-semibold mb-4">Select your wallpaper</h1>
      <div className="grid grid-cols-4 gap-3 w-full p-5">
        {wallpaperEntries.map(([key, url]) => (
          <motion.div
            key={key}
            className={`pt-2 pb-6 rounded-md flex items-center justify-center ${
              currentWallpaper === Number(key)
                ? "bg-pink-400/70"
                : "bg-blue-400/70"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: Number(key) * 0.05 }}
          >
            <img
              src={url}
              alt={`Wallpaper ${key}`}
              className={`w-[200px] h-[200px] rounded-md border-2 object-cover cursor-pointer hover:scale-105 transition-transform duration-200 ${
                currentWallpaper === Number(key)
                  ? "border-pink-500"
                  : "border-blue-500"
              }`}
              onClick={() => dispatch(setWallpaper(Number(key)))}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Wallpaper;
