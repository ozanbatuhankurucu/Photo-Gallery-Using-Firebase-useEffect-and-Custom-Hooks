import React, { useEffect } from 'react'
import { db } from '../firebase/config'

const useFirestore = (collection) => {
  const [docs, setDocs] = React.useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(collection)
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDocs(docs)
      })

    return () => unsubscribe()
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection])

  return [docs]
}

export default useFirestore
