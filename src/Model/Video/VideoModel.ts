export interface VideoUpload {
    video_title: string,
    video_description: string,
    video_file: string,
    video_thumbnail: string,
    video_language_id: number,
    video_category_id: number,
    channel_id: number,
    user_id: number
}

export interface getvideomodel{
    video_id : number
}