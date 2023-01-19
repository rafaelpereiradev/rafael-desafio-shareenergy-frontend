import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput';
import { ReactNode } from 'react';

export type DropdownSelectCodeType = {
    label?: string;
    value: number | string;
    handleSelectChange?: (event: SelectChangeEvent<string | number>, child: ReactNode) => void;
    list: string[] | number[];


}

export function DropdownSelect({ label, handleSelectChange, list,value }: DropdownSelectCodeType) {
    return (
        <FormControl sx={{ width: '200px', mt: '32px' }} >
            <InputLabel style={{height:'100px'}}>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleSelectChange}
            >
                {list.map((item) => {
                    return (
                        <MenuItem key={item} value={item || ''}>{item}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}
