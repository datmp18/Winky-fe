import React from 'react'
import { QRCode, Space } from 'antd';
function Qrme() {
    const [text, setText] = React.useState('http://localhost:3000/profile/5');
    return (
        <div>
            <Space direction="vertical" align="center">
                <QRCode value={text || '-'} />
            </Space>
        </div>
    )
}

export default Qrme
