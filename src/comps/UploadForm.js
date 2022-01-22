import React, { useState } from 'react'
import ProgressBar from '../comps/ProgressBar'
import { timestamp, db } from '../firebase/config'

const types = ['image/png', 'image/jpeg']

const UploadForm = React.memo(({ setImageUrl }) => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [categoryName, setCategoryName] = useState('')
  const [isCategoryDisabled, setIsCategoryDisabled] = useState(false)
  const uploadedFiles = []

  const chooseFile = (e) => {
    const { files, type } = e.target
    const filesArray = Array.from(files)
    const isTypesInvalid = filesArray.map((file) => types.includes(file.type)).includes(false)

    if (type !== 'file') return

    if (files.length > 0 && !isTypesInvalid) {
      setError('')
      setIsButtonDisabled(true)
      setIsCategoryDisabled(false)
      setCategoryName('')
      setFiles(mappingFilesToUploadProcess(filesArray, files))
    } else {
      setFiles([])
      setError('Please select an image file (png or jpeg)')
    }
  }

  const mappingFilesToUploadProcess = (filesArray, files) => {
    return filesArray.map((file, index) => {
      return {
        fileBlob: file,
        id: index,
        isUploadValid: false,
        targetFile: files[index],
        fileName: ''
      }
    })
  }

  const handleOnChange = (event, fileID) => {
    const { value } = event.target
    const tempFiles = files.map((file) => {
      // Inputtan alinan dosya ismini ekliyoruz ve input bos mu degil mi kontrol edip valid flagini ekliyoruz.
      return file.id === fileID ? { ...file, fileName: value } : file
    })
    setFiles(tempFiles)
    setIsButtonDisabled(isButtonDisabledControl(tempFiles))
  }

  const isButtonDisabledControl = (tempFiles) => {
    // ismi girilmemis bir dosya varsa yani false varsa true doner ve buton disabled olur.
    return tempFiles.map((file) => file.fileName.length > 0).includes(false)
  }

  const handleUploadFiles = async (event) => {
    event.preventDefault()
    setFiles((prevFiles) => {
      return prevFiles.map((file) => ({ ...file, isUploadValid: true }))
    })
    setIsButtonDisabled(true)
    setIsCategoryDisabled(true)
  }

  const setUploadedFile = (url) => {
    uploadedFiles.push(url)
    if (files.length === uploadedFiles.length) {
      const createdAt = timestamp()
      db.collection('images').add({
        createdAt,
        categoryName,
        uploadedFiles
      })
    }
  }

  return (
    <form>
      <label className='add-input-label'>
        <input type='file' name='file' onChange={chooseFile} multiple />
        <span>+</span>
      </label>
      <div className='output'>
        {error && <div className='error'>{error}</div>}
        {files.length > 0 && (
          <input
            className='file-name-input'
            type='text'
            value={categoryName}
            placeholder='Category name'
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={isCategoryDisabled}
          />
        )}
        {files.map((file) => {
          const { id, fileBlob, isUploadValid, targetFile, fileName } = file
          return (
            <div className='progress-container' key={id}>
              <div className='img-input-container'>
                <img
                  className='preview-img-file'
                  src={URL.createObjectURL(targetFile)}
                  alt='img-preview'
                  onClick={() => setImageUrl(URL.createObjectURL(targetFile))}
                />
                <input
                  type='text'
                  value={fileName}
                  className='file-name-input'
                  onChange={(event) => handleOnChange(event, id)}
                  placeholder='Enter file name'
                  disabled={isUploadValid}
                />
                <span className='file-name'>{`(${id + 1}) ${fileBlob.name}`}</span>
              </div>

              {isUploadValid && (
                <ProgressBar
                  file={{
                    fileBlob,
                    fileName
                  }}
                  setUploadedFile={setUploadedFile}
                />
              )}
            </div>
          )
        })}
      </div>
      {files.length > 0 ? (
        <div className='upload-btn-cont'>
          <button
            disabled={isButtonDisabled || !categoryName}
            className='upload-btn'
            onClick={handleUploadFiles}>
            Upload
          </button>
        </div>
      ) : null}
    </form>
  )
})

export default UploadForm
