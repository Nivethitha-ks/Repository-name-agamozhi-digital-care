import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // If navigating to an in-page anchor like #about or #services
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Scroll to top immediately on route change
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
