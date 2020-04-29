import React, { useEffect, useState } from 'react'
import { AccountListItem, GridRow, CenteredElement, StyledLink, InfoItem } from './styles'
import { useRequest } from '@hooks'
import { useEntities } from '@context'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { fetchTempFinicityWidgetUrl } from '@urls'
import { MediaProgress, BackButton } from '@components/common'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { logger } from '@utils'

const ConnectWidget = ({ selectedInstitution, closeModal, reloadConnectionsTrigger, setReloadConnectionsTrigger }) => {
  const { selectedEntity = {} } = useEntities()
  const history = useHistory()
  const {
    error: fetchFinnicityConnectUrlError,
    loading: fetchFinnicityConnectUrlPending,
    data: finnicityConnectUrls,
    callApi
  } = useRequest()

  if (!selectedEntity) {
    history.push('/')
  }

  const { id: institutionId } = selectedInstitution
  const { id: customerId } = selectedEntity
  const [open, setOpen] = useState(false)
  const [finicityConnect] = useState(window.finicityConnect)
  const [finicityError, setFinicityError] = useState(null)
  const [successfullyConnected, setConnectionStatus] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (institutionId && customerId) {
      callApi(fetchTempFinicityWidgetUrl(institutionId, customerId, institutionId))
    }
    return () => {
      window.finicityConnect.destroyIFrame()
      setConnectionStatus(false)
      setFinicityError(null)
    }
  }, [callApi, customerId, institutionId])

  useEffect(() => {
    if (successfullyConnected) {
      const trigger = reloadConnectionsTrigger + 1
      setReloadConnectionsTrigger(trigger)
    }
    if (fetchFinnicityConnectUrlError || finicityError || successfullyConnected) {
      setOpen(true)
    }
  // eslint-disable-next-line
  }, [fetchFinnicityConnectUrlError, finicityError, successfullyConnected])

  useEffect(() => {
    if (finnicityConnectUrls) {
      const { widgetUrl: url } = finnicityConnectUrls.data
      finicityConnect.connectIFrame(url.link, {
        selector: '#institutions',
        overlay: 'rgba(255,255,255, 1)',
        error: (err) => setFinicityError(err),
        success: (data) => setConnectionStatus(true),
        cancel: () => history.push('/')
      })
    }
  // eslint-disable-next-line
  }, [finicityConnect, finnicityConnectUrls])

  return (
    <>
      {fetchFinnicityConnectUrlError && (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              elevation={6}
              variant='filled'
              onClose={handleClose}
              severity='error'
            >
              {fetchFinnicityConnectUrlError.info}
            </MuiAlert>
          </Snackbar>
          <InfoItem backgroundcolor='#FEFEFE' elevation={0}>
            <GridRow item style={{ flexShrink: 1 }}>
              <Typography variant='h4' align='center' color='textPrimary'>Something happened</Typography>
              <Typography align='center' style={{ whiteSpace: 'normal' }} component='span' variant='body2' display='block'>
                       We could not connect with your financial institution, please try again later
              </Typography>
            </GridRow>
            <CenteredElement>
              <Button size='large' variant='contained' color='primary' disableElevation>
                <StyledLink to='/'>Add more Accounts</StyledLink>
              </Button>
            </CenteredElement>
          </InfoItem>
        </>
      )}
      {successfullyConnected && (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              elevation={6}
              variant='filled'
              onClose={handleClose}
              severity='success'
            >
            Your connection was successful please follow the prompt to continue
            connecting accounts
            </MuiAlert>
          </Snackbar>
          <InfoItem backgroundcolor='#FEFEFE' elevation={0}>
            <GridRow item style={{ flexShrink: 1 }}>
              <Typography variant='h4' align='center' color='textPrimary'>Successfully connected</Typography>
              <Typography align='center' style={{ whiteSpace: 'normal' }} component='span' variant='body2' display='block'>
              Your connection was successful, please chose the appropriate
              action you want to continue with
              </Typography>
            </GridRow>
            <GridRow>
              <CenteredElement>
                <Button size='large' variant='contained' color='primary' disableElevation>
                  <StyledLink to='/'>Add more Accounts</StyledLink>
                </Button>
              </CenteredElement>
              <CenteredElement>
                <Button size='medium' variant='contained' onClick={closeModal} color='error' disableElevation>
                Done
                </Button>
              </CenteredElement>
            </GridRow>
          </InfoItem>
        </>
      )}
      {finicityError && (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              elevation={6}
              variant='filled'
              onClose={handleClose}
              severity='error'
            >
              {logger.error(finicityError)}
            Sorry we could not connect your account. We have contacted our
            technical team
            </MuiAlert>
          </Snackbar>
          <InfoItem backgroundcolor='#FEFEFE' elevation={0}>
            <GridRow item style={{ flexShrink: 1 }}>
              <Typography variant='h4' align='center' color='textSecondary'>Could not connect</Typography>
              <Typography align='center' style={{ whiteSpace: 'normal' }} component='span' variant='body2' display='block'>
              Your connection was unsuccessful, please chose the appropriate
              action you want to continue with
              </Typography>
            </GridRow>
            <GridRow>
              <CenteredElement>
                <Button size='large' variant='contained' color='primary' disableElevation>
                  <StyledLink to='/'>Add more Accounts</StyledLink>
                </Button>
              </CenteredElement>
              <CenteredElement>
                <Button size='medium' variant='contained' onClick={closeModal} color='error' disableElevation>
                Done
                </Button>
              </CenteredElement>
            </GridRow>
          </InfoItem>
        </>
      )}

      {fetchFinnicityConnectUrlPending && <MediaProgress />}
      {finnicityConnectUrls && finnicityConnectUrls.data && (
        <>
          <BackButton to='/' />
          <AccountListItem backgroundcolor='#FEFEFE' elevation={0}>
            <div
              id='institutions'
              style={{
                marginTop: '10px',
                position: 'relative',
                height: '800px',
                width: '90%'
              }}
            />
          </AccountListItem>
        </>
      )}
    </>
  )
}

export default ConnectWidget
