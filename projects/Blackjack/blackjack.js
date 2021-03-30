//Made by Robert Żółtowski
function RandomGenerator() {                    //Generate values
    return Math.floor((Math.random() * 52) + 1); //In this program this function only need to generate beetwen 1 and 52
}
class Player {
    constructor() {
        this.name = "player";
        this.cards = new Array();
        this.values = new Array();
        this.sum = 0;
        this.balance = 100.0;
        this.actualbet = 0;
        this.hasblackjack = false;
        this.hasname = false;
        this.lost = false;
    }
}
function Restart() {    //Restarts the gmae
    ClearCards(player.cards,"player");
    ClearCards(dealer.cards,"dealer");
    DisableButtons(false);
    Placebet("show");
}
function ButtonStart(){         //Button starting the game
    document.getElementById("mainmenu").className="none";
    document.getElementById("playscreen").className="playscreen";
    Placebet("show");
}
function CheckSpecialButtons() {
    if (counter==1){
        button_doubledown.disabled=false;
    }
    else if (dealer.values[0]==11&&counter==1) {
        button_insurance.disabled=false;
    }
    else{
        button_insurance.disabled=true;
        button_doubledown.disabled=true;
    }
}
function DisableButtons(x){
    button_hit.disabled=x;
    button_stand.disabled=x;
};
function Placebet(x){
    let bet=player.actualbet;
    switch (x){
        case "show":
            betscreen.classList="betscreen";
            document.getElementById("bet-balance").innerHTML=player.balance;
            break;
        case "hide":
            if (player.actualbet==0){
                alert("You can't bet 0!")
            }
            else {
                betscreen.classList="none";
                MainGame("start");
            };
            break;
        case "whitechip":
            bet=+1;
            addbet();
            break;
        case "yellowchip":
            bet=+5;
            addbet();
            break;
        case "redchip":
            bet=+10;
            addbet();
            break;
        case "bluechip":
            bet=+25;
            addbet();
            break;
        case "greenchip":
            bet=+100;
            addbet();
            break;
        case "blackchip":
            bet=+500;
            addbet();
            break;
        case "betreset":
            player.actualbet=0;
            break;
    }
    function addbet(){
        if (player.actualbet>player.balance||player.actualbet+bet>player.balance){
            alert("You can't bet more than you have")
        }
        else{
            player.actualbet=player.actualbet+bet;  //Adds actual bet
        }
    }
    actualbet.innerHTML=player.actualbet;
    // playerbet.innerHTML=player.actualbet;
    
};
function GetsValue(player){             //Assigns values for cards (Ace deafult=11 but if over 21 ace=1)
    for (let i = 0; i < player.cards.length; i++) {
            player.values[i]=CheckValue(player.cards[i]); //TODO 2 Aces at start gives hard 2 instead of soft 12
        }
    let sum=0;
    let Ace;
    player.values.forEach(card =>{
        sum+=card;
    })
    if (sum>21){
        do{
            Ace=Aceone(player);
            if(Ace[0]!==0){
                sum=Ace[0];
            }
        }while(Ace[0]>21||Ace[1]===true)}
    player.sum=sum;
    }
    function Aceone(player){
        let sum=0;
        for (let i = 0; i < player.cards.length; i++) {
            if (player.values[i]===11){
                player.values[i]=1;
                sum=0;
                player.values.forEach(x =>{
                    sum+=x;
                });
                Ace=true;
                break;
            }
            else{Ace=false;}
        }
    return [sum,Ace];
    }
