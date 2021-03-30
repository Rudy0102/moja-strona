const pola = [];
const turazdjecie = document.getElementById('tura');
const gracz=['krzyzyk','kolko']
let tura=gracz[0];
let runda=0 ;
let polawartosc = [0,0,0,0,0,0,0,0,0]; //0-puste 1-krzyzk 2-kolo
for (let i = 1; i < 10; i++) {
    pola.push(document.getElementById(i+'pole'));
    pola[i-1].addEventListener('click',()=>{Main(pola[i-1])})
};

function Main(pole){
    const kolko='kolko.png';
    const krzyzyk='krzyzyk.png';
    const id=parseInt(pole.id);
        
    if (tura==gracz[0]){
        pole.src=krzyzyk;
        pole.classList.add('wylaczklikanie');
        polawartosc[id-1]=1;
        runda++;
        Sprawdzwygrana();
        tura=gracz[1];
        turazdjecie.src=kolko;
    }
    else if (tura==gracz[1]){
        pole.src=kolko;
        pole.classList.add('wylaczklikanie');
        polawartosc[id-1]=2;
        runda++;
        Sprawdzwygrana();
        tura=gracz[0];
        turazdjecie.src=krzyzyk;
    }
    else console.error(tura+'Inavlid argument');
        // console.log(polawartosc ,runda);
}
function Sprawdzwygrana(){
    if (polawartosc[0]==polawartosc[1]&&polawartosc[1]==polawartosc[2]&&polawartosc[2]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[3]==polawartosc[4]&&polawartosc[4]==polawartosc[5]&&polawartosc[5]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[6]==polawartosc[7]&&polawartosc[7]==polawartosc[8]&&polawartosc[8]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[0]==polawartosc[3]&&polawartosc[3]==polawartosc[6]&&polawartosc[6]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[1]==polawartosc[4]&&polawartosc[4]==polawartosc[7]&&polawartosc[7]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[2]==polawartosc[5]&&polawartosc[5]==polawartosc[8]&&polawartosc[8]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[0]==polawartosc[4]&&polawartosc[4]==polawartosc[8]&&polawartosc[8]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (polawartosc[6]==polawartosc[4]&&polawartosc[4]==polawartosc[2]&&polawartosc[2]!=0){
        alert('Wygrywa '+tura);
        Reset();
    }
    else if (runda==9){
        alert('Remis');
        Reset();
    }
}
function  Reset(){
    const przyciskreset=document.getElementById('resetuj');
    przyciskreset.classList.remove('ukryj');
    przyciskreset.addEventListener('click', function(){
        polawartosc = [0,0,0,0,0,0,0,0,0];
        pola.forEach(function(pole){pole.src='puste.png';pole.classList.remove('wylaczklikanie');})
        runda=0;
        przyciskreset.classList.add('ukryj');
    })}