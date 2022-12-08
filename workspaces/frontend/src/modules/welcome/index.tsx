/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { Grid, Typography } from '@mui/material'

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Welcome = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Welcome</Typography>
      </Grid>
      <Grid item xs={12} textAlign={'center'}>
        <Typography variant="h2" textAlign={'center'}>
          ☄️🧰☄️
        </Typography>
        <Typography variant="h2" textAlign={'center'}>
          Welcome to Cloudmana
        </Typography>
        <Typography variant="h2" textAlign={'center'}>
          ☄️💊☄️
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Welcome
