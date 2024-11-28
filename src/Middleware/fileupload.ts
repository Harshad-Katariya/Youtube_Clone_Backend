import multer from 'multer';
import express, { Request, Response } from 'express'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const fileupload = multer.diskStorage({
    destination: 'Uploads',
    filename: (req: Request, file, cb) => {
        let genrate = `${Date.now()}-${uuidv4()}`
        const ext = path.extname(file.originalname);
        let new_path = `${genrate}${ext}`
        cb(null, new_path)
    }
})

const filetycheck = (req: Request, file: any, cb: any) => {
    try {
        let image_type = path.extname(file.originalname)

        if (image_type !== '.png'.toLowerCase() && image_type !== '.jpg'.toLowerCase() && image_type !== '.jpeg'.toLowerCase() && image_type !== '.mp4') {
            return cb(new Error('Only Allow .png And .jpg And .jpeg Are Allow').message)
        }
        else {
            cb(null, true)
        }
    } catch (error) {
        console.log('Error ===--->', error);
    }

}

export const channel_image = multer({
    storage: fileupload,
    fileFilter: filetycheck
})