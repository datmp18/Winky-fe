

import FileUploadChecker from '../component/FileUploadChecker'
import { useNavigate } from 'react-router-dom';
import { ObjectCookie } from '../Services/CookieAction';
import { useEffect, useState } from 'react';

function News() {
    const navigate = useNavigate();
    const [id, getId] = useState(null);
    useEffect(() => {
        const userid = ObjectCookie("user");


        if (!(userid && userid != null)) {
            navigate('/login');
        } else getId(userid[0].id)
    }, [])



    return (
        <div className='w-full h-full text-white flex justify-center items-center'>
            <div className="w-[90%] h-[90vh] bg-[#111111] rounded-[5px] p-10">
                <FileUploadChecker idU={id} />

            </div>
        </div>
    )
}

export default News
