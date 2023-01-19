import React from 'react';
import MuiAutocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import MuiPopper,{PopperProps} from '@mui/material/Popper';
export type AutocompleteType = {
    options?: any
    width?: string;
    renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode | undefined;
    onInputChange?:(event: React.SyntheticEvent<Element, Event>, value: string | null) => void;
}
export const Popper =(props:PopperProps) =>{
return(
    <MuiPopper {...props} sx={{width:250}} placement='bottom-start' />
)
}
export function Autocomplete({ options, width, renderInput,onInputChange }: AutocompleteType) {
    return (
        <MuiAutocomplete
            onChange={onInputChange}
            disablePortal
            options={options || ''}
            sx={{ width: width }}
            renderInput={renderInput}
            
        />

    );
}