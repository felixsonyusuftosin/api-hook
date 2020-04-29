import React from 'react'
import { TransactionsTableContainer, NothingFound } from './styles'
import { TableLoader } from '@components/common'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TransactionsTableHeader from '@components/businessOwner/transactions/TransactionsTableHeader'
import TransactionsTableBody from '@components/businessOwner/transactions/TransactionsTableBody'

const TransactionsTable = ({ fetchingTransaction, transactionsData, queryParams, setQueryParams, account }) => {
  return (
    <TransactionsTableContainer item xs={12} container>
      {fetchingTransaction && <TableLoader />}
      {!transactionsData.length && !fetchingTransaction && (
        <NothingFound align='left' style={{ whiteSpace: 'normal', color: '#999' }} component='span' variant='h6' display='block'>
            No transaction was found within the date range specified
        </NothingFound>
      )}
      {!fetchingTransaction && transactionsData.length > 0 && account && (
        <TableContainer>
          <Table
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <TransactionsTableHeader queryParams={queryParams} setQueryParams={setQueryParams} />
            <TransactionsTableBody account={account} transactionsData={transactionsData} />
          </Table>
        </TableContainer>

      )}

    </TransactionsTableContainer>
  )
}
export default TransactionsTable
