import React from 'react'
import { IButton } from './button.interfaces'
import styles from './style.module.scss'

const getClasses = (className: string, active: boolean) => {
  const classes = [styles.btn, className]
  if (active) classes.push(styles.active)
  return classes.join(' ')
}

const Button: React.FC<IButton> = ({ className = '', active = false, children, ...rest }) => {
  const classes = getClasses(className, active)

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
