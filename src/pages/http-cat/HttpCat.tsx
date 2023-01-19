import { useEffect, useState } from 'react';
import { handleRequest } from '../../utils/Utils';
import HttpCatTemplate from '../../templates/HttpCatTemplate';
import { httpList } from '../../utils/ArrayUtil';
import imageNotFoundURL from '../../components/atoms/img/image-not-found.webp'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export default function HttpCat() {
	const [loading, setLoading] = useState<boolean>(false)
	const [urlImage, setUrlImage] = useState<string>('')
	const [code, setCode] = useState<string | number | null>('')
	const [codeList, setCodeList] = useState<number[] | string[]>([])
	const [notFound, setNotFound] = useState<boolean>(false)
	const imgNotFound = imageNotFoundURL
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar();

	const navigateLogin = () => {
		localStorage.removeItem('token')
		navigate('/auth')
		enqueueSnackbar('Por favor realize o login', { variant: 'error' })
	}
	useEffect(() => {
		setLoading(true)
		handleRequest('/http-cat', 'post', { code: `${code}` })
			.then((res: any) => {
				setNotFound(false)
				setUrlImage(res.data)
				setLoading(false)
			})
			.catch((err) => {
				if (err.response.status == 401) {
					navigateLogin()
					return
				}
				if (err.response.status == 404) {
					const { message } = err.response.data
					enqueueSnackbar(message, { variant: 'error' })
					setNotFound(true)
					setLoading(false)
					return
				}
				enqueueSnackbar('Houve um problema ao carregar os dados', { variant: 'error' })
				setNotFound(true)
				setLoading(false)
			})

	}, [code]);

	useEffect(() => {
		let codeListNumbers = httpList().map((number: number) => {
			return number.toString()
		})
		setCodeList(codeListNumbers)
	}, []);

	const handleSelectChange =
		(event: React.SyntheticEvent<Element, Event>, value: string | number | null) => {
			setLoading(true)
			if (value == null) {
				setCode('')
				return
			}
			setCode(value)
			setLoading(false)
		}

	return (
		<>
			<HttpCatTemplate
				titlePage=' HTTP Cat'
				avatarProps={{
					urlImageAvatar: urlImage,
					loadingAvatar: loading,
					imgNotFoundURL: notFound ? imgNotFound : '',
					notFound: notFound
				}}
				autoCompleteOnChange={handleSelectChange}
				autocompleteOptions={codeList}
			/>
		</>
	);
}
