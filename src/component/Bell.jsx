import React from 'react'
import { BsFillChatFill } from 'react-icons/bs';
import { notification } from 'antd';
function Bell() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = type => {
        api[type]({
            message: <h6 className='text-white'>Vũ Đạt đang trò chuyện </h6>,

            description:
                <p className='text-white'> [Hình ảnh ] </p>,
            placement: 'bottomRight',
            duration: 3,
            icon: <BsFillChatFill size={22} color='blue' />,
            style: {
                backgroundColor: '#141414',
                color: '#fff',
            },
        });
    };
    openNotificationWithIcon('success')
    return (
        <div>
            {contextHolder}
        </div>
    )
}

export default Bell
