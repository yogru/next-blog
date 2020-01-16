import { createLoadAction } from '../sagaes/sagaCreateActions';
import { useDispatch } from 'react-redux';
import {useState} from 'react'
import useRestLoad from '../src/hooks/useRestLoad'
import { useRouter } from 'next/router'


function makeloadPropName(id){
   return `post-${id}`;
}
function url(id){
  return `http://jsonplaceholder.typicode.com/posts/${id}`;
 }

function getInitialProps({store, ...ctx}){ 
    const u = `http://jsonplaceholder.typicode.com/posts/1`;
    store.dispatch(createLoadAction(makeloadPropName(1),u));
}

function SagaTest(props){
  const router = useRouter();
 const [postId ,setPostId] = useState(1);
 const dispatch = useDispatch();
 const [pending,success,failure,finish] = useRestLoad(makeloadPropName(postId));

 const myOnClick = (e)=>{
  //  dispatch(createLoadAction(makeloadPropName(postId+1),url(postId+1)));
  //  setPostId(postId+1);
   router.push('/home');

   e.stopPropagation();
 }
 console.log('--------------------------------')
 console.log('pending: ', pending);
 console.log('success: ', success);
 console.log('failure: ', failure);
 console.log('finish: ', finish);
 
 return(
     <div onClick={e=>myOnClick(e)} > 
         hi..sfsdafsdf
         asdfasdfasdfas
         asdfasdfasdf
     </div>
  )
}
SagaTest.getInitialProps = getInitialProps;
export default SagaTest;