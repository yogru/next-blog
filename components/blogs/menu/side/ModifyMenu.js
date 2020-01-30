import React, {useState} from "react";
import {Box} from '@material-ui/core';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function handleClick(e, data) {
  console.log(e,data);
}

const createFolder = (e , data)=>{
  const { dispatch  } = data;
  dispatch({type:'createFolder',payload:{type:'folder'}});
} 
const createDoc = (e, data)=>{
  const { command:dispatch } = data;
 //  console.log('doc',e,dispatch);
}
////////////////////////////////////

function ModifyMenu({children, ...props}) {
  const [command , setCommand] = useState(props.list);

    function childMouseUp(e,dispatch){
       setCommand({dispatch});
    }
    
   const child=  React.Children.map(children, child =>
        React.cloneElement(child, { onMouseUp:childMouseUp}));
        
  return (
    <>
      <ContextMenuTrigger  id="side_unique_identifier"> {/* NOTICE: id must be unique for EVERY instance */}
        <Box display='flex' height="100%" flexDirection='column' >
          <Box>{child}</Box>
          <Box style={{ marginBottom: 'auto', height: '100%' }}
            // onMouseUp={
            //   (e) => {setCursor(props.list)
            //        childMouseUp(e, { type: 'vacant',cursor:props.list ,setCursor})
            //   }
            // }
          />
        </Box>
      </ContextMenuTrigger>
      <ContextMenu id="side_unique_identifier">
        <MenuItem data={command} onClick={createFolder}>
           폴더 생성
        </MenuItem>
        <MenuItem data={command} onClick={createDoc}>
           문서 생성
        </MenuItem>
        <MenuItem divider />

         <MenuItem data={command} onClick={handleClick}>
           수정
         </MenuItem>
        <MenuItem data={command} onClick={handleClick}>
          삭제
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default ModifyMenu;
