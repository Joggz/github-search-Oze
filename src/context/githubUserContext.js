import { createContext } from "react";

export const GithubUserContext = createContext({
  user: [],
  fetchUser: (users) => {},
  loading: false,
  setIsLoading: (l) => {},
  page: "0",
  setPage: (p) => {},
  userName: "",
  setUserName: (n) => {},
});
