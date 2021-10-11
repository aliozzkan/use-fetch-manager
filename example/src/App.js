import React from 'react'

import { useMyHook } from 'use-fetch-manager'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
