var $img;
function main() {
    $img = document.getElementById('dog');
    // getRandomDogWithFetch();
    // getRandomDogWithAxios();
    getRandomDogWithAxiosAndAsyncAwait();
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