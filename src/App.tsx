import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import SignIn from './components/SignIn'
import { UserProvider } from './providers/UserProvider'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'


function App() {

  return (
    <>
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/*" element={< SignIn/>} />
          <Route path="/main" element={< Main/>} />
        </Routes>
      </UserProvider>
    </div>
    </>
  )
}

export default App
