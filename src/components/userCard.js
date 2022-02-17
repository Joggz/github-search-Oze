import React, { useContext } from "react";
import { GithubUserContext } from "../context/githubUserContext";
import Card from "./Card";

const UserCard = ({ paginatedUser }) => {
  const { users, loading, userName } = useContext(GithubUserContext);
  console.log("username ", userName);
  return (
    <div className="w-10/12 grid gap-4 lg:grid-cols-3 sm:grid sm:grid-cols-1 md:grid-cols-2">
      {!userName && users.length === 0 && (
        <div className=" uppercase text-center w-screen pr-52 sm:pr-12 font-bold text-2xl sm:text-base">
          <h3>Input Github user name to be searched</h3>
        </div>
      )}
      {paginatedUser.length == 0 && !loading && userName && (
        <div className=" uppercase text-center w-screen pr-52 sm:pr-12 font-bold text-2xl sm:text-base">
          No user with searched Name In this Ranges
        </div>
      )}
      {loading && (
        <div className=" w-screen uppercase flex justify-center text-2xl sm:text-base">
          loading....
        </div>
      )}
      {paginatedUser &&
        !loading &&
        paginatedUser.map((item, i) => (
          <div key={i} className="">
            {<Card user={item} />}
          </div>
        ))}
    </div>
  );
};

export default UserCard;
