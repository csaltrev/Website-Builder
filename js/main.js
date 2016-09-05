window.addEventListener('load', () => {
    const form = document.querySelector('form');
    const body = document.querySelector('body');

    const view = {
        setBackground() {
            const background = document.querySelector('#background');
            const selectedBackground = background.options[background.selectedIndex].value;
            body.style.backgroundColor = selectedBackground;
        },
        displayNews() {
            const nytimesInput = document.querySelector('#nytimes');
            const guardianInput = document.querySelector('#guardian');
            if (!guardianInput.checked && !nytimesInput.checked) alert('Spice up your dope site with some news, dawg.');
            if (nytimesInput.checked && guardianInput.checked) {
                controller.fetchNYT();
                controller.fetchTheGuardian();
            } 
            else if (nytimesInput.checked && !guardianInput.checked) controller.fetchNYT();
            else if (guardianInput.checked && !nytimesInput.checked) controller.fetchTheGuardian();
        }
    };

    const controller = {
        getCardColor() {
            const cardColors = document.querySelector('#cards');
            const selectedCardColor = cardColors.options[cardColors.selectedIndex].value;
            return selectedCardColor;
        },
        fetchNYT() {
            const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a7becb659bc441edbe6b8c9c81966c51';
            const self = this;
            $.ajax({
                url: url,
                method: 'GET',
                success(data) {
                    const cardsContainer = document.querySelector('.cards');
                    $.each(data.response.docs, (index, article) => {
                        const articleEl = document.createElement('article');
                        articleEl.classList.add('card', self.getCardColor());

                        const smallEl = document.createElement('small');
                        smallEl.classList.add('news-provider');
                        smallEl.textContent = 'The New York Times';

                        const h2El = document.createElement('h2');
                        h2El.classList.add('card-header');
                        h2El.textContent = article.headline.main;

                        const paraEl = document.createElement('p');
                        paraEl.classList.add('card-body');
                        paraEl.textContent = article.lead_paragraph;

                        const anchorEl = document.createElement('a');
                        anchorEl.classList.add('card-link');
                        anchorEl.setAttribute('href', article.web_url);
                        anchorEl.textContent = 'Full Article';
                        anchorEl.style.color = body.style.backgroundColor;

                        articleEl.appendChild(smallEl);
                        articleEl.appendChild(h2El);
                        articleEl.appendChild(paraEl);
                        articleEl.appendChild(anchorEl);

                        cardsContainer.prepend(articleEl);
                    });
                },
                error(jqXHR, textStatus, err) {
                    alert(`Unable to fetch from The New York Times: ${err}.`);
                }
            });
        },
        fetchTheGuardian() {
            const self = this;
            const url = 'http://content.guardianapis.com/search?api-key=ceeab02b-5f2a-423a-9230-03691f43ea8e';
            $.ajax({
                url: url,
                method: 'GET',
                success(data) {
                    const cardsContainer = document.querySelector('.cards');
                    $.each(data.response.results, (index, article) => {
                        const articleEl = document.createElement('article');
                        articleEl.classList.add('card', self.getCardColor());

                        const smallEl = document.createElement('small');
                        smallEl.classList.add('news-provider');
                        smallEl.textContent = 'The Guardian';

                        const h2El = document.createElement('h2');
                        h2El.classList.add('card-header');
                        h2El.textContent = article.webTitle;

                        const anchorEl = document.createElement('a');
                        anchorEl.classList.add('card-link');
                        anchorEl.setAttribute('href', article.webUrl);
                        anchorEl.textContent = 'Full Article';
                        anchorEl.style.color = body.style.backgroundColor;

                        articleEl.appendChild(smallEl);
                        articleEl.appendChild(h2El);
                        articleEl.appendChild(anchorEl);

                        cardsContainer.prepend(articleEl);
                    });
                },
                error(jqXHR, textStatus, err) {
                    alert(`Unable to fetch from The Guardian: ${err}.`);
                }
            });
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        view.setBackground();
        view.displayNews();
    });
});
