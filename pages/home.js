import  {useState} from 'react'
import styled from 'styled-components';


function Home(){
  const [i , set] = useState(11);
    const SDIV = styled.div`
     background-color:black;
    `;
  
   return (
       < div onClick={()=> set(i+1)}>
       { i }
     <SDIV >112121</SDIV>
    </div>
   );

}


export default Home;