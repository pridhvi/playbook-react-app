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
import Game from "./components/details/Game";
import Character from "./components/details/Character";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/details/games/:id" element={<Game />}></Route>
          <Route path="/details/characters/:id" element={<Character />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
