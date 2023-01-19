import Box from "@mui/material/Box";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";


const DatagridSearchToolbar = () => {
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        pb: 0,
        pt: 3,
        mt: 0,
        mb: 4
      }}
    >
      <GridToolbarQuickFilter sx={{ width: '90%' }} />
    </Box>
  );
}

export default DatagridSearchToolbar