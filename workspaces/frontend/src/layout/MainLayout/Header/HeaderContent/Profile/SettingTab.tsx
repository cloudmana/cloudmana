/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// material-ui
import { useTheme } from '@mui/material/styles'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// assets
import {
  LockOutlined,
  UserOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
} from '@ant-design/icons'
import { activeItem } from 'src/state/menu/actions'

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const theme = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (_event: any, index: any, route?: string) => {
    setSelectedIndex(index)
    route && router.push(route)
    dispatch(activeItem([]))
  }

  return (
    <List
      component="nav"
      sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}
    >
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3, '/iam')}
      >
        <ListItemIcon>
          <IdcardOutlined />
        </ListItemIcon>
        <ListItemText primary="IAM Settings" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
    </List>
  )
}

export default SettingTab
