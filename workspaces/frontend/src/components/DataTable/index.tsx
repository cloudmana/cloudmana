/**
 * @since 2022/12/23
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { DataGrid, GridColDef, DataGridProps } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import LinearProgress from '@mui/material/LinearProgress'
import Input from 'src/components/Input'

export interface TableRowProps {}

export interface DataTableProps {
  header?: GridColDef[]
  disableHeader?: boolean
  data?: TableRowProps[] | any[]
  tableProps?: Omit<DataGridProps, 'rows' | 'columns'>
}

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
})

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-main': {
    border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
    borderRadius: 2,
  },
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader': {
    fontWeight: 'bold',
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#191919',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'unset',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within, .MuiDataGrid-cell:focus':
    {
      outline: 'none',
    },
  '& .MuiDataGrid-footerContainer': {
    border: 0,
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}))

const PaginationWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))

function CustomPagination() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <PaginationWrapper>
      <Typography style={{ flex: 1 }}>
        <Input label="Find anythings" style={{ width: '90%' }} />
      </Typography>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PaginationWrapper>
  )
}

const DataTable = (props: DataTableProps) => {
  const { header, data = [], tableProps = {} } = props
  const classes = useStyles()
  const [dataTableHeader, setDataTableHeader] = useState<GridColDef[] | any[]>([])
  const dataGridRef = useRef(null)

  const tableHeader: any = () => {
    setDataTableHeader(
      (header || [...new Set(data.map((item) => Object.keys(item)).flat(1))]).map(
        (key: string | GridColDef) => {
          const output: GridColDef = {
            field: '',
            flex: 1,
            minWidth: 100,
          }
          if (typeof key !== 'string') {
            return Object.assign(output, {
              headerName: key.field,
              ...key,
            })
          } else {
            return Object.assign(output, {
              field: key,
              headerName: key,
            })
          }
        },
      ),
    )
  }

  useEffect(() => {
    tableHeader()
  }, [])

  return (
    <div ref={dataGridRef}>
      <StyledDataGrid
        className={classes.grid}
        rows={data}
        columns={dataTableHeader}
        autoHeight={true}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress,
        }}
        hideFooterSelectedRowCount
        getRowId={(row) => row._id}
        {...tableProps}
      />
    </div>
  )
}

export default DataTable
