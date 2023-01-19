import { BrowserRouter, createBrowserRouter, Outlet } from 'react-router-dom';
import Login from '../pages/login/Login';
import ResponsiveAppBar from '../components/organisms/app-bar/AppBar';
import RandomDog from '../pages/random-dog/RandomDog';
import HttpCat from '../pages/http-cat/HttpCat';
import RandomUser from '../pages/random-user/RandomUser';
import CustomerList from '../pages/customer-list/CustomerList';
import RequireAuth from './RequireAuth';
import NotFound from '../pages/not-found/NotFound';

const AppBar = () => (
  <>
    <ResponsiveAppBar />
    <Outlet />
  </>
);

const routes = createBrowserRouter([
  {
    path: '/auth',
    element: <Login />,
  },

  {
    //rotas protegidas
    element: <RequireAuth />,
    children: [
      {
        element: <AppBar />,

        children: [

          {
            path: '/random-user',
            element: <RandomUser />,
            id: 'Random User',
          },
          {
            path: '/http-cat',
            element: <HttpCat />,
            id: 'HTTP Cat',
          },
          {
            path: '/random-dog',
            element: <RandomDog />,
            id: 'Random Dog',
          },
          {
            path: '/customer-list',
            element: <CustomerList />,
            id: 'Customer List',
          },
          {
            path: '*',
            element: <NotFound />,
            id:'not-found'
          },
        ],
      }
    ]
  },
]);

export default routes;
