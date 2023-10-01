const request = require('postman-request');

const geocode = (address,callback) => {
    const url =  `http://api.positionstack.com/v1/forward?access_key=ddb3d6fdef1ce383a8936472dddad3cf&query=${address}`;

    request({url : url , json : true}, (error,response ) =>{
                if(error){
                   callback('No Internet',undefined);
                } else  if( response.body.error){
                   callback('Unable to find location. Try another serach.',undefined);
                }else{
                const arr = response.body.data[0];
            
                    if(arr){
                        callback(undefined,{lat : arr.latitude , long : arr.longitude })
                        
                    }
                    else{
                        callback('Unable to find location. Try another serach.',undefined);
                    }
                }

    })
}

module.exports = geocode

