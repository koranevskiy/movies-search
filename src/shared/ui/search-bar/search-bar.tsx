import React, { useRef, useState } from 'react'
import { ISearchBar } from './search-bar.interfaces'
import styles from './style.module.scss'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ReactComponent as SearchIcon } from '../../../assets/icons/search-green.svg'
import { useHover } from '../../hooks'

const getCloseBtnStyles = (isVisible: boolean) => {
  const btnStyles = [styles.inputIcon]
  if (isVisible) btnStyles.push(styles.inputIconActive)
  return btnStyles.join(' ')
}

const getInputStyles = (isHover: boolean, isFocus: boolean, className: string) => {
  const inputStyles = [styles.input, className]
  if (isFocus || isHover) inputStyles.push(styles.inputHoverFocus)
  return inputStyles.join(' ')
}

const SearchBar: React.FC<ISearchBar> = ({
  className = '',
  value = '',
  btnText,
  setValue,
  btnDisabled = false,
  children,
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false)

  const [divRef, isHover] = useHover<HTMLDivElement>()
  const inputRef = useRef<null | HTMLInputElement>(null)

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onResetInputHandler = () => {
    inputRef?.current?.focus()
    setValue('')
  }

  const onFocusInputHandler = () => {
    setIsFocus(true)
  }

  const onBlurInputHandler = () => {
    setIsFocus(false)
  }

  const isResetBtnVisible = !!value.length

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper} ref={divRef}>
        <input
          type="text"
          className={getInputStyles(isHover, isFocus || !!value.length, className)}
          value={value}
          ref={inputRef}
          onChange={onChangeInputHandler}
          onFocus={onFocusInputHandler}
          onBlur={onBlurInputHandler}
          {...rest}
        />
        <CloseIcon
          className={getCloseBtnStyles(isResetBtnVisible)}
          onMouseDown={onResetInputHandler}
        />
        {!!children && children}
      </div>
      <button className={styles.btn} disabled={btnDisabled}>
        {btnText}
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchBar
