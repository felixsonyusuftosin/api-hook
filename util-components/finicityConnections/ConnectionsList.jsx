import React from 'react'
import { AccountListItem, StyledLink, StyledButton } from './styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Skeleton from '@material-ui/lab/Skeleton'
import CommentIcon from '@material-ui/icons/Comment'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import { useHistoryDeeplinking } from '@context'
import { useHistory, useLocation } from 'react-router-dom'

const ConnectionsList = ({
  filterAccountListPending,
  filteredAccounts,
  entity,
  searchTerm
}) => {
  const history = useHistory()
  const location = useLocation()
  const { search, state, hash } = location
  const { setBundle } = useHistoryDeeplinking()
  const handleButtonClick = () => {
    setBundle({
      stage: 'fetched-notfound',
      entityId: entity.id,
      searchTerm
    })
    history.push(`/link-account?stage=fetched-notfound&entityId=${entity.id}&searchTerm=${searchTerm}`)
  }

  return (
    <AccountListItem elevation={0}>
      {filterAccountListPending && <Loading />}
      {filteredAccounts.data && searchTerm ? (

        <StyledButton onClick={handleButtonClick} variant='outlined' color='primary'>
          Cant FInd What you are looking for?
        </StyledButton>

      ) : null}
      {filteredAccounts && (
        <List dense>
          {filteredAccounts.data.map(
            (account) =>
              account && (
                <ListItem button divider key={account.id}>
                  <StyledLink to={{
                    pathname: `${account.id}/widget`,
                    search,
                    state,
                    hash
                  }}
                  >
                    <ListItemAvatar>
                      {account.logo ? (
                        <Avatar alt={account.name} src={account.icon} />
                      ) : (
                        <Avatar>{account.name && account.name[0]} </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText primary={account.name} />
                    <ListItemSecondaryAction>
                      <IconButton edge='end' aria-label='comments'>
                        <CommentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </StyledLink>
                </ListItem>
              )
          )}
        </List>
      )}
    </AccountListItem>
  )
}

const Loading = () => (
  <>
    <Skeleton />
    <Skeleton animation={false} />
    <Skeleton />
    <Skeleton animation='wave' />
    <Skeleton animation='wave' />
  </>
)

export default ConnectionsList
