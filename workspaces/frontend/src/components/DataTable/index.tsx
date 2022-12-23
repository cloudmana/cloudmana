/**
 * @since 2022/12/23
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Theme, styled } from '@mui/material/styles'
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridColDef,
  DataGridProps,
} from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import LinearProgress from '@mui/material/LinearProgress'
import PaginationItem from '@mui/material/PaginationItem'

export interface TableRowProps {}

export interface DataTableProps {
  header?: GridColDef[]
  disableHeader?: boolean
  data?: TableRowProps[] | any[]
  tableProps?: DataGridProps
}

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
})

function customCheckbox(theme: Theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  }
}

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
  // '& .MuiDataGrid-iconSeparator': {
  //   display: 'none',
  // },
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
  ...customCheckbox(theme),
}))

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Typography style={{ flex: 1 }}>Implement search</Typography>
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    </div>
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
        loading={false}
        {...tableProps}
      />
    </div>
  )
}

export default DataTable
