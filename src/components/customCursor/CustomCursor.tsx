
import { useEffect, useRef } from 'react'
import './index.scss'



const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  
  const mouseMoving = (event: MouseEvent) => {
    event.preventDefault()
    const { clientX, clientY } = event
    const target = event.target as HTMLElement
    

    if (cursorRef.current) {
      const mouseX = clientX - cursorRef.current.clientWidth / 2
      const mouseY = clientY - cursorRef.current.clientHeight / 2
      cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`


      if (target.dataset.state === 'menuText') {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(4)`
      } else if (target.dataset.state === 'productItem') {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(2)`
      }
    }
  }


  useEffect(() => {
    window.addEventListener('mousemove', mouseMoving)

    return () => window.removeEventListener('mousemove', mouseMoving)
  }, [])
  

  
  return (
    <div className='customCursor' ref={cursorRef}></div>
  )
}

export default CustomCursor