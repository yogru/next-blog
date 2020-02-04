import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
                         
const propTypes={}
const defaultProps={}
          
const Container = styled.div`
  flex: 0 0 100%;
`

const Vacant = ({children,vacant , onMouseDown, ...props})=>{
 return(
      <Container onMouseDown ={onMouseDown}> 
           {
               vacant&&<div>비어 있습니다.</div>
           }
           {
                children
           }
      </Container>         
   );
}
                         
 Vacant.propTypes=propTypes
 Vacant.defaultProps=defaultProps;
 export default Vacant;