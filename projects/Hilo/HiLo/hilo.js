document.addEventListener("DOMContentLoaded", function Main(){   //ANCHOR Ensurees that script will be started when all elements are loaded               //Made by Robert Żółtowski
    function RandomGenerator() {                    //ANCHOR Generate values
        return Math.floor((Math.random() * 52) + 1); //In this program this function only need to generate beetwen 1 and 52
    }
    function GenerateCards() { //ANCHOR Generates two random diffrent numbers which equals cards
        var x;
        var y;
        Generate();
        function Generate(){
            x=RandomGenerator();
            y=RandomGenerator();
            }
            if (x==y) {
                Generate();
            } 
            return [x,y];
    }
    function GetsValue(x,y) { //ANCHOR  It gives card its real value, x=card 1 id and y=card 2 id
        var xval=Check(x);
        var yval=Check(y);
        function Check(x){       
            switch (true) {
                case(x<5) :
                    return 2;
                case(x<9) :
                    return 3;
                case(x<13) :
                    return 4;
                case(x<17) :
                    return 5;
                case(x<21) :
                    return 6;
                case(x<25) :
                    return 7;
                case(x<29) :
                    return 8;
                case(x<33) :
                    return 9;
                case(x<37) :
                    return 10;
                case(x<41) :
                    return 11;
                case(x<45) :
                    return 13; 
                case(x<49) :
                    return 12; 
                case(x<53) :
                    return 14;                         
            }
        }
        switch (true) { // 0=Dealer wins / 1=Player Wins / 2=Tie
            case (xval > yval):
                return 0;
            case (xval < yval):
                return 1;
            case (xval === yval):
                return 2;
    
        }
    }
    function ShowCards() { //ANCHOR Shows animation of revealing cards and reveal cards and verdic
        let card1="card"+Round.dealercard;
        let card2="card"+Round.playercard;
        document.getElementById("button5").disabled=true;
        document.getElementById("card53").className="dealercard animationhide"; //Sets class with animation
        document.getElementById("card54").className="playercard animationhide";
        setTimeout(function() {                                     //Sets interval of 1s (animation duration) before showing another animation
            document.getElementById("card53").className="hide";
            document.getElementById("card54").className="hide";
            document.getElementById(card1).className="dealercard animationshow";
            document.getElementById(card2).className="playercard animationshow";
            verdic();       //Calls function that shows if player win
            document.getElementById("button5").className="hide";               //Shows only one button, hides rest
            // document.getElementById("button6").className="hide";
            document.getElementById("button7").className="bets";
            // document.getElementById("button6").disabled=false; 
        },1000)
        for (let i = 1; i < 53; i++) {                                      //Sets cards that are not equal to ver card1 or card2 to class cards(hide them)
            if (Round.dealercard!=i && Round.playercard!=i) {
                let x = "card"+i;
                document.getElementById(x).className="hide";
            };
        }
    }
    function Bets(x) { //ANCHOR  Depends on button will add specifed amount to input / If x==5 then will return y.value
        switch (x) {
            case 1:
                x=100;
                break;
            case 2:
                x=500;
                break;
            case 3:
                x=-100;
                break;
            case 4:
                x=-500;
                break;
        }   
        let z=0;
        if (betbal.value!="") {
            z=betbal.value;
            z=parseInt(z);      //Converts string to int
        }
        z=z+x;
        betbal.value=z;
        x=balance.value;
        x=parseInt(x);
        if (z<0) {
            if(language=="en") {alert("You can't bet under 0!")}
            else{alert("Zakład nie może być mniejszy od 0!")}
            betbal.value=0
        }
        else if (z>x) {
            if(language=="en") {alert("Insufficent balance")}
            else{alert("Niewystarczający bilans")}
            betbal.value=balance.value;
        }
    }
    function ButtonPlay() {                     //ANCHOR Starts the game (Generate values) 
        let x = parseInt(betbal.value);
        let y = parseInt(balance.value)
        if (betbal.value!=0 && x<=y) {                    //If bet value != 0
            MainGame();
            DisableButtons(1);
            balance.value-=betbal.value
            // document.getElementById("button5").className="hide";                       //Shows only one button, hides rest                  
            document.getElementById("button7").className="hide";
            // document.getElementById("button6").className="bets";   
        }
        else if(x==0){
            if(language=="en") {alert("You can't bet 0!")}                              //If actual bet = 0
            else{alert("Zakład nie może być równy 0!")};
        }
        else{
            if(language=="en") {alert("Insufficent balance")}                           //If bets is bigger than balance
            else{alert("Niewystarczający bilans")};
            betbal.value=balance.value;
        }
        ShowCards();
                                                        
    }
    function ButtonRetry() {                        //ANCHOR Restarts the game(Generate new values) and show 2nd animation
        document.getElementById("card"+Round.dealercard).className="dealercard animationhideend";      //Animation when game restarts
        document.getElementById("card"+Round.playercard).className="playercard animationhideend";
        document.getElementById("button7").disabled=true;
        setTimeout(function(){
            document.getElementById("card"+Round.dealercard).className="hide";
            document.getElementById("card"+Round.playercard).className="hide";
            document.getElementById("card53").className="dealercard animationshowend"; //Sets class with animation
            document.getElementById("card54").className="playercard animationshowend";
            setTimeout(function(){
            HideCards();
            //document.getElementById("bet").value=0;              //Resets bet
            DisableButtons();
            if (balance.value==0) {                              //If balance=0 then add another 500 so no need to reload the page
                document.getElementById("lose-window").className="settings";                                
                // document.getElementById("body").className="disable-scrolling"
                document.getElementById("div-textlose").className="textlose";
                document.getElementById("div-textlose").addEventListener("click",function(){    //Waits for user to click
                    document.getElementById("div-textlose").className="hide";
                    document.getElementById("lose-window").className="hide";}); 
                balance.value=500;
                // document.getElementById("body").classList.remove("disable-scrolling");
            }
            document.getElementById("button7").disabled=false;
            document.getElementById("button5").disabled=false;
            // document.getElementById("button6").className="hide";
            document.getElementById("button7").className="hide";                       //Shows only one button, hides rest                    
            document.getElementById("button5").className="bets";
            MainGame();
            },500);        //Those timers equal duration of animations
        },500)    
    }
    function DisableButtons(x) {
    let y=true;
    if (x===1) {y=true}
    else{y=false};
        
    for (let i = 1; i < 5; i++) {                                             //ANCHOR Changes betting buttons disabled true or false
            document.getElementById("button"+i).disabled=y;
        }
    }
    function HideCards() {  //ANCHOR It will hides all cards and set background img of cards again and hide text you win
        for (let i = 1; i < 55; i++) {
                let x = "card"+i;
                document.getElementById(x).className="hide";
            }
        document.getElementById("card53").className="playercard";
        document.getElementById("card54").className="dealercard";
        document.getElementById("div-round-info").className="hide";
    }

    function verdic() {         //ANCHOR It checks if player wins
        let x = Round.value
        let y = document.getElementById("round-info");
        switch(x){
            case 0:{
                if (language=="en") {
                    y.innerHTML="You Lost"; 
                }
                else{
                    y.innerHTML="Przegrałeś"; 
                }
                break;
            }
            case 1:{
                if (language=="en") {
                    y.innerHTML="You won"; 
                }
                else{
                    y.innerHTML="Wygrałeś"; 
                }
                let z=balance.value;
                z=parseInt(z);
                balance.value=z+(betbal.value*2);
                break;
            }
            case 2:{
                if (language=="en") {
                    y.innerHTML="Tie"; 
                }
                else{
                    y.innerHTML="Remis"; 
                }
                let z=balance.value;
                let x=betbal.value
                z=parseInt(z);
                x=parseInt(x);
                balance.value=z+x;
                break;
            }
            default:{
                break;
            }
        }
        document.getElementById("div-round-info").className="round-info"
    };
    function HideSettings() {  //ANCHOR Hides language selector and changes to polish if needed
        document.getElementById("settings").className="hide";
        // document.getElementById("body").classList.remove("disable-scrolling");
        if (language=="pl") {                                                                           //Translates (almost) everything into polish
            document.getElementById("balance-amount").innerHTML="Aktualny bilans";
            document.getElementById("betlabel").innerHTML="Graj";
            // document.getElementById("show").innerHTML="Pokaż";
            document.getElementById("retry").innerHTML="Ponownie";
            document.getElementById("retry").style.fontSize="80%";
            document.getElementById("dealer-text").innerHTML="Przeciwnik";
            document.getElementById("player-text").innerHTML="Gracz";
            document.getElementById("textlose").innerHTML="Wygląda na to, że twój bilans wynosi 0, ale nie przejmuj się! Dodatkowe 500 właśnie zostało do niego dodane! Miłej gry!";
            document.getElementById("textlose2").innerHTML="(Kliknij by kontynuować)";
            // document.getElementById("PlayerName").value="Gracz"
        }
        // ChangeName();
    }
    // function ChangeName() {
    //     document.getElementById("change-name").className="settings";
    //     document.getElementById("NameSubmit").addEventListener("click",Change.bind(this));
    //     function Change() {
    //         document.getElementById("player-text").value=document.getElementById("PlayerName").value
    //         document.getElementById("change-name").className="hide";
    //     }
    // }
    function Match(card1,card2,val){        //ANCHOR Object Match constructor
        this.dealercard=card1,
        this.playercard=card2,
        this.value=val;
    };
    document.getElementById("button1").addEventListener("click",Bets.bind(this,1));                                         //Checks if buttons were clicked
    document.getElementById("button2").addEventListener("click",Bets.bind(this,2));
    document.getElementById("button3").addEventListener("click",Bets.bind(this,3));
    document.getElementById("button4").addEventListener("click",Bets.bind(this,4));
    document.getElementById("button5").addEventListener("click",ButtonPlay.bind(this));
    // document.getElementById("button6").addEventListener("click",ShowCards.bind(this));
    document.getElementById("button7").addEventListener("click",ButtonRetry.bind(this));
    document.getElementById("pl").addEventListener("click",function(){language="pl";HideSettings();});              //Sets language nad hides langauge set screen
    document.getElementById("en").addEventListener("click",function(){language="en";HideSettings();});
    var balance=document.getElementById("balance");
    var language;
    
    function MainGame(){                                       //ANCHOR Main game   /    Function that gets all important values                        
        var cards = GenerateCards(); //Generates two random numbers
        var value=GetsValue(cards[0],cards[1]); //defines who won or if it is tie
        Round = new Match(cards[0],cards[1],value)
    }
    var Round;                                                       //Set balance as pages load
    balance.value=500;
    var betbal=document.getElementById("bet");                   
});                                                                                                                     //Made by Robert Żółtowski