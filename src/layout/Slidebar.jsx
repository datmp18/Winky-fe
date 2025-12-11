import { useEffect, useState } from 'react'
import Logo from '../winky2.png'
import { ConfigProvider, Drawer, Input, Tooltip, theme, Button, Space } from "antd";

import { Menu } from 'antd';
import { FaBell, FaUser, FaUserEdit, FaUserFriends, FaUserSlash } from 'react-icons/fa';
import { IoCloseOutline, IoHome, IoLogOutSharp, IoSearch, IoSearchSharp, IoSettings } from 'react-icons/io5';
import { BsFillChatFill, BsPlusCircleFill } from 'react-icons/bs';
import { AiFillInteraction } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { IoIosLock } from 'react-icons/io';

import { MdOutlinePassword } from 'react-icons/md';
import { Object_byid } from '../Services/Action';
import Search from '../component/Search';
import Work from '../component/Work';
import { DeleteCookie, ObjectCookie } from '../Services/CookieAction';
import { Read } from '../Services/Action'

const urlLocation = (u) => {
    return window.location.href.includes(u) ? true : false;
}


function Slidebar() {
    const [user, setUser] = useState([]);
    const [account, setAc] = useState([]);
    useEffect(() => {
        const userid = ObjectCookie("user");

        if (!(userid && userid != null)) {
            navigate('/login');

        } else setAc(userid[0]);
        const fetchData = async () => {
            try {
                const result = await Read("User");
                setUser(result);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

        const handleResize = () => {
            if (window.innerWidth < 900) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        handleResize(); // Gọi 1 lần khi component mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(urlLocation('messenger'));
    const [openBell, setOpenbell] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const Setting = [


        {
            key: 'security',
            icon: <IoIosLock />,
            label: 'Bảo mật',
            children: [
                {
                    key: '2',
                    label: 'Chỉnh sửa',
                    icon: <FaUserEdit />,
                    onClick: () => {
                        navigate('/admin/product')
                    }
                },
                {
                    key: '3',
                    label: 'Mật khẩu ',
                    icon: <MdOutlinePassword />,
                    onClick: () => {
                        navigate('/admin/product')
                    }
                },
                {
                    key: '4',
                    label: 'Xóa tài khoản ',
                    icon: <FaUserSlash />,
                    onClick: () => {
                        navigate('/admin/product')
                    }
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: '5',
            label: 'Đăng xuất',
            icon: <IoLogOutSharp />,
            onClick: () => {
                DeleteCookie('user');
            }

        },





    ];
    const ListButon = [
        {
            key: '1',
            icon: <IoHome />,
            label: 'Trang chủ',
            onClick: () => {
                setCollapsed(false);

                navigate('/')
            }
        },
        {
            key: '2',
            icon: <FaUserFriends />,
            label: 'Bạn bè',
            onClick: () => {
                setCollapsed(false);

                navigate('/newfriend')
            }
        },
        {
            key: '3',
            icon: <BsFillChatFill />,
            label: 'Trò chuyện',
            onClick: () => {
                setCollapsed(true);

                navigate('/messenger')
            }
        },
        {
            key: '4',
            icon: <FaBell />,
            label: 'Hoạt động',
            onClick: () => {
                setOpenbell(!openBell);
            },
        },
        {
            key: '5',
            icon: <AiFillInteraction size={20} />,
            label: 'Kết nối',
            onClick: () => {
                setCollapsed(false);
                navigate('/')
            }
        },
        {
            key: '6',
            icon: <IoSearchSharp size={20} />,
            label: 'Tìm kiếm',
            onClick: () => {

                setOpenSearch(true);
            }
        },

    ];
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    // console.log(account);

    const handleSearch = () => {

        const keyword = (search || "").toLowerCase().trim();

        const filteredFriends = user.filter(f =>
            f.email.toLowerCase().includes(keyword) && f.id != account.id
        );
        setResult(filteredFriends);


    };




    return (
        <>
            <div className={`${collapsed === true ? 'w-[4.5vw]' : 'w-[12vw]'}    h-full relative `}>
                <div className="w-full h-[70px] flex items-center  px-3">
                    <img src={Logo} className='w-[50px] lg:w-[70px] sm:min-w-[50px]  xl:w-[70px]  h-auto ' alt="" />
                    <span className={`${collapsed === true ? 'hidden' : 'block'}    lg:text-2xl text-3xl font-extrabold tracking-wider text-yellow-400 px-2`} style={{ textShadow: "2px 5px 10px rgba(171, 173, 179, 0.7)" }}>Winky</span>
                </div>
                <Menu
                    className={`my-3 bg-black `}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    items={ListButon}
                    theme='dark'
                    inlineCollapsed={collapsed}
                />

                <div className="w-full shadow-sm shadow-[#222222]  h-[3.5rem] group absolute bg-[#111111] bottom-2 left-1 rounded-[5px] flex  items-center justify-center">
                    <div onClick={() => {
                        navigate(`/profile/${account.id}`);
                        window.location.reload(true);
                        setCollapsed(false);
                    }} className={`w-full  flex   mt-1  ml-1 cursor-pointer`}>
                        <div className=" w-[40px] h-[40px] bg-yellow-500  rounded-full flex justify-center items-center">
                            <FaUser />
                        </div>
                        <div className={`${collapsed === true ? 'hidden' : 'block'}   text-white px-1 relative  `}>
                            <h1 className='text-[14px] '>{account.firstName} {account.lastName}</h1>
                            <p className="text-[12px] text-green-500 transition-all duration-500 transform group-hover:opacity-0 group-hover:-translate-y-2">
                                online
                            </p>
                            <p className='text-[11px]   absolute bottom-[-10px]  text-[#111111] group-hover:text-gray-400 transition-all duration-500 transform group-hover:opacity-1 group-hover:-translate-y-3 '>{maskEmail(account.email)}</p>
                        </div>
                    </div>
                    <div className={`${collapsed === true ? 'hidden' : 'w-3/5'} xl:w-3/5 sm:w-full lg:w-full  flex justify-between items-center px-3`}>
                        <Tooltip onClick={() => { navigate('/news') }} placement="top" title={"Tạo tin"} color="#3c3a3aff" >
                            <BsPlusCircleFill className='  hover:animate-shake  cursor-pointer' color='white' />
                        </Tooltip>
                        <Tooltip onClick={() => setOpenSetting(true)} placement="top" title={" Cài đặt"} color="#3c3a3aff">
                            <IoSettings className="text-white transition-transform duration-700 cursor-pointer hover:rotate-[360deg]" color='white' />
                        </Tooltip>
                    </div>
                </div>
            </div>

            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                <Drawer
                    title="10 Thông báo "
                    className='bg-black'
                    placement={'left'}
                    width={'20vw'}
                    closeIcon={<IoCloseOutline style={{ color: '#fff' }} />}
                    onClose={() => setOpenbell(false)}
                    open={openBell}

                >
                    <Work />
                </Drawer>
            </ConfigProvider>

            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                <Drawer
                    title={
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onPressEnter={handleSearch}
                            className="rounded-[50px] h-9"
                            placeholder="Tìm kiếm bạn bè"
                            suffix={
                                <Tooltip title="Tìm kiếm" placement="right">
                                    <div
                                        className="w-8 h-8 mr-[-7px] p-1 rounded-full hover:bg-[#333333] text-white flex justify-center items-center cursor-pointer"
                                        onClick={handleSearch}
                                    >
                                        <IoSearch color="blue" size={16} />
                                    </div>
                                </Tooltip>
                            }
                        />
                    }
                    className='bg-black px-0'
                    placement={'left'}
                    width={'20vw'}
                    closeIcon={<IoCloseOutline style={{ color: '#fff' }} />}
                    onClose={() => setOpenSearch(false)}
                    open={openSearch}

                >
                    <Search data={result != null ? result : []} />
                </Drawer>
            </ConfigProvider>
            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                <Drawer
                    classNames={'bg-[#001529]'}
                    width={'15vw'}
                    className='m-0 p-0 '
                    title="Cài đặt"
                    placement={'right'}

                    onClose={() => setOpenSetting(false)}
                    open={openSetting}

                >
                    <Menu
                        className={`w-full  mb-3 bg-[#1f1f1f] p-0 `}


                        items={Setting}
                        theme='dark'

                        mode="inline"
                    />
                </Drawer>
            </ConfigProvider>


        </>

    )
}
const maskEmail = (email) => {
    if (!email) return "";

    const visible = email.slice(0, 14);
    if (email.length <= 8) {
        return visible;
    }

    return visible + "...";
};



export default Slidebar
