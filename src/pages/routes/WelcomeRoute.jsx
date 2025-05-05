import React from "react";
import { useSelector } from "react-redux";
import { MessageCircleHeart } from "lucide-react";
import { motion } from "framer-motion";

function WelcomeRoute() {
  const { user } = useSelector((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-[200px] w-[400px] rounded-xl border-2 border-dashed border-blue-300 flex flex-col justify-center items-center text-center bg-white/90 "
    >
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
        Hello {user.firstname}
        <MessageCircleHeart className="text-pink-600" />
      </h1>
      <h2 className="text-gray-600 text-base">
        Welcome back! Start a new conversation or pick up where you left off.
      </h2>
    </motion.div>
  );
}

export default WelcomeRoute;
