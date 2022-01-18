import styles from './index.less';

import { Card, Tag, Button, Avatar, Modal, message } from 'antd';
import { Toast } from 'antd-mobile';
import {
  FileWordTwoTone,
  FileImageTwoTone,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

/**
 * props
 * @param {object} file
 * @param {function} reset
 * @param {function} id
 * @returns {FunctionComponent}
 */
const FileCard = (props) => {
  const { file, reset, id } = props;
  const filename = file.name.split('/')[2];

  // 删除文件
  const removeFile = (fileid) => {
    Modal.confirm({
      content: '确定要删除这个文件？',
      cancelText: '取消',
      okText: '确认',
      closeOnAction: true,
      onOk: async () => {
        fetch(`/api/file/${fileid}`, {
          method: 'DELETE',
        })
          .then((r) => {
            return r.json();
          })
          .then((res) => {
            if (res.ok) {
              message.success({
                icon: <CheckCircleTwoTone />,
                content: '删除成功',
              });
              reset();
            } else {
              message.success({
                icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
                content: res.error || '未知错误',
              });
            }
          });
      },
    });
  };

  // 发送文件
  const sendFile = (fileid) => {
    fetch(
      `/api/send/${encodeURIComponent(id)}/${fileid}/${encodeURIComponent(
        filename,
      )}`,
    )
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        if (res.ok) {
          Toast.show({
            icon: 'success',
            content: '成功',
          });
        } else {
          Toast.show({
            icon: 'fail',
            content: res.error || '未知错误',
          });
        }
      });
  };

  const switchIcon = (fileType) => {
    let ele = null;
    switch (fileType) {
      case 'image':
        ele = <FileImageTwoTone />;
        break;
      case 'file':
        ele = <FileWordTwoTone />;
        break;
    }
    return ele;
  };

  // 操作数组
  const actions = [
    <Tag color="primary" fill="outline" key="file-type">
      {switchIcon(file.fileType)}
    </Tag>,
    <Tag color="success" fill="outline" key="created-at">
      {file.createdAt.slice(0, 10)}
    </Tag>,

    <Button
      key="download"
      color="primary"
      size="small"
      target="_blank"
      href={`/api/file/${encodeURIComponent(file.fileid)}/${encodeURIComponent(
        filename,
      )}`}
    >
      下载
    </Button>,
    <Button key="delete" color="danger" size="small" onClick={() => removeFile(file.fileid)}>
      删除
    </Button>,
    <Button key="send" color="success" size="small" onClick={() => sendFile(file.fileid)}>
      发送
    </Button>,
  ];

  return (
    <Card
      bordered
      title={file.name
        .replace(/^wechaty\/R:[0-9]+\//g, '')
        .replace(/.[A-Za-z]+$/, '')}
      actions={actions}
    >
      {file.fileType === 'image' ? (
        <div className={styles.fileCardImgContent}>
          <div>{file.content}</div>
          <Avatar
            shape="square"
            size={{ xs: 60, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            className={styles.fileCardContentImg}
            src={`/api/file/${encodeURIComponent(
              file.fileid,
            )}/${encodeURIComponent(filename)}`}
          />
        </div>
      ) : (
        <div className={`${styles.fileCardContent} ${styles.overflowHiding}`}>
          {file.content}
        </div>
      )}
    </Card>
  );
};
export default FileCard;
