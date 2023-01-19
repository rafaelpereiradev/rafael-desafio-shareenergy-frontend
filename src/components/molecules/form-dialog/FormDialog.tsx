import { TextField, Box, TextFieldProps, useTheme, useMediaQuery } from '@mui/material';

export type FormDialogType = {
    fieldsWidth?: string;
    fields: TextFieldProps[];
};

export const FormDialog = ({ fields,fieldsWidth}: FormDialogType) => {
    const theme = useTheme();
    const mdWindow = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
        
            <Box display='flex' flexDirection='column'>

                {fields.map((props: TextFieldProps,key) => {
                    return (
                        <TextField  margin='dense' key={key} sx={{ width: mdWindow ? '60vw' : fieldsWidth }} {...props} />
                    )
                })}

            </Box>
        </>
    );
};