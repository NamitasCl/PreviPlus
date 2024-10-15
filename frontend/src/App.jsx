import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ErrorPage from './common-pages/ErrorPage'
import RutaProtegida from './components/RutaProtegida'
import Funcionalidades from './LandingPage/Funcionalidades'
import Ingreso from './LandingPage/Ingreso'
import LandingPage from './LandingPage/LandingPage'
import LandingPageSections from './LandingPage/LandingPageSections'
import Registro from './LandingPage/Registro'
import Dashboard from './PrivateZone/Dashboard'
import DashboardIndex from './PrivateZone/DashboardIndex'
import DashboardNegocio from './PrivateZone/DashboardNegocios'
import Perfil from './PrivateZone/Perfil'

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
        <Route path='perfil' element={<RutaProtegida element={Perfil} />} />
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
