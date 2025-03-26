import  { Children } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function MainLeyauts({children}) {
  return (
    <div>
        <Navbar></Navbar>
        {children}  
        <Footer></Footer>
  </div>
  )
}

export default MainLeyauts

// tohirjonov