import React from "react";

export default function Profile(props) {

  const { sub, roles, email } = props.userData||{};

  return (
    <>
      <div className="w-75 m-auto py-4 bg-dark">
        <div>
          <h4 className="text-center">User Name:{sub}</h4>
          <p className="text-center">Email: {email}</p>
          <p className="text-center">Role: {roles}</p>
        </div>
      </div>
    </>
  );
}
