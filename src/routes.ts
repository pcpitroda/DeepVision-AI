import { Route as rootRoute } from './pages/RootLayout';
import { Route as IndexRoute } from './pages/Home';
import { Route as AppLayoutRoute } from './pages/AppLayout';
import { Route as LoginRoute } from './pages/auth/Login';
import { Route as RegisterRoute } from './pages/auth/Register';
import { Route as DashboardRoute } from './pages/Dashboard';
import { Route as SettingsRoute } from './pages/Settings';

const indexRoute = IndexRoute.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
});

const appLayoutRoute = AppLayoutRoute.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  appLayoutRoute.addChildren([
    DashboardRoute,
    LoginRoute,
    RegisterRoute,
    SettingsRoute,
  ])
]);
