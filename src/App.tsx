import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './components/home/Home'
import NavigationBar from './components/NavigationBar'
import Profile from './components/profile/Profile'
import Search from './components/search/Search'

const App: React.FC = () => {

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
