import { Box, Grid, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type LoginTemplate = {
  form: JSX.Element;
  width: string;
  height?: string;
};

const LoginTemplate = ({ form, width, height }: LoginTemplate) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} display="flex" flexDirection='column' justifyContent="center" alignItems="center" minHeight='100vh'  sx={{ backgroundColor: theme.palette.primary.main }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: width,
          height: height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '32px',
          borderRadius: '10px',
        }}
      >
        {form}
        
      </Box>
      <Box width='100%' display='flex' position='fixed' alignSelf='end' justifyContent='center' alignItems='center' sx={{backgroundColor:theme.palette.secondary.main,bottom:'0'}}><Typography ><Link href='https://www.linkedin.com/in/rafael-pereira-924286a4/' color='#fff'>Desenvolvido por Rafael Pereira</Link> </Typography></Box>
    </Grid>
  );
};

export default LoginTemplate;
