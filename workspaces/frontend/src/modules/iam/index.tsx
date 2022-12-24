/**
 * @since 2022/12/22
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { SyntheticEvent, useState } from 'react'

// project import
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { KeyOutlined, TeamOutlined } from '@ant-design/icons'

import MainCard from 'src/components/MainCard'
import Credentials from './credentials'
import Users from './users'

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
      {value === index && children}
    </div>
  )
}

const Iam = () => {
  const [value, setValue] = useState(0)

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
        <Users />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Credentials />
      </TabPanel>
    </MainCard>
  )
}

export default Iam
