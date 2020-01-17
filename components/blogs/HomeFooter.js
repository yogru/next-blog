import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
//import PropTypes from 'prop-types';

// const propTypes={}
// const defaultProps={}
                         
const Contatiner = styled.div`
  display:flex;
  flex:0 0 4rem;
`

const HomeFooter = ({children,...props})=>{
 return(
     <Contatiner>
         <GitHubIcon />
     </Contatiner>
   );
}
                         
//  HomeFooter.propTypes=propTypes
//  HomeFooter.defaultProps=defaultProps;
 export default HomeFooter;