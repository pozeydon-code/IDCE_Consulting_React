import { Center, ChakraProvider, defaultConfig } from "@chakra-ui/react"
import { theme } from "./lib/theme"

function App() {

  return (
    <ChakraProvider value={theme}>
      <Center>
        Hola MUndo
      </Center>
    </ChakraProvider>
  )
}

export default App
