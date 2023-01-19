import { Box, Typography, AutocompleteChangeDetails, AutocompleteChangeReason, useTheme, useMediaQuery, TextField, Paper, IconButton } from "@mui/material";
import GlobalTemplate from "./GlobalTemplate";
import { AvatarType, Avatar } from "../components/molecules/avatar/Avatar";
import colorsList from '../theme/colorsList.json'
import { FlipCameraIosOutlined } from '@mui/icons-material'


type UsersTemplateType = {
	avatarProps?: AvatarType;
	loadingTemplate?: boolean;
	titlePage?: string;
	onClickRandom?: React.MouseEventHandler<HTMLButtonElement>;
	disableIconButton?: boolean

}

export default function RandomDogTemplate({ titlePage, loadingTemplate, onClickRandom, avatarProps, disableIconButton }: UsersTemplateType) {
	const { shareenergy } = colorsList;
	const theme = useTheme();
	const belowMedium = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<GlobalTemplate
			loading={loadingTemplate}
		>
			<>
				<Box width='100%' display='flex' justifyContent='center' alignItems='center' mt='16px'>
					<Typography variant='h6' fontWeight={700}>{titlePage}</Typography>
				</Box>
				<Box width='100%' display='flex' justifyContent='center' alignItems='center' mt='16px' >
					<Paper elevation={10}
						sx={{
							backgroundColor: shareenergy["grey-colors"]["grey-02"].value,
							width: belowMedium ? '90%' : '70%',
							display: 'flex',
							justifyContent: belowMedium ? 'space-around' : 'space-evenly',
							alignItems: 'center',
							flexDirection: belowMedium ? 'column' : 'row',
							paddingY:'50px'

						}}
					>
						<Box display='flex' flexDirection='column'>
							<Typography>Clique no ícone para carregar uma imagem</Typography>
							<IconButton
								sx={{
									':hover': {
										backgroundColor: 'transparent'
									}
								}}
								disabled={disableIconButton}
								onClick={onClickRandom}>
								<FlipCameraIosOutlined sx={{ width: '50px', height: '50px' }} color={disableIconButton ? 'inherit' : 'primary'} />
							</IconButton>
						</Box>
						<Box display='flex' flexDirection='column'>
							<Avatar
								width={300}
								height={300}
								colorIconAvatar={'#fff'}
								variantAvatar='rounded'
								iconSizeAvatar="100px"

								{...avatarProps}
							/>
						</Box>



					</Paper>
				</Box>
			</>
		</GlobalTemplate>
	)
}
