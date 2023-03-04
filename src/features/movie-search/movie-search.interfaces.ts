import { Dispatch, SetStateAction } from 'react'
import { IMovie } from '../../shared/services/discover'

interface IMovieSearch {
  movies: IMovie[]
  setSuitableMovie: Dispatch<SetStateAction<IMovie[]>>
  setIsSearched: Dispatch<SetStateAction<boolean>>
}

export type { IMovieSearch }
