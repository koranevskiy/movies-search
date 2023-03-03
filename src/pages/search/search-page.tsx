import React, { useEffect, useState } from 'react'
import { MovieSearch } from '../../features/movie-search'
import { DiscoverService, IAssets, IMovie } from '../../shared/services/discover'
import CrossFade from '../../shared/ui/cross-fade/cross-fade'
import { Header } from '../../widgets/header'
import styles from './style.module.scss'

const SearchPage: React.FC = () => {
  const [assets, setAssets] = useState<IAssets>({
    backgrounds: [],
    items: [],
  })

  const [, setSuitableMovies] = useState<IMovie[]>([])

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const data = await DiscoverService.getAssets()
        console.log(data.items)

        setAssets(data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Header />
      {!!assets.backgrounds.length && (
        <div className={styles.crossFade}>
          <CrossFade images={assets.backgrounds} intervalDelay={5000} transitionDelay={2000} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.movieSearch}>
          <MovieSearch
            movies={assets.items}
            setValue={setInputValue}
            value={inputValue}
            setSuitableMovie={setSuitableMovies}
          />
        </div>
        <h2 className={styles.title}>In the spotlight</h2>
      </div>
    </div>
  )
}

export default SearchPage
