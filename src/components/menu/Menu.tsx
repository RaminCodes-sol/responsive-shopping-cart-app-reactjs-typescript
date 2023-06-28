import './index.scss'
import { motion } from 'framer-motion'


/*------Framer-Motion-Variant------*/
const menuVariants = {
    initial: {
        height: 0,
    },
    animate: {
        height: '100%',
        transition: {
            duration: .7,
            ease: [0.6, -0.05, 0.01, 0.99],
        }
    },
    exit: {
        height: 0,
        transition: {
            duration: .7,
            ease: [0.6, -0.05, 0.01, 0.99],
        }
    }
}

/*------Framer-Motion-Variant------*/
const itemVariants = {
    initial: {
        opacity: 0,
        y: -50
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: .1
        }
    },
    exit: {
        opacity: 0,
        y: -50
    }
}


const Menu = () => {
    
  return (
    <motion.div className='menu-wrapper' variants={menuVariants} initial='initial' animate='animate' exit='exit'>

        <motion.div className='menu_content' variants={itemVariants}>
            <h1 data-state='menuText'>Concepts</h1>
            <h1 data-state='menuText'>Shop</h1>
            <h1 data-state='menuText'>Info</h1>
        </motion.div>

        <motion.div className='menu_footer' variants={itemVariants}>
            <h5>
                Email: <a>ramin.yousefpour94@gmail.com</a>
            </h5>
        </motion.div>

    </motion.div>
  )
}

export default Menu