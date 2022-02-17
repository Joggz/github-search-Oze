import "./App.css";
import BackgroundWrapper from "./wrapperBackground.js";
import Header from "./components/header";
import SearchForm from "./components/searchForm";
import UserCard from "./components/userCard";
import { useContext, useState } from "react";
import { GithubUserContext } from "./context/githubUserContext";
import PaginatedScreen from "./screen/paginatedScreen";
import Card from "./components/Card";

function App() {
  const context = useContext(GithubUserContext);
  const [githubusers, setUser] = useState([]);
  const fetchUser = (users) => setUser(users);
  const [loading, isloading] = useState(false);
  const setIsLoading = (l) => isloading(l);
  const [page, setpage] = useState(false);
  const setPage = (p) => setpage(p);
  const [userName, isSetUserName] = useState("");
  const setUserName = (n) => isSetUserName(n);
  return (
    <GithubUserContext.Provider
      value={{
        users: githubusers,
        fetchUser,
        loading,
        setIsLoading,
        page,
        setPage,
        userName,
        setUserName,
      }}
    >
      <BackgroundWrapper>
        <Header />

        <div className="flex justify-center items-center my-8">
          <SearchForm />
        </div>

        <PaginatedScreen
          data={context?.user}
          RenderComponent={Card}
          pageLimit={5}
          dataLimit={10}
        />
      </BackgroundWrapper>
    </GithubUserContext.Provider>
  );
}

export default App;
