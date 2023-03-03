import React, { useEffect, useState } from 'react'
import { useClickAwayListener, useDebounce } from '../../shared/hooks'
import { SearchBar } from '../../shared/ui/search-bar'
import { IMovieSearch } from './movie-search.interfaces'
import useRecommendedMovies from './movie-search.lib'
import RecommendedMovies from './recommended-movies'
import styles from './style.module.scss'

const MovieSearch: React.FC<IMovieSearch> = ({ value, setValue, movies }) => {
  const debouncedValue = useDebounce<string>(value, 300)

  const recommendedMovies = useRecommendedMovies(debouncedValue, movies)

  const [isListVisible, setIsListVisible] = useState(false)

  const ref = useClickAwayListener<HTMLDivElement>({
    onAwayClick: () => setIsListVisible(false),
    onInnerClick: () => setIsListVisible(true),
  })

  useEffect(() => {
    setIsListVisible(!!movies.length)
  }, [movies.length])

  return (
    <div className={styles.wrapper} ref={ref}>
      <SearchBar placeholder="Seacrh" btnText="Search" setValue={setValue} value={value}>
        <RecommendedMovies movies={recommendedMovies} isListVisible={isListVisible} />
      </SearchBar>
    </div>
  )
}

export default MovieSearch
