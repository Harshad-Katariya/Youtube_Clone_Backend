import { Request, Response } from "express";
import { CookieParser } from "../../Comman/Cookies";
import jwt from 'jsonwebtoken'
import { dbservice } from "../../dbservice/dbservice";
import { addplaylistModel, createplaylistModel } from "../../Model/Playlist/PlaylistModel";
import { response } from "../../helper/response";
import { validationResult } from "express-validator"; 

class Playlist {

    public async createplaylist(req: Request, res: Response): Promise<any> {
        try {
            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

            const playlists: createplaylistModel = {
                playlist_name: req.body.playlist_name,
                user_id: parseInt(token_decode)
            }
            let result = await dbservice.playlistsDBservice.createplaylist(playlists)

            if (!result) {
                response.setResponse(400, { message: 'Somthing Playlist Create Error...' }, res, req)
            }
            else {
                response.setResponse(200, { message: 'Success', data: playlists }, res, req)
            }
        } catch (error) {
            console.log("Create Playlist Error ===---->", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }

    public async addplaylist(req: Request, res: Response): Promise<any> {
        try {
            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)
            let check_user_playlist = await dbservice.playlistsDBservice.checkuserplaylist(token_decode)
            const addplaylists: addplaylistModel = {
                playlists_id: req.body.playlists_id,
                video_id: req.body.video_id,
                user_id: parseInt(token_decode)
            }
            if (check_user_playlist.length > 0) {
                let result = await dbservice.playlistsDBservice.addplaylist(addplaylists)
                if (!result) {
                    response.setResponse(400, { message: 'Somthing Playlist Addplaylist Error...' }, res, req)
                }
                else {
                    response.setResponse(200, { message: 'Success', data: addplaylists }, res, req)
                }
            }
            else {
                response.setResponse(404, { message: 'Playlist Not Found' }, res, req)
            }
        } catch (error) {
            console.log("Add Playlist Error ====----->", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }

    public async getuserplaylist(req: Request, res: Response): Promise<any> {
        try {
            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

            let result = await dbservice.playlistsDBservice.getplaylist(req.body.playlists_id, token_decode)
            let resp: any = []

            let i = 0;

            if (!result) {
                response.setResponse(400, { message: 'Somthing Playlist Get Error...' }, res, req)
            }
            else {
                while (i < result.length) {
                    let playlist = result[i]
                    let video_id = playlist.video_id.split(',').map((id: string) => parseInt(id.split('/#/')[1]))
                    let video_file = playlist.video_file.split(',').map((file: string) => file.split('/#/')[1])
                    let video_thumbnail = playlist.video_thumbnail.split(',').map((thumbnail: string) => thumbnail.split('/#/')[1])
                    if (video_id != null) {
                        while (i < video_id.length) {
                            let playlist: any = {
                                video_id: video_id[i],
                                video_file: video_file[i],
                                video_thumbnail: video_thumbnail[i]
                            }
                            resp.push(playlist)
                            i++;
                        }
                    }
                    i++;
                }
                if (resp.length == 0) {
                    response.setResponse(400, { message: 'You Playlist Is Empty...' }, res, req)
                }
                else {
                    response.setResponse(200, { message: 'Success', playlist: resp }, res, req)
                }
            }
        } catch (error) {
            console.log("Get User Playlist Error ===----->", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }

    public async getmyallplaylist(req: Request, res: Response): Promise<any> {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            response.setResponse(400, { message: errors.array() }, res, req)
        }
        try {
            let data = req.query

            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)
            
            let result = await dbservice.playlistsDBservice.getmyallplaylist(token_decode, data)
            console.log("User Playlist ===--->", result[0]);
            if (result.length == 0) {
                return response.setResponse(404, { message: 'Playlist Is Empty' }, res, req)
            }
            else {
                response.setResponse(200, { message: 'Success', playlist: result }, res, req)
            }

        } catch (error) {
            console.log('Get My All  Playlist Error ====---->', error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }
}

export const playlist = new Playlist()