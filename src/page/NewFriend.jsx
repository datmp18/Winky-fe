
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
function NewFriend() {
    const navigate = useNavigate();
    const userid = ObjectCookie("user");
    if (!(userid && userid != null)) {
        navigate('/login');

    }
    return (
        <div className="w-full h-full  overflow-y-auto">
            <div className='w-3/4 mx-auto h-full grid grid-cols-4 gap-2 p-3   '>
                <div className="h-[20rem] cursor-pointer p-1 border border-gray-900 rounded-[10px] hover:shadow-sm hover:shadow-[#444444]  text-white">
                    <div className="w-full aspect-square ">
                        <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/502942653_694249239995588_8669848011618903205_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEQw6mpZljGenEG4h4G8CamJcCHpbfrd6olwIelt-t3qh9AhuGYYspYoVAvWP02s9ngaw7dKOQJR2DiDnGxM7RI&_nc_ohc=LN6TWw9LYVwQ7kNvwG1h4cB&_nc_oc=AdmJs-beS9SCTle2XPD9WLLUaQLErQogZCuh92-gpmJQ20Aw43dJg6t4z3EYjqaUcnQ&_nc_zt=24&_nc_ht=scontent.fhan5-2.fna&_nc_gid=3ZpGD4q-CHN0gF8mRTpM3w&oh=00_Afg4YeDmD2PHQ96NYPHfIvxEOP9jq7R-BPYqZRJOoD6-gQ&oe=6910B0E9"
                            className='w-full h-full  rounded-[5px]' alt="" />
                    </div>
                    <h1 className='text-[18px] font-bold m-2 font-tiktok flex justify-between items-center'><span>Vũ Đạt</span> <span className='text-[12px] text-gray-500 '>Hải Dương</span></h1>
                    <button className='w-full  py-1  rounded-[15px]  border border-gray-700 hover:bg-blue-400'>Xóa bạn</button>
                </div>


            </div>
        </div>

    )
}

export default NewFriend
