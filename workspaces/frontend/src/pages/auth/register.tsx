/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

// material-ui
import { Grid, Stack, Typography } from '@mui/material'

// project import
import FirebaseRegister from 'src/modules/auth/auth-forms/AuthRegister'
import AuthWrapper from 'src/modules/auth/AuthWrapper'
import type { NextPageWithLayout } from 'src/pages/_app'
import Loadable from 'src/components/Loadable'
import { RootState } from 'src/state/reducer'

// ================================|| REGISTER ||================================ //

const Register: NextPageWithLayout = Loadable(() => {
  const router = useRouter()
  const { token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (token) {
      router.replace('/')
    }
  }, [token])

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Sign up</Typography>
            <Typography
              component={Link}
              href="/auth/login"
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FirebaseRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
})

Register.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default Register
