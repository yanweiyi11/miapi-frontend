import { listInterfaceInfoByPageUsingGet } from '@/services/miapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const finalPageSize = 10;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = finalPageSize) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({ current, pageSize });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('加载数据失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData().then(() => {});
  }, []);

  return (
    <PageContainer title={'在线接口开放平台'}>
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLike = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[
                <a href={apiLike} key="list-loadmore-edit">
                  查看
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={apiLike}>{item.name}</a>}
                description={item.description}
              />
              <div>{item.method}</div>
            </List.Item>
          );
        }}
        pagination={{
          showTotal(total: number) {
            return '总数 ' + total + ' 条';
          },
          pageSize: finalPageSize,
          total: total,
          onChange: (page: number, pageSize: number) => {
            loadData(page, pageSize).then(() => {});
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
