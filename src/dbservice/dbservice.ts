import { CategoryDBservice } from "./Category/VideoCategoryDBservice";
import { ChannelDBService } from "./Channel/ChannelDBservice";
import { CommanDBService } from "./commandbservice";
import { CommentVideo } from "./Comment/CommentVideo";
import { CreateVideoDBservice } from "./Create_Video/CreateVideoDBservice";
import { Playlist } from "./Playlist/PlaylistDBservice";
import { Payment } from "./Payment/PaymentDBservice";
import { ShortVideo } from "./Short_Video/ShortVideoDBservice";
import { Subscribe } from "./Subscribe/SubscribeDBservice";
import { UserDBService } from "./User/UserDBservice";
import { WatchVideolater } from "./Watch_Later/Watch_Later";

class DBService {
    constructor
        (public userDBservice: UserDBService,
            public channelDBservice: ChannelDBService,
            public createvideoDBservice: CreateVideoDBservice,
            public shortvideoDBservice: ShortVideo,
            public getcategoryDBservice: CategoryDBservice,
            public watchvideolater: WatchVideolater,
            public subscribe: Subscribe,
            public commentDBservice: CommentVideo,
            public playlistsDBservice:Playlist,
            public paymentDBservice:Payment
        ) {}

}
export const dbservice = new DBService(new UserDBService(), new ChannelDBService(), new CreateVideoDBservice(), new ShortVideo(), new CategoryDBservice(), new WatchVideolater(), new Subscribe(), new CommentVideo(), new Playlist(), new Payment())