import React from 'react'
import { INavigationItem } from './navigation.interfaces'
import styles from './style.module.scss'
import { Button } from '../../shared/ui/button'
import { Link } from 'react-router-dom'

const NavigationItem: React.FC<INavigationItem> = ({ text, icon: Icon, path }) => {
  return (
    <li>
      <Button className={styles.navItem}>
        <Icon />
        <Link to={path} className={styles.link}>
          {text}
        </Link>
      </Button>
    </li>
  )
}

export default NavigationItem
