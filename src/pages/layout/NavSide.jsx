import React from "react";
import Header from "./Header";
import ContactNav from "./ContactNav";

function NavSide() {
  return (
    <section className="w-[350px] h-full flex border-r border-r-blue-300">
      <Header />
      <ContactNav />
    </section>
  );
}

export default NavSide;
