/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { ReactElement } from 'react'
import Link from 'next/link'

// material-ui
import { Grid, Stack, Typography } from '@mui/material'

// project import
import AuthLogin from 'src/modules/auth/auth-forms/AuthLogin'
import AuthWrapper from 'src/modules/auth/AuthWrapper'
import type { NextPageWithLayout } from 'src/pages/_app'
import Loadable from 'src/components/Loadable'

// ================================|| LOGIN ||================================ //

const Login: NextPageWithLayout = Loadable(() => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h3">Login</Typography>
          <Typography
            component={Link}
            href="/auth/register"
            variant="body1"
            sx={{ textDecoration: 'none' }}
            color="primary"
          >
            Don&apos;t have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
))

Login.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default Login
