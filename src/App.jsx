import { useState } from 'react'
import Page from './Component/Page'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Page />
    </>
  )
}

export default App
