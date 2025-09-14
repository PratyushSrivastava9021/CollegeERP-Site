import { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import toast from 'react-hot-toast'

const TestModal = () => {
  const [showModal, setShowModal] = useState(false)

  const handleConfirm = () => {
    toast.success('Modal test successful!')
  }

  return (
    <div className="p-4">
      <button 
        onClick={() => setShowModal(true)}
        className="btn-primary"
      >
        Test Modal Positioning
      </button>
      
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Test Modal"
        message="This modal should appear centered in your viewport regardless of scroll position."
        confirmText="Test Success"
        cancelText="Close"
        type="success"
      />
    </div>
  )
}

export default TestModal