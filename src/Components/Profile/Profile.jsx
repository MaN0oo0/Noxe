import React, { useContext } from "react";
import { AuthContext } from "../../Context/Store";

export default function Profile() {
const {userData}=useContext(AuthContext);

  return (
    <>
      <div className="w-75 m-auto py-4 bg-dark">
        <div>
          <h4 className="text-center">User Name:{userData&&userData.sub}</h4>
          <p className="text-center">Email: {userData&&userData.email}</p>
          <p className="text-center">Role: {userData&&userData.roles}</p>
        </div>
      </div>
    </>
  );
}
