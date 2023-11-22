import React from 'react'
import './index.scss'
import  { motion } from 'framer-motion'
import img1 from './image-1.jpg'
import img2 from './image-2.jpg'
import img3 from './image-3.jpg'



/*-------Framer-Motion-------*/
const loadingVariants = {
  animate: {
    transition: {
      staggerChildren: 0.35,
    }
  }
}

/*-------Framer-Motion-------*/
const itemVariants = {
  initial: {
    opacity: 0,
    y: 250,
  },

  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    rotate: Math.random() * custom,
    transition: {
      ease: [.6, .01, -.05, .95],
      duration: 1.6,
    }
  }),
  
  exit: (custom: number) => ({
    opacity: 0,
    y: -300,
    transition: {
      ease: 'easeInOut',
      duration: 0.8,
      delay: custom * .02,
    }
  })
}


/*-------Props Type-------*/
type PropsType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}



const LoadingPage:React.FC<PropsType> = ({ setLoading }) => {

  return (
    <motion.div className="loading-page" viewport={{ once: true }} variants={loadingVariants} initial='initial' animate='animate' exit='exit' onAnimationComplete={() => setLoading(false)}>

      <motion.figure className="figure left" variants={itemVariants} custom={-10}>
        <img src={img1} alt='img' />
      </motion.figure>

      <motion.figure className="figure center" variants={itemVariants} custom={15}>
        <img src={img2} alt='img' />
      </motion.figure>

      <motion.figure className="figure right" variants={itemVariants} custom={20}>
        <img src={img3} alt='img' />
      </motion.figure>

    </motion.div>
  )
}

export default LoadingPage

