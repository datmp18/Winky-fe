import React, { useState } from "react";
import { Alert, Button, Carousel, Form, Select, Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaPhotoVideo, FaUserFriends } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { BsArrowUpSquareFill, BsXCircleFill } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import { FaLock } from "react-icons/fa6";
import { Create, uploadMedia } from "../Services/Action";
import { data, useNavigate } from "react-router-dom";
const pushAllMediaToApi = async (fileInfo, values) => {
    const formDataMedia = new FormData();


    if (fileInfo?.type === "Ảnh" || fileInfo?.type === "Video") {
        if (fileInfo.file) {

            formDataMedia.append("files", fileInfo.file);
        }
    }

    // 2. nhiều ảnh (Tệp ảnh)
    if (fileInfo?.type === "Tệp ảnh") {
        if (fileInfo.files && fileInfo.files.length > 0) {
            Array.from(fileInfo.files).forEach((f) => {

                formDataMedia.append("files", f);
            });
        }
    }


    if (values.cover && values.cover.length > 0) {
        const coverFile = values.cover[0].originFileObj;
        if (coverFile) {
            formDataMedia.append("files", coverFile);
        }
    }



    for (const [key, value] of formDataMedia.entries()) {
        if (value instanceof File) {
            console.log(key, {
                name: value.name,
                type: value.type,
                size: value.size,
            });
        } else {
            console.log(key, value);
        }
    }


    const result = await uploadMedia(formDataMedia);

    return result;
};

