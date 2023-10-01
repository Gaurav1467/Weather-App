const request = require('postman-request');


const temp = {
    's' : 'K',
    'm' : 'C',
    'f' : 'F'
}

const forecast = (x,y,unit ,callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=fb354e80664116a771e984e682d51af5&query=${x},${y}&units=${unit}`;

    request({url : url , json : true }, (error,response) => {
        if(error){
            callback('No Internet',undefined);
        }
        else if (response.body.error){
            callback('Invalid Location',undefined)
        }
        else{
            callback(undefined,{location : response.body.location.name , temp : response.body.current.temperature, units : temp[unit] });
            
        }

    })

}

  module.exports = forecast;