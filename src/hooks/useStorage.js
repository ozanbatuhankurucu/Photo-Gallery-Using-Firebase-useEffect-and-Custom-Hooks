import { useState, useEffect } from 'react'
import { storage, timestamp, db } from '../firebase/config'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState('')

  useEffect(() => {
    const { fileBlob, fileName } = file
    if (fileBlob) {
      const storageRef = storage.ref(fileBlob.name)
      storageRef.put(fileBlob).on(
        'state_changed',
        (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(Math.round(percentage))
        },
        (error) => {
          alert(error.message)
        },
        async () => {
          const url = await storageRef.getDownloadURL()
          const createdAt = timestamp()
          setUploadedFile({
            url,
            fileName
          })
        }
      )
    }
  }, [file])

  return [progress, uploadedFile]
}

export default useStorage
