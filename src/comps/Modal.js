import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({ imageUrl, setImageUrl }) => {
  const closeModal = (event) => {
    if (event.target.id === 'modal-backdrop') {
      setImageUrl('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id='modal-backdrop'
      className='backdrop'
      onClick={closeModal}>
      <motion.img initial={{ x: '-100vh' }} animate={{ x: 0 }} src={imageUrl} alt='modal-img' />
    </motion.div>
  )
}

export default Modal
