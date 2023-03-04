import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useHover } from '../../shared/hooks'
import { IMovieCard } from './movie-card.interfaces'
import styles from './style.module.scss'
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg'

const getGenersString = (geners: string[]) => geners.join(', ')

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const {
    poster,
    is_new,
    imdb_rate,
    title,
    country,
    year,
    length,
    num_seasons,
    min_age,
    genres,
    keyframe,
  } = movie

  const [ref, isHovered] = useHover<HTMLDivElement>()
  const attrRef = useRef<HTMLDivElement>(null)
  const hoverBackRef = useRef<HTMLDivElement>(null)

  const properties = [country, year, `${length / 60} min`, `${num_seasons} seasons`, `${min_age}+`]
  const backdropStyles = isHovered ? `${styles.backdrop} ${styles.backOpacity}` : styles.backdrop
  const keyframeStyles = isHovered ? `${styles.keyframe} ${styles.keyframeHover}` : styles.keyframe

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.banner}>
        <img src={poster} alt="Poster" className={styles.img} />
        <img src={keyframe} alt="Keyframe" className={keyframeStyles} />
        <div className={backdropStyles} />
        <CSSTransition
          in={isHovered}
          timeout={600}
          nodeRef={attrRef}
          classNames={{
            enterActive: styles.attrsContainerHover,
            enterDone: styles.attrsContainerHover,
            exitActive: styles.attrsContainerUnhover,
            exitDone: styles.attrsContainerUnhover,
          }}
        >
          <div className={styles.attrsContainer} ref={attrRef}>
            {!!is_new && <div className={`${styles.attr} ${styles.attrNew}`}>New on NetUP TV</div>}
            <div className={styles.attr}>
              IMBD
              <span className={styles.attrRate}>{`${imdb_rate}/10`}</span>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={isHovered}
          timeout={600}
          nodeRef={hoverBackRef}
          unmountOnExit
          mountOnEnter
          classNames={{
            enterActive: styles.backBounce,
            enterDone: styles.backBounce,
            exitActive: styles.backUnhover,
            exitDone: styles.backUnhover,
          }}
        >
          <div className={styles.backdropHover} ref={hoverBackRef}>
            <button className={styles.btn}>
              More details
              <PlayIcon />
            </button>
          </div>
        </CSSTransition>
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
