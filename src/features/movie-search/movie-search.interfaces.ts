import { Dispatch, SetStateAction } from 'react'
import { IMovie } from '../../shared/services/discover'

interface IMovieSearch {
  movies: IMovie[]
  setSuitableMovie: Dispatch<SetStateAction<IMovie[]>>
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

interface IRecommendedMovies extends Pick<IMovieSearch, 'movies'> {
  isListVisible: boolean
}

export type { IMovieSearch, IRecommendedMovies }
