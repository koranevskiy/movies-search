import React from 'react'
import { routes } from './routes-list'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Routes as appRoutes } from '../../shared/types/app-routes'

const Routing: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={appRoutes.SearchPage} />} />
    </Routes>
  )
}

export default Routing
