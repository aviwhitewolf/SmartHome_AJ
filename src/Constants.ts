export class Constants {

    public static BASEURL = "http://localhost:1337"

    constructor() {
    }

    public static getError(error : any){

        console.log("Error", error)
        if(error?.error)
            return error?.message    
        if(error?.data[0]?.messages[0]?.message)
            return error?.data[0]?.messages[0]?.message

        return "" 
    }
}