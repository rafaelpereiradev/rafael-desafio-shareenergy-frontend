import { createTheme } from '@mui/material';
import ColorTheme from './ColorTheme';
import RootTextFieldTheme from './root-theme-components/RootTextFieldTheme'
const { palette } = ColorTheme;
const { MuiTextField } = RootTextFieldTheme;

export const DefaultTheme = createTheme({
  palette,
  components: {
    MuiTextField,
  }
});
