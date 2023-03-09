
import './App.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './routes/Home/HomePage'
import { LoginPage } from './routes/LoginPage/LoginPage'
import { EditProfilePage } from './routes/EditProfile/EditProfilePage'
import { SignOutPage } from './routes/SignOut/SignOutPage'
import { PublicProfilePage } from './routes/PublicProfile/PublicProfile'
import { ChooseUsernamePage } from './routes/ChooseUsername/ChooseUsername'
import { DashboardPage } from './routes/Dashboard/DashboardPage'

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='dashboard' element={<DashboardPage/>} />
        <Route path='dashboard/profile' element={<EditProfilePage/>} />
        <Route path='signout' element={<SignOutPage/>} />
        <Route path='u/:username' element={<PublicProfilePage/>} />
        <Route path='choose-username' element={<ChooseUsernamePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
