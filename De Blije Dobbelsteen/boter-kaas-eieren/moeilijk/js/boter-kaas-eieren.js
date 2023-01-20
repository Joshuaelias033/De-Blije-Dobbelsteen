//coockies functie
let scores = {
    x:0,
    o:0
}
if(getCookie("hs-moeilijk") == "") {
    scores = scores;
} else {
    scores = JSON.parse(getCookie("hs-moeilijk"));
}
document.getElementById("hX").innerText = scores.x;
document.getElementById("hO").innerText = scores.o;

let tekst = document.getElementById('tekst')
let opnieuwBtn = document.getElementById('opnieuwBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let highlight = getComputedStyle(document.body).getPropertyValue('--highlight')
const o_tekst = "O"
const x_tekst = "X"
let huidigeSpeler = x_tekst
let ruimtes = Array(16).fill(null)
let aantal = 0

//start met klik functie
const startSpel = () => {
    boxes.forEach(box => box.addEventListener('click', klik))
}

//klik functie
function klik(e) {
    const id = e.target.id

    if(!ruimtes[id] && aantal < 16){
        ruimtes[id] = huidigeSpeler
        e.target.innerText = huidigeSpeler

        //functie voor winnaar
        if(winnaar() !==false){
            tekst.innerHTML = `${huidigeSpeler} heeft gewonnen!`
            if(huidigeSpeler=="X") {
                scores.x++;
                document.getElementById("hX").innerText = scores.x;
            } 

            if (huidigeSpeler == "O") {
                scores.o++;
                document.getElementById("hO").innerText = scores.o;
            }

            // cookie opslaan met scores
            setCookie("hs-moeilijk",JSON.stringify(scores),7);


            let winning_blocks = winnaar()
            aantal = 17
            winning_blocks.map( box => boxes[box].style.backgroundColor = highlight)
            document.body.style.backgroundColor='var(--groen)'
            document.body.style.transition='0.5s'
            return
        }
        aantal++
        huidigeSpeler = huidigeSpeler == x_tekst ? o_tekst : x_tekst
    }

    //funtie voor gelijkspel
    if(aantal === 16){
        tekst.innerHTML = `Gelijkspel!`
        document.body.style.backgroundColor='var(--rood)'
        document.body.style.transition='0.5s'
    }
}

//array van winnende combinaties
const winnendeCombinaties = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
]

//functie voor beslissen winnaar
function winnaar() {
    for (const condition of winnendeCombinaties) {
        let [a, b, c, d] = condition

        if(ruimtes[a] && ruimtes[b] && ruimtes[c] && ruimtes[d] && (ruimtes[a] == ruimtes[b] && ruimtes[a] == ruimtes[c] && ruimtes[a] == ruimtes[d])) {
            return [a,b,c,d]
        }        
    }
    return false
}

//restart functie
opnieuwBtn.addEventListener('click', restart)

function restart() {
    ruimtes.fill(null)
    aantal = 0
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
        document.body.style.backgroundColor=''
    })

    tekst.innerHTML = 'Boter Kaas Eieren'

    huidigeSpeler = x_tekst
}

startSpel()