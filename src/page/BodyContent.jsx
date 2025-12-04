import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../image/vt2.jpg'
import { BsBookmarkFill, BsChevronDown, BsChevronRight, BsChevronUp } from 'react-icons/bs';
import { FaComment, FaShare } from 'react-icons/fa';
import { Tooltip } from 'antd';
import { GoHeartFill } from 'react-icons/go';

import CommentSection from '../component/CommentSection';
import { useNavigate } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
// import Bell from '../component/Bell';


function BodyContent() {
    const [hasUnmuted, setHasUnmuted] = useState(false);

    const videoRef = useRef(null);
    const [deTail, getdeTail] = useState(false);
    const [hear, getHear] = useState(false);
    const [save, getSave] = useState(false);
    const [count, getCount] = useState(0);
    const [spacePressedOnce, setSpacePressedOnce] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userid = ObjectCookie("user");


        if (!(userid && userid != null)) {
            navigate('/login');

        }
        const video = videoRef.current;
        if (!video) return;


        video.muted = !hasUnmuted;

        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.log("Autoplay bị chặn:", err);
            });
        }
        video.muted = !hasUnmuted;

        const handleKeyDown = (event) => {


            if (event.code === "ArrowUp" || event.code === "Numpad8") {
                Up();
            } else if (event.code === "ArrowDown" || event.code === "Numpad2") {
                Down();
            } else if (event.code === "ArrowLeft" || event.code === "Numpad4") {
                getdeTail(true);
            } else if (event.code === "ArrowRight" || event.code === "Numpad6") {
                getdeTail(false);
            }
            else if (event.code === "Numpad1") {
                getHear(re => !re);
            }
            else if (event.code === "Numpad3") {


                getSave(re => !re);
            }
            else if (event.code === "Numpad7") {
                console.log("Chia sẻ");

            }
            else if (event.code === "Numpad5") {
                const video = videoRef.current;
                if (video) {
                    if (!document.fullscreenElement) {
                        video.requestFullscreen().catch((err) => {
                            console.error(`Không thể full screen: ${err.message}`);
                        });
                    } else {
                        document.exitFullscreen();
                    }
                }
            }
            else {
                // khác
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [spacePressedOnce, count, hasUnmuted]);


    const ListNew = [
        {
            id: "A001",
            content: "Dù cuộc sống có khó khăn và thử thách, mỗi trải nghiệm đều giúp ta trưởng thành, học cách yêu thương bản thân, kiên nhẫn và tìm niềm vui trong những điều nhỏ bé.",
            user: {
                id: 'U001',
                fistname: 'Đạt',
                lastname: 'Vũ',
                avatar: 'https://luv.vn/wp-content/uploads/2021/12/hinh-anh-gai-mat-vuong-xinh-dep-4.jpg'
            },
            createdAt: '13:36 | 24/11/2025',
            type: 1,
            media: {
                url: 'https://res.cloudinary.com/dlracijtv/video/upload/v1763376365/a01_mbbllw.mp4',
                img: 'https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/anh-co-gai-xinh-dep-72.jpg'
            },
            love: 150,
            save: 160,
            comment: 30,
            share: 20
        },
        {
            id: "A002",
            content: "Cuộc sống , thiên nhiên , con người luôn thay đổi. Nhưng bạn bè mãi mãi không đổi!!!",

            user: {
                id: 'U001',
                fistname: 'Thành',
                lastname: 'Vũ',
                avatar: 'https://luv.vn/wp-content/uploads/2021/12/hinh-anh-gai-mat-vuong-xinh-dep-4.jpg',
            },
            datecreate: '13:36 | 24/11/2025',
            type: 1,
            media: {
                url: 'https://res.cloudinary.com/dlracijtv/video/upload/v1763376365/Su54_ny1ske.mp4',
                img: 'https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/anh-co-gai-xinh-dep-72.jpg'
            },
            love: 150,
            save: 160,
            comment: 30,
            share: 20
        },
        {
            id: "A002",
            content: "Cuộc sống , thiên nhiên , con người luôn thay đổi. Nhưng bạn bè mãi mãi không đổi!!!",

            user: {
                id: 'U001',
                fistname: 'Thành',
                lastname: 'Vũ',
                avatar: 'https://luv.vn/wp-content/uploads/2021/12/hinh-anh-gai-mat-vuong-xinh-dep-4.jpg',
            },
            datecreate: '13:36 | 24/11/2025',
            type: 1,
            media: {
                url: 'https://res.cloudinary.com/dlracijtv/video/upload/v1763376365/7264618676018_s7mnmx.mp4',
                img: 'https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/anh-co-gai-xinh-dep-72.jpg'
            },
            love: 150,
            save: 160,
            comment: 30,
            share: 20
        }
    ];
    const handleUnmute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = false;
        setHasUnmuted(true); // từ giờ về sau, video mới cũng có tiếng
    };
    const length = ListNew.length;


    const Up = () => {
        getdeTail(false);
        const dem = count - 1 > -1 ? count - 1 : count;
        getCount(dem);
    }
    const Down = () => {
        getdeTail(false);
        const dem = count + 1 < length ? count + 1 : count;
        getCount(dem);
    }


    return (
        <>
            <div className="flex">
                <div className={`${deTail === false ? 'w-full' : 'w-[75%]'} h-[100vh] flex items-center justify-center px-2 relative group`} >


                    <div className={`w-[2.8rem] group-hover:block hidden text-white z-10 opacity-60 h-[6rem]  ${count == 0 || count == length - 1 ? "border-none" : 'border border-gray-200 rounded-full'} -translate-y-1/2 absolute top-1/2 right-3 p-1 px-[4px]`}>
                        <div onClick={() => Up()} className={` ${count == 0 ? 'hidden' : 'block'} opacity-80 relative hover:opacity-100 cursor-pointer mb-3 mb-2 w-9 h-9 bg-[#555555] rounded-full flex hover:text-yellow-400 mr-2 justify-center items-center`} >
                            <BsChevronUp size={15} />
                        </div>
                        <div onClick={() => Down()} className={`  ${count == length - 1 ? 'hidden' : 'block'} opacity-80 hover:opacity-100 cursor-pointer mt-3 w-9 h-9 bg-[#555555] rounded-full flex hover:text-yellow-400 mr-2 justify-center items-center`}>
                            <BsChevronDown size={15} />
                        </div>
                    </div>

                    <div className="w-auto  h-auto absolute hidden top-3 left-2 text-[14px] text-white flex group-hover:block">
                        <div className='flex items-center mx-5  '>
                            <img key={count} src={ListNew[count].user.avatar} className=' w-[40px] h-[40px] rounded-full ' alt="" />
                            <div className='px-1 sm:opacity-0 md:hover:opacity-100   md:hover:opacity-100 lg:opacity-100 xl:block'>
                                <h1 className='text-[14px] '>{ListNew[count].user.lastname + " " + ListNew[count].user.fistname} </h1>
                                <p className='text-[12px] text-gray-400'>{ListNew[count].datecreate}</p>
                            </div>
                        </div>
                    </div>
                    {/* 180 ký tự  */}
                    <p className='absolute text-center top-3 z-10 left-1/2 text-white text-[16px] -translate-x-1/2 '>
                        {ListNew[count].title}
                    </p>
                    <video
                        key={count}
                        ref={videoRef}
                        id="player"
                        controls
                        autoPlay
                        muted
                        onVolumeChange={(e) => {
                            const v = e.target;
                            if (!v.muted && v.volume > 0) {
                                setHasUnmuted(true); // user đã bật tiếng bằng control mặc định
                            }
                        }}
                        tabIndex={-1}
                        loop
                        onFocus={(e) => e.target.blur()}
                        className="mt-5 mb-[-3rem] aspect-video rounded-xl shadow-lg z-0 max-w-full max-h-[98vh] min-h-[85vh]"
                    >
                        <source src={ListNew[count].media.url} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video tag.
                    </video>


                    <div className={`${deTail === true ? 'flex' : ''}   absolute top-4 right-3`}>
                        <Tooltip onClick={() => getHear(!hear)} placement={deTail === true ? 'bottom' : 'left'}
                            title={`${ListNew[count].love} Yêu thích`} color="#3c3a3aff" >
                            <div className={`${hear ? 'text-red-500' : ''} my-2 cursor-pointer w-8 h-8 bg-[#555555] rounded-full hover:bg-white mr-2 flex justify-center items-center`}>
                                <GoHeartFill size={20} />
                            </div>
                        </Tooltip>

                        <Tooltip placement={deTail === true ? 'bottom' : 'left'} title={`${ListNew[count].comment} Bình luận`} color="#3c3a3aff" >
                            <div onClick={() => getdeTail(true)} className={`${deTail === true ? 'hidden' : 'block'} my-2 cursor-pointer w-8 h-8 bg-[#555555] rounded-full hover:bg-white mr-2 flex justify-center items-center`}>
                                <FaComment size={15} />
                            </div>
                        </Tooltip>

                        <Tooltip placement={deTail === true ? 'bottom' : 'left'} title={`${ListNew[count].save} Lưu`} color="#3c3a3aff" onClick={() => getSave(!save)} >
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
                        <h4 className='font-bold'> Bình luận(5)</h4>
                        <div onClick={() => getdeTail(false)} className="w-8 cursor-pointer h-8 hover:bg-[#111111] flex justify-center items-center bg-[#333333] rounded-full">
                            <BsChevronRight />
                        </div>
                    </div>
                    <CommentSection />
                </div >
            </div>

            {/* <Bell /> */}
        </>
    )
}

export default BodyContent
