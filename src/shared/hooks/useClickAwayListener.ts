import { useEffect, useRef } from 'react'

interface Params {
  onAwayClick: () => void
  onInnerClick?: () => void
}

function useClickAwayListener<T extends HTMLElement>({ onAwayClick, onInnerClick }: Params) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const onClickHandler = ({ target }: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(target as Node)) {
        onAwayClick()
        return
      }
      if (onInnerClick) onInnerClick()
    }
    document.addEventListener('click', onClickHandler)

    return () => {
      document.removeEventListener('click', onClickHandler)
    }
  }, [onAwayClick, onInnerClick])

  return ref
}

export default useClickAwayListener
