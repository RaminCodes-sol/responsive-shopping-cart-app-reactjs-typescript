import { useEffect, useState } from 'react'
import './index.scss'
import { motion } from 'framer-motion'
import { items } from '../../data'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductType, useProductContext } from '../../productContext/ProductContext'




const ProductDetails = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductType>({} as ProductType)
  const { dispatch, cartItems } = useProductContext()


  useEffect(() => {
    const item = items?.filter(item => item.id === Number(productId))
    setProduct(item[0])

  }, [productId])


  /*-------Framer-Motrion-Variants-------*/
  const figureVariants = {
    initial: {
      opacity: 0, 
      x: 100,
      transition: { duration: .4 }  
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: .4, ease: [.5, 0.5, .2, 1] }
    }
  }

  const productDescVariants = {
    animate: {
      transition: {
        staggerChildren: 0.09
      }
    }
  }


  const itemsVariants = {
    initial: {
      opacity: 0,
      y: 60
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }
  /*------------------------------------*/


  /*-------Add-To-Cart-------*/
  const addToCart = (product: ProductType, id: number): void => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    dispatch({ type: 'INCREASE_ITEM', payload: id })
  }

  /*-------Remove-From-Cart-------*/
  const removeFromCart = (id: number): void => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  return (
    <motion.div className='product-details-wrapper' initial='initial' animate='animate'>

      {/*----------------Product_Figure----------------*/}
      <motion.figure className='product_figure' variants={figureVariants}>
        <img src={product?.image} alt={product?.title} />
      </motion.figure>


      {/*----------------Product_Details----------------*/}
      <motion.section className='product-desc' variants={productDescVariants}>
        <motion.button className='product-desc_backToProduct' variants={itemsVariants} onClick={() => navigate('/')}>
          Back to products
        </motion.button>

        <motion.h1 className='product-desc_title' variants={itemsVariants}>
          {product.title}
        </motion.h1>


        <motion.p className='product-desc_content' variants={itemsVariants}>
          {product.description}
        </motion.p>


        <motion.div className='product-desc_price' variants={itemsVariants}>
          <h5>Category: {product.category}</h5>
          <span>${product.price}</span>
        </motion.div>


        <motion.div className='product-desc_bottom-buttons' variants={itemsVariants}>
          {
            cartItems?.some(item => item.id === Number(productId)) 
              ? <button onClick={() => removeFromCart(product.id)}>remove from cart</button>
              : <button onClick={() => addToCart(product, product.id)}>Add to cart</button>
          }
          {/*This button only appears on phone*/}
          <button onClick={() => navigate('/')}>
            Back to products
          </button>
        </motion.div>
      </motion.section>

    </motion.div>
  )
}

export default ProductDetails