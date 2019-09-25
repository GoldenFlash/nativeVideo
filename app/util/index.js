'use strict';

export var getLastMonth = (date)=>{

    if(Array.isArray(date)){
        date=new Date(date[0]||0,date[1]-1||0,date[2]||0)
    }
    let year = date.getFullYear()
    let month = date.getMonth()
    var newDate =  new Date(year,month,0)
    return [newDate.getFullYear(),newDate.getMonth()+1]
}
