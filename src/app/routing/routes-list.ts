import { IRoute } from './routing.interfaces'
import { SearchPage } from '../../pages/search'
import { Routes } from '../../shared/types/app-routes'

const routes: IRoute[] = [{ path: Routes.SearchPage, element: SearchPage }]

export { routes }
