import { useState, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom' 
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/homePage/Home'
import ProductDetails from './pages/productDetails/ProductDetails'
import LoadingPage from './components/loadingPage/LoadingPage'
import CustomCursor from './components/customCursor/CustomCursor'
import CartItems from './components/cartItems/CartItems'
import Navbar from './components/navbar/Navbar'
import Menu from './components/menu/Menu'
import { useProductContext } from './productContext/ProductContext'





function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const { cartOpened, menuOpened } = useProductContext()
   
  
  useLayoutEffect(() => {
    if (loading || cartOpened || menuOpened) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading, cartOpened, menuOpened])


  
  return (
    <div id="App">

      {/*-------Custom-Cursor-------*/}
      <CustomCursor />

      <AnimatePresence mode='wait'>

        {/*-------Cart-Items-------*/}
        { 
          cartOpened && <motion.div key="cartItems">
              <CartItems />
            </motion.div> 
        }

        {
          menuOpened && <motion.div key='menu'>
              <Menu />
            </motion.div>
        }
      
        {/*-------Product-------*/}
        {
          loading 
            ? <motion.div key="loadingPage">
                <LoadingPage setLoading={setLoading} />
              </motion.div> 
            : <>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='product/:productId' element={<ProductDetails />} />
                </Routes>
              </> 
        }
      </AnimatePresence>
    </div>
  )
}

export default App