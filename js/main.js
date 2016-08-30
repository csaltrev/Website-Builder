window.addEventListener('load', () => {
    const form = document.querySelector('form');
    const body = document.querySelector('body');
    const cardsContainer = document.querySelector('.cards');

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
                $.each(data.response.docs, (index, article) => {
                    cardsContainer.innerHTML += `<article class="card ${getCardColor()}">
                					       <h2 class="card-header">${article.headline.main}<h2>
                					       <p class="card-body">${article.lead_paragraph}</p>
                					       <a class="card-link" href="${article.web_url}">Full Article</a>
                					   </article>`;
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
