import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    console.log("new value")
    setValue(e.target.value)
  }

  return {
    type, value, onChange
  }
}