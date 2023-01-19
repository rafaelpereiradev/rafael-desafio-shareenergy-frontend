import { Box, SxProps, Typography } from "@mui/material";
import GlobalTemplate from "./GlobalTemplate";
type UsersTemplateType = {
  datagrid?: JSX.Element;
  title: string;
}

export default function RandomUserTemplate({ datagrid, title }: UsersTemplateType) {
  return (
    <GlobalTemplate>
      <>
        <Box display='flex' width='100%' justifyContent='center' alignItems='center' mt='16px '>
          <Typography variant='h6' fontWeight={700}>{title}</Typography>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' width='100%' mt='16px'  >
          <Box width='80%' height='70vh' overflow='auto' mt='16px' borderRadius='8px' >
            {datagrid}
          </Box>
        </Box>
      </>
    </GlobalTemplate>
  )
}
