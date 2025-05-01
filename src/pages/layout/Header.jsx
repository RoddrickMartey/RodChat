import React from "react";
import Logout from "../components/Logout";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Header() {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <section className="flex flex-col h-screen items-center w-[60px] justify-between bg-blue-300">
      <div>Rod</div>
      <div className="flex flex-col space-y-3 mb-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>PIC</AvatarFallback>
        </Avatar>
        <Logout />
      </div>
    </section>
  );
}

export default Header;
