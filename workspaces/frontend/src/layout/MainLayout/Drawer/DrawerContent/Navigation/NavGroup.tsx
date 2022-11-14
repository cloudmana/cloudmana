import React from 'react'
import { useSelector } from 'react-redux'

// material-ui
import {
  Box,
  List,
  Typography,
} from '@mui/material'

// project import
import NavItem from './NavItem'

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

export interface NavGroupProps {
  item: any
}

const NavGroup = ({ item }: NavGroupProps) => {
  const [open, setOpen] = React.useState(false)

  const menu = useSelector((state: any) => state.menu)
  const { drawerOpen } = menu

  const navCollapse = item.children?.map((menuItem: any) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={menuItem.level || 1}
            open={open}
            setOpen={setOpen}
          />
        )
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        )
    }
  }) 

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  )
}

export default NavGroup
