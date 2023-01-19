import {Components, Theme} from '@mui/material';
import { TextFieldThemeVariants } from '../variants/TextFieldVariants';

 const RootTextFieldTheme:Components<Omit<Theme,'components'>> ={
    MuiTextField:{
        variants:TextFieldThemeVariants,
    }
}
export default RootTextFieldTheme