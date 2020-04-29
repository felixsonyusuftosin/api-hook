import React, { useEffect, useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { useEntities } from '@context'
import { getFinicityAccounts } from '@urls'
import { formatDate, formatAccountNumber } from '@utils'
import { transformTransactionData } from '@components/businessOwner/transactions/utils'
import { useLocation } from 'react-router-dom'
import { useRequest } from '@hooks'
import {
  TransactionSummaryContainer,
  NothingFound,
  SummaryListItem
} from '@components/businessOwner/transactions/styles'

const TransactionSummary = ({
  transactionsData,
  fetchingTransaction,
  queryParams
}) => {
  const { fromDate, toDate } = queryParams
  const location = useLocation()
  const { search } = location
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [open, setOpen] = useState(null)
  const params = new URLSearchParams(search)
  const accountId = params.get('accountId')
  const { selectedEntity } = useEntities()
  const { id: entityId } = selectedEntity || {}
  const [summaryInfo, setSummaryInfo] = useState({
    accountName: '',
    firstBalance: '',
    lastBalance: '',
    accountNumber: '',
    fromDate: formatDate(fromDate),
    toDate: formatDate(toDate)
  })

  const {
    error: errorLoadingAccounts,
    loading: fetchingAccounts,
    data: accounts,
    callApi: callAccounts
  } = useRequest()

  useEffect(() => {
    if (selectedAccount) {
      const {
        firstBalance: firstBalanceData,
        lastBalance: lastBalanceData
      } = transformTransactionData(transactionsData, selectedAccount)
      const { name, number: accountNumber, institutionName } = selectedAccount
      setSummaryInfo((summaryInfo) => ({
        ...summaryInfo,
        accountName: `${institutionName} /${name}`,
        accountNumber: formatAccountNumber(accountNumber),
        firstBalance: `${firstBalanceData.balance}`,
        lastBalance: `${lastBalanceData.balance}`,
        fromDate: formatDate(queryParams.fromDate),
        toDate: formatDate(queryParams.toDate)
      }))
    }
  }, [selectedAccount, transactionsData, queryParams])

  useEffect(() => {
    if (entityId && accountId) {
      callAccounts(getFinicityAccounts(entityId))
    }
  }, [entityId, accountId, callAccounts])

  useEffect(() => {
    if (accounts) {
      const account = accounts.data.accounts.find((x) => x.id === accountId)
      setSelectedAccount(account)
    }
  }, [accountId, accounts])

  useEffect(() => {
    if (errorLoadingAccounts) {
      setOpen(errorLoadingAccounts)
    }
  }, [errorLoadingAccounts])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  if (!entityId || !accountId) {
    return <div />
  }

  return (
    <>
      {(fetchingAccounts || fetchingTransaction) ? (
        <TransactionSummaryContainer>
          <Skeleton animation='pulse' width={230} height={15} />
          <Skeleton animation='wave' width={100} height={15} />
          <Skeleton animation='pulse' width={230} height={15} />
          <Skeleton animation='wave' width={100} height={15} />
        </TransactionSummaryContainer>
      ) : (
        <TransactionSummaryContainer>
          {!selectedAccount && !fetchingAccounts && !errorLoadingAccounts && (
            <NothingFound>Invalid account selected </NothingFound>
          )}
          {errorLoadingAccounts && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <MuiAlert
                elevation={6}
                variant='filled'
                onClose={handleClose}
                severity='error'
              >
                {errorLoadingAccounts
                  ? errorLoadingAccounts.info
                  : 'Could not load the requested resource'}
              </MuiAlert>
            </Snackbar>
          )}
          {!selectedAccount && !fetchingAccounts && !errorLoadingAccounts && (
            <NothingFound>Invalid account selected </NothingFound>
          )}
          {selectedAccount && transactionsData.length > 0 && (
            <List
              aria-labelledby='nested-list-subheader'
              dense
              disablePadding
              subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                  {`${summaryInfo.accountName} Account Summary`}
                </ListSubheader>
              }
            >
              <SummaryListItem dense divider>
                <ListItemText
                  primary='Account Name'
                  secondary={summaryInfo.accountName}
                />
              </SummaryListItem>
              <SummaryListItem dense divider>
                <ListItemText
                  primary='Account Number'
                  secondary={summaryInfo.accountNumber}
                />
              </SummaryListItem>
              <SummaryListItem dense divider>
                <ListItemText
                  primary='Begining Balance'
                  secondary={summaryInfo.firstBalance}
                />
              </SummaryListItem>
              <SummaryListItem dense divider>
                <ListItemText
                  primary='Begining Balance Date'
                  secondary={summaryInfo.fromDate}
                />
              </SummaryListItem>
              <SummaryListItem dense divider>
                <ListItemText
                  primary='Ending Balance'
                  secondary={summaryInfo.lastBalance}
                />
              </SummaryListItem>
              <SummaryListItem dense divider>
                <ListItemText
                  primary='Ending Balance Date'
                  secondary={summaryInfo.toDate}
                />
              </SummaryListItem>
            </List>
          )}
        </TransactionSummaryContainer>
      )}
    </>
  )
}

export default TransactionSummary
