import { GithubOutlined, IdcardOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <DefaultFooter
        copyright={`${currentYear} yanweiyi 版权所有`}
        links={[
          {
            key: 'github',
            title: <><GithubOutlined /> GitHub</>,
            href: 'https://github.com/yanweiyi11',
            blankTarget: true,
          },
          {
            key: '工信部',
            title: <><IdcardOutlined /> 桂ICP备2024026268号-1</>,
            href: 'https://beian.miit.gov.cn/',
            blankTarget: true,
          },
        ]}
      />
    </>
  );
};

export default AppFooter;
