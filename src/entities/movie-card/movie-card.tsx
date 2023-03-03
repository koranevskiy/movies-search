import React from 'react'
import { IMovieCard } from './movie-card.interfaces'
import styles from './style.module.scss'

const getGenersString = (geners: string[]) => geners.join(', ')

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const { poster, is_new, imdb_rate, title, country, year, length, num_seasons, min_age, genres } =
    movie

  const properties = [country, year, `${length / 60} min`, `${num_seasons} seasons`, `${min_age}+`]

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <img src={poster} alt="Poster" className={styles.img} />
        <div className={styles.backdrop} />
        <div className={styles.attrsContainer}>
          {!!is_new && <div className={`${styles.attr} ${styles.attrNew}`}>New on NetUP TV</div>}
          <div className={styles.attr}>
            IMBD
            <span className={styles.attrRate}>{`${imdb_rate}/10`}</span>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div className={styles.properties}>
          {properties.map((prop) => (
            <div className={styles.property} key={prop}>
              {prop}
            </div>
          ))}
        </div>
        <div className={styles.geners}>{getGenersString(genres)}</div>
      </div>
    </div>
  )
}

export default MovieCard
