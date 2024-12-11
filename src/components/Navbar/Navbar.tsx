import { Box, Container, Flex, Heading, Stack } from '@chakra-ui/react';
import { LinkItem } from '.';
import { AppRoutes } from '@/models';

export const Navbar = () => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={{
        _light: '#ffffff40',
        _dark: '#20202380',
      }}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        flexWrap="wrap"
        textAlign="center"
        justifyContent="space-between"
      >
        <Flex textAlign="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <LinkItem to={AppRoutes.public.dashboard}>Inicio</LinkItem>
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem to={AppRoutes.public.mantenimiento_operaciones}>
            Operaciones
          </LinkItem>
          <LinkItem to={AppRoutes.public.mantenimiento_tipo_credito}>
            Tipos Creditos
          </LinkItem>
          <LinkItem to="/Reportes">Reportes</LinkItem>
        </Stack>
      </Container>
    </Box>
  );
};
