import React from 'react'
import './index.scss'
import { motion } from 'framer-motion'
import { ProductType, useProductContext } from '../../productContext/ProductContext'
import { FaTrashAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'



/*--------Framer-Motion-Variants--------*/
const itemVariants = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
}

/*--------Framer-Motion-Variants--------*/
const imageVariants = {
  initial: {
    scale: .6
  },
  animate: {
    scale: 1
  }
}

/*--------Props-Type--------*/
interface Props {
  product: ProductType;
  addToCart: (item: ProductType, id: number) => void;
  removeFromCart: (id: number) => void;
}




const Product:React.FC<Props> = ({ product, addToCart, removeFromCart}) => {
  const { cartItems } = useProductContext()
  const navigate = useNavigate()

  return (
    <motion.div className='product-item' variants={itemVariants} data-state='productItem'>
        <h3 data-state='productItem'>{product.title}</h3>

        <motion.figure initial='initial' animate='animate' onClick={() => navigate(`product/${product.id}`)} data-state='productItem'>
            <motion.img src={product.image} alt={product.title} loading='lazy' variants={imageVariants} data-state='productItem'/>
        </motion.figure>

        <span data-state='productItem'>${product.price}</span>

        { 
          cartItems?.some(item => item.id === product.id) 
            ? <button onClick={() => removeFromCart(product.id)} className='delete-product' data-state='productItem'><FaTrashAlt /></button>
            : <button onClick={() => addToCart(product, product.id)} data-state='productItem'>add to cart</button>
        }
        
    </motion.div>
  )
}

export default Product