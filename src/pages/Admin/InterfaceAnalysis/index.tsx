import { listTopInvokeInterfaceUsingGet } from '@/services/miapi-backend/analysisController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { message } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);

  useEffect(() => {
    try {
      listTopInvokeInterfaceUsingGet().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (e: any) {
      message.warning('加载失败，请重试');
    }
  }, []);

  // 映射，{ value: 1048, name: 'Search Engine' },
  const charData = data.map((item) => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });

  const option = {
    title: {
      text: '接口调用次数TOP5',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'interface',
        type: 'pie',
        radius: '50%',
        data: charData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer>
      <ReactECharts option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
