/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material'

// project import
import MainCard from 'src/components/MainCard'

// assets
import AnimateButton from 'src/components/@extended/AnimateButton'

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => {
  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={'/assets/images/logo.png'} sx={{ width: 112 }} />
        <Stack alignItems="center">
          <Typography variant="h5">Cloudmana Pro</Typography>
          <Typography variant="h6" color="secondary">
            Checkout pro features
          </Typography>
        </Stack>
        <AnimateButton>
          <Button
            component={Link}
            target="_blank"
            href="https://github.com/cloudmana/cloudmana/blob/develop/PRO.md"
            variant="contained"
            color="success"
            size="small"
          >
            Pro
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  )
}

export default NavCard
