import React, { useState, useEffect } from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { Cross as Hamburger } from 'hamburger-react'
import './index.scss'
import { motion } from 'framer-motion'
import { useProductContext } from '../../productContext/ProductContext';



const navbarVariants = {
    animate: {
        transition: {
            staggerChildren: .2
        }
    }
}


const itemVariants = {
    initial: {
        opacity: 0,
        y: -20,
    },
    animate: {
        opacity: 1,
        y: 0,
    }
}



const Navbar = () => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const { setCartOpened, cartItems, setMenuOpened } = useProductContext()
    const [itemQuantities, setItemQuantities] = useState<number>(0)
    

    useEffect(() => {
        const items = cartItems?.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)
        setItemQuantities(items)
    }, [cartItems])



  return (
    <motion.div className='navbar' variants={navbarVariants} initial='initial' animate='animate'>

        <motion.h1 className="logo" variants={itemVariants}>
            Shopping
        </motion.h1>
        
        <motion.div variants={itemVariants}>
            <button onClick={() => setCartOpened(true)}>
                <FaShoppingBag />
                <span>{itemQuantities} items</span>
            </button>
            <button onClick={() => setMenuOpened(prevState => !prevState)}>
                <Hamburger toggled={isOpen} toggle={setOpen} size={30} />
            </button>
        </motion.div>

    </motion.div>
  )
}

export default Navbar