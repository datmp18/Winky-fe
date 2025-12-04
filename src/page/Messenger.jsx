import { Input, Tooltip, ConfigProvider, theme } from 'antd';

import React, { useRef, useState } from 'react'

import { IoImages, IoSearch } from 'react-icons/io5';



import { BiSolidSad, BiSolidSend } from 'react-icons/bi';

import { FaPhoneAlt, FaTrash } from 'react-icons/fa';
import { TbVideoFilled } from 'react-icons/tb';

import Items from '../component/Items';
import { ObjectCookie } from '../Services/CookieAction';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: '1',
        label: 'image and file',
        children: <div>Không tồn tại file nào trong cuộc trò chuyện này </div>,
    },
    {
        key: '2',
        label: 'Quyền riêng tư',
        children: <div>Không quan tâm</div>,
    },

];

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
function Messenger() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const userid = ObjectCookie("user");
    if (!(userid && userid != null)) {
        navigate('/login');

    }
    // useEffect(() => {

    //     const startCamera = async () => {
    //         try {
    //             const constraints = {
    //                 video: {
    //                     width: { ideal: 1920 },
    //                     height: { ideal: 1080 },
    //                     facingMode: "user",
    //                     frameRate: { ideal: 60 },
    //                 },
    //                 audio: false,
    //             };

    //             const stream = await navigator.mediaDevices.getUserMedia(constraints);
    //             if (videoRef.current) {
    //                 videoRef.current.srcObject = stream;
    //             }
    //         } catch (err) {
    //             console.error("Không thể truy cập camera:", err);
    //             alert("Không thể mở camera. Hãy kiểm tra quyền truy cập!");
    //         }
    //     };

    //     startCamera();

    //     // Dọn dẹp khi rời component (tắt camera)
    //     return () => {
    //         if (videoRef.current && videoRef.current.srcObject) {
    //             const tracks = videoRef.current.srcObject.getTracks();
    //             tracks.forEach(track => track.stop());
    //         }
    //     };
    // }, []);
    {/* <video
                        ref={videoRef}
                        autoPlay    
                        playsInline
                        className="  object-cover h-full scale-x-[-1]"
                    ></video> */}
    const [inFor, getInfor] = useState(true);
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div className='text-white w-full h-full  flex  '>
            <div className="w-[17vw] h-full  border-l border-r border-gray-800">
                <div className="w-full h-[6rem]  p-3   opacity-60">
                    <h1 className='  font-bold my-2 font-[inherit] '>Trò chuyện</h1>
                    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                        <Input
                            className='rounded-[50px] h-9'

                            placeholder="Tìm kiếm đoạn chat"

                            suffix={
                                <Tooltip title="Tìm kiếm " placement="right">
                                    <div className='w-8 h-8 mr-[-7px] p-1 rounded-full hover:bg-[#333333] text-white flex justify-center items-center cursor-pointer'>

                                        <IoSearch color='blue' size={16} />

                                    </div>
                                </Tooltip>
                            }
                        />
                    </ConfigProvider>
                </div>

                <div className="w-full h-[85vh]  overflow-y-auto scrollbar-hide">
                    <Items
                        image={'https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp'}
                        status={true}
                        name={'Nguyễn Văn An'}
                        title={"Có 2 tinh nhắn mới"}
                        click={true}
                    />
                    <Items
                        image={'https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp'}
                        status={true}
                        name={'Nguyễn Văn An'}
                        title={"Có 2 tinh nhắn mới"}
                        click={false} />

                    <Items
                        image={'https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp'}
                        status={false}
                        name={'Nguyễn Văn An'}
                        title={"Có 2 tinh nhắn mới"}
                        click={false} />
                </div>
            </div>
            <div className="w-[calc(100%-17vw)]  p-2 m-0 full   ">
                <div className="w-auto h-auto shadow-sm shadow-[#555555] rounded-[10px] bg-[#111111] border border-gray-900  ">
                    <div className="w-full h-[8vh]  border-b border-[#222222] flex justify-between items-center p-2">
                        <div className="w-auto h-full flex ">
                            <img className='rounded-full' src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" alt="" />
                            <div className='pl-2'>
                                <h4 className='font-bold '> Nguyễn  Thị Thanh Thư</h4>
                                <p className='text-[10px] text-gray-500 '>Đang hoạt động</p>
                            </div>


                        </div>
                        <div className="w-auto h-full flex justify-center items-center">
                            <div className="h-full aspect-square mx-1  rounded-full flex justify-center items-center hover:bg-[#333333] opacity-50">
                                <Tooltip title="Gọi điện" placement="bottom">
                                    <FaPhoneAlt className='text-[#33FFFF]' />
                                </Tooltip>

                            </div>
                            <div className="h-full aspect-square mx-1 rounded-full  flex justify-center items-center hover:bg-[#333333] opacity-50">
                                <Tooltip title="Video call" placement="bottom">
                                    <TbVideoFilled size={20} className='text-[#33FFFF]' />
                                </Tooltip>

                            </div>
                            <div className="h-full aspect-square mx-1 rounded-full  flex justify-center items-center hover:bg-[#333333] opacity-50">
                                <Tooltip title="Xóa sạch" placement="bottom">
                                    <FaTrash className='text-[#33FFFF]' />
                                </Tooltip>

                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[90vh]    ">


                        <div className="w-full h-full">
                            <div className=" w-full h-[90%]  p-2   rounded-[15px] space-y-2 overflow-y-auto   text-[12px]">
                                <div className='w-1/2 m-auto border-bottom  text-center font -bold text-gray-400 text-[13px]'>
                                    09:40 T7
                                </div>
                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center">
                                        <div className="w-[2rem] h-[2rem] mr-1">
                                            <img src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" className="w-full h-full rounded-full" alt="" />
                                        </div>
                                        <div className="max-w-[calc(100%-2rem)]  min-h-[1rem] rounded-[15px] py-2 px-3 bg-[#444444] text-white">
                                            Bố ơi, con có câu hỏi này muốn hỏi bố!
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-blue-500 text-white">
                                        Hỏi đi con!
                                    </div>
                                </div>


                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center">
                                        <div className="w-[2rem] h-[2rem] mr-1">
                                            <img src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" className="w-full h-full rounded-full" alt="" />
                                        </div>
                                        <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-gray-200 text-black">
                                            Tại sao con cá lại sống được dưới nước ạ?
                                        </div>

                                    </div>
                                </div>


                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3  bg-[#444444] text-black">
                                        À, vì nó có mang để thở dưới nước.
                                    </div>
                                </div>
                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center">
                                        <div className="w-[2rem] h-[2rem] mr-1">
                                            <img src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" className="w-full h-full rounded-full" alt="" />
                                        </div>
                                        <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-gray-200 text-black">
                                            Thế tại sao con chim lại bay được trên trời?
                                        </div>

                                    </div>
                                </div>

                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3  bg-[#444444] text-black">
                                        Vì nó có cánh và nó nhẹ, nên nó bay được.
                                    </div>
                                </div>
                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center">
                                        <div className="w-[2rem] h-[2rem] mr-1">
                                            <img src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" className="w-full h-full rounded-full" alt="" />
                                        </div>
                                        <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-gray-200 text-black">
                                            Vậy tại sao con người không bay được hả bố?
                                        </div>

                                    </div>
                                </div>
                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-blue-500 text-white">
                                        Vì con người nặng quá, không có cánh.
                                    </div>
                                </div>
                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center">
                                        <div className="w-[2rem] h-[2rem] mr-1">
                                            <img src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" className="w-full h-full rounded-full" alt="" />
                                        </div>
                                        <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-gray-200 text-black">
                                            Nhưng bố vẫn nói dối nhẹ như lông hồng mà? 🤨
                                        </div>

                                    </div>
                                </div>
                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-blue-500 text-white">
                                        Suỵt ! Ns bé thôi
                                    </div>
                                </div>
                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-blue-500 text-white">
                                        Đó là kỹ năng Sống con
                                    </div>
                                </div>
                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center">
                                        <div className="w-[2rem] h-[2rem] mr-1">
                                            <img src="https://tft.edu.vn/public/upload/2024/12/avatar-gai-xinh-06.webp" className="w-full h-full rounded-full" alt="" />
                                        </div>
                                        <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-gray-200 text-black">
                                            Mẹ đang ở bên cạnh con nè !
                                        </div>

                                    </div>
                                </div>
                                <div className="w-full h-auto flex">
                                    <div className="w-2/3 h-auto flex items-center ml-8">

                                        <img src="https://anhcute.net/wp-content/uploads/2024/10/Anh-meme-gian-doi.jpg" className='w-[20rem] rounded-[10px]' alt="" />


                                    </div>
                                </div>
                                <div className="w-full h-auto flex justify-end">
                                    <div className="max-w-[calc(100%-2rem)] min-h-[1rem] rounded-[15px] py-2 px-3 bg-blue-500 text-white">
                                        Toang rồi ông Giaó ạ !!!
                                    </div>
                                </div>

                                <div className='w-1/2 m-auto border-bottom  text-center font -bold text-gray-400 text-[13px] mt-5'>
                                    <hr />
                                    Tài khoản này không còn tồi tại
                                </div>
                            </div>



                            <div className='w-full h-[10%]     flex  justify-between  items-center  px-3'>
                                <div className="flex w-[5%]">
                                    <button className='p-2 rounded-full    hover:bg-[#444444] hover:text-white text-black'>
                                        <IoImages size={14} color='blue' />
                                    </button>
                                </div>


                                <div className="flex w-[95%]  px-1">
                                    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                                        <Input
                                            className='w-full rounded-[50px] h-9 px-2 pl-4 caret-blue-500'
                                            placeholder="Nhập tin nhắn tại đây"
                                            suffix={
                                                <Tooltip title="Biểu tượng">
                                                    <div className='w-8 h-8 mr-[-7px] rounded-full hover:bg-[#444444] text-white flex justify-center items-center cursor-pointer'>
                                                        <BiSolidSad color='blue' size={20} />
                                                    </div>
                                                </Tooltip>
                                            }
                                        />

                                    </ConfigProvider>

                                </div>
                                <div className="flex w-auto">
                                    <button className='p-2 rounded-full  hover:bg-[#444444] hover:text-white text-black'>
                                        <BiSolidSend size={20} color='blue' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default Messenger
