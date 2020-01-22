import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { NAME_SPACE as write, changeFieldAction } from '../actions/write'
import { sendAction } from '../actions/send'
import TitleInput from './TitleInput'
import CategorySelect from './CategorySelect'
import { Box } from '@material-ui/core';
import SendBtn from './SendBtn'


const quilOpt = {
    theme: 'snow',
    placeholder: '내용을 작성 해주세요',
    modules: {
        imageResize: {},
        imageUpload: {
            url: '/post/up/img', // server url. If the url is empty then the base64 returns
            method: 'POST', // change query method, default 'POST'
            name: 'img', // custom form name
            withCredentials: false, // withCredentials
            callbackOK: ({ path }, next) => {
                //console.log(path);
                console.log(this, next);
                next(path);
            },
            callbackKO: serverError => {
                alert(serverError);
            }
        },
        toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link', 'image'],
        ]
    }
}

function Editor({ categoryList }) {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    const dispatch = useDispatch();
    const changeEvent = useCallback((payload) => dispatch(changeFieldAction(payload)), [dispatch])
    const sendSaga = useCallback((payload) => dispatch(sendAction(payload)), [dispatch]);

    const { title, subjects, body, writer } = useSelector((state) => (state[write]))
    console.log('render..')

    useEffect(() => {
        // 다른 페이지에서도 퀼 로드할거같은데. 확인하고. 바꿔야될듯..?
        // 동적 임포트 window.quill = quill 이코드를 여기에 박아야될듯?   
        if (typeof window !== 'undefined') {
            const { Quill,
                quill_image_resize_module: { default: ImageResize },
                quill_image_upload: { ImageUpload },
            } = window;
            Quill.register('modules/imageResize', ImageResize);
            Quill.register('modules/imageUpload', ImageUpload);
            quillInstance.current = new Quill(quillElement.current, quilOpt);
            const quiIns = quillInstance.current;
            quiIns.on('text-change', (delata, oldData, source) => {
                if (source === 'user') {
                    console.log(quiIns.root.innerHTML);
                    changeEvent({ key: 'body', value: quiIns.root.innerHTML });
                }
            }, [changeEvent])
        }
    }, [])

    function sendValidater() {
        if (subjects[0] === 'None') return false;
        if (!title) return false;
        if (!body) return false;
        return true;
    }
    function send() {
        if (sendValidater()) {
            console.log('hi..');
            const sub = [...subjects,title ];
            const payload = {
                url: 'http://localhost:3000/post/',
                data: { title,subjects:sub, body },
                onSuccess: (res) => { console.log(res) },
                onFailure: (res) => { console.log(res) },
            }
            dispatch(sendAction(payload))

        }
    }
    return (
        <EditorBlock>
            <CategorySelect list={categoryList}
                onChange={(e, subjects) => {
                    changeEvent({ key: 'subjects', value: [...subjects] });
                }}
            />
            <TitleInput placeholder="제목을 입력하세요 "
                onChange={e => { changeEvent({ key: 'title', value: e.target.value }); }} />

            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>

            <Box display='flex'>
                <SendBtn onClick={send}> 보내기 </SendBtn >
            </Box>

        </EditorBlock>
    );

}

const EditorBlock = styled.div`
  padding-top:2rem;
  padding-bottom:1rem;
`
// 최소 크기 지정 및 패딩 제거
const QuillWrapper = styled.div`
  .ql-editor{
          padding:0;
          min-height:500px;
          font-size:1.125rem;
          line-height:1.5;
  }
  .ql-image {
      display: block;
   }
  .ql-editor.ql-blank::before{
      left:0px;
  }
`



export default Editor;