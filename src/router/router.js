import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from "../layout/Login";
import BodyContent from "../page/BodyContent";
import Messenger from "../page/Messenger";
import Profile from "../page/Profile";
import NewFriend from "../page/NewFriend";
import News from "../page/News";
import Register from "../layout/Register";
import Video from "../page/Video";
import Error from "../layout/Error";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <BodyContent />
            },
            {
                path: '/article/:id',
                element: <Video />
            },
            {
                path: '/newfriend',
                element: <NewFriend />
            }
            ,
            {
                path: '/messenger',
                element: <Messenger />
            },
            {
                path: '/profile/:id',
                element: <Profile />
            },


            {
                path: '/news',
                element: <News />
            }
        ]
    },
    {
        index: true,
        path: '/login',
        element: <Login />
    }
    ,
    {

        path: '/register',
        element: <Register />
    }
]);