import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
import { Object_byid, Read } from '../Services/Action';
const avatarDefalut = 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=cp0_dst-png_s80x80&_nc_cat=1&ccb=1-7&_nc_sid=5cdb2e&_nc_eui2=AeFaM6_DLqW3gobE0rSUjKrbWt9TLzuBU1Ba31MvO4FTUJCJVApzrQY5RWYUcPfTXE8CU_mzYeJ-nmo5-68HerCj&_nc_ohc=zc_bz3Z8qrgQ7kNvwFkYr2s&_nc_oc=AdlxGOTh4UaVZjs7DhDUB0oEjkFTS_jlNGOnOAkRgbtwZwaPsWdp6U0w8KRJdIMstgM&_nc_zt=24&_nc_ht=scontent.fhan5-1.fna&oh=00_Afj3PaT7b9ldMnTsnRDKHk543Ypu0cvbC2RgJP0bAezklQ&oe=694EBDBA';
function Work() {

    const [data, Setdata] = useState([]);


    useEffect(() => {
        const userid = ObjectCookie("user")[0];


        const fetchData = async () => {
            try {
                const result = await Object_byid("Friend", userid.id);
                console.log(result);


                Setdata(result ?? []);
            } catch (err) {
                console.log(err);
            }
        };

    }, []);


    const navigate = useNavigate();
    return (
        <div>
            <div className="w-full h-full overflow-y-auto scrollbar-hide select-none ">
                {data.map((o, i) => (
                    <div onClick={() => {
                        navigate(`profile/${o.id}`);
                        window.location.reload(true);
                    }} key={i} className='w-full  h-[3rem]  p-1  cursor-pointer rounded-[10px] flex hover:bg-[#444444] hover:opacity-90'>
                        <img src={o.image != null ? o.image : avatarDefalut} className='w-1/6  rounded-full aspect-square' alt="" />
                        <div className="w-1/2 h-full text-white px-4 flex items-center  ">
                            <div className=' h-auto flex'>
                                <h2 className='text-[14px] font-bold'>{o.firstName} {o.lastName}</h2>
                                {/* <p className='text-gray-100 text-[12px]'>Đã đăng tin  </p> */}

                            </div>

                        </div>
                        <button className='w-1/3 h-[2.1rem]  py-1  rounded-[15px]  border border-gray-700 hover:bg-[#666666]'>Kết bạn</button>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Work
// const [data, Setdata] = useState([
//     {

//         address: null,
//         age: 0,
//         email: "abc@gmail.com",
//         firstName: "Vũ",
//         gender: 0,
//         id: "Q2kBu60vq9ia",
//         image: null,
//         lastName: "Đạt"
//     },
//     {
//         address
//             :
//             "Thái Bình",
//         age
//             :
//             32,
//         email
//             :
//             "abc@gmail.com",
//         firstName
//             :
//             "Vũ",
//         gender
//             :
//             22,
//         id
//             :
//             "U003",
//         image
//             :
//             "Avatar 3",
//         lastName
//             :
//             "Bình"
//     }
// ]);
// console.log(data);
