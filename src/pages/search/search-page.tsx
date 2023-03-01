import React, { useEffect } from 'react'
import { DiscoverService } from '../../shared/services/discover/discover.service'
import { Header } from '../../widgets/header'
import styles from './style.module.scss'

const SearchPage: React.FC = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const data = await DiscoverService.getAssets()
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    })()
  })

  return (
    <div className={styles.wrapper}>
      <Header />
    </div>
  )
}

export default SearchPage
