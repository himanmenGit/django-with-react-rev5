import React, {useState} from 'react'
import {Button, Form, Input, Upload, Modal, notification} from "antd";
import {FrownOutlined, PlusOutlined} from '@ant-design/icons'
import {getBase64FromFile} from 'utils/base64'
import {axiosInstance} from "../api";
import {useAppContext} from 'store'
import {parseErrorsMessages} from "../utils/forms";
import {useHistory} from 'react-router-dom'

const PostNewForm = () => {
    const history = useHistory();
    const {store: {jwtToken}} = useAppContext();
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null
    })
    const [fieldErrors, setFieldErrors] = useState({});
    const handleUploadChange = ({fileList}) => {
        setFileList(fileList);
    }
    const handlePreviewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }

        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview
        })
    }
    const handleFinish = async (fieldValues) => {
        const {caption, location, photo: {fileList}} = fieldValues;

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);

        fileList.forEach(file => {
            formData.append("photo", file.originFileObj);
        })

        const headers = {Authorization: `JWT ${jwtToken}`}
        try {
            const response = await axiosInstance.post("/api/posts/", formData, {headers})
            console.log("success response : ", response);
            history.push("/")
        } catch (error) {
            if (error.response) {
                const {status, data: fieldsErrorMessages} = error.response;
                if (typeof fieldsErrorMessages === 'string') {
                    notification.open({
                        message: "서버 오류",
                        description: `에러) ${status}응답을 받았습니다.`,
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    })
                } else {
                    setFieldErrors(parseErrorsMessages(fieldsErrorMessages));
                }

            }
        }
    }
    return (
        <Form
            {...layout}
            onFinish={handleFinish}
            // onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Caption"
                name="caption"
                rules={[
                    {required: true, message: 'Caption을 입력 해 주세요'},
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[
                    {required: true, message: 'Location을 입력 해 주세요'},
                ]}
                hasFeedback
                {...fieldErrors.location}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Photo"
                name="photo"
                rules={[{required: true, message: "사진을 입력해주세요."}]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => {
                        return false;
                    }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined/>
                            <div className="ant-upload-text">Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Modal
                visible={previewPhoto.visible}
                footer={null}
                onCancel={() => setPreviewPhoto({visible: false})}
            >
                <img src={previewPhoto.base64} alt="Preview" style={{width: "100%"}}/>
            </Modal>

            <hr/>
            {JSON.stringify(fileList)}
        </Form>
    )
}

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export default PostNewForm