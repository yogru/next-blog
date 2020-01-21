import React from 'react';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
// const propTypes={}
// const defaultProps={}

const OuterDIV = styled.div`
  display:flex;
  flex: 0 0 500px;
  box-sizing:border-box;
  background-color:black;
`
const InnerDiv=  styled.div`
 display:flex;
 flex-wrap:nowrap;
 overflow:hidden;
 margin-left:auto !important;
 margin-right:auto !important;
 @media (max-width: 800px) {
    flex-direction: column;
      > * {
        width:300px !important;
        height:480px !important;
        margin-top: 1rem !important;
        margin-bottom: 1rem !important;
     }
  }
`

const PostCardContainer = ({children,...props})=>{
 return(
      <OuterDIV>
          <InnerDiv>
             {children}
          </InnerDiv>
      </OuterDIV>       
   );
}
                         
 //PostCardContainer.propTypes=propTypes
// PostCardContainer.defaultProps=defaultProps;
 export default PostCardContainer;