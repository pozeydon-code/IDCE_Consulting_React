import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './lib/theme';
import { ModalProvider } from './context';
import { AppRouter } from './AppRouter';

export default function Provider() {
    return (
        <ChakraProvider value={theme}>
            <ModalProvider>
                <AppRouter />
            </ModalProvider>
        </ChakraProvider>
    );
}
