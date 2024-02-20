let socket = new WebSocket('ws://localhost:8080')
const sendButton = document.querySelector('button');
const input = document.querySelector('input');
const content = document.querySelector('.window');
const myList = [];

socket.onopen = ()=>{
   console.log('Connection set')
}

const updateWindow = () => {
    content.innerHTML = '';
    myList.slice().reverse().forEach((el, index) => {
        content.innerHTML += 
        `<div class="message ${index%2===1?'answer': ''}">${el}</div>`;
    })
}

socket.onmessage = (event)=>{
    myList.push(event.data);
  updateWindow();
}

socket.onclose = (event)=>{
  console.log(event.code)
  console.log(event.reason)
}

sendButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if (!input.value) {
        return;
    }
    myList.push(input.value);
    let msg = {
        question: input.value,
    }
    socket.send(JSON.stringify(msg))
})