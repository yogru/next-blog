import Router from   'next/router' 
import { useSelector, useDispatch } from 'react-redux';
 
 function getInitialProps({req,res, query ,...ctx}){
    let statusCode = null;
    statusCode = (res && res.statusCode) || 
                                (ctx.err && ctx.err. statusCode);
   return {statusCode};
} 
 
function Error ({children, ...props}){ 
  const {statusCode} = props;
  const  errorMessage = ((statusCode === 404) && '페이지를 찾을 수 없습니다.' )||
                                               ((statusCode === 500) && '알 수 없는 에러가 발생 했습니다.') ||
                                              '클라이언트 에러 입니다';
  return (
        <div> {errorMessage} </div>
  )
 }
 
Error.getInitialProps = getInitialProps;

export default Error ;