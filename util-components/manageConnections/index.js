import React, { useState, useEffect } from 'react'
import {
  StyledGrid,
  StyledContainer,
  StyledAvatar,
  MainContent,
  Row,
  BorderedRow,
  AddAccountBtn,
  StyledGridBordered
} from './styles'
import { useEntities } from '@context'
import { convertStringToTitleCase, getBundleFromString } from '@utils'
import { useHistory, Redirect } from 'react-router-dom'
import FinicityConnections from '@components/businessOwner/finicityConnections'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ListFicinnicityConnections from '@components/businessOwner/listConnections'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { UserSearch } from '@components/common'

const ManageConnections = () => {
  const { selectedEntity } = useEntities()
  const [paths, setPaths] = useState([])
  // TODO please move this temproraryfix to context
  const [reloadConnectionsTrigger, trigger] = useState(0)
  const [lastPath, setLastPath] = useState('')
  const [accountsFilter, setAccountFilter] = useState('')
  const history = useHistory()
  const { location } = history
  const { search, pathname } = location
  const { entityId } = getBundleFromString(search) || {}
  const { name = '' } = selectedEntity || {}
  const [connectionsisvisible, setConnectionsVisibility] = useState(false)

  const toggleConnections = () => {
    setConnectionsVisibility(!connectionsisvisible)
  }

  useEffect(() => {
    const temp = pathname.split('/')
    setLastPath(temp.pop())
    setPaths(c => temp)
  // eslint-disable-next-line
  }, [pathname])

  const handlAccountFilter = (ev) => {
    setAccountFilter(ev)
  }

  if (!selectedEntity && !entityId) {
    return <Redirect to={{ path: '/', search }} />
  }
  const setReloadConnectionsTrigger = (newValue) => {
    trigger(newValue)
  }

  return (
    <StyledContainer wrap='no-wrap'>
      <Grid item xs={12}>
        <Grid item>
          <StyledAvatar component='span'>{name[0]}</StyledAvatar>
          &nbsp;&nbsp;
          <Typography variant='h4' component='span' noWrap>
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Row item xs={12}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='#'>
            {name}
          </Link>
          {paths.length && paths.map((path) => (
            path && (
              <Link key='path' color='inherit' href='#'>
                {convertStringToTitleCase(path)}
              </Link>)
          ))}
          <Link color='textPrimary' href='#' aria-current='page'>
            {convertStringToTitleCase(lastPath)}
          </Link>
        </Breadcrumbs>
      </Row>

      <BorderedRow item xs={12}>
        <UserSearch onChange={handlAccountFilter} />
        <AddAccountBtn variant='contained' size='small' color='primary' onClick={toggleConnections}> Connect Account </AddAccountBtn>
      </BorderedRow>

      <MainContent>
        <StyledGridBordered connectionsisvisible={connectionsisvisible.toString()} item xs={connectionsisvisible ? 7 : 12}>
          <Row> <Typography variant='h5'>Bank Connections </Typography></Row>
          <ListFicinnicityConnections reloadConnectionsTrigger={reloadConnectionsTrigger} connectionsisvisible={connectionsisvisible} accountsFilter={accountsFilter} selectedEntity={selectedEntity || {}} />
        </StyledGridBordered>
        {connectionsisvisible && (
          <StyledGrid
            elevation={0}
            item
            xs={4}
          >
            <Row><Typography variant='h5'>Manage Connections </Typography></Row>
            <FinicityConnections reloadConnectionsTrigger={reloadConnectionsTrigger} setReloadConnectionsTrigger={setReloadConnectionsTrigger} closeModal={toggleConnections} />
          </StyledGrid>
        )}
      </MainContent>
    </StyledContainer>
  )
}

export default ManageConnections
