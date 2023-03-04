import { useEffect, useRef, useState, MutableRefObject } from 'react'

function useHover<T extends HTMLElement>(): [MutableRefObject<T | null>, boolean] {
  const [value, setValue] = useState(false)
  const ref = useRef<T | null>(null)
  const onMouseOverHandler = () => {
    setValue(true)
  }
  const onMouseOutHandler = () => {
    setValue(false)
  }
  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseenter', onMouseOverHandler)
      node.addEventListener('mouseleave', onMouseOutHandler)
      return () => {
        node.removeEventListener('mouseenter', onMouseOverHandler)
        node.removeEventListener('mouseleave', onMouseOutHandler)
      }
    }
  }, [])
  return [ref, value]
}

export default useHover
