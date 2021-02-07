



/// 这个内容还未针对新框架调整





// CoverUploader.js
import { useState, useEffect } from 'react';
import { Upload, message, Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { apiPathJoin } from '../providers/baseProvider';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default ({value, onChange}) => {
    
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(value)

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                setLoading(false)
                setImageUrl(imageUrl)
            });
            
            // 错误
            if(info.file.response.status != "ok"){
                alert("上传错误，请重试")
                return
            }
            
            onChange(info.file.response.msg)
        }
      };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">上传</div>
        </div>
    );

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={apiPathJoin("ugc/push")}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="file" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    );
}