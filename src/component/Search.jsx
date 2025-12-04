import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
import { Create, Read } from '../Services/Action';


const avatarDefalut = 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s80x80&_nc_cat=1&ccb=1-7&_nc_sid=5cdb2e&_nc_eui2=AeFaM6_DLqW3gobE0rSUjKrbWt9TLzuBU1Ba31MvO4FTUJCJVApzrQY5RWYUcPfTXE8CU_mzYeJ-nmo5-68HerCj&_nc_ohc=zc_bz3Z8qrgQ7kNvwFkYr2s&_nc_oc=AdlxGOTh4UaVZjs7DhDUB0oEjkFTS_jlNGOnOAkRgbtwZwaPsWdp6U0w8KRJdIMstgM&_nc_zt=24&_nc_ht=scontent.fhan5-1.fna&oh=00_Afj3PaT7b9ldMnTsnRDKHk543Ypu0cvbC2RgJP0bAezklQ&oe=694EBDBA';

function Search({ data }) {
    const [friend, setFriend] = useState([]);
    const [idU, setU] = useState(null);
    useEffect(() => {
        const userid = ObjectCookie("user")[0];
        setU(userid.id);
        const fetchData = async () => {
            try {
                const result = await Read("User/" + userid.id);
                setFriend(result.friend ?? []);
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
    const friendEmails = new Set(friend.map(f => f.email));

    return (
        <div className="w-full h-full overflow-y-auto scrollbar-hide select-none">
            {data.map((o, i) => {
                const isFriend = friendEmails.has(o.email);
                return (
                    <div

                        key={i}
                        className={`w-full h-[3rem] p-1 cursor-pointer rounded-[10px] flex hover:bg-[#444444] hover:opacity-90 ${isFriend ? "bg-green-700" : ""
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
                                    {isFriend ? "Bạn bè" : "Chưa kết bạn"}
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 h-full ">
                            <button onClick={() => connec(o.id)} className='w-full  py-1  rounded-[15px]  border border-gray-700 hover:bg-[#555555]'>Kết bạn</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Search;
