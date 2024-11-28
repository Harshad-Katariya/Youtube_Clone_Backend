
class Response {
    setResponse(responseCode:any, bodyData:any, result :any , req :any) {
        result.statusCode = responseCode;
        result.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        result.setHeader("Access-Control-Allow-Credentials", true);
        result.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        result.setHeader("Content-Type", "application/json");
        result.send(JSON.stringify(bodyData));
    }
}
export const response = new Response();

