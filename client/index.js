//script file for index.html


//create variable using query selector and select both inputs
let inputVar = document.querySelector('.inputMsg');
let button = document.querySelector('.submitBtn');;
let taskContainer = document.querySelector('.taskContainer');


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOCUMENT ON LOAD")
    fetch('/tasks')
    .then((res) => res.json())
    .then((data) => {
        let taskArray = data;
        taskArray.forEach((item) => {
            let msg = document.createElement('div')
            msg.setAttribute('id', item._id);
            // console.log(msg.getAttribute('id'));
            let pElement = document.createElement('p');
            let btn = document.createElement('button');
            btn.innerText = 'X';
            btn.onclick = () => {
              // DELETE 
              fetch(`/tasks/${item._id}`,{
                method: 'DELETE',
                header: {
                    'Accept': "application/json, text/plain",
                    'Content-Type': 'application/json',
                  },
              })
              .then(data => {
                msg.remove()
              });
              
            }
            pElement.innerText = item.task;
            msg.appendChild(pElement);
            msg.appendChild(btn);
            taskContainer.appendChild(msg);
        })
    })
    .catch(err => console.log(err))
})





button.addEventListener('click', () => {
  
  //get value of input text 
  let msg = document.createElement('div')
  
  let pElement = document.createElement('p');
  pElement.innerText = inputVar.value;
  //use value to append a new child inside task container
  msg.appendChild(pElement);
  taskContainer.appendChild(msg);
  
  fetch('/tasks', {
    method: 'POST',
    headers: {
        'Accept': "application/json, text/plain",
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({taskItem: inputVar.value})
    }
  )
  .then((res) => console.log('Post request: ', res))
    
})
    

    