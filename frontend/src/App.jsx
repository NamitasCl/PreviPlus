import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ErrorPage from './common-pages/ErrorPage'
import RutaProtegida from './components/RutaProtegida'
import Funcionalidades from './LandingPage/Funcionalidades'
import Ingreso from './LandingPage/Ingreso'
import LandingPage from './LandingPage/LandingPage'
import LandingPageSections from './LandingPage/LandingPageSections'
import Registro from './LandingPage/Registro'
import ArchivosPrevired from './PrivateZone/ArchivosPrevired'
import ComprarCreditos from './PrivateZone/ComprarCreditos'
import Creditos from './PrivateZone/Creditos'
import Dashboard from './PrivateZone/Dashboard'
import DashboardIndex from './PrivateZone/DashboardIndex'
import DashboardNegocio from './PrivateZone/DashboardNegocios'
import HistorialComprasCredito from './PrivateZone/HistorialComprasCredito'
import NegocioView from './PrivateZone/NegocioView'
import Perfil from './PrivateZone/Perfil'
import ConfiguracionCotizaciones from './components/ConfiguracionCotizaciones'
import AdminPanel from './AdminZone/AdminPanel'
import HistorialArchivosPrevired from './PrivateZone/HistorialArchivosPrevired'


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
        <Route path='negocios' element={<RutaProtegida element={DashboardNegocio} />}>
          <Route path=':id' element={<RutaProtegida element={NegocioView} />} />
        </Route>
        <Route path='previred' element={<RutaProtegida element={ArchivosPrevired} />} />
        <Route path='historialPrevired' element={<RutaProtegida element={HistorialArchivosPrevired} />} />
        <Route path='creditos' element={<RutaProtegida element={Creditos} />}>
          <Route index element={<RutaProtegida element={ComprarCreditos} />} />
          <Route path='historial-compras' element={<RutaProtegida element={HistorialComprasCredito} />} />
        </Route>
        <Route path='configuracion' element={<RutaProtegida element={ConfiguracionCotizaciones} />} />
        <Route path='admin' element={<RutaProtegida element={AdminPanel} />} />


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
