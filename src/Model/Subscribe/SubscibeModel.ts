export interface Subscribemodel {
    channel_id: number,
    user_id: number
}

export interface Subscription {
    subscribe_id: number,
    channel_name: string,
    user_profile: string,

}

export interface SubscribeVidoe {
    video_id: number,
    video_title: string,
    video_file: string,
    video_thumbnail: string,
    channel_name: string,
    user_profile: string
}