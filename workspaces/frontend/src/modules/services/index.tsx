/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { Grid, Typography } from '@mui/material'

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Services = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} textAlign={'center'}>
        <Typography variant="h2" textAlign={'center'}>
          ☄️🧰☄️
        </Typography>
        <Typography variant="h2" textAlign={'center'}>
          Welcome to Services page
        </Typography>
        <Typography variant="h2" textAlign={'center'}>
          ☄️💊☄️
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Services
