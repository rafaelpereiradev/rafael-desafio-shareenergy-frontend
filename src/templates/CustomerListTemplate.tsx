import { Box, Paper, Typography, useTheme, ButtonBaseProps, ExtendButtonBase, ButtonTypeMap } from "@mui/material/";
import GlobalTemplate from "./GlobalTemplate";
import Button, { ButtonProps } from '@mui/material/Button'
import { DialogForm, FormDialogType } from "../components/organisms/dialog-form/DialogForm";
import { PersonAdd } from "@mui/icons-material";
import CircularProgress from "../components/molecules/circular-progress/CircularProgress";

type CustomerListType = {
    datagridUsers?: JSX.Element;
    titlePage: string;
    propsDialogEditUser: FormDialogType;
    addUserButton?: ButtonProps;
}

const CustomerListTemplate = ({ datagridUsers, titlePage, propsDialogEditUser, addUserButton }: CustomerListType) => {
    const theme = useTheme()
    return (
        <GlobalTemplate>
            <>
                <DialogForm
                    {...propsDialogEditUser} />

                <Box width='100%' display='flex' justifyContent='center' alignItems='center' mt='16px'>
                    <Typography variant='h6' fontWeight={700}>{titlePage}</Typography>
                </Box>

                <Box width='100%' display='flex' justifyContent='center' mt='8px' alignItems='center' flexDirection='column'>
                    <Box width='90%' display='flex' justifyContent='end'>
                        <Button sx={{ alignSelf: 'flex-end' }} {...addUserButton} variant='contained' endIcon={<PersonAdd />}
                        >
                            Cadastrar Cliente
                        </Button>
                    </Box>
                    <Box width='90%' height='60vh' overflow='auto' border={`1px solid ${theme.palette.primary.main}`} mt='16px' borderRadius='8px' >
                        {datagridUsers}
                    </Box>
                </Box>
            </>
        </GlobalTemplate >
    )
}
export default CustomerListTemplate