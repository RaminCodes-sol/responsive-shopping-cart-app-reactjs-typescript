import './index.scss'
import { motion } from 'framer-motion'
import { useProductContext } from '../../productContext/ProductContext'
import { useState } from 'react'


/*------Framer-Motion-Variant------*/
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

/*------Framer-Motion-Variant------*/
const letterVariants = {
  initial: {
    opacity: 0, 
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
}

/*------Framer-Motion-Variant------*/
const filterVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duartion: 0.8
    }
  }
}


const Header = () => {
  const { sort, filterByCategory } = useProductContext()
  const [active, setActive] = useState({
    fadeInCategory: false,
    fadeInSort: false
  })
  console.log(active)

  return (
    <motion.div className='header' variants={containerVariants} initial='initial' animate='animate'>
      
      {/*------Title------*/}
      <motion.div className="header-title" variants={containerVariants} initial='initial' animate='animate'>
        { 
          ['m','e','r','c','h'].map(letter => 
            <motion.h1 key={letter} variants={letterVariants}>{letter}</motion.h1>
          ) 
        }
      </motion.div>


      {/*------Filters------*/}
      <motion.div className="filters-wrapper" variants={filterVariants}>

        <div className='category-filter'>
          <ul className='drop-menu-container'>
            <li onClick={() => setActive({
              fadeInCategory: !active.fadeInCategory,
              fadeInSort: false
            })}>by category
              <ul className={`drop-menu ${active.fadeInCategory && 'active'}`}>
                <li onClick={() => filterByCategory('all')}>all</li>
                <li onClick={() => filterByCategory('clothes')}>clothes</li>
                <li onClick={() => filterByCategory('shoes')}>shoes</li>
                <li onClick={() => filterByCategory('hat')}>hat</li>
              </ul>
            </li>
          </ul>
        </div>


        <div className='sort-filter'>
          <ul className='drop-menu-container'>
            <li onClick={() => setActive({
              fadeInSort: !active.fadeInSort,
              fadeInCategory: false
            })}>by sort
              <ul className={`drop-menu ${active.fadeInSort && 'active'}`}>
                <li onClick={() => sort('low_price')}>low price</li>
                <li onClick={() => sort('high_price')}>high price</li>
                <li onClick={() => sort('a-z')}>A - Z</li>
              </ul>
            </li>
          </ul>
        </div>

      </motion.div>

    </motion.div>
  )
}

export default Header