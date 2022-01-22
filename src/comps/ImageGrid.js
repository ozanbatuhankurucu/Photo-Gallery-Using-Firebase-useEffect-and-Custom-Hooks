import React from 'react'
import { motion } from 'framer-motion'
import useFirestore from '../hooks/useFirestore'

const ImageGrid = React.memo(({ setImageUrl }) => {
  const [docs] = useFirestore('images')

  return docs.length > 0 ? (
    <div>
      {docs.map((doc) => {
        const { categoryName, uploadedFiles, id } = doc
        return (
          <div key={id}>
            <h3>{categoryName}</h3>
            <div className='img-grid'>
              {uploadedFiles.map((file) => {
                return (
                  <motion.div
                    className='img-wrap'
                    onClick={() => setImageUrl(file.url)}
                    layout
                    whileHover={{ opacity: 1 }}>
                    <span>{file.fileName}</span>
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      src={file.url}
                      alt='uploaded pic'
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  ) : null
})

export default ImageGrid
