import React, { useContext } from 'react'

import { AppContext } from '../context'

const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('Do not use Session outside of context')
  }

  return context
}

export default useAppContext
