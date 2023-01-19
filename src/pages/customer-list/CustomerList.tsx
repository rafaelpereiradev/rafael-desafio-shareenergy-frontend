import { ConstructionOutlined, EditOutlined, PersonRemoveAlt1Outlined, PersonSearchOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import { GridColumns } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import validator from 'validator';
import ActionsDatagrid from '../../components/molecules/actions-datagrid/ActionsDatagrid';
import { FormDialog } from '../../components/molecules/form-dialog/FormDialog';
import DisplayDataGrid from '../../components/organisms/display-datagrid/DisplayDatagrid'
import CustomerListTemplate from '../../templates/CustomerListTemplate'
import { handleRequest } from '../../utils/Utils';


type RowType = {
	id: string,
	name: string,
	email: string,
	phone: string,
	address: string,
	cpf: string,
}


type FieldsIsValid = {
	email: boolean,
	phone: boolean,
	cpf: boolean
}
const CustomerList = () => {

	type Row = typeof usersList[number];
	const [usersList, setUsersList] = useState<RowType[]>([]);
	const [dialogTitle, setDialogTitle] = useState('string')
	const [loading, setLoading] = useState<boolean>(true)
	const [loadingDialog, setLoadingDialog] = useState<boolean>(false)
	const [disableFields, setDisableFields] = useState<boolean>(false)
	const [disableButtonSave, setDisableButtonSave] = useState<boolean>(true)
	const [hasChange, setHasChange] = useState<boolean>(false)
	const [inputVariant, setInputVariant] = useState<'outlined' | 'filled' | 'standard'>('outlined')
	const [open, setOpen] = useState(false);
	const navigate = useNavigate()
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [action, setAction] = useState<'edit' | 'detail' | 'new' | null>(null)
	const [isValid, setIsValid] = useState<FieldsIsValid>({
		cpf: false,
		email: false,
		phone: false
	})
	const [fields, setFields] = useState<RowType>({
		id: '',
		name: '',
		email: '',
		phone: '',
		address: '',
		cpf: '',
	})

	const navigateLogin = () => {
		localStorage.removeItem('token')
		navigate('/auth')
		enqueueSnackbar('Por favor realize o login', { variant: 'error' })
	}
	const handleClose = () => {
		handleRemoveErrors('removeAll')
		setOpen(false);
	};
	const handleClickOpen = (infoUser: RowType, actionClickOpen: typeof action) => {
		if (actionClickOpen == 'edit') {
			setAction(actionClickOpen)
			setDialogTitle('Editar Cliente')
			setFields({
				...infoUser
			})
			setDisableFields(false)
		}
		if (actionClickOpen == 'detail') {
			setAction(actionClickOpen)
			setDialogTitle('Detalhes do Cliente')
			setFields({
				...infoUser
			})
			setDisableFields(true)
		}

		setOpen(true);
		handleRemoveErrors('removeAll')
	};

	const handleInputsVariants = () => {
		if (disableFields) {
			setInputVariant('standard')
		} else {
			setInputVariant('outlined')
		}
	}
	const handleRemoveErrors = (prop: string) => {
		if (prop == 'email') {
			setIsValid({ ...isValid, email: true })
		}
		if (prop == 'phone') {
			setIsValid({ ...isValid, phone: true })
		}
		if (prop == 'cpf') {
			setIsValid({ ...isValid, cpf: true })
		}
		if (prop == 'removeAll') {
			setIsValid({ email: true, phone: true, cpf: true })
		}
	}

	const handleOnChangeInputs = (prop: keyof RowType) => (event: React.ChangeEvent<HTMLInputElement>) => {
		if (prop === 'cpf') {
			setFields({ ...fields, [prop]: event.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4") })
			return
		}
		setFields({ ...fields, [prop]: event.target.value })
	}
	const handleFormIsNotEmpty = () => {
		if ((fields.name.length &&
			fields.email.length &&
			fields.phone.length &&
			fields.address.length &&
			fields.cpf.toString().length)
			> 0
		) {
			setDisableButtonSave(false)
		} else {
			setDisableButtonSave(true)
		}
	}

	const handleAddNewCustomer = () => {
		setAction('new')
		setOpen(true);
		setDialogTitle('Cadastrar Cliente')
		setFields(
			{
				id: '',
				name: '',
				email: '',
				phone: '',
				address: '',
				cpf: '',
			}
		)
		setDisableFields(false)
	}
	const handleLoadingData = () => {
		handleRequest('/customer/all')
			.then((res: any) => {
				setLoading(false)
				const { data } = res
				const usersData = data.map((user: RowType) => {
					return {
						id: user.id,
						name: user.name,
						email: user.email,
						phone: user.phone,
						address: user.address,
						cpf: user.cpf
					}
				})
				setUsersList(usersData)
				if (usersData.length == 0) {
					enqueueSnackbar('A lista de clientes está vazia, cadastre um novo cliente para visualizar os dados', { variant: 'info', autoHideDuration: 5000 })
				}
			})
			.catch((err) => {
				setLoading(false)
				if (err.response.status == 401) {
					navigateLogin()
					return
				}
				enqueueSnackbar('Houve um problema ao carregar os dados, por favor tente novamente!', { variant: 'error' })
			});
	}

	const handleIsFieldsValid = () => {
		setIsValid({
			email: validator.isEmail(fields.email),
			phone: validator.isMobilePhone(fields.phone, 'pt-BR'),
			cpf: validator.isTaxID(fields.cpf.replace(/[^a-zA-Z0-9]/g, ''), 'pt-BR')
		})
		const emailValid = validator.isEmail(fields.email)
		const phoneValid = validator.isMobilePhone(fields.phone, 'pt-BR')
		const cpfValid = validator.isTaxID(fields.cpf.replace(/[^a-zA-Z0-9]/g, ''), 'pt-BR')
		let isFormValid = (emailValid && phoneValid && cpfValid)
		return isFormValid

	}
	const handleSave = () => {
		setLoadingDialog(true)
		let isFormValid = handleIsFieldsValid()
		if (action == 'new' && isFormValid) {
			setDialogTitle('Salvando...')
			handleRequest('/customer/new', 'post', { ...fields }).then((resp: any) => {
				const newUser = resp.data as RowType
				setLoadingDialog(false)
				setUsersList([...usersList, newUser])
				enqueueSnackbar('Novo cliente cadastrado com sucesso!', { variant: 'success' })
				handleClose()
			})
				.catch((err) => {
					setLoadingDialog(false)
					if (err.response.status == 401) {
						navigateLogin()
						return
					}
					if (err.response.status == 409) {
						const { message } = err.response.data
						enqueueSnackbar(message, { variant: 'error' })
						return
					}
					enqueueSnackbar('Houve um problema ao cadastrar o novo cliente', { variant: 'error' })
				})

		}
		if (action == 'edit' && isFormValid) {
			
			handleRequest(`/customer/edit/${fields.id}`, 'put',
				{
					name: fields.name,
					email: fields.email,
					phone: fields.phone,
					address: fields.address,
					cpf: fields.cpf

				}).then((resp: any) => {
					setDialogTitle('Salvando...')
					handleLoadingData()
					setLoadingDialog(false)
					enqueueSnackbar('Cliente atualizado com sucesso!', { variant: 'success' })
					handleClose()
				})
				.catch((err) => {
					setLoadingDialog(false)
					if (err.response.status == 401) {
						navigateLogin()
						return
					}
					if (err.response.status == 409) {
						const { message } = err.response.data
						enqueueSnackbar(message, { variant: 'error' })
						return
					}
					enqueueSnackbar('Houve um problema ao atualizar o cadastro do cliente', { variant: 'error' })
				})

		}
		setLoadingDialog(false)

	}

	const handleDelete = (customer: RowType) => {
		setLoading(true)
		handleRequest(`/customer/delete/${customer.id}`, 'delete').then((resp) => {
			handleLoadingData()
			enqueueSnackbar('Cliente excluído com sucesso!', { variant: 'success' })
		})
			.catch((err) => {
				if (err.response.status == 401) {
					navigateLogin()
					return
				}
				enqueueSnackbar('Não foi possível excluir o cliente', { variant: 'error' })
				handleLoadingData()
			})
	}

	const columns = useMemo<GridColumns<Row>>(() => [
		{ field: 'name', headerName: 'Nome', flex: 1, disableColumnMenu: true, sortable: false, sortingOrder: ['asc', 'desc'] },
		{ field: 'email', headerName: 'E-mail', flex: 1, disableColumnMenu: true, sortable: false },
		{ field: 'phone', headerName: 'Telefone', flex: 1, disableColumnMenu: true, sortable: false },
		{ field: 'address', headerName: 'Endereço', flex: 0.4, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center' },
		{ field: 'cpf', headerName: 'CPF', flex: 0.4, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center' },
		{
			field: 'actions', type: 'actions', headerName: 'Ações', flex: 1, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center',
			getActions: ({ row }) => [
				<ActionsDatagrid
					actionProps={[
						{

							children: <EditOutlined color='primary' />,
							onClick: () => handleClickOpen(row, 'edit')

						},
						{

							children: <PersonSearchOutlined color='primary' />,
							onClick: () => handleClickOpen(row, 'detail')


						},

						{

							children: <PersonRemoveAlt1Outlined color='error' />,
							onClick: () => handleDelete(row)
						}
					]}
				/>
			]
		},
	], [])

	useEffect(() => {
		handleInputsVariants()
	}, [disableFields])

	useEffect(() => {
		handleLoadingData()
		handleRemoveErrors('removeAll')
	}, []);


	useEffect(() => {
		handleFormIsNotEmpty()
	}, [fields]);

	return (
		<>
			<CustomerListTemplate
				titlePage='Lista de Clientes'
				datagridUsers={
					<DisplayDataGrid
						loading={loading}
						rows={usersList}
						columns={columns}
					/>
				}
				addUserButton={{
					onClick: handleAddNewCustomer
				}}
				propsDialogEditUser={{
					loadingDialog: loadingDialog,
					dialogOnClose: () => { },
					closeDialog: handleClose,
					dialogTitle: dialogTitle,
					dialogOpen: open,
					dialogActionsButtons:
						<>
							{
								loadingDialog ?
									<></>
									:
									<>
										<Button variant='outlined' onClick={handleClose}>Fechar</Button>
										<LoadingButton disabled={disableButtonSave} sx={{ display: action == 'detail' ? 'none' : '' }} variant='contained' onClick={handleSave}>Salvar</LoadingButton>
									</>
							}

						</>,
					dialogContentText: '',
					dialogForm:
						<>
							<FormDialog
								fieldsWidth='500px'
								fields={[
									{
										variant: inputVariant,
										placeholder: 'Nome',
										label: 'Nome',
										value: fields.name,
										disabled: disableFields,
										className: disableFields ? 'inputReadOnly' : null!,
										onChange: handleOnChangeInputs('name')


									},
									{
										variant: inputVariant,
										placeholder: 'E-mail',
										label: 'E-mail',
										type: 'email',
										value: fields.email,
										helperText: !isValid.email ? 'Insira um E-mail válido' : '',
										error: !isValid.email,
										disabled: disableFields,
										className: disableFields ? 'inputReadOnly' : null!,
										onChange: handleOnChangeInputs('email')
									},
									{
										variant: inputVariant,
										placeholder: 'Telefone',
										label: 'Telefone',
										type: 'tel',
										value: fields.phone,
										helperText: !isValid.phone ? 'Insira um Telefone válido' : '',
										error: !isValid.phone,
										disabled: disableFields,
										className: disableFields ? 'inputReadOnly' : null!,
										onChange: handleOnChangeInputs('phone')
									},
									{
										variant: inputVariant,
										placeholder: 'Endereço',
										label: 'Endereço',
										value: fields.address,
										disabled: disableFields,
										className: disableFields ? 'inputReadOnly' : null!,
										onChange: handleOnChangeInputs('address')
									},
									{
										variant: inputVariant,
										placeholder: 'CPF',
										label: 'CPF',
										value: fields.cpf,
										disabled: disableFields,
										className: disableFields ? 'inputReadOnly' : null!,
										onChange: handleOnChangeInputs('cpf'),
										helperText: !isValid.cpf ? 'Insira um CPF válido' : '',
										error: !isValid.cpf,
										inputProps: {
											maxLength: 14,
										}
									}
								]}

							/>
						</>,

				}}
			/>
		</>
	)
}
export default CustomerList