const options = [
    {
        value: "1",
        label: (
            <div className="flex items-center gap-2 text-white ">
                <FaUserFriends />
                <span>Bạn bè</span>
            </div>
        ),
    },
    {
        value: "0",
        label: (
            <div className="flex items-center gap-2 text-white ">
                <FaLock />
                <span>Cá nhân</span>
            </div>
        ),
    },
];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function FileUploadChecker({ idU }) {


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [coverFileList, setCoverFileList] = useState([]);
    const [fileInfo, setFileInfo] = useState(null);
    const [mainFileList, setMainFileList] = useState([]);

    const [form] = Form.useForm();

    // Preview ảnh bìa (Upload cover)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleCoverChange = ({ fileList: newFileList }) => {
        setCoverFileList(newFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // Upload file chính (bên trái)
    const handleMainUploadChange = ({ fileList }) => {
        setMainFileList(fileList);

        const files = fileList.map((f) => f.originFileObj).filter(Boolean);

        if (!files || files.length === 0) {
            setFileInfo(null);
            return;
        }


        if (files.length > 1) {
            const allImages = files.every((f) => f.type.startsWith("image/"));
            if (allImages) {
                setFileInfo({ type: "Tệp ảnh", files });
                return;
            }
        }


        const file = files[0];
        const type = file.type;

        if (type.startsWith("image/")) {
            setFileInfo({ type: "Ảnh", file });
        } else if (type.startsWith("video/")) {
            setFileInfo({ type: "Video", file });
        } else {
            setFileInfo({ type: "unknown", file });
        }
    };

    const handleRemoveFile = () => {
        setFileInfo(null);
        setMainFileList([]);
        setCoverFileList([]);
        form.resetFields(["cover", "title"]);
    };
    const navigate = useNavigate();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    const handleFinish = async (values) => {
        success();
        const pub = values.public?.value ?? "1";

        let type = 1;
        if (fileInfo?.type === "Ảnh") {
            type = 0;
        } else if (fileInfo?.type === "Tệp ảnh") {
            type = 2;
        }


        const bodyPost = {
            user_Id: idU,
            status: Number(pub),
            content: values.title || "",
            type: type,

        };

        const formDataMedia = new FormData();


        if (fileInfo?.type === "Ảnh" || fileInfo?.type === "Video") {
            if (fileInfo.file) {

                formDataMedia.append("Files", fileInfo.file);
            }
        }


        if (fileInfo?.type === "Tệp ảnh") {
            if (fileInfo.files && fileInfo.files.length > 0) {
                Array.from(fileInfo.files).forEach((f, i) => {
                    formDataMedia.append("Files", f);
                });
            }
        }


        if (values.cover && values.cover.length > 0) {
            const coverFile = values.cover[0].originFileObj;
            if (coverFile) {
                formDataMedia.append("Files", coverFile);
            }
        }
        try {
            const mediaIds = await pushAllMediaToApi(fileInfo, values);
            const Articleid = await Create("Article", bodyPost);
            const dataArMe = {
                Id_Article: Articleid,
                Id_Media: mediaIds
            }
            const Arme = await Create('ArticleMedia', dataArMe);
            console.log(Arme);


            if (Arme.length > 0) navigate(`/`)
        } catch (err) {
            console.error("Lỗi upload media:", err);
        }
    };
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Tin của bạn đang được đẩy lên',
                duration: 8,
            })
            .then(() => message.success('Đang đẩy lên  ', 8))
            .then(() => message.info('Đẩy lên thành công', 8));
    };
    return (

        <div className="w-full h-full flex">
            {contextHolder}
            {/* BÊN TRÁI: vùng hiển thị & chọn file chính */}
            <div className="w-3/4 h-full rounded-[10px] border border-dashed border-gray-500 hover:border-[#99FFFF] hover:bg-[#222222]">
                <div className="relative h-full flex flex-col items-center justify-center">
                    {/* Chưa chọn file */}
                    {!fileInfo && (
                        <div className="w-[10rem] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                            <FaPhotoVideo size={100} className="mx-auto " />
                            <p className="text-[14px] text-center">Tải ảnh hoặc video ngắn</p>
                            <p className="text-[12px] text-green-600 text-center">
                                Max:3.5MB | Max:280MB
                            </p>

                            <div className="mx-auto">
                                <Upload
                                    className="w-full "
                                    multiple
                                    beforeUpload={() => false}
                                    accept="image/*,video/*"
                                    fileList={mainFileList}
                                    onChange={handleMainUploadChange}
                                    showUploadList={false}
                                >
                                    <Button className="w-full mt-2" icon={<MdUpload />}>
                                        Tải lên
                                    </Button>
                                </Upload>
                            </div>
                        </div>
                    )}

                    {/* Đã có file */}
                    {fileInfo && (
                        <div className="relative w-full h-full">
                            <button
                                onClick={handleRemoveFile}
                                className="absolute z-10 -top-3 -right-3 bg-white border rounded-full shadow hover:bg-red-100"
                            >
                                <BsXCircleFill color="black" size={22} />
                            </button>

                            {fileInfo.type === "Ảnh" && (
                                <img
                                    src={URL.createObjectURL(fileInfo.file)}
                                    alt="preview"
                                    className="h-full mx-auto rounded-xl shadow"
                                />
                            )}

                            {fileInfo?.type === "Tệp ảnh" && (
                                <div className="w-full z-2 max-w-6xl h-full mx-auto rounded-lg overflow-hidden border shadow">
                                    <Carousel
                                        dots
                                        arrows
                                        infinite
                                        autoplay
                                        autoplaySpeed={1000}
                                        className="w-full h-full"
                                    >
                                        {Array.from(fileInfo.files).map((f, i) => (
                                            <div key={i} className="w-full h-full">
                                                <img
                                                    src={URL.createObjectURL(f)}
                                                    alt={`img-${i}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}

                            {fileInfo.type === "Video" && (
                                <video
                                    controls
                                    className="w-full h-full rounded-xl shadow"
                                    src={URL.createObjectURL(fileInfo.file)}
                                />
                            )}

                            {fileInfo.type === "unknown" && (
                                <p className="text-red-500 mt-2 text-center">
                                    ❌ Không phải ảnh hoặc video
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* BÊN PHẢI: Form thông tin post */}
            <div className="w-1/4 h-full px-5 overflow-y-auto scrollbar-hide">
                {fileInfo && (
                    <Alert
                        className="mb-5"
                        message={`Đã tải lên ${fileInfo?.type || ""}`}
                        type="success"
                        showIcon
                    />
                )}

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    onFinishFailed={(err) => console.log("Form error:", err)}
                    className="text-white"
                >
                    {/* Quyền hiển thị */}
                    <Form.Item
                        name="public"
                        initialValue={{ value: "1" }} // mặc định: Bạn bè
                        rules={[{ required: true, message: "Vui lòng chọn quyền hiển thị" }]}
                    >
                        <Select
                            labelInValue
                            options={options}
                            popupClassName="
                bg-black text-white border border-gray-700 
                [&_.ant-select-item-option]:!bg-black 
                [&_.ant-select-item-option-active]:!bg-gray-800 
                [&_.ant-select-item-option-selected]:!bg-gray-700 
                [&_.ant-select-item-option-content]:!text-white
              "
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                border: "1px solid #444",
                            }}
                            className="
                w-full mb-3
                bg-black text-white border border-gray-600 rounded-lg
                [&_.ant-select-selector]:!bg-black 
                [&_.ant-select-selector]:!text-white
                [&_.ant-select-selection-item]:!text-white
                [&_.ant-select-arrow]:!text-white
                [&_.ant-select-selection-placeholder]:!text-gray-400
              "
                        />
                    </Form.Item>

                    {/* Ảnh bìa: chỉ khi là video */}
                    {fileInfo?.type === "Video" && (
                        <Form.Item
                            name="cover"
                            label={<h5 className="text-white">Ảnh bìa</h5>}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                className="dark-upload text-white"
                                listType="picture-card"
                                beforeUpload={() => false}
                                fileList={coverFileList}
                                onPreview={handlePreview}
                                onChange={handleCoverChange}
                            >
                                {coverFileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                    )}

                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: "none" }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) =>
                                    !visible && setPreviewImage(""),
                            }}
                            src={previewImage}
                        />
                    )}

                    {/* Tiêu đề */}
                    <Form.Item name="title">
                        <TextArea
                            rows={5}
                            disabled={!fileInfo}
                            className="w-full bg-black text-white border border-gray-600 
                rounded-lg placeholder-gray-400 focus:border-blue-500 focus:shadow-md
                focus:bg-black hover:black hover:bg-black"
                            placeholder={`Nhập tiêu đề cho ${fileInfo ? fileInfo.type : "bài viết"
                                }`}
                        />
                    </Form.Item>

                    {/* Nút submit */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full my-3"
                            size="large"
                            icon={<BsArrowUpSquareFill />}
                            disabled={!fileInfo}
                        >
                            Đăng lên
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
