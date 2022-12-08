/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { forwardRef } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'

// project import
import Highlighter from './third-party/Highlighter'
import { ThemeType } from 'src/models/theme'

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
}

// ==============================|| CUSTOM - MAIN CARD ||============================== //

export interface MainCardProps {
  border: boolean
  boxShadow: boolean
  contentSX: any
  darkTitle: boolean
  divider: boolean
  elevation: number
  secondary: React.ReactNode
  shadow: string
  sx: any
  title: string | React.ReactNode
  codeHighlight: boolean
  content: boolean
  children: React.ReactNode
}

const MainCard: any = forwardRef(
  (
    {
      border = true,
      // boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight,
      ...others
    }: MainCardProps,
    ref: any,
  ) => {
    const theme = useTheme<any>()
    // boxShadow = theme.palette.mode === ThemeType.DARK ? boxShadow || true : boxShadow

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor:
            theme.palette.mode === ThemeType.DARK ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow:
            sx.boxShadow && (!border || theme.palette.mode === ThemeType.DARK)
              ? shadow || theme.customShadows.z1
              : 'inherit',
          ':hover': {
            boxShadow: sx.boxShadow ? shadow || theme.customShadows.z1 : 'inherit',
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem',
          },
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Highlighter codeHighlight={codeHighlight} main>
              {children}
            </Highlighter>
          </>
        )}
      </Card>
    )
  },
)

export default MainCard
