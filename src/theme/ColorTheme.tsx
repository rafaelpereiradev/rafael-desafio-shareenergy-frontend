import { ThemeOptions, createTheme } from '@mui/material';
import colors from './colorsList.json';

const { shareenergy } = colors;
const customPalette = createTheme().palette;
const ColorTheme: ThemeOptions = {
    palette: {
        primary: {
            main: shareenergy.custom.primary.value,
            contrastText: shareenergy['white-colors']['white-01'].value,
        },
        secondary: {
            main: shareenergy.custom.secondary.value,
            contrastText: shareenergy['grey-colors']['grey-01'].value,
        },
        white: customPalette.augmentColor({
            color: {
                main: shareenergy['white-colors']['white-01'].value,
            },
        }),
        grey_01: customPalette.augmentColor({
            color: {
                main: shareenergy['grey-colors']['grey-01'].value,
            },
        }),
    },
};

export default ColorTheme;
