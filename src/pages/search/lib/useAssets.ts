import { useEffect, useState } from 'react'
import { DiscoverService, IAssets } from '../../../shared/services/discover'

const useAssets = () => {
  const [assets, setAssets] = useState<IAssets>({
    backgrounds: [],
    items: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const data = await DiscoverService.getAssets()
        setAssets(data)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return {
    assets,
    isLoading,
  }
}

export default useAssets
