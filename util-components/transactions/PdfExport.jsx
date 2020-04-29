import React, { useState } from 'react'
import {
  PDFContainer,
  PDFRow,
  ButtonProgress
} from '@components/businessOwner/transactions/styles'
import TransactionSummary from '@components/businessOwner/transactions/TransactionSummary'
import TransactionsTable from '@components/businessOwner/transactions/TransactionsTable'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'

export const PDFExport = ({
  title,
  transactionsData,
  fetchingTransaction,
  queryParams,
  setQueryParams,
  account,
  fetchingTransactionForTable
}) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPDF = () => {
    if (!isDownloading) {
      setIsDownloading(true)
      // run the method to compute and download pdf here
      // finally set the download flag to false as below
      // setIsDownloading(false)
    }
  }

  return (
    <PDFContainer item container xs={12}>
      <PDFRow>
        <Button
          variant='contained'
          color='primary'
          size='small'
          startIcon={<GetAppIcon />}
          disabled={isDownloading}
          onClick={downloadPDF}
        >
          Download
        </Button>
        <Typography variant='h5'>{title}</Typography>
        {isDownloading && <ButtonProgress size={24} />}
      </PDFRow>
      <PDFRow>
        <TransactionSummary
          transactionsData={transactionsData}
          fetchingTransaction={fetchingTransaction}
          queryParams={queryParams}
        />
      </PDFRow>
      <PDFRow>
        <TransactionsTable
          fetchingTransaction={fetchingTransactionForTable}
          transactionsData={transactionsData}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          account={account}
        />
      </PDFRow>
    </PDFContainer>
  )
}
