import MuiAvatar, { AvatarPropsVariantOverrides } from "@mui/material/Avatar/Avatar"
import PageviewOutlined from "@mui/icons-material/PageviewOutlined"
import CircularProgress from "../circular-progress/CircularProgress";
import colorsList from '../../../theme/colorsList.json'

export type AvatarType = {
    urlImageAvatar?: string;
    loadingAvatar?: boolean;
    variantAvatar?: 'circular' | 'rounded' | 'square';
    width?: string | number;
    height?: string | number;
    iconSizeAvatar?: string;
    colorIconAvatar?: string;
    imgNotFoundURL?:string;
    notFound?:boolean;
}
export function Avatar({ urlImageAvatar, loadingAvatar, variantAvatar, width, height, iconSizeAvatar, colorIconAvatar,imgNotFoundURL,notFound }: AvatarType) {
const {shareenergy} = colorsList
    return (
        <MuiAvatar sx={{ width: width, height: height,border:`4px solid ${shareenergy.custom.primary.value}`, backgroundColor:`${shareenergy.custom.primary.value}` }}variant={variantAvatar} src={notFound?imgNotFoundURL:`data:image/jpg;base64,${urlImageAvatar}`} >
            {loadingAvatar ?
                <CircularProgress color='#fff' />
                :
                <PageviewOutlined sx={{ fontSize: iconSizeAvatar, color: colorIconAvatar }} />
            }
        </MuiAvatar>
    )
}

