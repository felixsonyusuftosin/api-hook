import React, { useEffect, useState } from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import { TablePaginationContainer } from '@components/businessOwner/transactions/styles'

const Pagination = ({ found, setQueryParams, queryParams }) => {
  const [rowsPerPageOptions, setRowPerPageOptions] = useState([])
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    const newStart = queryParams.limit * newPage
    setPage(newPage)
    setQueryParams((queryParams) => ({ ...queryParams, start: newStart }))
  }
  useEffect(() => {
    const marks = []
    for (let i = 0; i < 11; i++) {
      if (i !== 0) {
        marks.push(i * 10)
      }
    }
    setRowPerPageOptions(marks)
    // eslint-disable-next-line
  }, [queryParams])

  const setLimit = (limit) =>
    setQueryParams((queryParams) => ({ ...queryParams, limit }))

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setLimit(event.target.value)
    setQueryParams((queryParams) => ({ ...queryParams, start: 1 }))
  }

  return (
    <TablePaginationContainer elevation={0}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={Math.ceil(found / queryParams.limit)}
        rowsPerPage={queryParams.limit}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TablePaginationContainer>
  )
}

export default Pagination
