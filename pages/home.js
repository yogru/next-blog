
import BlogTemplte from '../components/blogs/Template';
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

function getInitialProps(ctx){
   //return {...ctx};
}

function Home(){
  
  return (
    <>
       <BlogTemplte menuList={list} />
    </>
  );
}

Home.getInitialProps = getInitialProps;

export default Home;