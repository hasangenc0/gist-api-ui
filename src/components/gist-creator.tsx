import React, {useContext, useState} from 'react';
import {AppContext} from "../context/app-context";
import {Form, Button, Modal, Input, Upload, Result} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import {getFileContent} from "../helpers/file-reader";
import {ResultStatusType} from "antd/lib/result";

export const GistCreator = () => {
  const {gistService} = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showResult, setShowResult] = useState<CreateResult>();
  const [fileContent, setFileContent] = useState('');
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const gistName = form.getFieldValue('gistName');
    if (!fileContent) {
      return;
    }
    const response = await gistService.create(gistName, fileContent);
    setShowResult({
      visible: true,
      status: response ? 'success': 'warning',
      message: response ? 'Gist successfully created' : 'An error occurred when creating gist.'
    });
    return closeModal();
  };


  const readFile = ({ file, onSuccess }: any) => {
    getFileContent(file, (e) => {
      const result = e.target?.result;
      if (e.target?.result) {
        setFileContent(result);
        onSuccess("ok");
      }
    })
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeSuccessResult = () => {
    setShowResult({visible: false, status: undefined, message: undefined});
  };

  return (
    <div>
      <Button onClick={showModal} type="primary" icon={<PlusOutlined />} size="large">
          Create Gist
      </Button>
      <Modal
        title="Create Public Gist"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={form.submit}>Create</Button>,
        ]}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Gist Name"
            name="gistName"
            rules={[{ required: true, message: 'Please enter valid gist name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gistFile"
            label="Upload"
            valuePropName="file"
            rules={[{ required: true, message: 'Please upload a file!' }]}
          >
            <Upload customRequest={readFile} multiple={false} name="logo" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Modal visible={showResult?.visible} onCancel={closeSuccessResult} footer={[]}>
        <Result status={showResult?.status} title={showResult?.message}/>
      </Modal>
    </div>
  );
};

export interface CreateResult {
  visible: boolean;
  status?: ResultStatusType;
  message?: string;
}
