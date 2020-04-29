import React, { useState, useEffect } from 'react'
import ConnectWidget from '@components/businessOwner/finicityConnections/ConnectWidget'
import SearchConnections from './SearchConnections'
import ConnectionsList from './ConnectionsList'
import MuiAlert from '@material-ui/lab/Alert'
import { Notification } from '@utils'
import { LinkFinicityContainer, SearchContent, PadForm } from './styles'
import { useRequest } from '@hooks'
import { fetchConnectionsUrl } from '@urls'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { useEntities } from '@context'
import LinkAccountForm from '@components/Connections/LinkAccountForm'
import { BackButton } from '@components/common'

const FinicityConnections = ({ closeModal, setReloadConnectionsTrigger, reloadConnectionsTrigger }) => {
  const { selectedEntity } = useEntities()
  const [filteredValue, setFilteredValue] = useState('')

  const {
    error: filterAccountListError,
    loading: filterAccountListPending,
    data: filteredAccounts,
    callApi
  } = useRequest()
  const [accounts, setAccounts] = useState({ data: [] })

  const onSearchSubmitted = (filter) => {
    setFilteredValue(filter)
  }

  const clearFilters = () => {
    setFilteredValue('')
  }
  useEffect(() => {
    if (filteredAccounts) {
      setAccounts(c => ({ ...c, data: filteredAccounts.data }))
    }
  }, [filteredAccounts, filterAccountListPending])

  useEffect(() => {
    if (!filteredValue) {
      setAccounts(c => ({ ...c, data: [] }))
    }
  }, [filteredValue])

  useEffect(() => {
    if (filterAccountListPending) {
      setAccounts(c => ({ ...c, data: [] }))
    }
  }, [filterAccountListPending])

  useEffect(() => {
    if (
      filteredValue &&
      !filterAccountListPending &&
      filteredValue.length > 3
    ) {
      callApi(fetchConnectionsUrl(filteredValue))
    }
  // eslint-disable-next-line
  }, [filteredValue])

  return (
    <LinkFinicityContainer>
      {!selectedEntity && (
        <MuiAlert elevation={0} variant='filled' severity='warning'>
          Please select an entity
        </MuiAlert>
      )}
      {filterAccountListError && (
        <Notification type='error' message={filterAccountListError.info} />
      )}
      <SearchContent>
        <Router basename='/connect-account'>
          <Route exact path='/'>
            <>
              <SearchConnections
                disabled={!selectedEntity}
                autoFocus
                placeholder='Search for a financial institution'
                resetFilters={clearFilters}
                onSubmit={onSearchSubmitted}
              />
              <ConnectionsList
                filterAccountListPending={filterAccountListPending}
                filteredAccounts={accounts}
                entity={selectedEntity}
                searchTerm={filteredValue}
              />
            </>
          </Route>
          <Route
            exact
            render={({ match }) => {
              const { id } = match.params
              if (!accounts || !accounts.data.length) {
                return <Redirect to='/' />
              }
              const selectedInstitution = accounts.data.find(
                (account) => account.id === parseInt(id)
              )
              return <ConnectWidget reloadConnectionsTrigger={reloadConnectionsTrigger} setReloadConnectionsTrigger={setReloadConnectionsTrigger} closeModal={closeModal} selectedInstitution={selectedInstitution} />
            }}
            path='/:id/widget'
          />
          <Route exact path='/link-account'>
            <PadForm item xs={12}>
              <>
                <BackButton to='/' />
                <LinkAccountForm />
              </>
            </PadForm>
          </Route>
        </Router>

      </SearchContent>
    </LinkFinicityContainer>
  )
}

export default FinicityConnections
