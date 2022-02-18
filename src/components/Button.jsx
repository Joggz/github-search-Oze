import React, { useContext } from "react";
import { GithubUserContext } from "../context/githubUserContext";

const Button = ({ fetchGithubUser }) => {
  const context = useContext(GithubUserContext);
  const callFetchGithubuser = (e) => {
    e.preventDefault();
    fetchGithubUser();
  };
  return (
    <section>
      <button
        className="cursor-pointer bg-black hover:bg-slate-500 text-white font-bold py-4 px-10 sm:px-6 rounded-lg"
        onClick={callFetchGithubuser}
      >
        {!context?.loading ? "Search" : "Searching..."}
      </button>
    </section>
  );
};

export default Button;
