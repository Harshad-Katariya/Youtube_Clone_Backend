export interface createplaylistModel{
    playlist_name :string
    user_id:number
}

export interface addplaylistModel{
    playlists_id:number,
    video_id:number,
    user_id:number
}

export interface getplaylistModel{
    playlists_id:number,
    user_id:number
}