function CheckValue(x){
    if(x<5) return 2;
    else if(x<9)  return 3;
    else if(x<13)  return 4;
    else if(x<17)  return 5;
    else if(x<21)  return 6;
    else if(x<25)  return 7;
    else if(x<29)  return 8;
    else if(x<33)  return 9;
    else if(x<49)  return 10;
    else if(x<53)  return 11;              

}
function ClearCards(card,name){
    let playername=name;
    card.forEach(element => {
        //console.log(document.getElementById(playername+element));
        document.getElementById(playername+element).className="none";
    })
}
function Show_endscreen(x){                     //PB=PLayerBLackjack, DB=DealerBlackjack
    endscreen.className="endscreen";
    document.getElementById("dealer-value").className="dealer-value";           //TODO Make a function showing cards, rather than copying the same lines
    document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
    document.getElementById("dealer53").className="none";
    switch(x){
        case "DB":
            endscreen_text.innerHTML="Dealer Blackjack!";
            player.balance=player.balance-player.actualbet;
            break;
        case "PB":
            endscreen_text.innerHTML="Blackjack!";
            player.balance=player.balance+(player.actualbet*1.5+player.actualbet);   //payout 3:2
            break;
        case "Push":
            endscreen_text.innerHTML="Push!";
            break;
        case "PW":
            endscreen_text.innerHTML="You won!";
            player.balance=player.balance+(player.actualbet*2);
            break;
        case "DW":
            endscreen_text.innerHTML="You lost";
            player.balance=player.balance-player.actualbet;
            break;
        case "Bust":
            endscreen_text.innerHTML="Bust!";
            player.balance=player.balance-player.actualbet;
            break;
        case "DBust":
            endscreen_text.innerHTML="Dealer Bust!";
            player.balance=player.balance+(player.actualbet*2);
            break;            
        case "Show":
            endscreen.className="none";
            player.actualbet=0;
            button_list.forEach(element => {
                element.className="none"
            })
            button_retry.className="button";
            break;
                                
    }
}
function CheckBlackjack(){
    if (player.sum===21&&dealer.sum!=21){               
        Show_endscreen("PB");   //Player Blackjack
        DisableButtons(true);
        return false;
    }
    else if(dealer.values[0]===11&&dealer.sum===21){    
        if(!player.sum==21){
            Show_endscreen("Push");
            return false;
        }
        else{
            Show_endscreen("DB");
            return true;
        }
    }
    }
