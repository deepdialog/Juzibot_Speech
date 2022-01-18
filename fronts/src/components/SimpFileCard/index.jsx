import { Card, Tag } from 'antd';
import {
  FileWordTwoTone,
  FileImageTwoTone,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';
import styles from './SimpFileCard.less';
/**
 * props
 * @param {object} file
 * @param {function} reset
 * @param {function} id
 * @param {boolean} loading
 * @returns {FunctionComponent}
 */

const switchIcon = (fileType) => {
  let ele = null;
  switch (fileType) {
    case 'image':
      ele = <FileImageTwoTone />;
      break;
    case 'file':
      ele = <FileWordTwoTone />;
      break;
    default:
      ele = <FileImageTwoTone />;
      break;
  }
  return ele;
};

const SimpFileCard = ({ file, reset, id, loading }) => {
  return (
    <Card bordered loading={!loading} className={styles.root}>
      <div className={styles.body}>
        <div>
          <div>
            <Tag color="geekblue">{file.fileType}</Tag>
            <Tag color="geekblue">{file.createdAt}</Tag>
          </div>
          <h3 className={styles.title}>
            {file.name
              .replace(/^wechaty\/R:[0-9]+\//g, '')
              .replace(/.[A-Za-z]+$/, '')}
          </h3>
        </div>

        {switchIcon(file.fileType)}
      </div>
    </Card>
  );
};

export default SimpFileCard;
