import { ReactComponent as Home } from '../../assets/icons/menu-home.svg'
import { ReactComponent as Live } from '../../assets/icons/menu-live.svg'
import { ReactComponent as Shows } from '../../assets/icons/menu-shows.svg'
import { ReactComponent as Movies } from '../../assets/icons/menu-movies.svg'
import { ReactComponent as Stuff } from '../../assets/icons/menu-staff.svg'
import { INavigationItem } from './navigation.interfaces'
import { Routes } from '../../shared/types/app-routes'

const menuItems: INavigationItem[] = [
  { text: 'Discover', icon: Home, path: Routes.DiscoverPage },
  { text: 'Live TV', icon: Live, path: Routes.LivePage },
  { text: 'TV Shows', icon: Shows, path: Routes.ShowsPage },
  { text: 'Movies', icon: Movies, path: Routes.MoviesPage },
  { text: 'My Stuff', icon: Stuff, path: Routes.StuffPage },
]

export { menuItems }
