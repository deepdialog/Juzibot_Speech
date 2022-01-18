import { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Popconfirm,
  message,
  Table,
  Input,
  Card,
} from 'antd';

const Intents = (props) => {
  const [state, setState] = useState({
    loading: false,
    data: [],
    text: '',
    intent: '',
  });

  const { id } = props.match.params;

  const getData = async () => {
    fetch(`/api/intent/${id}`)
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        if (res.ok) {
          res.data.map((item) => (item.key = item.id));
          setState({
            ...state,
            data: res.data,
            loading: false,
            intent: '',
            text: '',
          });
        }
      });
  };

  useEffect(() => {
    setState({ ...state, loading: true });
    getData();
  }, []);

  const add = () => {
    fetch(`/api/intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        belong: decodeURIComponent(id),
        id: `${decodeURIComponent(id)}-${state.text}-${state.intent}`,
        text: state.text,
        intent: state.intent,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) {
          message.success('加入成功');
          getData();
        } else {
          message.error(ret.error || '未知错误');
        }
      });
  };

  const columns = [
    {
      title: '问题',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: '回答',
      dataIndex: 'intent',
      key: 'intent',
    },
    {
      title: '管理',
      dataIndex: 'text',
      key: 'text',
      render: (text, obj) => {
        return (
          <div>
            <Popconfirm
              title={`要删除这条数据吗“${state.text}”吗？`}
              onConfirm={async () => {
                let ret = await fetch(
                  `/api/intent/${encodeURIComponent(obj.id)}`,
                  {
                    method: 'DELETE',
                  },
                );
                ret = await ret.json();
                if (ret.ok) {
                  message.success('删除成功');
                  getData();
                } else {
                  message.error(ret.error || '未知错误');
                }
              }}
              okText="删除"
              cancelText="取消"
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Row justify="center" align="top">
        <Col md={12}>
          {state.loading ? (
            '载入中...'
          ) : (
            <div>
              <Card style={{ marginBottom: '20px' }}>
                <Form layout="inline">
                  <Form.Item label="问题">
                    <Input
                      value={state.text}
                      onChange={(e) =>
                        setState((state) => {
                          return { ...state, text: e.target.value };
                        })
                      }
                      style={{ width: 'd200px' }}
                      placeholder="用户可能的输入"
                    />
                  </Form.Item>
                  <Form.Item label="回答">
                    <Input
                      value={state.intent}
                      onChange={(e) =>
                        setState((state) => {
                          return { ...state, intent: e.target.value };
                        })
                      }
                      style={{ width: '200px' }}
                      placeholder="响应回答"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={add}>
                      添加
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
              <div>
                <Table
                  columns={columns}
                  dataSource={state.data}
                  pagination={false}
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Intents;
