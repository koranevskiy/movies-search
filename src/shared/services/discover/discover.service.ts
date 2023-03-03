import { IAssets } from './discover.interfaces'

class DiscoverService {
  private static readonly baseUrl = 'http://127.0.0.1:5173/'

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
}

export { DiscoverService }
