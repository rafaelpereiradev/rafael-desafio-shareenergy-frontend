import { EditOutlined } from "@mui/icons-material";
import { Box, IconButton, IconButtonProps } from "@mui/material";
import { GridActionsCell, GridActionsCellItem } from "@mui/x-data-grid";

type ActionsDatagridType = & {
    actionProps: IconButtonProps[]
}

export default function ActionsDatagrid({ actionProps }: ActionsDatagridType) {
    return (
        <Box display='flex' justifyContent='space-evenly'>
            {actionProps.map((props: IconButtonProps,key) => {
                return (
                    <IconButton key={key} {...props} />
                )
            })}
        </Box>
    )
}
