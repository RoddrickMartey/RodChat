import { chat, search } from "@/features/navView";
import React from "react";
import { useSelector } from "react-redux";
import FriendAndGroup from "./FriendAndGroup";
import Search from "./Search";
import { Input } from "@/components/ui/input";
import SearchInput from "../components/SearchInput";

function ContactNav() {
  const { currentView } = useSelector((state) => state.view);

  return (
    <section className="w-[280px] bg-blue-300">
      <div className="w-full h-[60px] bg-white flex items-center px-3">
        <SearchInput />
      </div>

      {currentView === chat.view && <FriendAndGroup />}
      {currentView === search.view && <Search />}
    </section>
  );
}

export default ContactNav;
