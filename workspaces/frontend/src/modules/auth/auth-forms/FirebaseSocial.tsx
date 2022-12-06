/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { useTheme } from '@mui/material/styles'
import { useMediaQuery, Button, Stack } from '@mui/material'
import Image from 'src/components/Image'

// assets
import Google from 'src/assets/images/icons/google.svg'
import Twitter from 'src/assets/images/icons/twitter.svg'
import Facebook from 'src/assets/images/icons/facebook.svg'

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))

  const googleHandler = async () => {
    // login || singup
  }

  const twitterHandler = async () => {
    // login || singup
  }

  const facebookHandler = async () => {
    // login || singup
  }

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<Image src={Google} alt="Google" />}
        onClick={googleHandler}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<Image src={Twitter} alt="Twitter" />}
        onClick={twitterHandler}
      >
        {!matchDownSM && 'Twitter'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<Image src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      >
        {!matchDownSM && 'Facebook'}
      </Button>
    </Stack>
  )
}

export default FirebaseSocial
