console.log('Client site js')

const weatherForm = document.querySelector('form')
const serach = document.querySelector('#location')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = serach.value

    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message_1.textContent = data.error;
        }
        else{
        message_1.textContent = data.location
        message_2.textContent = data.temperature +' ' + data.units
        
        }
    })
})
    
    console.log('test')
})

