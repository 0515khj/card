
const $card = document.querySelectorAll('.card');

(function shuffle(){
    for(let i=0; i < $card.length; i++){
        let random = Math.floor(Math.random() * $card.length);
        $card[i].style.order = random;
    }
})();


let firstcard , secondcard ; 
let hasflipcard = false; 
let lockboard = false;

let flipcard = (card) =>{
    if(lockboard || card === firstcard) {
        return;
    }
    card.classList.add('flipped');
    if(!hasflipcard) {
        hasflipcard = true;
        firstcard = card;
    }else{
        secondcard = card;
        chekmatch();
    }
};

 document.getElementById('game-board').addEventListener('click', e =>{
    const clickcard = e.target.closest('.card');
if(clickcard && !clickcard.classList.contains('flipped') && !lockboard){
    flipcard(clickcard);
}
});
 
let chekmatch=()=> {
    let ismatch = firstcard.dataset.card === secondcard.dataset.card;
    ismatch ? disable() : unflip();
}
function unflip() {
    lockboard = true;
    setTimeout(()=>{
        firstcard.classList.remove('flipped');
        secondcard.classList.remove('flipped');
        reset();
    },1000)
}

function disable () {
        firstcard.classList.add('disabled')
        secondcard.classList.add('disabled')
    reset();
}
function reset() {
    hasflipcard = false;
    lockboard = false;
    firstcard = null
    secondcard = null
}
