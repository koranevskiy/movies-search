import React, { useEffect, useRef, useState } from 'react'
import { MovieSearch } from '../../features/movie-search'
import { IMovie } from '../../shared/services/discover'
import CrossFade from '../../shared/ui/cross-fade/cross-fade'
import styles from './style.module.scss'
import { Header } from '../../widgets/header'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel } from 'swiper'
import { MovieCard } from '../../entities/movie-card'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import { useAssets } from './lib'

const SearchPage: React.FC = () => {
  const { assets } = useAssets()

  const [suitableMovies, setSuitableMovies] = useState<IMovie[]>([])
  const [slidesPerView, setSlidesPerView] = useState(4)

  const [isSearched, setIsSearched] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResizeHandler = () => {
      const pageWidth = pageRef.current?.clientWidth
      setSlidesPerView(pageWidth ? (pageWidth - 56) / 384 : 4)
    }
    window.addEventListener('resize', onResizeHandler)
    onResizeHandler()
    return () => {
      window.removeEventListener('resize', onResizeHandler)
    }
  }, [])

  const swiperMovies = isSearched ? suitableMovies : assets.items

  return (
    <div className={styles.wrapper} ref={pageRef}>
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
            setSuitableMovie={setSuitableMovies}
            setIsSearched={setIsSearched}
          />
        </div>
        {isSearched || <h2 className={styles.title}>In the spotlight</h2>}
        <div className={styles.movies}>
          {isSearched && (
            <h2
              className={`${styles.title} ${styles.searchedTitle}`}
            >{`TV Shows (${swiperMovies.length})`}</h2>
          )}
          {!!swiperMovies.length && (
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={16}
              keyboard={{
                enabled: true,
              }}
              autoHeight
              modules={[Keyboard, Mousewheel]}
              className={styles.swiper}
              mousewheel
            >
              {swiperMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
