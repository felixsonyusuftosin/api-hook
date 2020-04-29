import React from 'react'
import { Link } from 'react-router-dom'
import { PaddedListItem } from '@components/businessOwner/listConnections/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { formatAccountNumber } from '@utils'
import Button from '@material-ui/core/Button'

const ConnectionCard = ({ account, entityId }) => {
  const { name, number, balance, id } = account
  const transactionLink = `/transactions?entityId=${entityId}&accountId=${id}`
  return (
    <PaddedListItem component='li' divider dense disableGutters alignItems='center' button key={number}>
      <ListItemAvatar>
        <Avatar>{name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText id={number} primary={`${name} - ${formatAccountNumber(number)}`} secondary={`Balance - USD ${balance}`} />
      <ListItemSecondaryAction>
        <Button
          component={Link}
          to={transactionLink}
          variant='outlined'
          color='secondary'
          size='small'
        >
          DETAILS
        </Button>
      </ListItemSecondaryAction>

    </PaddedListItem>

  )
}

export default ConnectionCard
