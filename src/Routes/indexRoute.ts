import { Router } from "express";
import UserRoute from "./User/UserRoute";
import ChannelRoute from "./Channel/ChannelRoute";
import VideoRoute from "./Video/VideoRoute";
import ShortVideoRoute from "./Short_Video/ShortVideoRoute";
import GetVideoCategory from "./Category/GetVideoCategory";
import WatchLaterRoute from "./Watch_Later/WatchLaterRoute";
import SubscribeRoute from "./Subscribe/SubscribeRoute";
import CommentRoute from "./Comment/CommentRoute";
import PlaylistRoute from "./Playlist/PlaylistRoute";
import PaymentRoute from "./Payment/PaymentRoute"

class IndexRoute {
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config() {
        this.route.use('/user', UserRoute)
        this.route.use('/channel', ChannelRoute)
        this.route.use('/video', VideoRoute)
        this.route.use('/short', ShortVideoRoute)
        this.route.use('/category', GetVideoCategory)
        this.route.use('/watch', WatchLaterRoute)
        this.route.use('/subscribe', SubscribeRoute)
        this.route.use('/comment',CommentRoute)
        this.route.use('/playlist',PlaylistRoute)
        this.route.use('/payment',PaymentRoute)
    }
}

const indexRoute = new IndexRoute()
export default indexRoute.route