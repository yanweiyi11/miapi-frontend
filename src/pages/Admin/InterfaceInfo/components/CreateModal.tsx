import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时，将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  // 使用解构赋值获取 props 中的属性
  const { visible, columns, onCancel, onSubmit } = props;

  return (
    // 创建一个 Modal 组件，通过 visible 属性控制其显示或隐藏，footer 设置为 null 把表单项的“取消”和“确认”按钮去掉
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      {/* 创建一个 ProTable 组件,设定它为表单类型,通过 columns 属性设置表格的列，提交表单时调用 onSubmit 函数 */}
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
