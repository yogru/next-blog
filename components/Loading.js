import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading({children,loading}) {
  return (
       <>
           { 
              loading ? 
                   <CircularProgress disableShrink /> :
                   children
           }
       </>
  )
}

export default Loading;