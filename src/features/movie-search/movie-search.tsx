import React, { useState } from 'react'
import { useDebounce } from '../../shared/hooks'
import { DiscoverService } from '../../shared/services/discover'
import { SearchBar } from '../../shared/ui/search-bar'
import { IMovieSearch } from './movie-search.interfaces'
import useRecommendedMovies from './movie-search.lib'

const MovieSearch: React.FC<IMovieSearch> = ({ movies, setSuitableMovie, setIsSearched }) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 300)
  const recommendedMovies = useRecommendedMovies(debouncedValue, movies)
  const [isLoading, setIsLoading] = useState(false)

  const onSeacrhMoviesHandler = async (title?: string) => {
    setIsLoading(true)
    const searchedMovies = await DiscoverService.searchMovies(title || value, movies, 1000)
    setSuitableMovie(searchedMovies)
    setIsLoading(false)
    setIsSearched(!!value.trim())
  }

  return (
    <SearchBar
      placeholder="Seacrh"
      btnText="Search"
      setValue={setValue}
      value={value}
      onActionDone={onSeacrhMoviesHandler}
      btnDisabled={isLoading}
      disabled={isLoading}
      listItems={recommendedMovies}
    />
  )
}

export default MovieSearch
