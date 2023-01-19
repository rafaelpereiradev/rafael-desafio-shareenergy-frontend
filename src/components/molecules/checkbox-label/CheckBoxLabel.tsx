import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

export type CheckboxType={
  props?:CheckboxProps;
  label?:string
}

export const CheckBoxLabel = ({props,label}:CheckboxType) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox {...props}/>} label={label} />
    </FormGroup>
  );
}

