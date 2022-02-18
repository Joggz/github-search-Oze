import React, { useContext, useEffect } from "react";
import { GithubUserContext } from "../context/githubUserContext";

const DropDown = () => {
  const options = Array.from(Array(20).keys());
  const context = useContext(GithubUserContext);

  const handleChange = (e) => {
    context.setPage(e.target.value);
  };
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [context?.page]);

  return (
    <select className="outline-none" onChange={handleChange}>
      {options.map((option, i) => (
        <option value={option}>{option + 1}</option>
      ))}
    </select>
  );
};

export default DropDown;
