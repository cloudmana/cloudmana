/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import TextField, { TextFieldProps } from '@mui/material/TextField'

const Input = (props?: TextFieldProps) => {
  return <TextField size="small" variant="outlined" {...props} />
}

export default Input
