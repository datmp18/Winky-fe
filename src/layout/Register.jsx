
import React, { useEffect, useState } from 'react'
import Logo from '../winky2.png'
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs';


function decodeJwt(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        const data = JSON.parse(jsonPayload);

        // Nếu token có trường ngày sinh (hiếm), tách năm sinh
        let birthYear = null;
        if (data.birthdate) {
            const yearMatch = data.birthdate.match(/\d{4}/);
            birthYear = yearMatch ? parseInt(yearMatch[0]) : null;
        } else if (data.birthday) {
            const yearMatch = data.birthday.match(/\d{4}/);
            birthYear = yearMatch ? parseInt(yearMatch[0]) : null;
        }

        // Lấy giới tính nếu có
        let gender = null;
        if (data.gender) {
            gender = data.gender; // token có trường gender
        }

        return {
            ...data,
            birthYear: birthYear,
            gender: gender, // thêm trường giới tính
        };
    } catch (error) {
        console.error("Lỗi khi decode JWT:", error);
        return null;
    }
}


function Register() {
    const [text, setText] = useState("");

    const content = "Winky ! Nơi lưu giữ khoảng khắc của bạn cùng gia đình và bạn bè .    Hãy trải nghiệm ngay";
    useEffect(() => {
        let index = 0;
        let array = "";
        const interval = setInterval(() => {
            if (index < content.length) {
                array += content.charAt(index);
                ++index;
            } else {
                clearInterval(interval);
            }
            setText(array);
        }, 100);



        return () => {

            clearInterval(interval);
        };
    }, [content]);
    return (
        <div className='flex items-center justify-center bg-black text-white w-full h-[100vh] flex justify-center items-center'>
            <div className="w-1/3   py-2">

                <div className="   h-[70px]  flex justify-center item-center">
                    <img src={Logo} className='  w-[50px] lg:w-[70px] sm:min-w-[50px]  xl:w-[70px]  h-auto ' alt="" />

                </div>
                <h1 className={` text-center mb-2  lg:text-2xl text-3xl font-extrabold tracking-wider text-yellow-400 px-2`} style={{ textShadow: "2px 5px 10px rgba(171, 173, 179, 0.7)" }}>Winky</h1>
                <p className='h-[6rem] text-white text-center  text-sm'> {text} </p>
                <div className="w-3/4 mx-auto bg-gray-500 shadow-md shadow-gray-500 rounded-[20px] overflow-hidden ">

                </div>
                <hr className='my-9  border-gray-900' />

                <Form
                    name="complex-form"
                    // onFinish={onFinish}
                    layout="vertical"
                    className='w-full shadow-xl shadow-[#111111] mt-5  border border-[#111111] p-5 rounded-[10px]'
                >
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="last name"
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input className='bg-black border text-white focus:bg-[#111111] hover:bg-[#111111] border-gray-700 h-[2.5rem]' placeholder="Họ" />
                        </Form.Item>

                        <Form.Item
                            name="firstname"

                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Input className='bg-black border text-white focus:bg-[#111111] hover:bg-[#111111] border-gray-700 h-[2.5rem]' placeholder="Tên" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'name']}
                    >
                        <Input className='bg-black border text-white focus:bg-[#111111] hover:bg-[#111111] border-gray-700 h-[2.5rem]' placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"

                    >
                        <Checkbox className='text-white'>
                            Tôi đồng ý với chính sách và chính sách bảo mật
                        </Checkbox>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button disabled={false} className='w-full h-[2.4rem] rounded-[20px]' type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                <p className='mt-7 text-center text-gray-500'>Bạn luôn chấp hành với Điều khoản dịch vụ và Chính sách bảo mật của Winky </p>
            </div>


        </div >

    )
}

export default Register

