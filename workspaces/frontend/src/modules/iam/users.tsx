/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import DataTable from 'src/components/DataTable'
import { GridColDef } from '@mui/x-data-grid'

const columnsUsers: GridColDef[] = [
  { field: 'ID' },
  { field: 'Username' },
  { field: 'Fullname' },
  { field: 'Role' },
]

const Users = () => {
  return (
    <DataTable
      header={columnsUsers}
    />
  )
}

export default Users
