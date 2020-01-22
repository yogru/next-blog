import styled from 'styled-components';
import {Button} from '@material-ui/core';
             
const defaultProps={
    variant:"contained",
    color:'primary',
    disableElevation:true,
}
const SnedBtn =styled(Button)`
  margin-top:1rem !important ;
  margin-left:auto !important;
`

 SnedBtn.defaultProps=defaultProps;
 export default SnedBtn;