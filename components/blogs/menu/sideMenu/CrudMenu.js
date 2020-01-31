import React, { useState } from "react";
import { Box } from '@material-ui/core';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function createFolder(e, data) {
  const { dispatch } = data;
  console.log(data)
  dispatch({ type: 'createFolder' });
}
function createDoc(e, data) {
  const { dispatch } = data;
  dispatch({ type: 'createDoc' });
}
function modify(e, data) {
  const { dispatch } = data;
  dispatch({ type: 'modify' });
}
function deleteItem(e, data) {
  const { dispatch } = data;
  dispatch({ type: 'delete' });
}


function ModifyMenu({ children, ...props }) {
  const [command, setCommand] = useState();
  function setDispatch(dispatch) {
     setCommand({ dispatch });
  }
  
  const child = React.Children.map(children, child =>
    React.cloneElement(child, { setDispatch }));

  return (
    <>
      <ContextMenuTrigger id="side_unique_identifier"> {/* NOTICE: id must be unique for EVERY instance */}
        <Box display='flex' height="100%" flexDirection='column' >
          {child}
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
        <MenuItem data={command} onClick={modify}>
          수정
         </MenuItem>
        <MenuItem data={command} onClick={deleteItem}>
          삭제
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default ModifyMenu;
