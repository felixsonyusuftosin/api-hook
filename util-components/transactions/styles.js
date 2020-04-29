import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'

export const Bar = styled(Paper)`
 width:100%;
 padding: 10px; 
 display: flex;
 background-color:rgba(255,255,255,0.04);
 margin:40px 0px;
`
export const StyledTextField = styled(KeyboardDatePicker)`
  margin: 0px 15px;
`
export const StyledSliderContainer = styled.div`
  margin: 0px 15px;
  display:inline-flex;
  flex-direction: column;
  align-items: space-between;
  width: 400px;
`
export const RadioContainer = styled.div`
margin: 0px 25px;
display:inline-flex;
flex-direction: column;
align-items: space-between;
`

export const TransactionsContainer = styled(Grid)`
width: 100%;
max-height: 600px;
overflow:scroll;
background-color: transparent;
overflow-y:scroll;
box-sizing:border-box;
border: solid 1px rgba(0,0,0,0.2);
`

export const StyledAvatar = styled(Avatar)`
   display: inline-flex;
`
export const Row = styled(Grid)`
display: flex;
 margin: 5px 0px;
 padding: 10px;
 box-sizing: border-box;
 height:40px;
 flex-grow:1;
 white-space: nowrap;
`
export const TablePaginationContainer = styled(Paper)`
 margin-top: 20px;
 border: solid 1px rgba(0,0,0,0.2);
 padding: 5px;
 background-color: white;
`
export const TransactionsTableContainer = styled(Grid)`
 width: 100%;
 background-color:white;
`
export const NothingFound = styled(Typography)`
 display: block;
 padding: 20px;
`
export const VisuallyHiden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1;
  margin: -1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 20;
  width: 1;
`
export const StyledTableBody = styled(TableBody)`
  overflow-y: scroll;
  &:nth-child(odd) {
    baackground-color: #F6FAFF;
  }
  $tr:nth-of-type(even){
    background-color: white
  }
`
export const StyledTableHead = styled(TableHead)`
background-color: #F6FAFF;
`
export const BareLink = styled(Link)`
 font-size: inherit;
 text-decoration: none;
 color: inherit;
 font-style: inherit;
 font-size:inherit;
`

export const BreadCrumbLoading = styled.div`
 display: inline-flex;
 flex-direction: column;
 height: 40px;
 align-items: flex-start;
`
export const TransactionSummaryContainer = styled.div`
 width: 40%;
 margin: 20px 0px;
 display: inline-block;
 border: solid 1px rgba(0,0,0,0.12);
 background-color: #fff;
`
export const TransactionTableControlContainer = styled.div`
width: 40%;
margin: 20px 0px;
display: inline-flex;
align-items:flex-end;
`
export const SummaryListItem = styled(ListItem)`
 & div {
  display: flex;
  padding: 3px 10px;
  flex-direction: row;
  justify-content:space-between;
 }
`
export const ControlContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`
export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  text-align: center;

  & p {
    margin-bottom: .5em
  }
`

export const PDFContainer = styled(Grid)`
  padding: 10px;
  display:flex;
  flex-direction: column;
  width: 90%;
  max-width: 900px;
  align-self: center;
  background-color: #FFF;
  margin-top:30px;
  margin-bottom:30px;
`

export const PDFRow = styled.div`
 width: 100%;
 flex-shrink: 1;
 padding: 10px 0px;
 justify-content: space-between;
 margin: 10px 0px;
`
export const ButtonProgress = styled(CircularProgress)`
  color: ${green[500]};
  position: absolute;
  top: 50%;
  left: 50%;
  marginTop: -12;
  marginLeft: -12;
`
