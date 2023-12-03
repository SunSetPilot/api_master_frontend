import { useEffect, useState } from 'react';
import { connect } from 'dva';
import {
  Card,
  Popconfirm,
  message
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ProjectModal from '../components/Project/ProjectModal';
import styles from './index.less';

const modalDict = {
  'create': {
    dispatch: 'project/createProject',
    messageSuccess: 'Create a new project successfully.'
  },
  'edit': {
    dispatch: 'project/updateProject',
    messageSuccess: 'Update successfully.'
  }
}

function ProjectList(props) {
  useEffect(() => {
    getProjectList();
    getAllUsers();
  }, [])
  console.log('modalType1', modalType);

  const [projectList, setProjectList] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [projectDetail, setProjectDetail] = useState({});
  const [memberList, setMemberList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create'); // The type of the showing Modal(Create/Edit)

  async function getProjectList() {
    let res = await props.dispatch({
      type: 'project/fetchProjectList'
    });
    if (res && res.status === 200) {
      setProjectList(res.data || []);
    }
  }

  function onProjectCardClick(e, p) {
    e.preventDefault();
    props.history.push(`/project/${p.project_id}/api`)
  }

  function onEditClick(e, p) {
    e.preventDefault();
    e.stopPropagation()
    getProjectDetail(p.project_id);
  }

  async function getProjectDetail(projectId) {
    let res = await props.dispatch({
      type: 'project/fetchProjectDetail',
      payload: {
        id: projectId,
      }
    });
    if (res && res.status === 200) {
      setProjectDetail(res.data);
      setModalType('edit');
      setModalOpen(true);
      setProjectId(projectId);
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

  async function onModalOk(payload) {
    let res = await props.dispatch({
      type:modalDict[modalType].dispatch,
      payload: {
        id: projectId,
        ...payload,
      }
    });
    if (res && res.status === 200) {
      message.success(modalDict[modalType].messageSuccess)
      getProjectList();
    }
    setModalOpen(false);
  }

  function onCreateClick() {
    setProjectDetail({});
    setModalOpen(true);
    setModalType('create')
  }

  function onModalCancel() {
    setModalOpen(false);
  }

  function onDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation()
  }

  async function onDeleteOK(e, p){
    e.preventDefault();
    e.stopPropagation()
    let res = await props.dispatch({
      type: 'project/deleteProject',
      payload: {
        id: p.project_id,
      }
    });
    if (res && res.status === 200) {
      message.success("Delete Project successfully!")
      getProjectList();
    }
  }
  const deleteText = 'Are you sure you want to delete ';

  return (
    <div className={styles.cardContainer}>
      {
        projectList.map(p =>
          <Card
            title={p.project_name}
            className={styles.projectCard} key={p.project_id}
            onClick={(e) => onProjectCardClick(e, p)}
            extra={
              <div>
                <a className={styles.editTab} onClick={(e) => onEditClick(e, p)}><EditOutlined />Edit</a>
                <Popconfirm placement="topLeft" title={deleteText + p.project_name + '?'} onClick={(e) => onDeleteClick(e)} onConfirm={(e) => onDeleteOK(e, p)} okText="Yes" cancelText="No">
                  <a className={styles.deleteTab}><DeleteOutlined />Delete</a>
                </Popconfirm>
              </div>
            }
          >
            {/* <h2>{p.project_name}</h2> */}
            <span className={styles.apiText}>{p.api_count}</span>
            {p.project_owner}
          </Card>
        )
      }
      <Card
        className={styles.createProjectCard}
        onClick={onCreateClick}
      >
        <PlusOutlined className={styles.plus}/>
        <span className={styles.createSpan}>New Project</span>
      </Card>
      <ProjectModal
        type={modalType}
        projectDetail={projectDetail}
        memberList={memberList}
        isModalOpen={isModalOpen}
        onCancel={onModalCancel}
        onOk={onModalOk}
      />
    </div>
  );
}

export default connect(({ user, project }) => ({ user, project }))(ProjectList);