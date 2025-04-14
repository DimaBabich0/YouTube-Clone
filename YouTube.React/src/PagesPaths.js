import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/Video/Video";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Channel from "./pages/Channel/Channel";

const pages = [
    { 
        path: '/', 
        component: MainPage 
    },
    { 
        path: '/video', 
        component: VideoPage 
    },
    { 
        path: '/sign-in', 
        component: SignIn 
    },
    { 
        path: '/sign-up', 
        component: SignUp 
    },
    { 
        path: '/video', 
        component: VideoPage 
    },
    { 
        path: '/subscriptions', 
        component: Subscriptions 
    },
    { 
        path: '/channel', 
        component: Channel 
    }
]

export default pages;