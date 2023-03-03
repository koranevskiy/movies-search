import React, { useEffect, useRef, useState } from 'react'
import { MovieSearch } from '../../features/movie-search'
import { DiscoverService, IAssets, IMovie } from '../../shared/services/discover'
import CrossFade from '../../shared/ui/cross-fade/cross-fade'
import styles from './style.module.scss'
import { Header } from '../../widgets/header'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Keyboard, Mousewheel } from 'swiper'
import { MovieCard } from '../../entities/movie-card'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

const SearchPage: React.FC = () => {
  const [assets, setAssets] = useState<IAssets>({
    backgrounds: [],
    items: [],
  })

  const [, setSuitableMovies] = useState<IMovie[]>([])
  const [inputValue, setInputValue] = useState('')
  const [slidesPerView, setSlidesPerView] = useState(4)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await DiscoverService.getAssets()
        setAssets(data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

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
            setValue={setInputValue}
            value={inputValue}
            setSuitableMovie={setSuitableMovies}
          />
        </div>
        <h2 className={styles.title}>In the spotlight</h2>
        <div className={styles.movies}>
          {!!assets.items.length && (
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
              {assets.items.map((movie) => (
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
