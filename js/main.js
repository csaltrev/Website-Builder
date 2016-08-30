window.addEventListener('load', () => {
    const form = document.querySelector('form');
    const body = document.querySelector('body');

    function setBackground() {
        const background = document.querySelector('#background');
        const selectedBackground = background.options[background.selectedIndex].value;
        body.style.backgroundColor = selectedBackground;
    }

    function getCardColor() {
        const cardColor = document.querySelector('#cards');
        const selectedCardColor = cardColor.options[cardColor.selectedIndex].value;
        return selectedCardColor;
    }

    function fetchNYT() {
        const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a7becb659bc441edbe6b8c9c81966c51';
        $.ajax({
            url: url,
            method: 'GET',
            success(data) {
                const cardsContainer = document.querySelector('.cards');
                $.each(data.response.docs, (index, article) => {
                    const articleEl = document.createElement('article');
                    articleEl.classList.add('card', getCardColor());

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

                    articleEl.appendChild(h2El);
                    articleEl.appendChild(paraEl);
                    articleEl.appendChild(anchorEl);

                    cardsContainer.prepend(articleEl);
                });
            },
            error(jqXHR, textStatus, err) {
                alert(`Unable to fetch from The New York Times: ${err}`);
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        setBackground();
        fetchNYT();
    });
});
