import React, { useEffect, useState } from 'react'
import Logo from '../winky2.png'
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { Create } from '../Services/Action';
import { CreacteCookie } from '../Services/CookieAction';

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


        let birthYear = null;

        if (data.birthdate) {

            const match = data.birthdate.match(/\d{4}/);
            birthYear = match ? Number(match[0]) : null;

        } else if (data.birthday) {

            const match = data.birthday.match(/\d{4}/);
            birthYear = match ? Number(match[0]) : null;

        } else if (data.birth_year) {

            birthYear = Number(data.birth_year);
        }


        let gender = data.gender ?? null;

        return {
            ...data,
            birthYear,
            gender
        };

    } catch (err) {
        console.error("Lỗi decode JWT:", err);
        return null;
    }
}


function Login() {
    const [text, setText] = useState("");

    const content = "Winky ! Nơi lưu giữ khoảng khắc của bạn cùng gia đình và bạn bè . Hãy trải nghiệm ngay";
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
    const navigate = useNavigate();

    const loginGG = async (data) => {


        const idImage = await Create('Media/url', { url: data.picture });



        const User = {
            Name: data.name,
            Gender: data.gender,
            Email: data.email,
            Age: data.birthYear,
            Avatar: idImage
        };

        const userId = await Create('User/google', User);
        CreacteCookie('user', userId);
        navigate('/');
    }

    return (
        <div className='flex items-center justify-center bg-black text-white w-full h-[100vh] flex justify-center items-center'>
            <div className="w-1/3   py-2">
                <div className="   h-[70px]  flex justify-center item-center">
                    <img src={Logo} className='  w-[50px] lg:w-[70px] sm:min-w-[50px]  xl:w-[70px]  h-auto ' alt="" />
                </div>
                <h1 className={` text-center mb-2  lg:text-2xl text-3xl font-extrabold tracking-wider text-yellow-400 px-2`} style={{ textShadow: "2px 5px 10px rgba(171, 173, 179, 0.7)" }}>Winky</h1>
                <p className='h-[6rem] text-white text-center  text-sm'> {text} </p>
                <div className="w-3/4 mx-auto bg-gray-500 shadow-md shadow-gray-500 rounded-[20px] overflow-hidden ">
                    <GoogleOAuthProvider clientId="872461403297-607f0lqbtuut21ln5sp07ci5stbt41el.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={(credentialResponse) => loginGG(decodeJwt(credentialResponse.credential))}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>
                <hr className='my-9  border-gray-900' />
                <h1 className=' mt-[-3.2rem] text-center text-gray-500'> <span className=' py-1 px-5 bg-black'> or</span></h1>
                <Form
                    name="complex-form"
                    // onFinish={onFinish}
                    layout="vertical"
                    className='w-full shadow-xl shadow-[#111111] mt-5  border border-[#111111] p-5 rounded-[10px]'
                >

                    <Form.Item
                        name={['user', 'name']}
                    >
                        <Input className='bg-black border text-white focus:bg-[#111111] hover:bg-[#111111] border-gray-700 h-[2.5rem]' placeholder="Email" />
                    </Form.Item>
                    <Form.Item

                        name="password"

                    >
                        <Input.Password className='bg-black border text-white focus:bg-[#111111] hover:bg-[#111111] border-gray-700 h-[2.5rem]' placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                    >
                        <Checkbox className='text-white'>
                            Lưu thông tin cho tôi
                        </Checkbox>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button disabled={false} className='w-full h-[2.4rem] rounded-[20px]' type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <p className='mt-7 text-center text-gray-500'>Bạn luôn chấp hành với Điều khoản dịch vụ và Chính sách bảo mật của Winky </p>
            </div>


        </div >

    )
}

export default Login
