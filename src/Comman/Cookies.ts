import dotenv from 'dotenv'
import { stringify } from 'querystring';
dotenv.config()

class cookieParser
{   
    UserCookie (request:any)
    {
        const Data: { [key: string]: string } = {};
        const rc = request.headers.cookie;
        if(rc!==undefined && rc !=="")
        {
            rc && rc.split(';').forEach(function (cookie :string) 
            {
                const parts = cookie.split('=');
                Data[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
            })

            if(Data[process.env.COOKIE_KEY as string] !== undefined && Data[process.env.COOKIE_KEY as string] !=="")
            {
                return Data[process.env.COOKIE_KEY as string];
                
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
        
        
    }

    ChannelCreateCookie (request:any)
    {
        const Data: {[key: string] : string} ={};
        const rc = request.headers.cookie;
        if(rc!==undefined && rc !=="")
        {
            rc && rc.split(';').forEach(function (cookie :string) 
            {
                const parts = cookie.split('=');
                Data[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
            })

            if(Data[process.env.CHANNEL_KEY as string] !== undefined && Data[process.env.CHANNEL_KEY as string] !=="")
            {
                return Data[process.env.CHANNEL_KEY as string];
                
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
    }
}

export const CookieParser = new cookieParser()
// parseDoctorCookies (request) {
//     var list = {},
//     rc = request.headers.cookie;
//     if(rc !== undefined && rc !== ""){
//         rc && rc.split(';').forEach(function( cookie ) {
//             var parts = cookie.split('=');
//             list[parts.shift().trim()] = decodeURI(parts.join('='));
//         });
//         if(list[process.env.DOCTOR_AUTH_COOKIE] !== undefined && list[process.env.DOCTOR_AUTH_COOKIE] !== "")
//             return list[process.env.DOCTOR_AUTH_COOKIE];
//         else
//             return null
//     }else{
//         return null
//     }
//}
