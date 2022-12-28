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
  FormHelperText,
} from '@mui/material'
import Input from 'src/components/Input'
import { useProviderList } from 'src/services/provider/provider.queries'
import { IProvider } from 'src/models/provider'
import { useCredentialsImport } from 'src/services/credentials/credentials.queries'
import { ICredentialsImportRequest } from 'src/services/credentials/credentials.type'

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

const initData = {
  name: '',
  provider: '',
  accessKeyId: '',
  secretAccessKey: '',
}

export default function ModalCredentialsImport(props: ModalCredentialsImportProps) {
  const { open = false, setOpen } = props
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [data, setData] = React.useState<ICredentialsImportRequest>(initData)
  const { data: providerList } = useProviderList()
  const { isLoading, isSuccess, mutate } = useCredentialsImport()

  const handleClose: any = (_event: any, _reason: any) => {
    // if (reason !== 'backdropClick') {
    setOpen && setOpen(false)
    // }
  }

  const handleSave = () => {
    mutate(data as any)
  }

  React.useEffect(() => {
    if (isSuccess) {
      handleClose()
      setData(initData)
    }
  }, [isSuccess])

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
          <Button disabled={isLoading} autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <FormControl fullWidth>
            <Input
              id="component-name"
              label="Name"
              sx={{ flex: 1 }}
              size={'medium'}
              onChange={(value) => setData({ ...data, name: value.target.value })}
              value={data.name}
            />
            <FormHelperText id="component-name-text">A name for remember</FormHelperText>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel required htmlFor="component-provider-text">
              Provider
            </InputLabel>
            <Select
              required
              labelId="component-provider-text"
              id="component-provider"
              value={data.provider}
              label="Provider"
              onChange={(value) => setData({ ...data, provider: value.target.value })}
              aria-describedby="component-helper-text"
            >
              {providerList &&
                providerList.map((e: IProvider) => (
                  <MenuItem key={e._id} value={e._id}>
                    {e.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText id="component-provider-text">
              Cloud provider of credential
            </FormHelperText>
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem>
          {/* <Typography sx={{ flex: 1 }} component="div">
            Access key
          </Typography> */}
          <Input
            required
            label="Access key"
            sx={{ flex: 1 }}
            size={'medium'}
            onChange={(value) => setData({ ...data, accessKeyId: value.target.value })}
            value={data.accessKeyId}
          />
        </ListItem>
        <Divider />
        <ListItem>
          {/* <Typography sx={{ flex: 1 }} component="div">
            Secret key
          </Typography> */}
          <Input
            required
            label="Secret key"
            sx={{ flex: 1 }}
            size={'medium'}
            onChange={(value) => setData({ ...data, secretAccessKey: value.target.value })}
            value={data.secretAccessKey}
          />
        </ListItem>
      </List>
    </Dialog>
  )
}
