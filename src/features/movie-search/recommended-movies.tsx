import React, { memo, useRef } from 'react'
import { IRecommendedMovies } from './movie-search.interfaces'
import { CSSTransition } from 'react-transition-group'
import styles from './style.module.scss'

const RecommendedMovies: React.FC<IRecommendedMovies> = ({ movies, isListVisible }) => {
  const listRef = useRef<HTMLUListElement | null>(null)

  return (
    <CSSTransition
      in={isListVisible}
      timeout={100}
      nodeRef={listRef}
      classNames={{
        enterActive: styles.movieListWithItems,
        exitActive: styles.movieExiting,
      }}
      mountOnEnter
      unmountOnExit
    >
      <ul className={styles.movieList} ref={listRef}>
        {movies.map(({ title, id }) => (
          <li key={id} className={styles.movieItem}>
            {title}
          </li>
        ))}
      </ul>
    </CSSTransition>
  )
}

export default memo(RecommendedMovies)
