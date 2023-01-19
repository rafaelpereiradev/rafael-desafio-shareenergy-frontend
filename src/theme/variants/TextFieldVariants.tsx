import { TextFieldProps, Interpolation, Theme } from '@mui/material'
import colorsList from '../colorsList.json'

type TextFieldVariantsType = {
    props: TextFieldProps;
    style: Interpolation<{ theme: Theme }>;
}[]

const {shareenergy} = colorsList;
export const TextFieldThemeVariants: TextFieldVariantsType = [
{
    props: {className:'inputReadOnly'},
    style: {
        backgroundColor:'#fff',
        borderBottom:`none`,
        WebkitTextFillColor:shareenergy.custom.primary.value,
        color:'#000',
        '& .MuiInputBase-input.Mui-disabled' :{
            borderBottom:`solid 1px #000`,
            color:'#000',
            WebkitTextFillColor:'#000',
        }
    }
}
]