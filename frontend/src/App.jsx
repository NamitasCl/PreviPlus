import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RutaProtegida from './components/RutaProtegida'
import LandingPage from './landing-page/LandingPage'
import LandingPageSections from './landing-page/LandingPageSections'
import Dashboard from './pages/Dashboard'
import DashboardIndex from './pages/DashboardIndex'
import DashboardNegocio from './pages/DashboardNegocios'
import ErrorPage from './pages/ErrorPage'
import Funcionalidades from './pages/Funcionalidades'
import Ingreso from './pages/Ingreso'
import Registro from './pages/Registro'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LandingPage />}>
        <Route index element={<LandingPageSections />} />
        <Route path='funcionalidades' element={<Funcionalidades />} />
      </Route>
      <Route path='/ingreso' element={<Ingreso />} />
      <Route path='/registro' element={<Registro />} />
      <Route path='/dashboard' element={<RutaProtegida element={Dashboard} />}>
        <Route index element={<DashboardIndex />} />
        <Route path='negocios' element={<RutaProtegida element={DashboardNegocio} />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </>
  )
)

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
