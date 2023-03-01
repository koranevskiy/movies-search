class DiscoverService {
  private static readonly baseUrl = 'http://127.0.0.1:5173/'

  static async getAssets() {
    const res = await fetch(`${DiscoverService.baseUrl}/api/discover`)
    if (!res.ok) throw new Error('Could not fetch')
    return await res.json()
  }
}

export { DiscoverService }
