/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
} from '@mui/material'
import Input from 'src/components/Input'
import { useProviderList } from 'src/services/provider/provider.queries'
import { IProvider } from 'src/models/provider'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface ModalCredentialsImportProps {
  open?: boolean
  setOpen?: any
}

export default function ModalCredentialsImport(props: ModalCredentialsImportProps) {
  const { open = false, setOpen } = props
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [provider, setProvider] = React.useState('')
  const { data: providerList } = useProviderList()

  const handleChange = (event: SelectChangeEvent) => {
    setProvider(event.target.value as string)
  }

  const handleClose: any = (_event: any, _reason: any) => {
    // if (reason !== 'backdropClick') {
    setOpen && setOpen(false)
    // }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Import credential
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Provider</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={provider}
              label="Provider"
              onChange={handleChange}
            >
              {providerList &&
                providerList.map((e: IProvider) => (
                  <MenuItem key={e._id} value={e._id}>
                    {e.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem>
          {/* <Typography sx={{ flex: 1 }} component="div">
            Access key
          </Typography> */}
          <Input label="Access key" sx={{ flex: 1 }} size={'medium'} />
        </ListItem>
        <Divider />
        <ListItem>
          {/* <Typography sx={{ flex: 1 }} component="div">
            Secret key
          </Typography> */}
          <Input label="Secret key" sx={{ flex: 1 }} size={'medium'} />
        </ListItem>
      </List>
    </Dialog>
  )
}
