import { useEffect, useRef } from 'react'

export const useRubberBandScroll = (containerRef) => {
  useEffect(() => {
    const container = containerRef?.current || document.documentElement
    if (!container) return

    let isScrolling = false
    let startY = 0
    let currentY = 0

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1

      if (atTop && e.deltaY < 0) {
        e.preventDefault()
        const mainContent = document.querySelector('main')
        if (mainContent) {
          const bounce = Math.min(15, Math.abs(e.deltaY) * 0.3)
          mainContent.style.transform = `translateY(${bounce}px)`
          mainContent.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          setTimeout(() => {
            mainContent.style.transform = 'translateY(0)'
          }, 150)
        }
      } else if (atBottom && e.deltaY > 0) {
        e.preventDefault()
        const mainContent = document.querySelector('main')
        if (mainContent) {
          const bounce = Math.min(15, e.deltaY * 0.3)
          mainContent.style.transform = `translateY(-${bounce}px)`
          mainContent.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          setTimeout(() => {
            mainContent.style.transform = 'translateY(0)'
          }, 150)
        }
      }
    }

    const handleTouchStart = (e) => {
      isScrolling = true
      startY = currentY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (!isScrolling) return
      
      currentY = e.touches[0].clientY
      const { scrollTop, scrollHeight, clientHeight } = container
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      const deltaY = startY - currentY

      if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
        e.preventDefault()
        const mainContent = document.querySelector('main')
        if (mainContent) {
          const resistance = Math.min(20, Math.abs(deltaY) * 0.2)
          mainContent.style.transform = `translateY(${atTop ? resistance : -resistance}px)`
          mainContent.style.transition = 'none'
        }
      }
    }

    const handleTouchEnd = () => {
      isScrolling = false
      const mainContent = document.querySelector('main')
      if (mainContent) {
        mainContent.style.transform = 'translateY(0)'
        mainContent.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      const mainContent = document.querySelector('main')
      if (mainContent) {
        mainContent.style.transform = ''
        mainContent.style.transition = ''
      }
    }
  }, [containerRef])
}