import React, { CSSProperties, memo, useEffect, useState } from 'react'
import { ICrossFade } from './cross-fade.interfaces'
import styles from './style.module.scss'

const getImageStyles = (currIndex: number, index: number) =>
  [styles.img, currIndex === index ? styles.imgActive : styles.imgInactive].join(' ')

const CrossFade: React.FC<ICrossFade> = ({ images, transitionDelay, intervalDelay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const transitionStyles: CSSProperties = {
    transition: `opacity ${transitionDelay}ms ease`,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currIndex) => (currIndex + 1 >= images.length ? 0 : currIndex + 1))
    }, intervalDelay)
    return () => {
      clearInterval(interval)
    }
  }, [images.length, intervalDelay])

  return (
    <div className={styles.wrapper}>
      {images.map(({ url }, index) => (
        <img
          src={url}
          alt=""
          key={url}
          style={transitionStyles}
          className={getImageStyles(currentImageIndex, index)}
        />
      ))}
    </div>
  )
}

export default memo(CrossFade)
