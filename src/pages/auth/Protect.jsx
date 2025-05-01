import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Header from "../layout/Header";
import NavSide from "../layout/NavSide";

function Protect() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  // Optionally show a loading indicator if redirecting

  if (user === null) return null;

  return (
    <main className="flex h-screen">
      <NavSide />
      <Outlet />
    </main>
  );
}

export default Protect;
