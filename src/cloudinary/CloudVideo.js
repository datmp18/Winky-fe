import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';

export default function CloudVideo() {
    const cld = new Cloudinary({ cloud: { cloudName: 'dlracijtv' } });

    // Tên public_id là phần sau `/upload/` và trước `.mp4`
    // Ví dụ link: https://res.cloudinary.com/dlracijtv/video/upload/v1761868358/Su54_ny1ske.mp4
    // => public_id = "Su54_ny1ske"
    const video = cld.video('Su54_ny1ske')
        .format('auto')
        .quality('auto')
        .resize(auto().width(800)); // tùy chọn resize

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <AdvancedVideo
                cldVid={video}
                controls
                autoPlay={true}
                style={{
                    borderRadius: 12,
                    width: '100%',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}
            />
        </div>
    );
}
