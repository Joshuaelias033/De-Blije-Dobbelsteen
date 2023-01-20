//coockies functie
let scores = {
    x:0,
    o:0
}
if(getCookie("hs") == "") {
    scores = scores;
} else {
    scores = JSON.parse(getCookie("hs"));
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
let ruimtes = Array(9).fill(null)
let aantal = 0

//start met klik functie
const startSpel = () => {
    boxes.forEach(box => box.addEventListener('click', klik))
}

//klik functie
function klik(e) {
    const id = e.target.id

    if(!ruimtes[id] && aantal < 9){
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
            setCookie("hs",JSON.stringify(scores),7);


            let winning_blocks = winnaar()
            aantal = 10
            winning_blocks.map( box => boxes[box].style.backgroundColor = highlight)
            document.body.style.backgroundColor='var(--groen)'
            document.body.style.transition='0.5s'
            return
        }
        aantal++
        huidigeSpeler = huidigeSpeler == x_tekst ? o_tekst : x_tekst
    }

    //funtie voor gelijkspel
    if(aantal === 9){
        tekst.innerHTML = `Gelijkspel!`
        document.body.style.backgroundColor='var(--rood)'
        document.body.style.transition='0.5s'
    }
}

//array van winnende combinaties
const winnendeCombinaties = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//functie voor beslissen winnaar
function winnaar() {
    for (const condition of winnendeCombinaties) {
        let [a, b, c] = condition

        if(ruimtes[a] && (ruimtes[a] == ruimtes[b] && ruimtes[a] == ruimtes[c])) {
            return [a,b,c]
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