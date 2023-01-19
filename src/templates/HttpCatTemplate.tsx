import { Box, Typography, AutocompleteChangeDetails, AutocompleteChangeReason, useTheme, useMediaQuery, TextField, Paper } from "@mui/material";
import GlobalTemplate from "./GlobalTemplate";
import { AvatarType, Avatar } from "../components/molecules/avatar/Avatar";
import colorsList from '../theme/colorsList.json'
import { Autocomplete } from "../components/molecules/autocomplete/Autocomplete";


type UsersTemplateType = {
	avatarProps?: AvatarType;
	loadingTemplate?: boolean;
	titlePage?: string
	autocompleteOptions?: any[];
	autoCompleteOnChange?:
	(event: React.SyntheticEvent<Element, Event>,value: string | null) => void;
}

export default function HttpCatTemplate({ titlePage, autocompleteOptions, avatarProps, autoCompleteOnChange }: UsersTemplateType) {
	const { shareenergy } = colorsList;
	const theme = useTheme();
	const window = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<GlobalTemplate>
			<>
				<Box width='100%' display='flex' justifyContent='center' alignItems='center' mt='16px'>
					<Typography variant='h6' fontWeight={700}>{titlePage}</Typography>
				</Box>

				<Box width='100%' display='flex' justifyContent='center' alignItems='center' mt='16px'  >
					<Paper elevation={10}
						sx={{
							backgroundColor:shareenergy["grey-colors"]["grey-02"].value,
							width: window ? '90%' : '50%',
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							flexDirection: 'column',
							paddingY:'50px'
						}}
					>
						<Typography>Selecione um código HTTP da lista</Typography>
						<Autocomplete
						options={autocompleteOptions}
						onInputChange={autoCompleteOnChange}
						width='30%'
						renderInput={(params) => <TextField sx={{ backgroundColor: '#fff',mb:'10px',mt:'30px' }}{...params} variant='outlined' label={'códigos'} />} />

						<Avatar height={220}
							width={320}
							colorIconAvatar={'#fff'}
							variantAvatar='rounded'
							iconSizeAvatar="100px"
							{...avatarProps}
						/>

					</Paper>
				</Box>
			</>
		</GlobalTemplate>
	)
}
