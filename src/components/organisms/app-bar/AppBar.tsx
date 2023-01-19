import { useState, MouseEvent, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link,useTheme,useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import routes from '../../../routes/routes';
import { AgnosticDataRouteObject } from '@remix-run/router';
import { useNavigate } from 'react-router-dom';
import colorsList from '../../../theme/colorsList.json';

const settings = ['Logout'];

const ResponsiveAppBar = () => {
	const { shareenergy } = colorsList
	const navigate = useNavigate();
	const theme = useTheme()
	const belowMinSize = useMediaQuery(theme.breakpoints.down(`sm`))
	const menuRoutes = routes.routes
	const [menus, setMenus] = useState<AgnosticDataRouteObject[]>([]);
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const handleLogout = () => {
		localStorage.removeItem('token')
	}
	

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = (path: string) => {
		setAnchorElNav(null);
		navigate(path);

	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleMenuOptions = () => {
		let validRoutes = menuRoutes.map((obj: any) => {
			if (obj.children !== undefined) {
				return obj.children
			}
		});
		let validRoutesChildren = validRoutes[1].map((obj: any) => {
			return obj.children
		})

		const menusFiltered = validRoutesChildren[0].filter((item:any)=>{
			if(item.id !== 'not-found'){
				return item
			}
		})

		setMenus(menusFiltered)
	};

	useEffect(() => {
		handleMenuOptions();
	}, []);


	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
				>
					<Typography
						variant="h6"
						noWrap
						component="a"
						// href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'Arial',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Desafio Share Energy
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{menus.map((page: any) => (
								<MenuItem key={page.id} href='' onClick={() => handleCloseNavMenu(page.path)}>
									<Typography textAlign="center">{page.id}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						// href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'Arial',
							fontWeight: 700,
							fontSize:belowMinSize?'1rem':'1.5rem',
							letterSpacing: '.1rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Desafio Share Energy
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{menus.map((page: any) => (
							<Button

								key={page.id}
								onClick={() => handleCloseNavMenu(page.path)}
								sx={{
									my: 2, color: '#fff', display: 'block', ":hover": {
										backgroundColor: shareenergy.custom.secondary.value
									}
								}}
							>
								{page.id}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center"><Link href='/' onClick={handleLogout}>{setting}</Link></Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
