import React, { useEffect, useState } from 'react'

const useDebounce = (val, delay) => {

const [searchTerm, setSearchTerm] = useState(val)

    useEffect(() => {
      const timer = setTimeout(() => setSearchTerm(val), delay )
      return e => clearTimeout(timer) 
    }, [val, delay])
    
  return searchTerm
}
export default useDebounce 