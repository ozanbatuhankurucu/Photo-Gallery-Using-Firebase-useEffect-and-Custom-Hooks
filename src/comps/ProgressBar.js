import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { motion } from 'framer-motion'

const ProgressBar = ({ file, setUploadedFile }) => {
  const [progress, uploadedFile] = useStorage(file)

  useEffect(() => {
    if (uploadedFile) {
      setUploadedFile(uploadedFile)
    }
  }, [uploadedFile, setUploadedFile])

  return (
    <motion.div
      className='progress-bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}></motion.div>
  )
}

export default ProgressBar
