import React from "react";
import Chat from "../components/Chat";
import People from "../components/People";
import UserAvatar from "../components/UserAvatar";

function Header() {
  return (
    <section className="flex flex-col h-full items-center  justify-between py-3 bg-blue-600 ">
      <div className="w-full mt-12 flex flex-col items-center justify-evenly">
        <Chat />
        <People />
      </div>
      <div className="w-[60px] h-[60px] flex items-center justify-center">
        <UserAvatar />
      </div>
    </section>
  );
}

export default Header;
