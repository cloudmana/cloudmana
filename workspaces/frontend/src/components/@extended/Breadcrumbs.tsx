/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import { Grid, Typography } from '@mui/material'

// project imports
import MainCard from '../MainCard'

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, ...others }: any) => {
  const router = useRouter()
  const [main, setMain] = useState<any>()
  const [item, setItem] = useState<any>()

  // set active item state
  const getCollapse = (menu: any) => {
    if (menu.children) {
      menu.children.filter((collapse: any) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse)
        } else if (collapse.type && collapse.type === 'item') {
          if (router.pathname === collapse.url) {
            setMain(menu)
            setItem(collapse)
          }
        }
        return false
      })
    }
  }

  useEffect(() => {
    navigation?.items?.map((menu: any) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu)
      }
      return false
    })
  })

  // only used for component demo breadcrumbs
  if (router.pathname === '/breadcrumbs') {
    router.pathname = '/dashboard/analytics'
  }

  let mainContent
  let itemContent
  let breadcrumbContent = <Typography />
  let itemTitle = ''

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography
        component={Link}
        href={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: 'none' }}
        color="textSecondary"
      >
        {main.title}
      </Typography>
    )
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    )

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography
                  component={Link}
                  href="/"
                  color="textSecondary"
                  variant="h6"
                  sx={{ textDecoration: 'none' }}
                >
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
          </Grid>
        </MainCard>
      )
    }
  }

  return breadcrumbContent
}

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool,
}

export default Breadcrumbs
