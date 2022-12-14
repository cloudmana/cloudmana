/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import React from 'react'
import RouterLink from 'next/link'
import { useRouter } from 'next/router'

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project import
import FirebaseSocial from './FirebaseSocial'
import AnimateButton from 'src/components/@extended/AnimateButton'
import { useLogin } from 'src/state/auth/hooks'

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import Image from 'src/components/Image'

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const { loading, login } = useLogin()
  const router = useRouter()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <>
      <Formik
        initialValues={{
          account: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          account: Yup.string().max(255).required('Account is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (_values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false })
            setSubmitting(false)
            const logged = await login({
              account: _values.account,
              password: _values.password,
            })
            if (logged) router.push('/')
          } catch (err: any) {
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="account-login">Account</InputLabel>
                  <OutlinedInput
                    id="account-login"
                    type="account"
                    value={values.account}
                    name="account"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username / email"
                    fullWidth
                    error={Boolean(touched.account && errors.account)}
                  />
                  {touched.account && errors.account && (
                    <FormHelperText error id="standard-weight-helper-text-account-login">
                      {errors.account}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} href="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {loading && (
                      <Image
                        src="/assets/images/icons/LoadingIcon.svg"
                        alt=""
                        width={15}
                        height={15}
                        className="animate-spin mr-2"
                      />
                    )}
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthLogin
