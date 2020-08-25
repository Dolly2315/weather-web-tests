export class UtilFunctions {

    // calculate the current date and time in ddmmyy format
    public async getCurrentDateTimeInDDMMYY() {
        var today = new Date();
        var date = ('0' +today.getDate()).slice(-2)+'/'+('0' +(today.getMonth()+1)).slice(-2)+'/'+today.getFullYear();
        var time = ('0' +today.getHours()).slice(-2)+ ":" + ('0'+today.getMinutes()).slice(-2) ;
        var dateTime = " "+date+' '+time;
        return dateTime;
    }

}


