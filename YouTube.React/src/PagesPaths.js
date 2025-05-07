import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/Video/Video";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Channel from "./pages/Channel/Channel";
import ChannelSettings from "./pages/ChannelSettings/ChannelSettings";

const pages = [
    { 
        path: '/', 
        component: MainPage 
    },
    { 
        path: '/video/:id',
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
        path: '/channel/:id', 
        component: Channel 
    },
    { 
        path: '/channel/:id/settings', 
        component: ChannelSettings 
    },
]

export default pages;