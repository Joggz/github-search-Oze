import React, { useContext, useEffect, useState } from "react";
import { GithubUserContext } from "../context/githubUserContext";
import UserCard from "../components/userCard";
import DropDown from "../components/dropDown";

const PaginatedScreen = ({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) => {
  const { users, loading } = useContext(GithubUserContext);
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;

    return users.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  return (
    <div>
      <div className="flex justify-center ">
        <UserCard paginatedUser={getPaginatedData()} />
      </div>
      {users.length > 0 && (
        <div className="pagination flex justify-center mt-10">
          {/* previous button */}
          <section className=" px-8 sm:px-2">
            <span className="font-semibold px-2 uppercase">pages: </span>
            <DropDown />
          </section>
          <button
            onClick={goToPreviousPage}
            className={`prev ${
              currentPage === 1
                ? " pointer-events-none cursor-not-allowed"
                : "cursor-pointer"
            }  rounded-lg px-2 sm:px-0 uppercase font-extrabold`}
          >
            Prev
          </button>

          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item
                  ? "text-lg font-semibold hover:text-xl hover:text-zinc-900"
                  : "font-medium hover:text-xl hover:text-zinc-900"
              } mx-3.5 sm:mx-1.5`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${
              currentPage === pages
                ? "pointer-events-none cursor-not-allowed"
                : ""
            } uppercase font-extrabold`}
          >
            Next
          </button>
        </div>
      )}{" "}
    </div>
  );
};

export default PaginatedScreen;
