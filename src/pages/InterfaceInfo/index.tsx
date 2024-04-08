import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost,
} from '@/services/miapi-backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Form, Spin, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormProps } from 'antd/lib';
import React, { useEffect, useState } from 'react';

/**
 * 查看接口信息页
 * @constructor
 */
const Index: React.FC = () => {
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokRes, setInvokRes] = useState<any>();
  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGet({ id: Number(params.id) });
      setData(res?.data);
    } catch (error: any) {
      message.error('加载数据失败，' + error.message);
    }
  };

  useEffect(() => {
    loadData().then(() => {});
  }, []);

  const onFinish: FormProps['onFinish'] = async (values) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        id: Number(params.id),
        ...values,
      });
      setInvokRes(res.data);
      message.success('请求成功');
    } catch (e) {
      message.error('请求失败');
    }
    setInvokeLoading(false);
  };

  return (
    <PageContainer title={'查看接口文档'}>
      <Card>
        {data ? (
          <>
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
              <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
              <Descriptions.Item label="接口状态">
                {data.status ? '正常' : '关闭'}
              </Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
              <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
              <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            </Descriptions>
          </>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title={'在线测试'}>
        <Form name="invoke" onFinish={onFinish} layout={'vertical'}>
          <Form.Item label="请求参数" name="userRequestParams">
            <TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title={'返回结果'}>
        <Spin spinning={invokeLoading}>{invokRes}</Spin>
      </Card>
    </PageContainer>
  );
};

export default Index;
