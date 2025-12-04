
import { Modal, ConfigProvider, theme, Tabs } from 'antd';
import React, { use, useEffect, useState } from 'react'
import { FaRegHeart, FaRegImage, FaUser, FaUserFriends } from 'react-icons/fa';
import { IoCamera } from 'react-icons/io5';

import { useNavigate, useParams } from 'react-router-dom';


import { MdLock, MdVideoLibrary } from 'react-icons/md';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { TiHome } from 'react-icons/ti';
import { Read } from '../Services/Action';
import ListFriend from '../component/ListFriend';
import { ObjectCookie } from '../Services/CookieAction';


const Layout = ({ id, avatar, type, love }) => {
    const navigate = useNavigate();
    const icons = {
        0: FaRegImage,
        1: BsFillCaretRightFill,
        2: MdVideoLibrary,
    };

    const IconComponent = icons[type] || BsFillCaretRightFill;
    const url = 'https://res.cloudinary.com/dlracijtv/image/upload/v1764359526/Winky/image/';
    return (
        <div onClick={() => navigate(`/article/${id}`)} className="relative border border-[#333333] h-[15rem] hover:opacity-50 cursor-pointer group rounded-[10px] shadow-sm shadow-[#333333] hover:shadow-[#444444] relative">
            <div className="w-full h-full flex justify-center items-center">
                <img className="max-w-full max-h-full" src={url + avatar} alt="" />
            </div>
            <div className="absolute top-1 left-2 flex ">
                <FaRegHeart size={15} /> <span className='mx-1 mt-[-4px]'>{love}</span> </div>
            <IconComponent
                className="absolute top-1 right-2 rounded-full flex items-center justify-center"
                color="white"
                size={20}
            />
        </div>
    );
};
function Profile() {

    const [open, setOpen] = useState(false);
    const [OpenAvartar, setAvatar] = useState(false);



    const [Account, setData] = useState([]);
    const [Article, setArticle] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        const userid = ObjectCookie("user")[0];


        if (!(userid && userid != null)) {
            navigate('/login');

        }
        const fetchData = async () => {
            try {
                const result = await Read("User/" + id);
                setData(result);
                setArticle(result.articles ?? []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);





    const action = [
        {
            key: '1',
            label:
                <div className='flex  justify-between'>
                    <TiHome size={15} />
                    <span className='ml-3'>Tất cả </span>
                </div>

            ,
            children:
                <section className='w-full overflow-y-scroll h-2/3 scrollbar-hide p-1  '>
                    <div className="grid grid-cols-6  gap-5  ">
                        {Article.map((o, i) => (
                            <Layout
                                key={i}
                                love={o.love}
                                id={o.id}
                                avatar={o.avatar}
                                type={o.type}
                            />
                        ))
                        }

                    </div>
                </section>,

        },
        {
            key: '2',
            label:
                <div className='flex  justify-between'>
                    <FaUserFriends size={15} />
                    <span className='ml-3'>Công khai</span>
                </div>

            ,
            children:
                <section className='w-full overflow-y-scroll h-2/3 scrollbar-hide p-1  '>
                    <div class="grid grid-cols-6  gap-5  ">
                        {Article.filter(o => o.status === 1)
                            .map((o, i) => (
                                <Layout
                                    key={i}
                                    love={o.love}
                                    id={o.id}
                                    avatar={o.avatar}
                                    type={o.type}
                                />
                            ))
                        }

                    </div>

                </section>,

        },
        {
            key: '3',
            label:
                <div className='flex  justify-between'>
                    <MdLock size={15} />
                    <span className='ml-3'>Cá nhân</span>
                </div>
            ,
            children:
                <section className='w-full overflow-y-scroll h-2/3 scrollbar-hide p-1  '>
                    <div class="grid grid-cols-6  gap-5  ">
                        {Article.filter(o => o.status === 0).map((o, i) => (
                            <Layout
                                key={i}
                                love={o.love}
                                id={o.id}
                                avatar={o.avatar}
                                type={o.type}
                            />
                        ))
                        }

                    </div>

                </section>
            ,

        }
    ];

    return (
        <>
            <div className='w-full h-full    '>
                <div className="w-full  p-8">
                    <div className="  mx-auto h-1/4  flex items-center w-[40vw]">
                        <div className="w-[160px] relative h-[160px] bg-yellow-500  rounded-full flex justify-center items-center">
                            <FaUser size={80} color='white' />
                            {/* <div onClick={() => setAvatar(true)} className="absolute flex justify-center items-center bottom-2 right-2 w-8 h-8 rounded-full bg-[#777777]">
                                <IoCamera />
                            </div> */}
                        </div>
                        <div className=" w-[30vw] h-full text-white relative   pl-5 ">
                            <div className='mx-auto'>
                                <h1 className='text-[30px] font-bold mb-2 '> {Account.lastName} {Account.firstName}</h1>
                                <p className='h-[6rem] text-gray-400  text-[14px]'>{Account.content} </p>
                                <h3 className='mt-2'>{Article.length ?? 0} Bài viết - <span className='hover:underline cursor-pointer' onClick={() => setOpen(true)}>{Account.friend?.length ?? 0} bạn bè</span> </h3>
                            </div>


                        </div>

                    </div>
                </div>


                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                        token: {
                            colorBgContainer: "#1f2933",
                            colorText: "#e5e7eb",
                        },
                    }}
                >
                    <Tabs className='w-4/5 mx-auto' defaultActiveKey="1" centered items={action} />
                </ConfigProvider>


            </div>
            <Modal
                title="Ảnh đại diện "
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={OpenAvartar}
                onCancel={() => setAvatar(false)}
            >
                <p>Đây là forn upload </p>
            </Modal>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorBgContainer: "#1f2933",
                        colorText: "#e5e7eb",
                    },
                }}
            >
                <Modal
                    title="Bạn bè"
                    width={"50vw"}

                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={null}
                >
                    <ListFriend data={Account.friend ? Account.friend : []} />
                </Modal>

            </ConfigProvider>

        </>

    )
}

export default Profile
