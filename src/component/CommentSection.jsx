import { Button, Input } from "antd";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { SendOutlined } from "@ant-design/icons";

const Comment = ({
    id,
    parentId = null,
    avatar,
    name,
    content,
    likes,
    date,
    replies = [],
    parentName = null,
    level = 1,
    openId,
    setOpenId,
}) => {
    const [liked, setLiked] = useState(false);


    const marginClass = level === 2 ? "ml-5" : "";


    const handleToggleReplies = () => {
        if (level === 1) {
            setOpenId(openId === id ? null : id);
        }
    };

    const handleClickComment = () => {
        console.log(`🗨️ Comment ID: ${id}, Parent ID: ${parentId}`);

    };

    const isOpen = openId === id;

    return (
        <div className={`flex flex-col ${marginClass}`}>

            <div
                className={`flex items-start gap-3 cursor-pointer  hover:bg-[#2a2a2a] p-2 rounded-lg 
                    `}
                onClick={handleClickComment}
            >
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover bg-[#0f0f0f]"
                />

                <div className="flex-1">
                    <p className="text-gray-100 font-semibold text-[15px]">{name}</p>


                    {level >= 3 && parentName && (
                        <p className="text-gray-400 text-[11px] mb-1">
                            ↳ Trả lời <span className="text-blue-400">@{parentName}</span>
                        </p>
                    )}

                    <p className="text-gray-300 text-[14px] leading-snug">{content}</p>

                    <div className="text-sm text-gray-500 text-[11px] mt-1 flex items-center justify-between">
                        {level === 1 && replies.length > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleReplies();
                                }}
                                className="hover:underline text-blue-400"
                            >
                                {isOpen
                                    ? `Ẩn ${replies.length} trả lời ▲`
                                    : `Xem ${replies.length} trả lời ▼`}
                            </button>
                        )}
                        <span className="ml-5  text-[12px] text-gray-500">{date}</span>
                        <span className="flex justify-between items-center">
                            {likes + (liked ? 1 : 0)}
                            <GoHeartFill className="m-2" size={14} color="red" />
                        </span>

                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked(!liked);
                    }}
                >
                    {liked ? (
                        <FaHeart className="text-red-500 text-[18px]" />
                    ) : (
                        <FaRegHeart className="text-gray-400 text-[18px]" />
                    )}
                </button>
            </div>


            {((level === 1 && isOpen) || level > 1) && replies.length > 0 && (
                <div className="mt-3 space-y-4">
                    {replies.map((reply, i) => (
                        <Comment
                            key={`${id}-${i}`}
                            {...reply}
                            parentId={id}
                            parentName={name}
                            level={level + 1}
                            openId={openId}
                            setOpenId={setOpenId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function CommentSection() {
    const [openId, setOpenId] = useState(null);
    const [comment, setComment] = useState("");
    const handleSend = () => {
        if (comment.trim() === "") return;
        setComment("");
    };
    const comments = [
        {
            id: 1,
            avatar: "https://i.pravatar.cc/100?img=12",
            name: "Nguyễn Văn A",
            content: "Video này edit quá đỉnh 🔥",
            date: "18/4",
            likes: 32,
            replies: [
                {
                    id: 11,
                    avatar: "https://i.pravatar.cc/100?img=13",
                    name: "Trần Thị B",
                    content: "Chuẩn luôn, màu sắc và nhạc quá hợp!",
                    date: "18/4",
                    likes: 5,
                    replies: [
                        {
                            id: 111,
                            avatar: "https://i.pravatar.cc/100?img=17",
                            name: "Phan Q",
                            content: "Đúng rồi, mình xem lại mấy lần luôn 😍",
                            date: "18/4",
                            likes: 2,
                            replies: [
                                {
                                    id: 1111,
                                    avatar: "https://i.pravatar.cc/100?img=22",
                                    name: "Hoài T",
                                    content: "Tui cũng vậy luôn á!",
                                    date: "18/4",
                                    likes: 1,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 12,
                    avatar: "https://i.pravatar.cc/100?img=16",
                    name: "Hoàng E",
                    content: "Tác giả nên làm thêm mấy video như vậy!",
                    date: "18/4",
                    likes: 7,
                },
            ],
        },
        {
            id: 2,
            avatar: "https://i.pravatar.cc/100?img=18",
            name: "Lê Văn F",
            content: "Chưa bao giờ thấy video nào edit mượt vậy 😮",
            date: "18/4",
            likes: 10,
            replies: [
                {
                    id: 21,
                    avatar: "https://i.pravatar.cc/100?img=19",
                    name: "Nguyễn G",
                    content: "Chuẩn luôn, đoạn chuyển cảnh quá mượt!",
                    date: "18/4",
                    likes: 4,
                },
            ],
        },
    ];

    return (
        <>
            <div className="h-[93vh] relative">
                <div className=" w-full h-[60vh] overflow-y-auto scrollbar-hide relative">
                    <div className="bg-[#1e1e1e] text-gray-100 p-3 space-y-6">
                        {comments.map((c) => (
                            <Comment
                                key={c.id}
                                {...c}
                                openId={openId}
                                setOpenId={setOpenId}
                                parentId={null}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full  h-[10vh] absolute bottom-0 left-0 flex items-end gap-2 p-2 border-t border-gray-700 bg-[#1a1a1a] rounded-b-lg">
                    <Input.TextArea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Viết bình luận..."
                        autoSize={{ minRows: 2, maxRows: 5 }}
                        className="!bg-[#2a2a2a] !text-gray-100 !border-none !rounded-xl !shadow-inner focus:!ring-2 focus:!ring-blue-500"
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl px-4 py-2 flex items-center"
                    />
                </div>
            </div>

        </>


    );
}
