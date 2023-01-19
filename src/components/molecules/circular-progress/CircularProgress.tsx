import { Box } from "@mui/material"
import MuiCircularProgress,{CircularProgressProps} from "@mui/material/CircularProgress"

type CircularProgressType={
  color:string| CircularProgressProps["color"];
}
export default function CircularProgress({color}:CircularProgressType) {
  return (
    <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
      <MuiCircularProgress  sx={{ color: color }} size="4rem" />
    </Box>


  )
}
