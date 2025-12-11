import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-red-500">Có lỗi xảy ra</h1>
            <p className="mt-4 text-xl">
                {error?.statusText || error?.message || "Không tìm thấy trang"}
            </p>
        </section>
    );
}
