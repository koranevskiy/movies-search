import React, { useRef, useState } from 'react'
import { ISearchBar } from './search-bar.interfaces'
import styles from './style.module.scss'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ReactComponent as SearchIcon } from '../../../assets/icons/search-green.svg'
import { useHover } from '../../hooks'
import useClickAwayListener from '../../hooks/useClickAwayListener'

const getStyles = (condition: boolean, defaultStyle: string, conditionStyle: string) => {
  const itemStyles = [defaultStyle]
  if (condition) itemStyles.push(conditionStyle)
  return itemStyles.join(' ')
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
  onActionDone,
  listItems = [],
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [divRef, isHover] = useHover<HTMLDivElement>()
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [isListVisible, setIsListVisible] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const listRef = useClickAwayListener<HTMLDivElement>({
    onAwayClick: () => setIsListVisible(false),
  })

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setSelectedItemIndex(null)
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

  const onListItemClickHandler = (title: string) => {
    setValue(title)
    setIsListVisible(false)
    setSelectedItemIndex(null)
    onActionDone(title)
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyDownCallbacks = {
      Enter: () => {
        onListItemClickHandler(
          selectedItemIndex === null ? value : listItems[selectedItemIndex].title,
        )
      },
      ArrowUp: () => {
        if (!listItems.length) return
        setSelectedItemIndex(
          selectedItemIndex === null || selectedItemIndex === 0
            ? listItems.length - 1
            : selectedItemIndex - 1,
        )
      },
      ArrowDown: () => {
        if (!listItems.length) return
        setSelectedItemIndex(
          selectedItemIndex === null || selectedItemIndex === listItems.length - 1
            ? 0
            : selectedItemIndex + 1,
        )
      },
    }[e.key as 'Enter']
    keyDownCallbacks?.()
  }

  const isResetBtnVisible = !!value.length

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.inputWrapper}
        ref={(ref) => {
          divRef.current = ref
          listRef.current = ref
        }}
      >
        <input
          type="text"
          className={getInputStyles(isHover, isFocus || !!value.length, className)}
          value={value}
          ref={inputRef}
          onChange={onChangeInputHandler}
          onClick={() => setIsListVisible(true)}
          onFocus={onFocusInputHandler}
          onBlur={onBlurInputHandler}
          onKeyDown={onKeyDownHandler}
          {...rest}
        />
        <CloseIcon
          className={getStyles(isResetBtnVisible, styles.inputIcon, styles.inputIconActive)}
          onMouseDown={onResetInputHandler}
        />
        {isListVisible && (
          <ul className={styles.list}>
            {listItems.map(({ title, id }, index) => (
              <li
                key={id}
                className={getStyles(selectedItemIndex === index, styles.listItem, styles.selected)}
                onClick={() => onListItemClickHandler(title)}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className={styles.btn} disabled={btnDisabled} onClick={() => onActionDone()}>
        {btnText}
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchBar
