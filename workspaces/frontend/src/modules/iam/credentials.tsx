/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import DataTable from 'src/components/DataTable'
import { GridColDef } from '@mui/x-data-grid'
import { useCredentialsList } from 'src/services/credentials/credentials.queries'

const columnsCredentials: GridColDef[] = [
  { field: '_id' },
  { field: 'providerId' },
  { field: 'accessKeyId' },
  { field: 'secretAccessKey' },
  { field: 'userId' },
  { field: 'createdAt' },
  { field: 'updatedAt' },
]

const Credentials = () => {
  const { data, isLoading } = useCredentialsList({})

  return (
    <DataTable
      header={columnsCredentials}
      data={data}
      tableProps={{
        loading: isLoading,
      }}
    />
  )
}

export default Credentials
