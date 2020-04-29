import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
// import { fade } from '@material-ui/core/styles'

export const StyledContainer = styled.div`
background-color:transparent;
width:100%;
padding: 0px;
align-items:flex-start;
display:flex;
flex-direction:column;
justify-content:flex-start;
margin:0;
`
// background-color:${fade('#cfe8fc', 0.15)};
export const StyledGrid = styled(Grid)`
 flex-grow:1;
 white-space: nowrap;
 padding:0px;
 background-color: transparent;
 background-color: ${({ backgroundcolor }) => backgroundcolor || 'transparent'};
 box-sizing:content-box;
 height:700px;
 overflow-y: hidden;
 overflow-x:visible;
`
export const StyledGridBordered = styled(Grid)`
 flex-grow:1;
 white-space: nowrap;
 padding:0px;
 margin-left:10px;
 background-color: transparent;
 background-color: ${({ backgroundcolor }) => backgroundcolor || 'transparent'};
 box-sizing:border-box;
 max-height:700px;
 overflow: hidden;
 overflow-y: scroll;
 margin-right:20px;
`
export const Background = styled(Paper)`
  box-shadow:none;
  background-color: ${({ backgroundcolor }) => backgroundcolor || 'transparent'};
`

export const Title = styled(Grid)`
height: auto;
`

export const StyledAvatar = styled(Avatar)`
   display: inline-flex;
`

export const MainContent = styled.div`
 display: flex;
 padding:5px;
 box-sizing:border-box;
 width: 100%;
`

export const Row = styled(Grid)`
display: flex;
 margin: 5px 0px;
 padding: 10px;
 box-sizing: border-box;
 height:40px;
 flex-grow:1;
 white-space: nowrap;
 margin-left: ${({ marginLeft }) => marginLeft}
`
export const BorderedRow = styled(Grid)`
border: solid 1px transparent;
display: flex;
 margin: 5px 0px;
 padding: 10px;
 box-sizing: border-box;
 height:60px;
 flex-grow:1;
 white-space: nowrap;
`

export const AddAccountBtn = styled(Button)`
 margin-left:40px;
`
