import React, { useEffect, useState } from 'react'
import { Delete, Object_byid } from '../Services/Action';

function ListFriend({ data }) {


    const avatarDefalut = 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s80x80&_nc_cat=1&ccb=1-7&_nc_sid=5cdb2e&_nc_eui2=AeFaM6_DLqW3gobE0rSUjKrbWt9TLzuBU1Ba31MvO4FTUJCJVApzrQY5RWYUcPfTXE8CU_mzYeJ-nmo5-68HerCj&_nc_ohc=zc_bz3Z8qrgQ7kNvwFkYr2s&_nc_oc=AdlxGOTh4UaVZjs7DhDUB0oEjkFTS_jlNGOnOAkRgbtwZwaPsWdp6U0w8KRJdIMstgM&_nc_zt=24&_nc_ht=scontent.fhan5-1.fna&oh=00_Afj3PaT7b9ldMnTsnRDKHk543Ypu0cvbC2RgJP0bAezklQ&oe=694EBDBA';

    const [friend, setFriend] = useState([]);
    useEffect(() => {
        if (data.length > 0 && friend.length === 0) {   // chỉ fetch khi chưa có friend
            const fetchFriends = async () => {
                try {
                    const friends = await Promise.all(
                        data.map(async (item) => {
                            const account = await Object_byid('User/friend', item.id_user);
                            return { account, id: item.id };
                        })
                    );


                    setFriend(friends);
                } catch (error) {
                    console.error("Lỗi fetchFriends: ", error);
                }
            };

            fetchFriends();
        }

    }, []);
    console.log(friend);

    const deleteFriend = async (id) => {
        try {
            await Delete('Friend', id);
            window.location.reload();


        } catch (error) {
            console.error("Lỗi xóa U_id = " + id, error);
            throw (error);
        }
    }
    return (
        <div className="w-full h-full overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-5  gap-1  ">
                {friend.map((f, i) => (
                    <div key={i} className="p-2 cursor-pointer border border-gray-900 rounded-[10px] hover:shadow-sm hover:shadow-[#444444] text-white">
                        <div className="w-full aspect-square relative">
                            <img
                                src={f.account.avatar != null ? f.account.avatar : avatarDefalut}
                                className='w-full h-full rounded-[5px]'
                                alt=""
                            />
                            <span className='absolute bottom-0 left-1 text-[14px] text-[#110000] font-bold font-tiktok p-1 opacity-40 rounded-[5px] bg-[#888888]'>
                                {f.account.fullname}
                            </span>
                        </div>

                        <button onClick={() => deleteFriend(f.id)} className='w-full mt-3 py-1 rounded-[15px] text-[12px] border border-gray-700 hover:bg-[#444444]'>
                            Xóa bạn
                        </button>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default ListFriend
