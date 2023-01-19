import { Grid, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import CircularProgress from '../components/molecules/circular-progress/CircularProgress';
type GlobalTemplateType = {
  children?: JSX.Element;
  loading?: boolean;
};

const GlobalTemplate = ({ children, loading }: GlobalTemplateType) => {
  return (
    <Grid item xs={12} height='calc(100vh - 90px)'>
      {loading ?
        <CircularProgress color='primary' />
        : children
      }
    </Grid>
  );
};

export default GlobalTemplate;
