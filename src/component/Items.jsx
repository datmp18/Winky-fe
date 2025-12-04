import { Dropdown } from 'antd'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

const items1 = [
    {
        key: '1',
        label: 'Xóa',
    },
    {
        key: '2',
        label: 'Chặn',
    },
];
function Items({ image, status = false, name, title, click = false }) {
    return (
        <div>
            <div className={`w-full h-[10vh] ${click === true ? "bg-[#385898]" : "hover:bg-[#111111]"}   flex justify-between items-center p-1 group`}>
                <div className="w-[50px] h-[50px] relative">
                    <img className='w-full h-full rounded-full' src={image} alt="" />
                    <div className={`absolute bottom-0 right-0 h-4 rounded-full w-4 border-[2px] border-black ${status === true ? "bg-green-500 " : "bg-gray-500"}  p-1`}></div>
                </div>


                <div className="w-auto h-full p-1">
                    <h1 className='text-[14px] py-1' >{name}</h1>
                    <p className='text-[12px] text-gray-400'>{title}</p>
                </div>

                <div className="w-auto h-full flex justify-center items-center opacity-0 group-hover:opacity-100  ">

                    <Dropdown menu={{ items: items1 }} placement="bottomLeft" arrow>
                        <div className='cursor-pointer w-8 h-8 my-2 bg-[#555555] rounded-full flex hover:bg-white hover:text-blue-500 mr-2 justify-center items-center'>
                            <BsThreeDots />
                        </div>
                    </Dropdown>

                </div>
            </div>
        </div>
    )
}

export default Items
