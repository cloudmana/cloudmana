/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useEffect, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'
import { ThemeType } from 'src/models/theme'

// chart options
const barChartOptions: any = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
}

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
  const theme = useTheme()

  const { primary, secondary } = theme.palette.text
  const info = theme.palette.info.light

  const [series] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78],
    },
  ])

  const [options, setOptions] = useState(barChartOptions)

  useEffect(() => {
    setOptions((prevState: any) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
          },
        },
      },
      tooltip: {
        theme: theme.palette.mode,
      },
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary])

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  )
}

export default MonthlyBarChart
