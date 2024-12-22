import { ChakraProvider } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { UserContextProvider } from './contexto/UserContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UserContextProvider>
  </StrictMode>,
)
