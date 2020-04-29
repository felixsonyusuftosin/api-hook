import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Badge from '@material-ui/core/Badge'

export const Heading = styled(Typography)`
  font-size: ${({ theme }) => theme.typography.pxToRem(15)};
  fontWeight:  ${({ theme }) => theme.typography.fontWeightRegular};
`

export const ConnectionsContainer = styled(Grid)`
flex-grow: 1;
display: flex;
flex-wrap: wrap;
width: 100%;
border: solid 1px rgba(0,0,0,0.12);
background-color: #fff;
max-height:660px;
overflow:hidden;
overflow-y:scroll;
`
// connection card
export const Root = styled(List)`
 width:100%;
`
export const Details = styled.div`
 display: flex;
 flex-direction: column;
`
export const Content = styled(CardContent)`
 flex: 1 0 auto;
 background:#E6FFE2;
`
export const Cover = styled(CardMedia)`
  width: 151; 
`
export const Controls = styled.div`
 display: flex;
 align-items:center;
 padding-left: ${({ theme }) => theme.spacing(1)};
 padding-bottom: ${({ theme }) => theme.spacing(1)};
`

export const PlayIcon = styled(PlayArrowIcon)`
height: 38;
width: 38;
`
export const LoadContainer = styled.div`
 width: 100%;
 height: auto;
`

export const Styledbadge = styled(Badge)`
  background-color: #44b700;
  color: #44b700;
  boxShadow:  0 0 0 2px ${({ theme }) => theme.palette.background.paper}:
  &::after: 
    position: absolute:
    top: 0:
    left: 0:
    width: 100%:
    height: 100%:
    borderRadius: 50%:
    animation: $ripple 1.2s infinite ease-in-out:
    border: 1px solid currentColor:
    content: "":
`
export const FullWidthList = styled(List)`
  width: 100%;
`
export const PaddedListItem = styled(ListItem)`
 padding-left:25px;
 padding-right:25px;
`
export const StyledTypography = styled(Typography)`
 height: 700px;
 align-items:center;
 justify-content: center;
 text-align:center;
 box-sizing:border-box;
 padding: 100px 40px;
`
