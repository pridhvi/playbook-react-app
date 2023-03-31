import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import NavigationBar from "./components/NavigationBar";
import Profile from "./components/profile/Profile";
import Search from "./components/search/Search";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { iceAndFireApi } from "./services/iceandfire";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApiProvider api={iceAndFireApi}>
        <div className="wb-bg-image-div">
          <img
            src="/map-full.jpg"
            alt="got-map"
            className="wb-bg-image"
            loading="eager"
          />
        </div>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </Provider>
  );
};

export default App;
