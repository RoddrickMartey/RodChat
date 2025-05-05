import React from "react";
import AvatarViewAndEdit from "../components/AvatarViewAndEdit";
import DetailsViewAndEdit from "../components/DetailsViewAndEdit";
import PasswordViewAndEdit from "../components/PasswordViewAndEdit";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";

function Profile() {
  const { user } = useSelector((state) => state.user);

  if (user === null) {
    <section className="w-full h-screen flex justify-center items-center">
      <OrbitProgress
        variant="track-disc"
        color="#ffffff"
        size="large"
        text="loading"
        textColor=""
      />
    </section>;
  }

  return (
    <section className="w-full h-screen flex flex-col items-center py-7 overflow-y-auto scrollbar-blue">
      <AvatarViewAndEdit avatar={user.avatar} />
      <DetailsViewAndEdit
        username={user.username}
        firstname={user.firstname}
        surname={user.surname}
      />
      <PasswordViewAndEdit />
    </section>
  );
}

export default Profile;
