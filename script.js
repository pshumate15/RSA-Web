// TODO:
    // Consider changing a's to buttons or inputs. Might be easier to attach events to them

const baseUrl = 'https://localhost:44331/api/sports';
const main = document.querySelector('main');
const headerLink = document.querySelector('#header-link');

window.addEventListener('DOMContentLoaded', () => {
    showHome();
});

headerLink.addEventListener('click', () => {
    showHome();
});

function showHome() {
    main.textContent = '';
    const h1 = document.createElement('h1');
    h1.textContent = 'Home';
    main.appendChild(h1);
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl);
    xhr.onload = () => {
        if (xhr.status !== 200) {
            main.textContent = 'Error occurred when getting content.';
        } else {
            const homeObj = JSON.parse(xhr.response);
            homeObj.forEach(obj => createLinkDiv(obj));

        }
    };
    xhr.send();
}

function createLinkDiv(responseObj) {
    const a = document.createElement('a');
    a.classList.add('element-link');

    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = responseObj.name;

    if (responseObj.hasOwnProperty('links')) {
        // Add event listener that gets next page when clicked
        a.addEventListener('click', () => {
            main.textContent = '';
            const h1 = document.createElement('h1');
            h1.textContent = responseObj.name;
            main.appendChild(h1);

            const xhr = new XMLHttpRequest();
            xhr.open('GET', responseObj.links[0].href);
            xhr.onload = () => {
                if (xhr.status !== 200) {
                    main.textContent = 'Error occurred while getting content.';
                } else {
                    const pageObj = JSON.parse(xhr.response);

                    if (pageObj.length === 0) {
                        createLinkDiv({name: 'No games to display.'});
                    } else {
                        pageObj.forEach(obj => createLinkDiv(obj));                    
                    }
                }
            };
            xhr.send();
        });
    }

    div.appendChild(h2);
    a.appendChild(div);
    main.appendChild(a);
}