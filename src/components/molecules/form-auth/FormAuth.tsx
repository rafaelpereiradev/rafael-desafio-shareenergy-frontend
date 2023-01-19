import {
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  Box,
} from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { CheckBoxLabel, CheckboxType } from '../checkbox-label/CheckBoxLabel';

export type FormAuth = {
  width?: string;
  TextFieldUser: TextFieldProps | null;
  TextFieldPassword: TextFieldProps | null;
  Title?: TypographyProps;
  RemebermeCheckbox?: CheckboxType;
  Button?: LoadingButtonProps;
};

const FormAuth = ({
  TextFieldUser,
  TextFieldPassword,
  Button,
  Title,
  RemebermeCheckbox,
}: FormAuth) => {
  return (
    <>
      <Typography {...Title} />
      <TextField
        sx={{ marginTop: '32px' }}
        {...TextFieldUser}
        inputProps={{
          sx: {
            width: '100%',
          },
        }}
      />
      <TextField
        sx={{ marginTop: '32px' }}
        {...TextFieldPassword}
        inputProps={{
          sx: {
            width: '100%',
          },
        }}
      />
      <Box display="flex" justifyContent="end" mt="8px">
        <CheckBoxLabel {...RemebermeCheckbox} />
      </Box>
      <LoadingButton {...Button} />
    </>
  );
};

export default FormAuth;
