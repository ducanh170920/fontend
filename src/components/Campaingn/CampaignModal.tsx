import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface prop {
    visible: boolean,
    handleOk(): void,
    handleCancel(): void,
}
const CampaignModal: React.FC<prop> = (props) => {
    const { visible, handleCancel, handleOk } = props;
    return (
        <>
            <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default CampaignModal;