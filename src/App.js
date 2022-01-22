import React, { useState } from 'react'
import Title from './comps/Title'
import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid'
import Modal from './comps/Modal'

function App() {
  const [imageUrl, setImageUrl] = useState('')
  return (
    <div className='App'>
      <Title />
      <UploadForm setImageUrl={setImageUrl} />
      <ImageGrid setImageUrl={setImageUrl} />
      {imageUrl && <Modal imageUrl={imageUrl} setImageUrl={setImageUrl} />}
    </div>
  )
}

export default App
