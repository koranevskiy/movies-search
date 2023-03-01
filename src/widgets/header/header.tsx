import React from 'react'
import styles from './style.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Navigation } from '../../features/navigation'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'
import { Button } from '../../shared/ui/button'

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <div>
        <Logo />
      </div>
      <Navigation />
      <div>
        <Button className={styles.btn}>
          <SearchIcon />
        </Button>
        <Button className={`${styles.btn} ${styles.userBtn}`}>
          <UserIcon />
        </Button>
      </div>
    </header>
  )
}

export default Header
