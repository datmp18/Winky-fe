import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';

export default function CloudImage() {
    const cld = new Cloudinary({ cloud: { cloudName: 'dlracijtv' } });

    const img = cld
        .image('cld-sample-5')
        .format('auto')
        .quality('auto')
        // Giữ tỉ lệ, chỉ giới hạn chiều rộng 500px
        .resize(scale().width(500));

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <AdvancedImage cldImg={img} style={{ borderRadius: 10, maxWidth: '100%' }} />
        </div>
    );
}
