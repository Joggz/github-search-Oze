import React, { useEffect, useContext, useState } from "react";
import Button from "./button";

import axios from "axios";
import { GithubUserContext } from "../context/githubUserContext";

const SearchForm = () => {
  const context = useContext(GithubUserContext);
  const [user, setUser] = useState([]);
  const [loading, isloading] = useState(false);
  const [username, setUserName] = useState("");
  const fetchUsers = () => loadMoreItems();

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const loadMoreItems = () => {
    context.setUserName(username);
    context.setIsLoading(true);
    if (username.length == 0) {
      alert(" Kindly Input a Github Username to search !!!");
      context.setIsLoading(false);
      return;
    }

    isloading(true);
    //using axios to access the third party API
    axios({
      method: "GET",
      url: `https://api.github.com/search/users?q=${username}&page=${
        Number(context.page) || 0
      }`,
      // params: { _page: 1 },
    })
      .then((res) => {
        const { items } = res.data;
        // if (items.length === 0) {
        //   context.setUserName(" No user with searched Name");
        // }
        context.fetchUser(items);
        // setUserName("");
        context.setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        context.setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!username) {
      context.user = [];
    }
  }, [username]);
  return (
    <div className="w-full  m-10 flex justify-center ">
      <form class="w-2/5 sm:w-full ">
        <div class="flex items-center border-b border-black py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-black text-2xl sm:text-base mr-3 py-1 px-2 leading-tight focus:outline-none "
            type="text"
            placeholder="Github Username"
            aria-label="John Doe"
            onChange={handleChange}
            value={username}
          />
          <Button fetchGithubUser={fetchUsers} />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
