import React, { useEffect, useState, useMemo } from 'react';
import { handleRequest } from '../../utils/Utils';
import { Avatar, Box } from '@mui/material';
import DisplayDataGrid from '../../components/organisms/display-datagrid/DisplayDatagrid';
import {GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import DatagridSearchToolbar from '../../components/molecules/datagrid-search-bar/SearchBar';
import RandomUserTemplate from '../../templates/RandomUserTemplate';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


type RowType = {
  id: string | number | null,
  fullName: string | null,
  email: string | null,
  username: string | null,
  age: string | null,
  photo: string | null,
}


export default function RandomUser() {
  type Row = typeof usersList[number];
  const [usersList, setUsersList] = useState<RowType[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar();

	const navigateLogin = () => {
		localStorage.removeItem('token')
    navigate('/auth')
		enqueueSnackbar('Por favor realize o login', { variant: 'error' })
	}

  const columns = useMemo<GridColumns<Row>>(() => [
    {
      field: 'picture', headerName: 'Foto', flex: 0.2, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Avatar src={params.row.picture}></Avatar>
    },
    { field: 'fullName', headerName: 'Nome', flex: 0.8, disableColumnMenu: true, sortable: false, sortingOrder: ['asc', 'desc'] },
    { field: 'email', headerName: 'E-mail', flex: 1.2, disableColumnMenu: true, sortable: false },
    { field: 'username', headerName: 'Username', flex: 0.8, disableColumnMenu: true, sortable: false },
    { field: 'age', headerName: 'Idade', flex: 0.4, disableColumnMenu: true, sortable: false },


  ], [])
  useEffect(() => {
    handleRequest('/random-user')
      .then((res: any) => {
        setLoading(false)
        const { results } = res.data
        console.log(results)
        const validUsers = results.filter((obj: any) => {
          if (obj.id.value !== null && (obj !== '' && obj !== undefined)) {
            return obj
          }
        })
        const usersData = validUsers.map((user: any) => {
          return {
            id: user.id.value,
            fullName: `${user.name.first} ${user.name.last}`,
            email: user.email,
            username: user.login.username,
            age: user.dob.age,
            picture: user.picture.medium
          }
        })
        setUsersList(usersData)
      })
      .catch((err) => {
        if (err.response.status == 401) {
					navigateLogin()
					return
				}
        enqueueSnackbar('Houve um problema ao carregar os dados', { variant: 'error' })
      });
  }, []);
 
  return (
    <>
      <RandomUserTemplate
        title='Random User'
        datagrid={<DisplayDataGrid rows={usersList} columns={columns}
        loading={loading}
        components={{ Toolbar: DatagridSearchToolbar }}
      />} />
    </>
  );
}
