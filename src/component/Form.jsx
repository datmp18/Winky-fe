import React, { useEffect, useState } from "react";
import axios from "axios";


function Form() {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
            const data = res.data;
            console.log(data);
            if (data.length > 0) {
                const sample = data[0];
                const cols = Object.keys(sample).map(key => ({
                    name: key,
                    type: Array.isArray(sample[key])
                        ? "array"
                        : sample[key] === null
                            ? "null"
                            : typeof sample[key]
                }));
                setColumns(cols);
            } else {
                const cols = Object.keys(data).map(key => ({
                    name: key,
                    type: Array.isArray(data[key])
                        ? "array"
                        : data[key] === null
                            ? "null"
                            : typeof data[key]
                }));
                setColumns(cols);
            }
        };

        fetchData();
    }, []);

    return (


        <div className="p-5">
            <h2 className="text-xl font-bold mb-3">Phân tích kiểu dữ liệu từ API</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Tên cột</th>
                        <th>Kiểu dữ liệu</th>
                    </tr>
                </thead>
                <tbody>
                    {columns.map((col, index) => (
                        <tr key={index}>
                            <td>{col.name}</td>
                            <td>{col.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Form
