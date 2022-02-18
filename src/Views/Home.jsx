import axios from "axios";
import React, { useState } from "react";

const SearchForm = ({ searchByUserName }) => {
  const [userName, setUserName] = useState("");
  const handleChange = (e) => {
    e.preventDefault();

    searchByUserName(userName);
  };

  return (
    <div className="w-full py-12 sm:mx-8 sm:w-fit flex justify-center ">
      <form onSubmit={(e) => handleChange(e)} className="w-2/5 sm:w-full ">
        <div className="flex items-center border-b border-black py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-black text-2xl sm:text-base mr-3 py-1 px-2 leading-tight focus:outline-none "
            type="text"
            placeholder="Github Username"
            aria-label="John Doe"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <Button onClick={console.log} text={"Search"} />
        </div>
      </form>
    </div>
  );
};
const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

const Button = ({ onClick, text, loading }) => {
  return (
    <section>
      <button
        className="cursor-pointer bg-black hover:bg-slate-500 text-white font-bold py-4 px-10 sm:px-6 rounded-lg"
        onClick={onClick}
      >
        {!loading ? text : <Loader />}
      </button>
    </section>
  );
};

const Header = () => {
  return (
    <div className="sticky top-0 z-40 ">
      <nav className=" h-20 bg-gray-50  drop-shadow-2xl shadow-black-500/50 flex justify-center items-center">
        <div className="w-11/12 flex items-center justify-around">
          <div className=" pl-14 flex-1 uppercase sm:text-sm sm:capitalize  sm:pl-4 text-xl  ">
            Search Github user
          </div>

          <div className=" flex flex-1 justify-end pr-14">
            <section className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
                alt=""
                width="5"
                height="5"
              />
            </section>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Card = ({ user }) => {
  return (
    <div className="group w-80 h-60 border-slate-600 border-solid border-2 drop-shadow-2xl rounded-2xl  flex justify-center ">
      <section className="flex flex-col py-4 content-center">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={user?.avatar_url}
          alt=""
          width="5"
          height="5"
        />
        <span className="px-4 py-2 uppercase text-center font-extrabold text-xl">
          {" "}
          {user?.login}{" "}
        </span>
        <section className=" flex flex-col more-info text-transparent pointer-events-none group-hover:text-slate-900 group-hover:pointer-events-auto text-center">
          <p className="uppercase font-semibold">score: {user?.score}</p>
          <p className=" text-sm uppercase font-semibold ">profile link: </p>
          <a
            href={user?.html_url}
            target="_blank"
            className="group-hover:text-sky-400/100 cursor-pointer  truncate"
          >
            {" "}
            {user?.html_url}
          </a>{" "}
        </section>
      </section>
    </div>
  );
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [users, setUser] = useState([]);
  const [HasMore, setHasMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [userName, setUserName] = useState("");
  const [showBackToTopButton, setShowBackToTopButton] = useState(0);

  const searchByUserName = (username, pageNo = 1) => {
    setUserName(username);

    if (username.length === 0) {
      alert(" Kindly Input a Github Username to search !!!");
      return;
    }
    setIsFetching(true);

    axios({
      method: "GET",
      url: `https://api.github.com/search/users?q=${username}&page=${pageNo}&per_page=${50}`,
    })
      .then((res) => {
        if (pageNo === 1) {
          setUser(res?.data?.items);
          setPage(1);
        } else {
          setUser((previousState) => {
            return [...previousState, ...res?.data?.items];
          });
          setPage(page + 1);
        }

        setHasMore(res?.data?.items.length !== res.data.total_count);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
        setIsFetching(false);
      });
  };
  const loadMore = () => {
    setIsFetching(true);

    searchByUserName(userName, page + 1);
  };

  window.addEventListener("scroll", (event) =>
    setShowBackToTopButton(window.pageYOffset)
  );

  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-50 overflow-x-hidden min-h-screen  pb-10">
      <section className="header">
        <Header />
      </section>
      <section className="body ">
        <SearchForm searchByUserName={searchByUserName} />
        <section className=" ">
          <section className="card ml-8  w-full grid gap-3 lg:grid-cols-4 sm:grid sm:grid-cols-1  md:grid-cols-3 md:gap-3 ">
            {users.length !== 0 &&
              users.map((user, i) => <Card user={user} key={i} />)}

            {users.length === 0 && !isFetching && (
              <div className=" uppercase text-center w-screen pr-52 sm:pr-12 font-bold text-2xl sm:text-base">
                <h3>Input Github user name to be searched</h3>
              </div>
            )}
          </section>
          <section className="py-20 sm:mb-12 sm:py-8 flex justify-center cursor-pointer">
            {isFetching && (
              <p className="font-semibold text-xl">Fetching Users...</p>
            )}
            {!isFetching && HasMore && (
              <Button
                onClick={loadMore}
                text={"Load More"}
                loading={isFetching}
              />
            )}
          </section>
          {showBackToTopButton >= 1000 && (
            <section className="fixed bottom-0 right-10 py-8 sm:mt-24 flex justify-center cursor-pointer">
              <Button
                onClick={() =>
                  window.scrollTo({ behavior: "smooth", top: "0px" })
                }
                text={"Back To Top"}
              />
            </section>
          )}
        </section>
      </section>
    </div>
  );
};

export default Home;
