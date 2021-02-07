



/// 这个内容还未针对新框架调整




// Content.js
import { useState, useEffect } from 'react';
import { Upload, message, Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { apiPathJoin } from '../providers/baseProvider';
import { formatTimeStr } from 'antd/lib/statistic/utils';

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
// import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


// 编辑器
let quill = {}


const imageHandler = () => {
        
    const input = document.createElement('input');
  
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {

        const formData = new FormData();
        formData.append("file", input.files[0])

        // push
        fetch(apiPathJoin('ugc/push'), {
            method: 'POST',
            body: formData
        }).then(
            response => response.json()
        ).then(data=>{

            // code thanks: https://kaloraat.com/articles/react-quill-wysiwyg-rich-text-editor-image-upload-to-server
            // Save current cursor state
            const range = quill.editor.getSelection(true);        

            // Insert uploaded image
            quill.editor.insertEmbed(range.index, 'image', data.msg);
    
            // Move cursor to right side of image (easier to continue typing)
            quill.editor.setSelection(range.index + 1);

            // remove input
            input.value = "";
    
            return data

        }).catch(error =>{

            // remove input
            input.value = "";

            alert("网络繁忙，请重试")
        })

    }
}

const modules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
        handlers: { image: imageHandler }
    },
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

export default ({value="", onChange}) => {

    return (
        <div>
            <ReactQuill
                ref={el => { quill = el }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}