import multer from 'multer';
import express, { Request, Response } from 'express'
import path, { format } from 'path';
import { v4 as uuidv4 } from 'uuid';

const fileupload = multer.diskStorage({
    destination: 'Video',
    filename: (req: Request, file, cb) => {
        let genrate = `${Date.now()}-${uuidv4()}`
        const ext = path.extname(file.originalname);
        let new_path = `${genrate}${ext}`
        cb(null, new_path)
    }

})

const filetycheck = (req: Request, file: any, cb: any) => {
    try {
        let video_type = path.extname(file.originalname)

        if (video_type !== '.mp4'.toLowerCase() && video_type !== '.webm'.toLowerCase()) {
            return cb(new Error('Only Allow .mp4 And .webm Are Allow'))
        }
        else {
            cb(null, true)
        }
    } catch (error) {
        console.log('Error ===--->', error);
    }

}

export const video_file = multer({
    storage: fileupload,
    fileFilter: filetycheck
})