import React, {useRef, useEffect  } from 'react';
import styled from 'styled-components';
// import Quill from 'quill';
//import 'quill/dist/quill.bubble.css';

const quilOpt = {
    theme:'snow',
    placeholder:'내용을 작성 해주세요',
    modules:{
        toolbar:[
            [{header:'1'}, {header:'2'}],
            ['bold','italic','underline','strike'],
            [{list:'ordered'},{list:'bullet'}],
            ['blockquote','code-block','link','image'],
        ]
    }
}

const EditorBlock = styled.div`
  padding-top:2rem;
  padding-bottom:1rem;
`

const TitleInput = styled.input`
  font-size:2rem;
  outline:none;
  padding-bottom:0.5rem;
  border:none;
  margin-bottom:1rem;
  width:100%;
background-color:inherit;  
`

const QuillWrapper = styled.div`
 // 최소 크기 지정 및 패딩 제거
  .ql-editor{
          padding:0;
          min-height:500px;
          font-size:1.125rem;
          line-height:1.5;
  }
  .ql-editor.ql-blank::before{
      left:0px;
  }
`

function Editor() {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

 const Quill=  typeof window !=='undefined' ? require('quill') :()=>undefined;
    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, quilOpt);
    }, [Quill]);

    return (
        <EditorBlock>
            <TitleInput  placeholder="제목을 입력하세요 " />
            <QuillWrapper>
                   <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
   );

}



export default Editor;