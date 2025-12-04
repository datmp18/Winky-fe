import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../image/vt2.jpg'
import { BsBookmarkFill, BsChevronDown, BsChevronRight, BsChevronUp } from 'react-icons/bs';
import { FaComment, FaShare } from 'react-icons/fa';
import { Tooltip } from 'antd';
import { GoHeartFill } from 'react-icons/go';

import CommentSection from '../component/CommentSection';
import { useNavigate, useParams } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
import { Read } from '../Services/Action';


const Video = () => {
    const { id } = useParams();
    const [hasUnmuted, setHasUnmuted] = useState(false);


    const [deTail, getdeTail] = useState(false);
    const [hear, getHear] = useState(false);
    const [save, getSave] = useState(false);
    const [count, getCount] = useState(0);




    const [ListNew, GetList] = useState([]);
    console.log(ListNew);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Read("Article/" + id);
                GetList(result ?? []);

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [])






    return (
        <>
            <div className="flex">
                <div className={`${deTail === false ? 'w-full' : 'w-[75%]'} h-[100vh] flex items-center justify-center px-2 relative group`} >



                    <div className="w-auto  h-auto absolute hidden top-3 left-2 text-[14px] text-white flex group-hover:block">
                        <div className='flex items-center mx-5  '>
                            <img key={count} src={ListNew[0].user.avatar} className=' w-[40px] h-[40px] rounded-full ' alt="" />
                            <div className='px-1 sm:opacity-0 md:hover:opacity-100   md:hover:opacity-100 lg:opacity-100 xl:block'>
                                <h1 className='text-[14px] '>{ListNew[0].user.lastname + " " + ListNew[0].user.fistname} </h1>
                                <p className='text-[12px] text-gray-400'>{ListNew[0].
                                    createdAt}</p>
                            </div>
                        </div>
                    </div>

                    <p className='absolute text-center top-3 z-10 left-1/2 text-white text-[16px] -translate-x-1/2 '>
                        {ListNew[0].content}
                    </p>
                    <video


                        id="player"
                        controls
                        autoPlay
                        muted
                        onVolumeChange={(e) => {
                            const v = e.target;
                            if (!v.muted && v.volume > 0) {
                                setHasUnmuted(true);
                            }
                        }}
                        tabIndex={-1}
                        loop
                        onFocus={(e) => e.target.blur()}
                        className="mt-5 mb-[-3rem] aspect-video rounded-xl shadow-lg z-0 max-w-full max-h-[98vh] min-h-[85vh]"
                    >
                        <source src={(ListNew[0].media.filter(item => item.type === 1)
                            .map(item => item.url))} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video tag.
                    </video>


                    <div className={`${deTail === true ? 'flex' : ''}   absolute top-4 right-3`}>
                        <Tooltip onClick={() => getHear(!hear)} placement={deTail === true ? 'bottom' : 'left'}
                            title={`${ListNew[0].love} Yêu thích`} color="#3c3a3aff" >
                            <div className={`${hear ? 'text-red-500' : ''} my-2 cursor-pointer w-8 h-8 bg-[#555555] rounded-full hover:bg-white mr-2 flex justify-center items-center`}>
                                <GoHeartFill size={20} />
                            </div>
                        </Tooltip>

                        <Tooltip placement={deTail === true ? 'bottom' : 'left'} title={`${ListNew[0].comment} Bình luận`} color="#3c3a3aff" >
                            <div onClick={() => getdeTail(true)} className={`${deTail === true ? 'hidden' : 'block'} my-2 cursor-pointer w-8 h-8 bg-[#555555] rounded-full hover:bg-white mr-2 flex justify-center items-center`}>
                                <FaComment size={15} />
                            </div>
                        </Tooltip>

                        <Tooltip placement={deTail === true ? 'bottom' : 'left'} title={`${ListNew[0].save} Lưu`} color="#3c3a3aff" onClick={() => getSave(!save)} >
                            <div className={`${save ? 'text-yellow-400' : ''} cursor-pointer w-8 h-8 my-2 bg-[#555555] rounded-full flex hover:bg-white mr-2 justify-center items-center`}>
                                <BsBookmarkFill size={15} />
                            </div>
                        </Tooltip>

                        <Tooltip placement={deTail === true ? 'bottom' : 'left'} title={`${ListNew[count].share} Chia sẻ`} color="#3c3a3aff" >
                            <div className='cursor-pointer w-8 h-8 my-2 bg-[#555555] rounded-full flex hover:bg-white hover:text-blue-500 mr-2 justify-center items-center'>
                                <FaShare size={15} />
                            </div>
                        </Tooltip>
                    </div>
                </div >

                <div className={`${deTail === true ? 'w-[25%] block' : 'hidden'} h-full bg-[#1e1e1e] text-white p-1`}>
                    <div className="w-full h-[5vh] p-2 mb-1 flex items-center justify-between px-1">
                        <h4 className='font-bold'> Bình luận(0)</h4>
                        <div onClick={() => getdeTail(false)} className="w-8 cursor-pointer h-8 hover:bg-[#111111] flex justify-center items-center bg-[#333333] rounded-full">
                            <BsChevronRight />
                        </div>
                    </div>
                    <CommentSection />
                </div >
            </div>


        </>
    )
}

export default Video
