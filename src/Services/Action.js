import axios from "axios";

const Url = 'https://localhost:7031/api/v1/'
export const Read = async (table) => {

    try {
        const response = await axios.get(Url + table);
        return response.data;

    } catch (error) {
        console.error("lỗi View: " + error);
        throw error;
    }
}

export const Object_byid = async (table, id) => {
    try {
        const reponse = await axios.get(Url + table + '/' + id);
        return reponse.data;
    } catch (error) {
        console.error("Lỗi Object :" + error);
        throw (error);
    }
}

export const Create = async (table, data) => {


    try {
        const response = await axios.post(Url + table, data);
        return response.data;
    } catch (error) {
        console.error("Lỗi post multipart: " + error);
        throw error;
    }
}
export const Update = async (table, id, data) => {
    try {
        const response = await axios.put(`${Url}${table}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Lỗi put multipart: " + error);
        throw error;
    }
};

export const Delete = async (table, id) => {
    try {
        const reponse = await axios.delete(Url + table + '/' + id);
        return reponse.data;
    } catch (error) {
        console.error("Lỗi delete : " + error);

    }
}



export const uploadMedia = async (formDataMedia) => {
    const res = await axios.post(
        "https://localhost:7031/api/v1/Media",
        formDataMedia,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data; // backend trả về List<int> ids hoặc false
};

