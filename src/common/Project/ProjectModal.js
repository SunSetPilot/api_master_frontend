import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Switch,
  Input,
  Select,
} from 'antd';

const { Option } = Select;

function ProjectModal(props) {
  const { type, projectDetail } = props;
  const modalDict = {
    'create': {
      title: 'Create Project',
    },
    'edit': {
      title: 'Edit Project',
    }
  };

  const [form] = Form.useForm();
  const [autoImport, setAutoImport] = useState(true); // switch of auto importing API

  useEffect(() =>  {
    setTimeout(() => {
      console.log('projectDetail', projectDetail);
      form.setFieldsValue(projectDetail);
    })
  }, [props.projectDetail])

  useEffect(() => {
    setTimeout(() => {
      if (type == 'create') {
        form.setFieldsValue({
          name: '',
          member: [],
          auto_import_api: true,
          git_repo: '',
          branch: ''
        });
      }
    })
  }, [type])

  function handleOk() {
    props.onOk(form.getFieldsValue())
  }

  function handleCancel() {
    props.onCancel()
  }

  function onSwitchChange(value) {
    setAutoImport(value);
  }

  return (
    <Modal
      title={modalDict[type].title}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      // destroyOnClose={true}
    >
      <Form form={form} initialValues={{projectDetail}}>
        <Form.Item label="Name" name="name"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Member" name="member">
          <Select placeholder="Please select your project member." >
            <Option value="1">123</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Auto import API" name="auto_import_api">
          <Switch checked={autoImport} onChange={onSwitchChange}/>
        </Form.Item>
        {
          autoImport && (
            <React.Fragment>
              <Form.Item label="Git repository" name="git_repo"
              >
                <Input placeholder="Please input your project git repository address!" />
              </Form.Item>

              <Form.Item label="Branch" name="branch"
                rules={[{ required: true, message: 'Please input the branch!' }]}
              >
                <Input placeholder="Please input the branch!" />
              </Form.Item>
            </React.Fragment>
          )
        }
      </Form>
    </Modal>
  )
}

export default ProjectModal;