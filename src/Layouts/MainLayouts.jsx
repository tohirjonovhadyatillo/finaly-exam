import  { Children } from 'react'
import Navbar from '../components/Navbar'
function MainLeyauts({children}) {
  return (
    <div>
        <Navbar></Navbar>
        {children}  
  </div>
  )
}

export default MainLeyauts

// tohirjonov