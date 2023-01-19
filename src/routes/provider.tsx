import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { DefaultTheme } from '../theme/DefaultTheme';
import { SnackbarProvider } from 'notistack';
import routes from './routes';

const AppRoutes = () => {
  return (
    <ThemeProvider theme={DefaultTheme} >
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} >
        <RouterProvider router={routes} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default AppRoutes;
