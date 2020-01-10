import  {useState} from 'react'


const Index= ()=>{
   const [i , set] = useState(0);
    
    return (
      < div onClick={()=> set(i+1)}>
        {i}
      hi...
     </div>
    );
}

export default Index;
