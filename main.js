const experience=document.getElementById('experience');
const education=document.getElementById('education');
const section3=document.getElementById('section3');
const section4=document.getElementById('section4');

let animations=['slideleft','slideup','slideup','slideright'];

window.onload=()=>{
    checkMediaQuery();
    showExperience();
}

let mediaquery1=window.matchMedia('(min-width: 721px) and (max-width: 1200px)');
let mediaquery2=window.matchMedia('(max-width: 720px)');
let mediaquery3=window.matchMedia('(min-width: 1201px)');

mediaquery1.addEventListener('change',query1());
mediaquery2.addEventListener('change',query2());
mediaquery3.addEventListener('change',query3());

function checkMediaQuery(){
    if (mediaquery1.matches){
        query1();
    }
    else if (mediaquery2.matches){
        query2();
    }
    else if (mediaquery3.matches){
        query3();
    }
}
function query1(){
    animations=['slideleft','slideright','slideleft','slideright'];
}
function query2(){
    animations=['slideup','slideup','slideup','slideup'];
}
function query3(){
    animations=['slideleft','slideup','slideup','slideright'];
}
function showExperience(){
    experience.classList.remove('none');
    experience.classList.add('experience');
    experience.classList.add(animations[0]);
    setTimeout(showEducation,2000);
}
function showEducation(){
    education.classList.remove('none');
    education.classList.add('education');
    education.classList.add(animations[1]);
    setTimeout(showSection3,2000);
}
function showSection3(){
    section3.classList.remove('none');
    section3.classList.add('section3');
    section3.classList.add(animations[2]);
    setTimeout(showSection4,2000);
}
function showSection4(){
    section4.classList.remove('none');
    section4.classList.add('section4');
    section4.classList.add(animations[3]);
}