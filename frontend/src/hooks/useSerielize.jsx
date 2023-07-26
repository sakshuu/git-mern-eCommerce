import React from 'react'

const useSerielize = (state) => {
  return <>
  <pre>
    {JSON.stringify(state, null, 2)}
  </pre>
  </>
}

export default useSerielize