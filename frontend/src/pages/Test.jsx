import React, { useEffect, useState } from 'react'

const Test = () => {
    const [inp, setInp] = useState("")
const fetchResult = () => console.log("API CALL");

useEffect(() => {
    const timer = setTimeout(() => fetchResult(), 2000)
    return e => clearTimeout(timer)
}, [inp])

  return <>
  <input type="text"  onChange={e => setInp(e.target.value)}/>
  </>
}

export default Test