import './App.css'
import { Toaster } from 'sonner'
import EnhancedLoginCard from './features/user_log_page/EnhancedLoginCard'
import UserHomePage from './pages/userHome/UserHomePage'
import { Route,Routes,useNavigate } from 'react-router-dom'
import AdminPages from './Routes/AdminRouter'
import NotFoundPage from './pages/NotFoundErrorPage'
  
  
  function App() {

  return (
    <>
    <Toaster richColors position='top-right' expand={true} />
    <Routes >
    <Route path='/login' element={<EnhancedLoginCard />} />
    <Route path='/dashboard' element={<UserHomePage/>} />
    <Route path='/admin/*' element ={<AdminPages />} />
    <Route path='*' element ={<NotFoundPage />} />
    </Routes>
    
  
    </>
    
  )
}

export default App
