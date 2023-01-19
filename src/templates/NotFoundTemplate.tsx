import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import GlobalTemplate from './GlobalTemplate'

export default function NotFoundTemplate() {
  return (
    <GlobalTemplate>
        <Box width='100%' display='flex' alignItems='center' justifyContent='center' minHeight='calc(100vh - 80px)'>
        <Typography variant='h5'>A página solicitada não existe</Typography>
        </Box>
    </GlobalTemplate>
  )
}
