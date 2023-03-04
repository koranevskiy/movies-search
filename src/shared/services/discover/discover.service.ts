import { IAssets, IMovie } from './discover.interfaces'

class DiscoverService {
  private static readonly baseUrl = import.meta.env.VITE_API_URL

  static async getAssets(): Promise<IAssets> {
    const res = await fetch(`${DiscoverService.baseUrl}/api/discover`)
    if (!res.ok) throw new Error('Could not fetch')
    const data: IAssets = await res.json()
    const serializedData: IAssets = {
      backgrounds: data.backgrounds.map(({ url }) => ({ url: `api/${url}` })),
      items: data.items.map((item, i) => ({
        ...item,
        poster: `api/${item.poster}`,
        keyframe: `api/${item.keyframe}`,
        id: i + Date.now(),
      })),
    }
    return serializedData
  }

  static async searchMovies(name: string, movies: IMovie[], delay: number): Promise<IMovie[]> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const recMovies = movies.filter(({ title }) =>
          title.toLowerCase().includes(name.toLowerCase().trim()),
        )
        resolve(recMovies)
      }, delay)
    })
  }
}

export { DiscoverService }
