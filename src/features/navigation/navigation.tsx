import React from 'react'
import styles from './style.module.scss'
import { menuItems } from './navigation.meta'
import NavigationItem from './navigation-item'

const Navigation: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {menuItems.map(({ text, icon, path }) => (
        <NavigationItem icon={icon} text={text} key={text} path={path} />
      ))}
    </ul>
  )
}

export default Navigation
