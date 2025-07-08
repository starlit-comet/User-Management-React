import './App.css'
import { Toaster } from 'sonner'
import EnhancedLoginCard from './features/user_log_page/EnhancedLoginCard'
// import Counter from './features/counter/counter'
  
  
  
  function App() {

  return (
    <>
    <Toaster richColors position='top-right' expand={true} />
    <EnhancedLoginCard />
    
  
    </>
    
  )
}

export default App
