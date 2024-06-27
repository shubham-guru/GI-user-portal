import { Divider, Modal } from 'antd'
import React, { ReactNode } from 'react'

type ICustomModal = {
    isModalOpen: boolean;
    handleOk: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleCancel: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
    children: ReactNode;
}
const CustomModal: React.FC<ICustomModal> = ({ isModalOpen, handleCancel, handleOk, title, children }) => {
  return (
    <Modal footer={false} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Divider />
        {children}
    </Modal>
  )
}

export default CustomModal