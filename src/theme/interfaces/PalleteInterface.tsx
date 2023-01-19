import { PaletteColorOptions} from '@mui/material/styles';

declare module '@mui/material/styles' {
    export interface PaletteOptions {
        background_paper?:PaletteColorOptions;
        white?:PaletteColorOptions;
        teste?:PaletteColorOptions;
        grey_01?:PaletteColorOptions;
    }
}

declare module '@mui/material/' {
  //Aqui declaramos quais componentes terão as variações de cores customizadas disponíveis.
  //export interface NomeComponentePropsColorOverrides { nomedacor:true|false}
  export interface BoxPropsColorOverrides {
    white:true;
    teste:true;
  }
  export interface AvatarPropsColorOverrides {
    white:true;
    teste:true;
  }
}