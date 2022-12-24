/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import DataTable from 'src/components/DataTable'
import { GridColDef } from '@mui/x-data-grid'
import { Button, Typography } from '@mui/material'
import { useCredentialsList } from 'src/services/credentials/credentials.queries'
import ButtonAction from 'src/components/ButtonGroup/menu'
import ModalCredentialsImport from './components/ModalCredentialsImport'
import { useState } from 'react'

const columnsCredentials: GridColDef[] = [
  { field: '_id', headerName: 'ID' },
  { field: 'provider', headerName: 'Provider', valueGetter: (params) => params.row.provider.name },
  { field: 'accessKeyId', headerName: 'AccessKeyId' },
  { field: 'secretAccessKey', headerName: 'SecretAccessKey' },
  { field: 'user', headerName: 'Owner', valueGetter: (params) => params.row.user.username },
  {
    field: 'createdAt',
    headerName: 'CreatedDate',
    valueGetter: (params) => new Date(params.row.createdAt).toUTCString(),
  },
  {
    field: 'updatedAt',
    headerName: 'UpdatedDate',
    valueGetter: (params) => new Date(params.row.updatedAt).toUTCString(),
  },
]

const Credentials = () => {
  const [openModalImport, setOpenModalImport] = useState<boolean>(false)
  const { data, isLoading } = useCredentialsList({ params: { page: 1, limit: 10 } })

  const handleImportClick = () => {
    setOpenModalImport(true)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '5px',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5' sx={{ flex: 1 }} component="div">
          <b>Credentials ({data?.length || 0})</b>
        </Typography>
        <ButtonAction />
        <Button variant="contained" onClick={handleImportClick} style={{ marginLeft: '10px' }}>
          Import
        </Button>
        <ModalCredentialsImport open={openModalImport} setOpen={setOpenModalImport} />
      </div>
      <DataTable
        header={columnsCredentials}
        data={data}
        tableProps={{
          loading: isLoading,
        }}
      />
    </>
  )
}

export default Credentials
