import React, { useEffect, useState } from 'react';
import { List, Input, Col, Row, Radio } from 'antd';
import FileCard from '@/components/FileCard/index.jsx';
import styles from './index.less';
import SimpFileCard from '../../components/SimpFileCard';
const { Search } = Input;

const SearchFile = (props) => {
  const [state, setState] = useState({
    size: 10,
    page: 0,
    data: [],
    total: 0,
    loading: false,
  });
  const [type, setType] = useState('details');
  const { id, keyword } = props.match.params.id;
  useEffect(() => {
    getData();
  }, [state.page]);

  const getData = () => {
    fetch(`/api/search_data/${id}/${keyword}/${state.page * state.size}/${state.size}`)
      .then((v, err) => {
        return v.json();
      })
      .then((res) => {
        setState({
          ...state,
          data: res.data.data,
          loading: true,
          total: res.data.total,
        });
      });
  };

  const onSearch = (value) => console.log(value);

  const options = [
    { label: '详细卡片', value: 'details' },
    {
      label: '精简卡片',
      value: 'simp',
    },
  ];

  return (
    <div className={styles.root}>
      <Radio.Group
        className={styles.bottons}
        options={options}
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
        optionType="button"
      ></Radio.Group>

      <Search
        className={styles.search}
        size="large"
        placeholder="input search"
        onSearch={onSearch}
      />
      <List
        className={styles.files}
        pagination={{
          className: styles.pagination,
          onChange: (page) => {
            setState({ ...state, page: page - 1 });
          },
          hideOnSinglePage: true,
          pageSize: state.size,
          total: state.total,
        }}
        dataSource={state.data}
        renderItem={(item) => {
          return (
            <List.Item key={item.fileid} className={styles.fileItem}>
              {type === 'details' ? (
                <FileCard
                  file={item}
                  id={id}
                  loading={state.loading}
                  reset={getData}
                />
              ) : (
                <SimpFileCard
                  file={item}
                  id={id}
                  loading={state.loading}
                  reset={getData}
                />
              )}
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};

export default SearchFile;
