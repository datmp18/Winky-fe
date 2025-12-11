import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
import { Create, Read, Update } from '../Services/Action';
import { message } from 'antd';

const avatarDefalut = 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s80x80&_nc_cat=1&ccb=1-7&_nc_sid=5cdb2e&_nc_eui2=AeFaM6_DLqW3gobE0rSUjKrbWt9TLzuBU1Ba31MvO4FTUJCJVApzrQY5RWYUcPfTXE8CU_mzYeJ-nmo5-68HerCj&_nc_ohc=zc_bz3Z8qrgQ7kNvwFkYr2s&_nc_oc=AdlxGOTh4UaVZjs7DhDUB0oEjkFTS_jlNGOnOAkRgbtwZwaPsWdp6U0w8KRJdIMstgM&_nc_zt=24&_nc_ht=scontent.fhan5-1.fna&oh=00_Afj3PaT7b9ldMnTsnRDKHk543Ypu0cvbC2RgJP0bAezklQ&oe=694EBDBA';

function Search({ data }) {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (text) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    const [friend, setFriend] = useState([]);
    const [idU, setU] = useState(null);
    useEffect(() => {
        const userid = ObjectCookie("user")[0];
        setU(userid.id);
        const fetchData = async () => {
            try {
                const result = await Read("Friend/" + userid.id) ?? [];
                setFriend(result);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);


    const navigate = useNavigate();

    const connec = async (idF) => {
        const data = {
            UserTo: idU,
            UserFrom: idF,
            Status: 0
        }


        try {
            var check = await Create('Friend', data);
        } catch (error) {
            console.error(error);
            throw (error);

        }

    }

    const Updatef = async (idF, id) => {
        const data = {
            UserTo: idU,
            UserFrom: idF,
            Status: 1
        }


        try {
            var check = await Update("friend", id, data);
        } catch (error) {
            console.error(error);
            throw (error);

        }

    }


    const userlist = data.map(u => {
        const fr = friend.find(f => f.id === u.id);
        return {
            ...u,
            status: fr?.status ?? 0,
            sending: fr?.sending ?? 0,
            fid: fr?.fid ?? 0
        };
    });


    console.log(userlist);





    return (
        <div className="w-full h-full overflow-y-auto scrollbar-hide select-none">
            {contextHolder}
            {userlist.map((o, i) => {

                return (
                    <div

                        key={i}
                        className={`w-full h-[3rem] p-1 cursor-pointer rounded-[10px] flex hover:bg-[#444444] hover:opacity-90 
                            }`}
                    >
                        <img
                            onClick={() => {
                                navigate(`profile/${o.id}`);
                                window.location.reload(true);
                            }}
                            src={o.image != null ? o.image : avatarDefalut}
                            className="w-1/6  rounded-full aspect-square"
                            alt=""
                        />
                        <div onClick={() => {
                            navigate(`profile/${o.id}`);
                            window.location.reload(true);
                        }} className="w-1/2 h-full text-white px-4 flex items-center">
                            <div className="h-auto">
                                <h2 className="text-[14px] font-bold">
                                    {o.firstName} {o.lastName}
                                </h2>
                                <p className="text-gray-100 text-[12px]">

                                    {o.status == 1 ? "Bạn bè" : (
                                        (o.status == 0 && o.sending == 1) ? "Đã gửi kết bạn" :
                                            ""
                                    )
                                    }

                                </p>
                            </div>
                        </div>
                        <div onClick={() => {
                            connec(o.id);
                            success(`Đã gửi lời kết bạn đến ${o.firstName} ${o.lastName}`)
                        }}
                            className={`${o.status === 0 && o.sending === 0 ? "block" : "hidden"} w-1/3 h-full `}>
                            <button className='w-full  py-1  rounded-[15px]  border border-gray-700 hover:bg-[#555555]'>Kết bạn</button>
                        </div>
                        <div onClick={() => {
                            Updatef(o.id, o.fid);
                            success(`Đã chấp nhận ${o.firstName} ${o.lastName} là bạn `)
                        }} className={`${o.status === 0 && o.sending === 2 ? "block" : "hidden"} w-1/3 h-full `}>

                            <button className='w-full  py-1  rounded-[15px]  border border-gray-700 hover:bg-[#555555]'>Chấp nhận</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Search;
