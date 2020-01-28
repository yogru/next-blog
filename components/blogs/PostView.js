import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { loadAction } from '../../actions/load'
import loadSelector from '../../selector/hookLoad';

import TitleInput from '../TitleInput';

const propTypes = {
   post: PropTypes.object.isRequired,
}

const PostView = ({ post, ...props }) => {
   const { subjectID, title, body, writer, time, comment } = post;
   const dispatch =useDispatch();
   const loadSubject = 'loadSubject'
   const [sub] = useSelector(loadSelector(loadSubject),[subjectID] )
   useEffect(()=>{
      dispatch(loadAction(loadSubject,`http://localhost:3000/subject/${subjectID}` ))
   },[subjectID])

   const desc = `${writer} | ${new Date(time)}`

   return (
      <Container>
         <Header>
            <Category > {
                sub && sub.data &&sub.data.subject&&
                 sub.data.subject.reduce((acc, item) => {
                     if (!acc) { acc = ` ${item} `; return acc; }
                     return acc += `/ ${item} `;
                  }, null)
               }
            </Category>
            <TitleInput readOnly value={title} />
            <Description>{desc} </Description>
         </Header>
         <Section>
            <div dangerouslySetInnerHTML={{ __html: body }} />
         </Section>
      </Container>
   );
}

const Container = styled.div`
   display:flex;
   flex-direction:column;
`
const Header = styled.div`
   display:flex;
   flex-direction:column;
   border-bottom:1px solid #E6E6E6;
   margin-bottom:1rem;
`
const Category = styled.div`
    flex: 0 0 1rem;
    color:#005baf;
`
const Description = styled.div`
   flex: 0 0 0.5rem;
   color: #888;
   margin-bottom:0.5rem;
   font-size:12px;
`
const Section = styled.div`
`

PostView.propTypes = propTypes;
export default PostView;