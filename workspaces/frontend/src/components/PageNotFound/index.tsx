/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Button, Typography } from '@mui/material'
import AnimateButton from 'src/components/@extended/AnimateButton'

export default function PageNotFound() {
  return (
    <div className="not-found-page h-full">
      <div className="flex flex-col items-center">
        <p className="text-primary text-[120px] font-semibold">404</p>
        <Typography variant="h1" textAlign={'center'}>
          Page Not Found
        </Typography>
        <Typography variant="h5" textAlign={'center'} color="secondary" margin="30px">
          We've explored deep and wide, <br /> but we can't find the page you were looking for.
        </Typography>
        <div className="max-w-[255px]">
          <AnimateButton>
            <Button
              disableElevation
              href="/"
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Navigate back home
            </Button>
          </AnimateButton>
        </div>
      </div>
    </div>
  )
}
