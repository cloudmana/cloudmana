/**
 * @since 2022/12/22
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { SyntheticEvent, useState } from 'react'

// material-ui
import { Typography } from '@mui/material'

// project import
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { KeyOutlined, TeamOutlined } from '@ant-design/icons'

import MainCard from 'src/components/MainCard'
import DataTable from 'src/components/DataTable'
import { GridColDef } from '@mui/x-data-grid'

// ==============================|| DASHBOARD - DEFAULT ||============================== //
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography component={'span'}>{children}</Typography>}
    </div>
  )
}

const columnsUsers: GridColDef[] = [
  { field: 'ID' },
  { field: 'Username' },
  { field: 'Fullname' },
  { field: 'Role' },
]
const columnsCredentials: GridColDef[] = [
  { field: 'ID' },
  { field: 'AccessKey' },
  { field: 'Owner' },
]

const Iam = () => {
  const [value, setValue] = useState(0)
  const [order] = useState('asc')
  const [orderBy] = useState('trackingNo')
  const [selected] = useState<any>([])

  const isSelected = (trackingNo: any) => selected.indexOf(trackingNo) !== -1

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <MainCard
      title={
        <Tabs value={value} onChange={handleChange} aria-label="icon position tabs example">
          <Tab icon={<TeamOutlined />} iconPosition="start" label="Users" />
          <Tab icon={<KeyOutlined />} iconPosition="start" label="Credentials" />
        </Tabs>
      }
    >
      <TabPanel value={value} index={0}>
        <DataTable header={columnsUsers} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataTable
          header={columnsCredentials}
          data={Array(10)
            .fill(0)
            .map(() => ({
              id: Math.round(Math.random() * 10000),
              ID: Math.round(Math.random() * 10000),
              AccessKey: 'AccessKey',
              Owner: '523423432',
            }))}
        />
      </TabPanel>
    </MainCard>
  )
}

export default Iam
