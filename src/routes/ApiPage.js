import { useEffect, useState } from 'react';
import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  message,
  List,
  Badge,
  Select,
  Input,
  Form,
  Spin,
  Row,
  Col,
  Space,
  Empty,
  Popover,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import ProjectModal from '../components/Project/ProjectModal';
import DeleteModal from '../components/DeleteModal';
import styles from './index.less';

const { Option } = Select;
const { TextArea } = Input;


function ApiPage(props) {
  const projectId = props.match.params.id;

  const [form] = Form.useForm();

  const [apiList, setApiList] = useState([]);
  const [apiID, setApiID] = useState(null);
  const [apiDetail, setApiDetail] = useState({});

  const [projectDetail, setProjectDetail] = useState({});
  const [memberList, setMemberList] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [listLoading, setListLoading] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)

  useEffect(() => {
    getAPIList();
    getProjectDetail();
    getAllUsers();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (apiID == 'create') {
        form.setFieldsValue({
          description: '',
          header_params: '',
          method: '',
          path: '',
          protocol: '',
          query_params: '',
          response_body: ''
        });
      } else if (apiID) {
        getAPIDetail(apiID)
      }
    })
  }, [apiID])

  useEffect(() =>  {
    setTimeout(() => {
      console.log('apiDetail', apiDetail);
      form.setFieldsValue(apiDetail);
    })
  }, [apiDetail])

  async function getAPIList() {
    setListLoading(true)
    let res = await props.dispatch({
      type: 'api/fetchAPIList',
      payload: {
        id: projectId
      }
    });
    if (res && res.status === 200) {
      setApiList(res.data || []);
    }
    setListLoading(false)
  }


  async function getAPIDetail(apiID) {
    setApiLoading(true)
    let res = await props.dispatch({
      type: 'api/fetchAPIDetail',
      payload: {
        id: apiID,
      }
    });
    if (res && res.status === 200) {
      setApiDetail(res.data);
      setApiID(apiID);
    }
    setApiLoading(false)
  }

  async function getProjectDetail() {
    let res = await props.dispatch({
      type: 'project/fetchProjectDetail',
      payload: {
        id: projectId,
      }
    });
    if (res && res.status === 200) {
      setProjectDetail(res.data);
    }
  }

  async function getAllUsers() {
    let res = await props.dispatch({
      type: 'user/fetchUserList',
    });
    if (res && res.status === 200) {
      setMemberList(res.data);
    }
  }


  function onApiClick(api) {
    setApiID(api.api_id)
  }

  function getBadgeColor(api) {
    switch(api.method) {
      case 'GET': return 'green'
      case 'POST': return 'cyan'
      case 'PUT': return 'yellow'
      case 'DELETE': return 'red'
    }
  }

  function getMethodOptions() {
    const method = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    return method.map(m => {
      return <Option value={m}>{m}</Option>
    })
  }

  function getProtocol() {
    const protocol = ['https', 'http'];
    return protocol.map(p => <Option value={p}>{p}</Option>)
  }

  async function onSaveClick() {
    let payload = form.getFieldsValue()
    let type = ''
    if(apiID == 'create') {
      type = 'api/createAPI'
      payload['project_id'] = projectId
    } else {
      type = 'api/updateAPI'
      payload['id'] = apiID
    }

    let res = await props.dispatch({
      type,
      payload,
    });
    console.log('payload', apiID, payload)
    if (res && res.status === 200) {
      message.success('Save successfully!')
      if(apiID == 'create') {
        getAPIList();
        setApiID(res.data.id)
      } else {
        getAPIDetail(apiID);
      }
    }
  }

  async function onAddClick() {
    setApiID('create')
  }

  async function onImportClick() {
    setModalOpen(true);
  }

  async function onImportOk(payload) {
    console.log(projectId, payload);
    if(!payload.auto_import_api) {
      message.error("Can't import API automatically, Please open Auto Import API first!")
      return;
    }
    let res = await props.dispatch({
      type: 'api/batchImportAPI',
      payload: {
        project_id: projectId,
        ...payload,
      }
    });
    if (res && res.status === 200) {
      message.success("Auto import API successfully!")
      message.info("Please be patient for a while and then press the Refresh button to get the latest API! ")
      getAPIList();
      setApiID(null)
    }
    setModalOpen(false);
  }

  function onImportCancel() {
    setModalOpen(false);
  }

  function onDeleteClick() {
    setDeleteModalOpen(true);
  }

  function onDeleteCancel() {
    setDeleteModalOpen(false);
  }

  async function onDeleteOK(){
    let res = await props.dispatch({
      type: 'api/deleteAPI',
      payload: {
        id: apiID,
      }
    });
    if (res && res.status === 200) {
      message.success("Delete API successfully!")
      getAPIList();
      setApiID(null)
      setDeleteModalOpen(false)
    }
  }

  function reload() {
    getAPIList();
  }

  return (
    <div className={styles.apiContainer}>
      <div className={styles.sideContainer}>
        <div className={styles.projectContainer}>
          <h1>{projectDetail.project_name}</h1>
          <Button type="primary" className={styles.editTab} onClick={() => onAddClick()}><PlusOutlined />ADD</Button>
          <Button className={styles.importTab} onClick={() => onImportClick()}><PlusOutlined />Batch Import</Button>
          <Button className={styles.importTab} onClick={() => reload()}><ReloadOutlined /></Button>
        </div>
        <div>
          <Spin tip="Loading..." size="large" spinning={listLoading}>
            <List
              split={false}
              itemLayout="horizontal"
              dataSource={apiList}
              renderItem={api => (
                <List.Item key={api.id} onClick={() => onApiClick(api)}>
                  <List.Item.Meta
                    key={api.id}
                    avatar={<Badge key={getBadgeColor(api)} color={getBadgeColor(api)} text={api.method} />}
                    title={
                      <React.Fragment>
                        <Popover content={api.description}>
                          <span style={{'white-space': 'nowrap'}}>{api.description.length > 35? api.description.substring(0, 35) + '...' : api.description}</span>
                        </Popover>
                      </React.Fragment>
                    }
                  />
                </List.Item>
              )}
            />
          </Spin>
        </div>
      </div>
      <div className={styles.detailContainer}>
          {
            apiID ? (
              <Spin tip="Loading..." size="large" spinning={apiLoading}>
                <Form form={form} initialValues={{apiDetail}}>
                  <Card
                    title={apiID === 'create' ? 'Create API' : 'Edit API'}
                    extra={
                      <React.Fragment>
                        {
                          apiID !== 'create' && (
                            <a className={styles.deleteTab} onClick={onDeleteClick}><DeleteOutlined />Delete</a>
                            )
                          }
                        <a className={styles.editTab} onClick={onSaveClick}><EditOutlined />Save</a>
                      </React.Fragment>
                    }
                  >
                    <Form.Item label="API Description" name="description"
                      rules={[{ required: true, message: 'Please input API Description!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                      <Col span={6}>
                        <Form.Item name="protocol">
                          <Select>
                            {getProtocol()}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name="path" wrapperCol={6}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="Method" name="method"
                      rules={[{ required: true, message: 'Please input API Description!' }]}
                    >
                      <Select>
                        {getMethodOptions()}
                      </Select>
                    </Form.Item>
                  </Card>
                  <Card>
                    <Badge.Ribbon text="Header" color="cyan" placement="start">
                      <Card title=" " size="small">
                        <Form.List name="header_params">
                          {(fields, { add, remove }) => (
                            <React.Fragment>
                              {fields.map(({ key, value, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                  <Form.Item
                                    {...restField}
                                    name={[key, 'key']}
                                    rules={[{ required: true, message: 'Missing Key' }]}
                                  >
                                    <Input placeholder="First Name" />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[key, 'value']}
                                    rules={[{ required: true, message: 'Missing Value' }]}
                                  >
                                    <Input placeholder="Last Name" />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(key)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Col span={3}>
                                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                  </Button>
                                </Col>
                              </Form.Item>
                            </React.Fragment>
                          )}
                        </Form.List>
                      </Card>
                    </Badge.Ribbon>
                    <Badge.Ribbon text="Query" color="cyan" placement="start">
                      <Card title=" " size="small">
                        <Form.List name="query_params">
                          {(fields, { add, remove }) => (
                            <React.Fragment>
                              {fields.map(({ key, value, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                  <Form.Item
                                    {...restField}
                                    name={[key, 'key']}
                                    rules={[{ required: true, message: 'Missing Key' }]}
                                  >
                                    <Input placeholder="First Name" />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[key, 'value']}
                                    rules={[{ required: true, message: 'Missing Value' }]}
                                  >
                                    <Input placeholder="Last Name" />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(key)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Col span={3}>
                                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                  </Button>
                                </Col>
                              </Form.Item>
                            </React.Fragment>
                          )}
                        </Form.List>
                      </Card>
                    </Badge.Ribbon>
                    <Badge.Ribbon text="Body" color="cyan" placement="start">
                      <Card title=" " size="small">
                        <Form.Item name="response_body">
                          <TextArea rows={6} />
                        </Form.Item>
                      </Card>
                    </Badge.Ribbon>
                  </Card>
                </Form>
              </Spin>
            ) : (
              <Empty className={styles.empty}>
                <Button type="primary" onClick={onAddClick}>Create API Now</Button>
              </Empty>
            )
          }
      </div>
      <ProjectModal
        type="import"
        projectDetail={projectDetail}
        memberList={memberList}
        isModalOpen={isModalOpen}
        onCancel={onImportCancel}
        onOk={onImportOk}
      />
      <DeleteModal
        title="API"
        value={apiDetail.description}
        isModalOpen={isDeleteModalOpen}
        onCancel={onDeleteCancel}
        onOk={onDeleteOK}
      />
    </div>
  );
}

export default connect(({ user, project, api }) => ({ user, project, api }))(ApiPage);