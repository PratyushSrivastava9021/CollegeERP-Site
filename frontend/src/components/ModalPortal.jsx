import { createPortal } from 'react-dom'

const ModalPortal = ({ children, isOpen }) => {
  if (!isOpen) return null
  
  return createPortal(
    children,
    document.body
  )
}

export default ModalPortal