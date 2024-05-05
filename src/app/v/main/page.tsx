"use client";

import { useSession } from "next-auth/react";

const MainPage = () => {
  const session = useSession();

  // console.log("session", session);
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <p>Welcome to the home page</p>
      <p>Welcome to the home page</p>
    </div>
  );
};

export default MainPage;
