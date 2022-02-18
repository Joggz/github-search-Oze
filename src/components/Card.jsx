import React from "react";

const Card = ({ user }) => {
  return (
    <div className="group w-80 h-60 border-slate-600 border-solid border-2 drop-shadow-2xl rounded-2xl  flex justify-center ">
      <section class="flex flex-col py-8 content-center">
        <img
          class="w-24 h-24 rounded-full mx-auto"
          src={user?.avatar_url}
          alt=""
          width="5"
          height="5"
        />
        <span class="px-4 py-2 uppercase text-center"> {user?.login} </span>
        <section className=" more-info text-transparent group-hover:text-slate-900  text-center">
          <p className="uppercase">score: {user?.score}</p>
          <p className=" text-sm">
            profile link: <a href={user?.html_url}> {user?.html_url}</a>{" "}
          </p>
        </section>
      </section>
    </div>
  );
};

export default Card;
