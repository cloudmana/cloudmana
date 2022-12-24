/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { forwardRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import {
  Avatar,
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from '@mui/material'

// project import
import { activeItem } from 'src/state/menu/actions'

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

export interface NavItemProps {
  item: any
  level: number
  // for collapse
  onClick?: any
  open?: any
  setOpen?: any
}

const NavItem = ({ item, level, onClick, open, setOpen }: NavItemProps) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const menu = useSelector((state: any) => state.menu)
  const { drawerOpen, openItem } = menu
  const [openCollapse, setOpenCollapse] = useState<boolean>(open)

  let itemTarget = '_self'
  if (item.target) {
    itemTarget = '_blank'
  }

  let listItemProps: any = {
    component: forwardRef((props: any, ref: any) => (
      <Link ref={ref} {...props} href={item.url || ''} target={itemTarget} />
    )),
  }
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget }
  }

  const itemHandler = (id: any) => {
    dispatch(activeItem([id]))
  }

  const Icon = item.icon
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />
  ) : (
    false
  )

  const isSelected =
    openItem.findIndex((id: any) => id === item.id) > -1 ||
    (item.type === 'collapse' &&
      item.children.findIndex((e: any) => openItem.findIndex((id: any) => id === e.id) > -1) > -1)

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id)
    if (currentIndex > -1) {
      dispatch(activeItem([item.id]))
    }
    // eslint-disable-next-line
  }, [])

  const textColor = 'text.primary'
  const iconSelectedColor = 'primary.main'

  const onClickHandler = () => {
    if (item.type === 'collapse') {
      setOpen(!open)
      setOpenCollapse(!openCollapse)
      return
    }
    itemHandler(item.id)
  }

  const navCollapse = item.children?.map((menuItem: any) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={menuItem.level || level + 1}
            open={open}
            setOpen={setOpen}
          />
        )
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={menuItem.level || level + 1} />
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        )
    }
  })

  return (
    <>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        onClick={onClick || onClickHandler}
        selected={isSelected && (item.type === 'item' || !open)}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': {
              // bgcolor: 'primary.lighter',
            },
            '&.Mui-selected': {
              // bgcolor: 'primary.lighter',
              borderRight: `2px solid ${theme.palette.primary.main}`,
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                // bgcolor: 'primary.lighter',
              },
            },
          }),
          ...(!drawerOpen && {
            '&:hover': {
              bgcolor: 'transparent',
            },
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: 'transparent',
              },
              bgcolor: 'transparent',
            },
          }),
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: 'secondary.lighter',
                },
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: 'primary.lighter',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  },
                }),
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
        {item.type === 'collapse' &&
          drawerOpen &&
          (openCollapse ? <CaretUpOutlined /> : <CaretDownOutlined />)}
      </ListItemButton>
      {item.type === 'collapse' && (
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navCollapse}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default NavItem
