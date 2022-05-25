const cards = document.querySelectorAll('.card');
let virarCarta = false;
let primeiraCarta, segundaCarta;
let bloquearCartas = false;

/*o this vai adicionar a nossa classe 'flip' pro nosso elemento card que estamos selecionanado naquele momento.*/
function flipCard() {
    if(bloquearCartas) return;
    if(this === primeiraCarta) return;

    this.classList.add('flip');//toggle no lugar do add tiraria e adicionaria acarta, o add faz apenas uma vez.

    if (!virarCarta) {
        virarCarta = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    virarCarta = false;
    checkForMath();
}

function checkForMath() {
    if (primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    primeiraCarta.removeEventListener('click', flipCard);
    segundaCarta.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    bloquearCartas = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [virarCarta, bloquearCartas] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralhar() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    });
})(); /*Imediatle invoction function */

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

