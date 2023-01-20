import LoginTemplate from '../../templates/LoginTemplate';
import { FormAuth } from '../../components/index';
import { useNavigate } from 'react-router-dom';
import { handleRequest } from '../../utils/Utils';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

type FieldsLogin = {
  username: string,
  password: string,
  remember: boolean,
}
export default function Login() {

  const navigate = useNavigate()
  const [fields, setFields] = useState<FieldsLogin>({
    username: '',
    password: '',
    remember: false
  })
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {

    setFields({ ...fields, remember: !fields.remember })
  }
  const handleOnChangeInputs = (prop: keyof FieldsLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false)
    setFields({ ...fields, [prop]: event.target.value.trim() })
  }

  const handleLogin = () => {
    handleRequest('/auth', 'post', { username: fields.username, password: fields.password, remember: fields.remember }).then((resp: any) => {
      localStorage.setItem('token', resp.data.token)
      enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' })
      navigate('/random-user')
    })
      .catch((err) => {
        setHasError(true)
        enqueueSnackbar('Usuário ou Senha incorreta', { variant: 'error' })
      })
  }
  const handleButtonLogin = () => {
    if (fields.username.length > 0 && fields.password.length > 0) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
    console.log(fields)
  }

  const handleShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  useEffect(() => {
    handleButtonLogin()
  }, [fields])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/random-user')
    }

  }, [])
  return (
    <>
      <LoginTemplate
        width="300px"
        form={
          <FormAuth
            Title={{
              children: 'Desafio Share Energy TESTE',
              variant: 'h5',
            }}
            TextFieldUser={{
              value: fields.username,
              onChange: handleOnChangeInputs('username'),
              onKeyDown: (e) => e.key == 'Enter' && !disableButton ? handleLogin() : '',
              variant: 'outlined',
              placeholder: 'Usuário',
              label: 'Usuário',
              error: hasError,
              margin: 'dense',
            }}
            TextFieldPassword={{
              value: fields.password,
              onChange: handleOnChangeInputs('password'),
              onKeyDown: (e) => e.key == 'Enter' && !disableButton ? handleLogin() : '',
              variant: 'outlined',
              placeholder: 'Senha',
              type: showPassword ? 'text' : 'password',
              error: hasError,
              label: 'Senha',
              margin: 'dense',
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton onClick={handleShowPassword}>
                    {
                      showPassword?
                      <Visibility  />
                      :
                      <VisibilityOff />
                    }
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            Button={{
              disabled: disableButton,
              children: 'Fazer Login',
              variant: 'contained',
              onClick: () => handleLogin(),
              sx: {
                marginTop: '16px',
              },
            }}
            RemebermeCheckbox={{
              label: 'Lembrar-me',

              props: {
                defaultChecked: false,
                value: fields.remember,
                onChange: handleChangeCheckBox
              },
            }}
          />
        }
      />
    </>
  );
}
