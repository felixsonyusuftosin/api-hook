import React, { useEffect, useState } from 'react'
import { getTransactions, getFinicityAccounts } from '@urls'
import { useRequest } from '@hooks'
import { useEntities } from '@context'
import { useLocation, Redirect } from 'react-router-dom'
import {
  getFirstDayOfYear,
  parseBundleIntoParam,
  convertStringToTitleCase
} from '@utils'
import {
  TransactionsContainer,
  StyledAvatar,
  Row,
  BareLink,
  BreadCrumbLoading,
  ControlContainer
} from '@components/businessOwner/transactions/styles'
import TableControl from '@components/businessOwner/transactions/TableControl'
import { PDFExport } from '@components/businessOwner/transactions/PdfExport'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Pagination from '@components/businessOwner/transactions/pagination'
import TransactionsTable from '@components/businessOwner/transactions/TransactionsTable'
import TransactionSummary from '@components/businessOwner/transactions/TransactionSummary'
import Link from '@material-ui/core/Link'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Skeleton from '@material-ui/lab/Skeleton'
import { FullScreenDialog } from '@components/common'

const Transactions = () => {
  // todo fetch account number from url
  // todo  report error if account number is not found
  const location = useLocation()
  const { search } = location
  const params = new URLSearchParams(search)
  const [open, setOpen] = useState(false)
  const entityId = params.get('entityId')
  const accountId = params.get('accountId')
  const { selectedEntity } = useEntities()
  const { id } = selectedEntity || {}
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [paths, setPaths] = useState([])
  const [lastPath, setLastPath] = useState('')
  const { pathname } = location
  const [transactionsData, setTransactionsData] = useState([])

  useEffect(() => {
    const temp = pathname.split('/')
    setLastPath(temp.pop())
    setPaths((c) => temp)
    // eslint-disable-next-line
  }, [pathname])

  const [queryParams, setQueryParams] = useState({
    limit: 30,
    startPage: 0,
    fromDate: new Date(getFirstDayOfYear()),
    toDate: new Date(),
    sort: 'asc'
  })

  const [paginationItems, setPaginationItems] = useState({
    totalPages: 0,
    moreAvailable: false,
    found: 0
  })

  const {
    data: transactions,
    error: errorLoadingTransactions,
    loading: fetchingTransaction,
    callApi
  } = useRequest()

  const {
    error: errorLoadingAccounts,
    loading: fetchingAccounts,
    data: accounts,
    callApi: callAccounts
  } = useRequest()

  const [openPreviewModal, setOpenPreviewModal] = React.useState(false)

  const handleOpenPreviewModal = () => {
    setOpenPreviewModal(true)
  }

  const handleClosePreviewModal = () => {
    setOpenPreviewModal(false)
  }

  const { name = '' } = selectedEntity || {}

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (entityId) {
      callAccounts(getFinicityAccounts(entityId))
    }
    // eslint-disable-next-line
  }, [entityId, accountId, callAccounts])

  useEffect(() => {
    if (entityId) {
      const queryParameters = parseBundleIntoParam(queryParams)
      callApi(getTransactions(entityId, accountId, queryParameters.toString()))
    }
  }, [accountId, callApi, entityId, queryParams])

  useEffect(() => {
    if (accounts && accountId) {
      const account = accounts.data.accounts.find((x) => x.id === accountId)
      setSelectedAccount(account)
    }
  }, [accounts, accountId, entityId])

  useEffect(() => {
    if (transactions) {
      const { found, moreAvailable } = transactions
      const { limit } = queryParams
      const totalPages = Math.ceil(found / limit)
      setPaginationItems((paginationItems) => ({
        ...paginationItems,
        totalPages,
        moreAvailable,
        found
      }))
      setTransactionsData((transactionsData) => [...transactions.transactions])
    }
    // eslint-disable-next-line
  }, [transactions])

  useEffect(() => {
    if (errorLoadingTransactions || errorLoadingAccounts) {
      setOpen(true)
    }
  }, [errorLoadingAccounts, errorLoadingTransactions])

  if (!id && !entityId && !accountId) {
    return <Redirect push to={{ path: '/', search }} />
  }

  return (
    <Grid item xs={12}>
      <Grid item>
        <StyledAvatar component='span'>{name[0]} </StyledAvatar>
        &nbsp;&nbsp;
        <Typography variant='h4' component='span' noWrap>
          {selectedAccount ? `${name} / ${selectedAccount.institutionName} / ${selectedAccount.name}` : (
            (fetchingTransaction || fetchingAccounts) && (
              <BreadCrumbLoading>
                <Skeleton animation='pulse' width={130} height={15} />
                <Skeleton animation='wave' width={200} height={15} />
              </BreadCrumbLoading>)
          )}
          {(errorLoadingTransactions || errorLoadingAccounts) && (
            'Could not load, Please refresh the page'
          )}

        </Typography>
      </Grid>
      <Row item xs={12}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='#'>
            {name}
          </Link>
          <BareLink color='inherit' to={{ path: '/connect-account', search }}>
            Connect Account
          </BareLink>
          {paths.length &&
            paths.map(
              (path) =>
                path && (
                  <Link key='path' color='inherit' href='#'>
                    {convertStringToTitleCase(path)}
                  </Link>
                )
            )}
          <Link color='textPrimary' href='#' aria-current='page'>
            {convertStringToTitleCase(lastPath)}
          </Link>
        </Breadcrumbs>
      </Row>
      <ControlContainer>
        {(fetchingTransaction || fetchingAccounts) ? (
          <BreadCrumbLoading>
            <Skeleton animation='pulse' width={130} height={15} />
            <Skeleton animation='wave' width={200} height={15} />
          </BreadCrumbLoading>)
          : (
            <TableControl
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              handleOpenPreviewModal={handleOpenPreviewModal}
              account={selectedAccount}
              entityId={entityId}
              accountId={accountId}
            />
          )}

        <TransactionSummary
          transactionsData={transactionsData}
          fetchingTransaction={fetchingTransaction}
          queryParams={queryParams}
        />
      </ControlContainer>
      <TransactionsContainer>
        {errorLoadingTransactions || errorLoadingAccounts ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              elevation={6}
              variant='filled'
              onClose={handleClose}
              severity='error'
            >
              {errorLoadingTransactions
                ? errorLoadingTransactions.info
                : errorLoadingAccounts.info}
            </MuiAlert>
          </Snackbar>
        ) : (
          <>
            <TransactionsTable
              account={selectedAccount}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              fetchingTransaction={fetchingTransaction || fetchingAccounts}
              transactionsData={transactionsData}
            />
            <FullScreenDialog open={openPreviewModal} onClose={handleClosePreviewModal} actionText='Download' action={() => {}}>
              <PDFExport
                title='Statement of Account'
                transactionsData={transactionsData}
                fetchingTransaction={fetchingTransaction}
                fetchingTransactionForTable={fetchingTransaction || fetchingAccounts}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                account={selectedAccount}
              />
            </FullScreenDialog>
          </>
        )}
      </TransactionsContainer>
      {transactionsData.length !== 0 && (!errorLoadingTransactions || !errorLoadingAccounts) && (
        <Pagination
          found={paginationItems.found}
          moreAvailable={paginationItems.moreAvailable}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      )}
    </Grid>
  )
}

export default Transactions
