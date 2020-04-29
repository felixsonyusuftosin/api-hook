import React, { useEffect, useState } from 'react'
import ConnectionCard from '@components/businessOwner/listConnections/ConnectionCard'
import MuiAlert from '@material-ui/lab/Alert'
import { useRequest } from '@hooks'
import { getFinicityAccountsUrl } from '@urls'
import { logger } from '@utils'
import { ListLoader } from '@components/common'
import ConnectedAccountsContainer from '@components/finicityAccounts/accountsTable'

import {
  ConnectionsContainer,
  FullWidthList,
  StyledTypography
} from '@components/businessOwner/listConnections/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'

const transformdata = (accounts) => {
  const banks = accounts.map(account => account.institutionName)
  const uniqueBanks = [...new Set(banks)]
  const data = uniqueBanks.map(bankName => {
    const bankAccounts = accounts.filter(acct => acct.institutionName === bankName)
    const status = bankAccounts[0].status
    return {
      name: bankName,
      subaccounts: bankAccounts.length,
      status: status === 'active' ? 'connected' : 'disconnected',
      accounts: bankAccounts
    }
  }
  )
  return data
}

const ListConnections = ({ selectedEntity, accountsFilter, connectionsisvisible, reloadConnectionsTrigger }) => {
  const { id } = selectedEntity
  const [connections, setConnections] = useState(null)
  const {
    error: connectionsError,
    loading: connectionsPending,
    data,
    callApi
  } = useRequest()

  const [open, setOpen] = React.useState(false)
  const [localCopyofAccounts, setLocalCopyofAccounts] = useState(null)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (id) {
      callApi(`${getFinicityAccountsUrl(id)}?trigger=${reloadConnectionsTrigger}`)
    }
    // eslint-disable-next-line
  }, [id, reloadConnectionsTrigger])

  useEffect(() => {
    setLocalCopyofAccounts(connections)
    return () => setLocalCopyofAccounts(null)
  }, [connections])

  useEffect(() => {
    if (accountsFilter && localCopyofAccounts) {
      const matchingAccounts = connections.filter(account => {
        const joinAllSearchableString = Object.values(account)
          .join()
          .toLowerCase()
        return joinAllSearchableString.includes(accountsFilter.toLowerCase())
      })
      setLocalCopyofAccounts([...matchingAccounts])
    }
    return () => setLocalCopyofAccounts(connections)
    // eslint-disable-next-line
  }, [accountsFilter])

  useEffect(() => {
    if (data) {
      const connections = transformdata(data.data.accounts)
      setConnections(connections)
    }
  }, [data, reloadConnectionsTrigger])

  useEffect(() => {
    if (connectionsError) {
      logger.error(connectionsError.error)
    }
  }, [connectionsError])

  const connectionsData = localCopyofAccounts || []

  return (
    <ConnectionsContainer container spacing={0}>
      {connectionsPending && <ListLoader />}
      {connectionsError && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={0} variant='filled' severity='error'>
            {connectionsError.info}
          </MuiAlert>
        </Snackbar>
      )}
      {connectionsError && (
        <Typography align='left' style={{ whiteSpace: 'normal', color: '#999' }} component='span' variant='h6' display='block'>
             Sorry we could not fetch your connected accounts please try again later
        </Typography>
      )}
      {connections && !connectionsData.length && (
        <StyledTypography align='left' style={{ whiteSpace: 'normal', color: '#999' }} component='span' variant='h6' display='block'>
             There is nothing here
        </StyledTypography>
      )}
      {connections && (
        <FullWidthList divider={true.toString()}>
          {connections.map(connection => (
            <ConnectedAccountsContainer
              key={connection.name}
              connection={connection}
              connectionsisvisible={connectionsisvisible.toString()}
            >
              {
                connection.accounts.map(account => (<ConnectionCard entityId={id} key={account.id} account={account} />))
              }
            </ConnectedAccountsContainer>
          ))}
        </FullWidthList>
      )}
    </ConnectionsContainer>
  )
}

export default ListConnections
