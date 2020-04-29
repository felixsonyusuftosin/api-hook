import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export const LinkFinicityContainer = styled.div`
 background-color: white;
 padding:0px;
 width: 100%;
 border: solid 1px rgba(0,0,0,0.12); 
 box-sizing:border-box;
`
export const Block = styled.div`
 width: 100%;
 padding: 0px 0px;
 border-bottom: solid 1px #dfe1e5;
 box-sizing:border-box;
`
export const PadSearch = styled.div`
  width: 90%;
  display: inline-block;
`
export const AccountListItem = styled(Paper)`
 margin-top: ${({ theme }) => theme.spacing(2)}px;
 max-height: 600px;
 min-height: 200px;
 overflow-y:scroll;
 background-color:${({ backgroundcolor }) => backgroundcolor || 'white'};
 width: 100%;
 display:flex;
 flex-direction:column;
 flex:1 1 50%;
 flex-shrink: 2, 
 flex-basis: 20em;
`
export const InfoItem = styled(Paper)`
 margin-top: ${({ theme }) => theme.spacing(2)}px;
 max-height: 400px;
 min-height:150px;
 background-color:${({ backgroundcolor }) => backgroundcolor || 'white'};
 width: 100%;
 display:flex;
 flex-direction:column;
 flex:1 1 50%;
 flex-shrink: 2, 
 flex-basis: 20em;
`
export const EdgeRow = styled.div`
 height: 50px;
 padding:20px;
 width: 100%;
 display: flex;
 justify-content: ${({ justifycontent }) => justifycontent || 'flex-start'};
 align-items: center;
`
export const SearchContent = styled.div`
 width: 100%;
`
export const Widget = styled.div`
min-height; 80%;
`
export const Row = styled.div`
  flex:1;
  padding:10px;
  width:100%;
  display:flex;
`
export const StyledLink = styled(Link)`
 text-decoration: none;
 color: inherit;
 border-style: none;
 display: flex;
 flex:1 1 50%;
 flex-shrink: 2, 
 flex-basis: 20em;
 height: ${({ height }) => height || 'auto'}
`
export const LinkButton = styled(Link)`
text-decoration: none;
color: inherit;
border-style: none;
display: flex;
flex-basis: 20em;
`
export const BorderedRow = styled(Grid)`
border: solid 1px transparent;
display: flex;
height: 60px;
justify-content: center;
 margin: 5px 0px;
 padding: 20px;
 box-sizing: border-box;
 flex-grow:1;
 white-space: nowrap;
`
export const StyledButton = styled(Button)`
  width: 80%;
  margin:0 auto;
`
export const PadForm = styled(Grid)`
display: block;
box-sizing:border-box;
padding: 10px;
height: 700px;
overflow-y: scroll;
`

export const GridRow = styled(Grid)`
  padding: 10px;
  width: 100%;
  margin-bottom:10px;
`
export const CenteredElement = styled.div`
 display: flex;
 justify-content: center;
 align-items:center;
 width:400px;
 margin-bottom: 10px;
`
