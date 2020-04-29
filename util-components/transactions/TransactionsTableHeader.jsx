import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { VisuallyHiden, StyledTableHead } from '@components/businessOwner/transactions/styles'
import Typography from '@material-ui/core/Typography'

const TransactionsTableHeader = ({ queryParams, setQueryParams }) => {
  const headCells = [
    { id: 'date', numeric: false, disablePadding: false, label: 'Transaction Date' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'debit', numeric: true, disablePadding: false, label: 'Debit ($)' },
    { id: 'credit', numeric: true, disablePadding: false, label: 'Credit ($)' },
    { id: 'balance', numeric: true, disablePadding: false, label: 'Balance ($)' }
  ]

  const setSortOrder = () =>
    setQueryParams((queryParams) => ({
      ...queryParams,
      sort: queryParams.sort === 'asc' ? 'desc' : 'asc'
    }))

  const calculateAlignment = (cell) => {
    const { id, numeric } = cell
    if (id === 'balance') {
      return 'center'
    }
    return numeric ? 'right' : 'left'
  }

  return (
    <StyledTableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            size='medium'
            align={calculateAlignment(headCell)}
            padding='default'
            sortDirection={headCell.id === 'date' ? queryParams.sort : false}
          >
            {headCell.id === 'date' ? (
              <TableSortLabel
                active
                direction={queryParams.sort}
                onClick={setSortOrder}
              >
                <Typography variant='body1'>{headCell.label}</Typography>
                {headCell.id === 'date' ? (
                  <VisuallyHiden>
                    {queryParams.sort === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </VisuallyHiden>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography variant='body1'>{headCell.label}</Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  )
}

export default TransactionsTableHeader
