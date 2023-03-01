import { FC } from 'react'
import { Routes } from '../../shared/types/app-routes'

interface INavigationItem {
  icon: FC
  text: string
  path: Routes
}

export type { INavigationItem }
