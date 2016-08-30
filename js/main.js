window.addEventListener('load', () => {
    const form = document.querySelector('form');
    const body = document.querySelector('body');
    const siteName = document.querySelector('.site-name');

    function setSiteName() {
        const siteNameInput = document.querySelector('#title');
        siteName.textContent = siteNameInput.value;
        siteNameInput.value = '';
        siteNameInput.focus();
    }

    function setBackground() {
        const background = document.querySelector('#background');
        const selectedBackground = background.options[background.selectedIndex].value;
        body.style.backgroundColor = selectedBackground;
    }

    function setCardColor() {
        const cardColor = document.querySelector('#cards');
        const selectedCardColor = cardColor.options[cardColor.selectedIndex].value;
        const cards = document.querySelectorAll('.card');
        for (let card of cards) {
            card.style.backgroundColor = selectedCardColor;
        }
    }

    function fetchNYT() {
        const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a7becb659bc441edbe6b8c9c81966c51';
        $.ajax({
            url: url,
            method: 'GET',
            success(data) {
                console.log(data.response.docs);
            },
            error(jqXHR, textStatus, err) {
                alert(`Unable to fetch from The New York Times: ${err}`);
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        setSiteName();
        setBackground();
        setCardColor();
        
        fetchNYT();
    });
});
