import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material';
import CircularProgress from '../../molecules/circular-progress/CircularProgress';
export type FormDialogType = {
    dialogTitle?: string;
    dialogContentText?: string;
    dialogForm?: JSX.Element;
    loadingDialog?: boolean;
    dialogActionsButtons?: JSX.Element;
    dialogOpen: boolean;
    dialogOnClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
    closeDialog?: React.MouseEventHandler<HTMLButtonElement>
}

export const DialogForm = ({ dialogOpen, dialogOnClose, closeDialog, dialogTitle, dialogContentText, dialogForm, dialogActionsButtons, loadingDialog }: FormDialogType) => {
    return (
        <div>
            <Dialog open={dialogOpen} onClose={dialogOnClose}  >
                <DialogTitle>
                    {dialogTitle}
                    {loadingDialog ?
                        <></>
                        :
                        <IconButton
                            onClick={closeDialog}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseOutlined color='primary' />
                        </IconButton>
                    }

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogContentText}
                    </DialogContentText>
                    {loadingDialog ?
                        <CircularProgress color='primary' />
                        :
                        dialogForm
                    }
                </DialogContent>
                <DialogActions>
                    {dialogActionsButtons}
                </DialogActions>
            </Dialog>
        </div>
    );
}
