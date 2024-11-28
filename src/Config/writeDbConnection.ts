import mysql2 from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const connectionPool = mysql2.createPool({
    connectionLimit:2,
    multipleStatements:true,
    debug:false,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

class writeDb
{
    public async insert(qurey:any,data:any[]): Promise<any>
    {
        return new Promise((resolve,rejet) =>
        {
            connectionPool.getConnection((err,connection) =>
            {
                if(err)
                {
                    console.log("WriteDBConnection Error ======---->",err);
                    connection.destroy()
                    rejet(err)
                }
                connection.query(qurey,data,(error,results) =>
                {
                    if(error)
                    {
                        console.log('WriteDBConnection Error 2 =======---->',error);
                        connection.destroy()
                        return rejet(error)
                    }
                    connection.destroy()
                    return resolve(results)
                })
            })
        });
    }

    public async update(qurey:any,data:any[]):Promise<any>
    {
        return new Promise((resolve,reject) =>
        {
            connectionPool.getConnection((err,connection) =>
            {
                if(err)
                {
                    console.log('WriteDBConnection Error Update ======>',err);
                    connection.destroy()
                    reject(err)
                }
                connection.query(qurey,data,(error,results) =>
                {
                    if(error)
                    {
                        console.log('WriteDBConnection Update 2 Error ======>',error);
                        connection.destroy()
                        return reject(error)
                    }
                    connection.destroy()
                    return resolve(results)
                })
            })
        });
    }

   public async delete(qurey:any,data:any[]): Promise<any>
   {
        return new Promise((resolve,reject) =>
        {
            connectionPool.getConnection((err,connection) =>
            {
                if(err)
                {
                    console.log('WriteDBConnection Error Delete =======-->',err);
                    connection.destroy()
                    reject(err)
                }
                connection.query(qurey,data,(error,results) =>
                {
                    if(error)
                    {
                        console.log('WriteDBConnection Error Delete 2 =====--->',error);
                        connection.destroy()
                        return reject(error)
                    }
                    connection.destroy()
                    return resolve(results)
                })
            })
        })
   }
}

export const writeConnection = new writeDb