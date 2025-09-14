import { useState } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import toast from 'react-hot-toast'

const TestPage = () => {
  const [showModal, setShowModal] = useState(false)

  const handleConfirm = () => {
    toast.success('Modal positioning test successful!')
  }

  return (
    <div className="min-h-screen">
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold text-white">Modal Positioning Test</h1>
        
        {/* Create a very long page to test scroll positioning */}
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="card-black p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Test Section {i + 1}</h2>
            <p className="text-gray-300 mb-4">
              This is test content to create a long scrollable page. The modal should appear 
              centered in the viewport regardless of scroll position.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-500/20 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium">Feature {i * 3 + 1}</h3>
                <p className="text-gray-300 text-sm">Sample feature description</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium">Feature {i * 3 + 2}</h3>
                <p className="text-gray-300 text-sm">Sample feature description</p>
              </div>
              <div className="bg-purple-500/20 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium">Feature {i * 3 + 3}</h3>
                <p className="text-gray-300 text-sm">Sample feature description</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Test button at the bottom */}
        <div className="card-black p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Bottom of Page Test</h2>
          <p className="text-gray-300 mb-6">
            Click this button to test modal positioning when scrolled to the bottom of the page.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary text-lg px-8 py-4"
          >
            Test Modal at Bottom
          </button>
        </div>
      </div>
      
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Modal Positioning Test"
        message="This modal should appear perfectly centered in your viewport, regardless of your scroll position on the page."
        confirmText="Perfect!"
        cancelText="Close"
        type="success"
      />
    </div>
  )
}

export default TestPage