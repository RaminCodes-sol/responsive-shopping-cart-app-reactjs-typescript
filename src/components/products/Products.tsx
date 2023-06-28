import { useCallback } from 'react'
import './index.scss'
import { motion } from 'framer-motion'
import Product from '../product/Product'
import { useProductContext } from '../../productContext/ProductContext'


/*-------Framer-Motion-Variants-------*/
const productsVariants = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

/*-------Props-Type-------*/
interface ProductType {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    category: string;
}



const Products = () => {
    const { dispatch, data, sorted } = useProductContext()


    /*------------Add-To-Cart------------*/
    const addToCart = useCallback((item: ProductType, id: number): void => {
        dispatch({ type: 'ADD_TO_CART', payload: item })
        dispatch({ type: 'INCREASE_ITEM', payload: id })        
    }, [])


    /*------------Remove-From-Cart------------*/
    const removeFromCart = useCallback((id: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id })
    }, [])




  return (
    <div className='products-wrapper'>
        <motion.div className='products' variants={productsVariants} initial='initial' animate='animate'>
            {
                data?.sort((a, b) => {
                    if (sorted === 'low_price') {
                        return a.price > b.price ? 1 : -1
                    } else if (sorted === 'high_price') {
                        return b.price > a.price ? 1 : -1
                    } else if (sorted === 'a-z') {
                        return a.title.localeCompare(b.title)
                    } else {
                        return b.title.localeCompare(a.title)
                    }
                }).map((product: ProductType) => {
                    return <Product 
                        key={product.id} 
                        product={product} 
                        addToCart={addToCart} 
                        removeFromCart={removeFromCart} 
                    />
                })
            }
        </motion.div>
    </div>
  )
}

export default Products