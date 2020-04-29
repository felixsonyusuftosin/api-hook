import React, { useState, useEffect } from 'react'
import { Bar, StyledTextField, TransactionTableControlContainer } from '@components/businessOwner/transactions/styles'
import { formatDate, parseBundleIntoParam } from '@utils'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { ActionButtons, ControlContainer } from './styles'
import { useRequest } from '@hooks'
import { getTransactionsCsv } from '@urls'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'
import FileSaver from 'file-saver'
import { useEntities } from '@context'

const saveFile = (fileData, fileName) => FileSaver.saveAs(fileData, fileName)

const TableControl = ({
  queryParams,
  setQueryParams,
  handleOpenPreviewModal,
  account,
  entityId,
  accountId
}) => {
  const queryParameters = parseBundleIntoParam(queryParams)
  const options = { responseType: 'blob' }
  const {
    loading: fetchingCsv,
    error: errorFetchingCsv,
    data: csv,
    callApi
  } = useRequest(options)
  const [open, setOpen] = useState(false)
  const { selectedEntity } = useEntities()
  const { name: entityName } = selectedEntity || { }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const setFromDate = (fromDate) =>
    setQueryParams((queryParams) => ({
      ...queryParams,
      fromDate: formatDate(fromDate)
    }))
  const setToDate = (toDate) =>
    setQueryParams((queryParams) => ({
      ...queryParams,
      toDate: formatDate(toDate)
    }))
  const downloadCsv = () => {
    const { name, institutionName } = account
    if (!fetchingCsv) {
      callApi(getTransactionsCsv(entityId, accountId, institutionName, name, queryParameters.toString()))
    }
  }
  useEffect(() => {
    if (csv) {
      const { institutionName, name } = account
      const { fromDate, toDate } = queryParams
      const accountName = `${entityName}-${institutionName}-${name}-From-${formatDate(fromDate)}-to-${formatDate(toDate)}.csv`
      saveFile(csv, accountName)
    }
  // eslint-disable-next-line
  }, [csv])

  return (
    <TransactionTableControlContainer>
      {
        errorFetchingCsv && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              elevation={6}
              variant='filled'
              onClose={handleClose}
              severity='error'
            >
              {errorFetchingCsv ? errorFetchingCsv.info : 'Could not download csv'}
            </MuiAlert>
          </Snackbar>
        )
      }
      <ControlContainer>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Bar elevation={0}>
            <StyledTextField
              margin='normal'
              id='from-date'
              label='From Date'
              format='MM/dd/yyyy'
              value={queryParams.fromDate}
              disableFuture
              onChange={setFromDate}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <StyledTextField
              margin='normal'
              id='to-date'
              label='To Date'
              format='MM/dd/yyyy'
              value={queryParams.toDate}
              onChange={setToDate}
              disableFuture
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Bar>
        </MuiPickersUtilsProvider>
        <ActionButtons>
          <p>Export</p>
          <ButtonGroup disableElevation variant='outlined' color='primary'>
            <Button onClick={handleOpenPreviewModal}>PDF</Button>
            <Button endIcon={fetchingCsv && (<CircularProgress size={24} />)} onClick={downloadCsv} disabled={fetchingCsv}>CSV</Button>
          </ButtonGroup>
        </ActionButtons>
      </ControlContainer>
    </TransactionTableControlContainer>
  )
}

export default TableControl
