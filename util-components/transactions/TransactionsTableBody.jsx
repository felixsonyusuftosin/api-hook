import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { StyledTableBody } from '@components/businessOwner/transactions/styles'
import { transformTransactionData } from '@components/businessOwner/transactions/utils'

const TransactionsTableBody = ({ transactionsData, account }) => {
  const [transaformedData, setTransaformedData] = useState([])
  const [firstBalance, setFirstBalance] = useState({})
  const [lastBalance, setLastBalance] = useState({})

  useEffect(() => {
    const { data, firstBalance, lastBalance } = transformTransactionData(transactionsData, account)
    setFirstBalance(firstBalance)
    setLastBalance(lastBalance)
    setTransaformedData(data)
  }, [transactionsData, account])

  return (
    <StyledTableBody>
      <TableRow hover role='checkbox'>
        <TableCell align='left'>
          <Typography variant='body1'><b>{firstBalance.date}</b></Typography>
        </TableCell>
        <TableCell align='left'> </TableCell>
        <TableCell align='right'> </TableCell>
        <TableCell align='right'> </TableCell>
        <TableCell align='left'> </TableCell>
        <TableCell align='center'>
          <Typography variant='body1'><b>{firstBalance.balance}</b></Typography>
        </TableCell>
      </TableRow>
      {transaformedData.map((row) => (
        <TableRow key={row.id} hover role='checkbox'>
          <TableCell align='left'>{row.date}</TableCell>
          <TableCell align='left'>{row.description}</TableCell>
          <TableCell align='left'>{row.category}</TableCell>
          <TableCell align='right'>{row.debit}</TableCell>
          <TableCell align='right'>{row.credit}</TableCell>
          <TableCell align='center'>
            <b>{row.balance}</b>
          </TableCell>
        </TableRow>
      ))}
      <TableRow hover role='checkbox'>
        <TableCell align='left'>
          <b>{lastBalance.date}</b>
        </TableCell>
        <TableCell align='left'> </TableCell>
        <TableCell align='right'> </TableCell>
        <TableCell align='right'> </TableCell>
        <TableCell align='left'> </TableCell>
        <TableCell align='center'>
          <Typography variant='body1'><b>{lastBalance.balance}</b></Typography>
        </TableCell>
      </TableRow>
    </StyledTableBody>
  )
}
export default TransactionsTableBody
