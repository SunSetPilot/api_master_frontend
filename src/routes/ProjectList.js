import { useEffect, useState } from 'react';
import { connect } from 'dva';
import {
  Card,
} from 'antd';
import styles from './index.less';

function ProjectList(props) {
  useEffect(() => {
    getProjectList();
  }, [])

  const [projectList, setProjectList] = useState([]);

  async function getProjectList() {
    let res = await props.dispatch({
      type: 'project/fetchProjectList'
    })
    if (res && res.status === 200) {
      setProjectList(res.data || []);
    }
  }

  return (
    <div>
      {
        projectList.map(p =>
          <Card
            className={styles.projectCard} key={p.project_id}
            onClick={() => props.history.push(`/project/${p.project_id}`)}
          >
            <h2>{p.project_name}</h2>
            <span className={styles.apiText}>{p.project_api}</span>
            {p.project_owner}
          </Card>
        )
      }
    </div>
  );
}

export default connect(({ project }) => ({ project }))(ProjectList);