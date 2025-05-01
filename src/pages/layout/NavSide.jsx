import React from "react";
import Header from "./Header";
import ContactNav from "./ContactNav";

function NavSide() {
  return (
    <section className="w-[350px] bg-blue-200 flex">
      <Header />
      <ContactNav />
    </section>
  );
}

export default NavSide;
