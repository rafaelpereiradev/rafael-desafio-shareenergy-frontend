import { useEffect, useState } from 'react';
import { handleRequest } from '../../utils/Utils';
import imageNotFoundURL from '../../components/atoms/img/image-not-found.webp'
import RandomDogTemplate from '../../templates/RandomDogTemplate';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export default function RandomDog() {
  const [loading, setLoading] = useState<boolean>(false)
  const [urlImage, setUrlImage] = useState<string>('')
  const [notFound, setNotFound] = useState<boolean>(false)
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const imgNotFound = imageNotFoundURL
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  
  const navigateLogin = () => {
    localStorage.removeItem('token')
    navigate('/auth')
    enqueueSnackbar('Por favor realize o login', { variant: 'error' })
  }


  const getRandomDog = () => {
    setLoading(true)
    setDisableButton(true)
    setUrlImage('')
    handleRequest('/random-dog')

      .then((res: any) => {
        setNotFound(false)
        setUrlImage(res.data)
        setDisableButton(false)
        setLoading(false)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigateLogin()
          return
        }

        enqueueSnackbar('Houve um problema ao carregar os dados', { variant: 'error' })
        
        setDisableButton(false)
        setNotFound(true)
        setLoading(false)
      })

  }

  useEffect(() => {
    const user = localStorage.getItem('token')
    if (!user) {
      navigateLogin()
    }
  }, [])
  return (
    <>
      <RandomDogTemplate
        titlePage=' Random Dog'
        avatarProps={{
          urlImageAvatar: urlImage,
          loadingAvatar: loading,
          imgNotFoundURL: notFound ? imgNotFound : '',
          notFound: notFound
        }}
        onClickRandom={getRandomDog}
        disableIconButton={disableButton}
      />
    </>
  );
}
