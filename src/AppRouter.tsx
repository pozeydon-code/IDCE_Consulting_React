import { Navbar, RoutesWithNotFound } from '@/components';
import { BrowserRouter, Route } from 'react-router-dom';
import { PublicRouter } from './pages';
import { PublicGuard } from './guard';

export const AppRouter = () => (
  <BrowserRouter>
    <RoutesWithNotFound>
      <Route element={<PublicGuard />}>
        <Route path="/*" element={<PublicRouter />} />
      </Route>
    </RoutesWithNotFound>
  </BrowserRouter>
);
