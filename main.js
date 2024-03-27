const $term = document.getElementById('term')
const $buttonSearch = document.querySelector('button')
const $main = document.querySelector('main')

let loading

$buttonSearch.addEventListener("click", () => {
    $term.value && SearchProfile($term.value)
})

async function SearchProfile(user) {
    loading = true
    load()
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        if (response.ok) {
            let data = await response.json();
            createUser(data)
            loading = false
            load()
        } else {
            showError();
        }
    } catch (err) {
        showError();
    }
}

function load() {
    if (loading) {
        $buttonSearch.innerHTML = `<div class="loader"></div>`
        $buttonSearch.setAttribute("disabled", true)
    } else {
        $buttonSearch.removeAttribute("disabled")
        $buttonSearch.textContent = "Buscar"
        $term.value = ""
    }
}


function showError() {
    $main.innerHTML = `
    <article>
        <p> El usuario que ingresaste no fue encontrado</>
    </article>`

    loading = false
    load()

    setTimeout(() => {
        $main.innerHTML = ''
    }, 2000)
}

function createUser(data) {
    let name = data.name || data.login
    let bio = data.bio || ''
    let location = data.location || ''

    $main.innerHTML = `    
    <article>
        <div class="container_img">
            <img src="${data.avatar_url}" alt="${data.login}">
        </div>
        <div class="container_info">
            <div>
                <h2>${name}</h2>
                <p>${bio}</p>
                <span>${location}</span>
            </div>
            <ul>
                <li><span>${data.followers}</span> followers</li>
                <li><span>${data.following}</span> following</li>
            </ul>
        </div>

    </article>
    `
}