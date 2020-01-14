import  {useState} from 'react'
import styled from 'styled-components';
import BlogHead from '../components/blogs/BlogHead';
import PostView from '../components/blogs/PostView';


function getInitialProps(ctx){
   //return {...ctx};
}

function Home(){
  
  return (
    <>
      <PostView />
    </>
  );
}

Home.getInitialProps = getInitialProps;

export default Home;