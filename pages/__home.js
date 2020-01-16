import { useDispatch } from 'react-redux';
import {useState} from 'react'
import useRestLoad from '../src/hooks/useRestLoad'
import { createLoadAction } from '../sagaes/sagaCreateActions';
import BlogTemplte from '../components/blogs/Template';
import Typography from '@material-ui/core/Typography';
import useLoadSuccess from '../src/hooks/useLoadSuccess';
import useLoadPending from '../src/hooks/useLoadPending';
import { useRouter } from 'next/router'

const list={
  title:1,
  subList:[
      {
        title:2,  
        subList:[]
      },
      {
        title:2,  
        subList:[]
      },
      {
        title:3,  
        subList:[{
           title:'zz',  
           subList:[]
         }
        ]
      },
      {
        title:4,  
        subList:[
         {
            title:5,  
            subList:[]
         },
         {
            title:6,  
            subList:[]
         },
         {
            title:7,  
            subList:[]
         }
        ]
      },
  ]
}

function url(count=3){
   return `http://localhost:3000/post/topN/?count=${count}`;
}

const LoadCardData= "home/CardData";

async function getInitialProps({store,req, ...ctx}){
   console.log('reques..',req);
   store.dispatch(createLoadAction(LoadCardData,url()));
}

function Home({children, ...props}){
  const [ success ] = useLoadSuccess(LoadCardData);
  const [ pending ] = useLoadPending(LoadCardData);
  const router = useRouter();

  console.log("working?: ",pending,success);
  return (
    <>
       <BlogTemplte menuList={list} >
           <Typography paragraph>
               "hi..?"
            </Typography>
            <button onClick={e=>{
                router.push('/sagaTest');
            }}>
                sagaTest.
            </button>

      </BlogTemplte>
    </>
  );
}

Home.getInitialProps = getInitialProps;

export default Home;

