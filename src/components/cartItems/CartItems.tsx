import { useState, useEffect } from 'react'
import './index.scss'
import  { motion } from 'framer-motion'
import { useProductContext } from '../../productContext/ProductContext'
import { useNavigate } from 'react-router-dom'
import { FaTimes, FaAngleUp, FaAngleDown, FaTrashAlt} from "react-icons/fa"



/*-------Framer-Motion-Variants-------*/
const cartContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.6
    }
  },
  exit: {
    opacity: 0,
    ease: [0.77, 0, 0.175, 1] 
  }
}

/*-------Framer-Motion-Variants-------*/
const itemVariants = {
  initial: {
    opacity: 0,
    y: 40
  },
  animate: {
    opacity: 1,
    y: 0,
    ease: [0.77, 0, 0.175, 1]
  },
}

/*-------Framer-Motion-Variants-------*/
const tableBodyVariants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: .3

    }
  }
}





const CartItems = () => {
  const { cartItems, setCartOpened, dispatch } = useProductContext()
  const  [productsTotalPriceAndQuantity, setProductsTotalPriceAndQuantity] = useState<{ total: number, quantity: number }>({ total: 0, quantity:0 })
  const navigate = useNavigate()


  useEffect(() => {
    const totalPriceAndQuantity = cartItems.reduce((acc, item): { total: number, quantity: number } => {
      acc.total += item.quantity * item.price
      acc.quantity += item.quantity
      return acc
    }, {
      total: 0,
      quantity: 0
    })
    setProductsTotalPriceAndQuantity(totalPriceAndQuantity)
  }, [cartItems])





  
  return (
    <div className='cart-wrapper'>

      <motion.div className="cart-container" variants={cartContainerVariants} initial='initial' animate='animate' exit="exit">

        {/*-----------Cart-Header-----------*/}
        <motion.header className='cart_header' variants={itemVariants}>
          <div>
            <h1>shopping bag</h1>
            <h1><span>{productsTotalPriceAndQuantity.quantity}</span> item ready for checkout.</h1>
          </div>
          
          <button onClick={() => {
            setCartOpened(false)
            navigate('/')
          }}><FaTimes /></button>
        </motion.header>


        {/*-----------Cart-Form-----------*/}
        <section className='cart_table'>
          <table>

            {/*-----Table-Header-----*/}
            <motion.thead variants={itemVariants} initial='initial' animate='animate' transition={{delay: .035}}>
              <tr>
                <th className='product-thumbnail'>ITEM</th>
                <th className='product-name'>DESCRIPTION</th>
                <th className='product-quantity'>QTY</th>
                <th className='product-price'>PRICE</th>
                <th className='product-remove'></th>
              </tr>
            </motion.thead>


            {/*-----Table-Body-----*/}
            <motion.tbody variants={tableBodyVariants} initial='initial' animate='animate'>
              {
                cartItems?.map(item => {
                  return (
                    <motion.tr key={item.id} variants={itemVariants}>
                      <td className='product-thumbnail'>
                        <figure><img src={item.image} alt={item.title} /></figure>
                      </td>

                      <td className='product-name'>
                        <span>{item.title}</span>
                      </td>

                      <td className='product-quantity'>
                        <span>{item.quantity}</span>
                        <div>
                          <button onClick={() => dispatch({ type: 'INCREASE_ITEM', payload: item.id })}><FaAngleUp /></button>
                          <button onClick={() => dispatch({ type: 'DECREASE_ITEM', payload: item.id})}><FaAngleDown /></button>
                        </div>
                      </td>

                      <td className='product-price'>
                        <span>${item.price}</span>
                      </td>

                      <td className='product-remove'>
                        <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}><FaTrashAlt /></button>
                      </td>
                  </motion.tr>
                  )
                })
              }
            </motion.tbody>

          </table>
        </section>
        

        {/*-----------Cart-Total-----------*/}
        {
          cartItems.length 
            ? <section className='cart_total'>
                <button onClick={() => setCartOpened(false)}>
                  continue shopping
                </button>
                
                <div className='totol-price-container'>
                  <div className='subtotal'>
                    <span>Subtotal</span>
                    <span>${productsTotalPriceAndQuantity?.total.toFixed(2) || 0}</span>
                  </div>
      
                  <div className='tax'>
                    <span>Tax</span>
                    <span>$2.60</span>
                  </div>
      
                  <div className='tax'>
                    <span>Total</span>
                    <span>${(productsTotalPriceAndQuantity?.total + 2.60).toFixed(2)}</span>
                  </div>
      
                  <button>proceed to checkout</button>
                </div>
              </section>
            : <h3 style={{ textAlign: 'center', marginTop: '3rem' }}>Cart is empty</h3>
        }

      </motion.div>
    </div>
  )
}

export default CartItems