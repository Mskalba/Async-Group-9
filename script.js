var $img, $list, lastTodoId;
function main() {
    $img = document.getElementById('dog');
    $list = document.getElementById('todos');
    // getRandomDogWithFetch();
    // getRandomDogWithAxios();
    getTodosAndAddAsListElement();
    getRandomDogWithAxiosAndAsyncAwait();
    $img.addEventListener('click', dogImgClickHandler);
}

async function getTodosAndAddAsListElement() {
    let todos = await axios.get('http://195.181.210.249:3000/todo/');

    lastTodoId = todos.data[todos.data.length - 1].id;

    let listElement = document.createElement('li');
    listElement.innerText = todos.data.map(todos => todos.title).join(', ');
    $list.appendChild(listElement);
}

async function dogImgClickHandler() {
    addNewTodo();
    await axios.put('http://195.181.210.249:3000/todo/' + lastTodoId, {
        title: 'Zmienilem pierwszy element',
        author: 'App',
    });

    getTodosAndAddAsListElement();
}

async function addNewTodo() {
    await axios.post('http://195.181.210.249:3000/todo/', {
        title: 'Dodany element',
        author: 'App'
    });
}

function addNewTodo() {
    axios.post('http://195.181.210.249:3000/todo/', {
        title: 'Dodany element',
        author: 'App'
    }).then(res => {
        getTodosAndAddAsListElement();
    });
}

function getRandomDogWithFetch() {
    fetch('https://dog.ceo/api/breeds/image/random', { method: 'GET'})
        .then(res => res.json())
        .then(res => {
            $img.src = res.message;
        })
}
function getRandomDogWithAxios() {
    axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            $img.src = res.data.message
        })
        .catch(error => {console.error(error)});
}

async function getRandomDogWithAxiosAndAsyncAwait() {
    try {
        var response = await axios.get('https://dog.ceo/api/breeds/image/random');
        $img.src = response.data.message;
    } catch(err) {
        console.log(err);
    }
}

document.addEventListener('DOMContentLoaded', main);