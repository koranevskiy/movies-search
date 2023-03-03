import { useMemo } from 'react'
import { IMovie } from '../../shared/services/discover'

const useRecommendedMovies = (name: string, movies: IMovie[]) => {
  const recommendedMovies = useMemo(() => {
    if (!name.trim()) return []
    const filtredMovies = movies.filter(({ title }) =>
      title.toLowerCase().includes(name.toLowerCase().trim()),
    )
    return filtredMovies
  }, [name, movies])

  return recommendedMovies
}

export default useRecommendedMovies