function WhoWins(){
    switch (true) {
        case dealer.sum===player.sum:   //Push
            Show_endscreen("Push")
            break;
        case dealer.sum>player.sum:     //Dealer wins
            Show_endscreen("DW")
            break;
        case dealer.sum<player.sum:     //Player wins
            Show_endscreen("PW")
            break;
    }
}
function GetPlayerName(){
    let i=0;
    do{
        if (i!=0){alert("Invalid name!")};
        player.name=window.prompt("What's your name? (Max 10 characters, default: Player)");
        if (player.name==""){player.name="Player"};
        i++;
    }while(player.name.length>10);
    document.getElementById("player-text").innerHTML=player.name;
};
function Menuback(){
    // const xhttp = new XMLHttpRequest;
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //     console.log('Data saved to Database');
    //     window.location="./index.html";
    //     }
    // };
    // xhttp.open("POST", "addtoscoreboard.php", true);
    // xhttp.send("nick="+player.name+"&wynik="+player.balance);
    window.location="./index.html"
}
function MainGame(button){                          //Main Function
    // console.log(player.balance);
    playerbet.innerHTML=player.actualbet;
    player_balance.innerHTML=player.balance;
    switch (button){
        case "start":{
            //Get 2 cards for each player
            // console.log(button)
            // player.cards.forEach(x => x=null);
            // player.values.forEach(x => x=null);
            // dealer.cards.forEach(x => x=null);
            // dealer.values.forEach(x => x=null);
            player.cards.length=2;
            player.values.length=2;
            dealer.cards.length=2;
            dealer.values.length=2;
            // console.log(dealer,player);
            button_list.forEach(element => {element.className="button"})
            DisableButtons(false);
            document.getElementById("dealer-value").classList="none";
            do {
                dealer.cards=[RandomGenerator(),RandomGenerator()];
            } while (dealer.cards[0]===dealer.cards[1]);
            do {
                player.cards=[RandomGenerator(),RandomGenerator()];
            } while (player.cards[0]===player.cards[1]);
            GetsValue(player); 
            GetsValue(dealer);
            dealer.hasblackjack=CheckBlackjack();
            // document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
            document.getElementById("dealer53").className="dealercard";
            // document.getElementById("dealer53").className="none";
            document.getElementById("dealer"+dealer.cards[0]).className="dealercard";
            document.getElementById("player"+player.cards[0]).className="playercard";
            document.getElementById("player"+player.cards[1]).className="playercard";
            document.getElementById("player53").className="none";
            // console.log(player);
            document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
            document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
            if(player.hasname==false){
                GetPlayerName();
                player.hasname = true;}   //If it first time player starts playing ask for his/her name
            counter=1;
            break;
        }
        case "hit":{
            //give player additional card
            // console.log(button);
            let x=player.cards.length;
            player.cards[x]=RandomGenerator();
            for (let i = 0; i < x; i++) {
                if (player.cards[i]===player.cards[x]) {
                    player.cards[x]=RandomGenerator();
                }
            }
            document.getElementById("player"+player.cards[x]).className="playercard";
            GetsValue(player);
            if (player.sum>21) {
                Show_endscreen("Bust");
                DisableButtons(true);
                player.lost=true;
                }
            else player.lost=false;
            counter++;
            document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
            document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
            // console.log(dealer,player);
            break;
        }
        case "stand":{
            //if every player stands do dealers turn
            // console.log(button);
            DisableButtons(true);
            let ends=false
            do{
                let x=dealer.cards.length;
                if (dealer.sum>=17||dealer.sum>=21) {
                    for (let i = 0; i < x; i++) {
                        document.getElementById("dealer"+dealer.cards[i]).className="dealercard";
                        document.getElementById("dealer53").className="none";
                    }
                    ends=true;
                }
                else{
                    dealer.cards[x]=RandomGenerator();
                    for (let i = 0; i < x; i++) {
                        if (dealer.cards[i]===dealer.cards[x]) {
                            dealer.cards[x]=RandomGenerator();
                        }
                    }
                }
                GetsValue(player); GetsValue(dealer);
            }while(ends===false);
            if(dealer.sum>21){Show_endscreen("DBust")}
            else{WhoWins();}  //Who wins+endscreen}
            document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
            document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
            counter++;
            // console.log(dealer,player);
            break;
        }
        case "double-down":{
            if (player.balance>=2*player.actualbet){
                player.actualbet=2*player.actualbet;
                MainGame("hit");
                if (player.lost==false){
                    MainGame("stand");
                }
            }
            else alert('Insufficent balance');
            break;
        }
        case "surrender":{
            //DONE return 1/2 of bet and player doesnt ply this round
            player.actualbet=player.actualbet/2;
            player.balance=Math.floor(player.balance-player.actualbet);
            document.getElementById("dealer53").className="none";
            dealer.cards[1]=RandomGenerator();
            GetsValue(dealer);
            document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
            Show_endscreen("Show");
            counter++;
            break;
        }
        case "insurance":{
            //DONE place 1/2 of player bet that dealer have natural blackjack
            if (player.balance>=player.actualbet+(player.actualbet/2)){
                insurancebet=player.actualbet/2;
                counter++;
            }
            else alert('Insufficent balance');
            break;
        }
        // case "split":{
        //     //TODO if player is dealt 2 cards with the same value they can double the bet and play each hand separetly
        //     console.log(button)
        //     break;
        // }    
    }
    CheckSpecialButtons();
}
const button_stand=document.getElementById("stand")
button_stand.addEventListener("click",()=>{MainGame("stand")});     
const button_hit=document.getElementById("hit")
button_hit.addEventListener("click",()=>{MainGame("hit")});
const button_doubledown=document.getElementById("double-down")
button_doubledown.addEventListener("click",()=>{MainGame("double-down")});
const button_surrender=document.getElementById("surrender");
button_surrender.addEventListener("click",()=>{MainGame("surrender")});
const button_insurance=document.getElementById("insurance")
button_insurance.addEventListener("click",()=>{MainGame("insurance")});
const endscreen=document.getElementById("endscreen");
endscreen.addEventListener("click",()=>{Show_endscreen("Show")});
const endscreen_text=document.getElementById("endscreen-text");
const button_retry=document.getElementById("retry");
button_retry.addEventListener("click",function(){button_retry.className="none";Restart()})    //Hides retry button and calls function MainGame
button_list=[button_hit,button_insurance,button_surrender,button_stand,button_doubledown]
const button_start=document.getElementById("menustart");
button_start.addEventListener("click",ButtonStart, false);
const player_balance=document.getElementById("playerbalance");
const betscreen=document.getElementById("betscreen");
const whitechip=document.getElementById("whitechip");
whitechip.addEventListener("click",()=>{Placebet("whitechip")});
const yellowchip=document.getElementById("yellowchip");
yellowchip.addEventListener("click",()=>{Placebet("yellowchip")});
const redchip=document.getElementById("redchip");
redchip.addEventListener("click",()=>{Placebet("redchip")});
const bluechip=document.getElementById("bluechip");
bluechip.addEventListener("click",()=>{Placebet("bluechip")});
const greenchip=document.getElementById("greenchip");
greenchip.addEventListener("click",()=>{Placebet("greenchip")});
const blackchip=document.getElementById("blackchip");
blackchip.addEventListener("click",()=>{Placebet("blackchip")});
const betreset=document.getElementById("BetReset");
betreset.addEventListener("click",()=>{Placebet("betreset")});
const betconfrim=document.getElementById("BetConfirm");
betconfrim.addEventListener("click",()=>{Placebet("hide")});
const actualbet=document.getElementById('actual-bet');
const playerbet=document.getElementById('playerbet');
const button_backtomenu=document.getElementById('buttonbacktomenu');
button_backtomenu.addEventListener('click',()=>{Menuback();})
// let button_split=document.getElementById("split")
// button_split.addEventListener("click",MainGame.bind(this,"split"));
// let player=window.prompt("Enter your name: ")
const dealer=new Player();
const player=new Player();
let insurancebet=0;
let counter=1;