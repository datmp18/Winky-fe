import Cookie from 'js-cookie'

export const CreacteCookie = (name, item) => {
    try {
        const json = JSON.stringify(item);
        Cookie.set(name, json, {
            secure: true,
            sameSite: 'lax'
        });
    } catch (error) {
        console.error('Failed to set cookie:', error);
    }
}
export const ObjectCookie = (name) => {
    const session = Cookie.get(name);
    if (session) {
        const data = JSON.parse(session);
        return data;
    } else {
        return false;
    }
}


export const DeleteCookie = (name) => {
    Cookie.remove(name, { path: '/' }); // nếu lúc set dùng path '/'
    window.location.href = '/';
};