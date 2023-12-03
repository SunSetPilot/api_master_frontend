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
  const { type, projectDetail, memberList } = props;
  const [userOptionList, setUserOptionList] = useState([]);
  const modalDict = {
    'create': {
      title: 'Create Project',
    },
    'edit': {
      title: 'Edit Project',
    },
    'import': {
      title: 'Batch Import',
    }
  };

  const [form] = Form.useForm();
  const [autoImport, setAutoImport] = useState(true); // switch of auto importing API

  useEffect(() =>  {
    setTimeout(() => {
      form.setFieldsValue(projectDetail);
      setAutoImport(props.projectDetail.auto_import_api)
    })
  }, [props.projectDetail])

  useEffect(() =>  {
    setUserOptionList(props.memberList)
  }, [props.memberList])

  useEffect(() => {
    setTimeout(() => {
      if (type == 'create') {
        form.setFieldsValue({
          project_name: '',
          members: [],
          auto_import_api: false,
          git_address: '',
          git_branch: ''
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

  function getUserOptions() {
    return userOptionList && userOptionList.map(m => {
      return { 'label': m.user_name, 'value': m.user_id}
    });
  }

  return (
    <Modal
      title={modalDict[type].title}
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      // destroyOnClose={true}
    >
      <Form name="basic" form={form} initialValues={{projectDetail}}>
        <Form.Item label="Name" name="project_name"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input disabled={type === 'import'}/>
        </Form.Item>

        <Form.Item label="Member" name="members">
          <Select mode="multiple" placeholder="Please select your project members." disabled={type === 'import'} options={getUserOptions()}/>
        </Form.Item>
        <Form.Item label="Auto import API" name="auto_import_api" valuePropName="checked">
          <Switch onChange={onSwitchChange}/>
        </Form.Item>
        {
          autoImport && (
            <React.Fragment>
              <Form.Item label="Git repository" name="git_address"
              >
                <Input placeholder="Please input your project git repository address!" />
              </Form.Item>

              <Form.Item label="Branch" name="git_branch"
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