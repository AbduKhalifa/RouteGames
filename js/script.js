
// Slider Part 


// slider's images
let photos = 
[
    "./imgs/gaming1.jpg",
    "./imgs/gaming2.jpg",
    "./imgs/gaming3.jpg",
    "./imgs/gaming4.jpg",
    "./imgs/gaming5.jpg",
    "./imgs/gaming6.jpg",
    "./imgs/gaming7.jpg",
    "./imgs/gaming8.jpg",
    "./imgs/gaming9.png",
    "./imgs/gaming10.jpg",
];

// this varibale is the number of the displayed image
let activePhoto = Math.floor(Math.random() * photos.length - 1);
(activePhoto === -1)? activePhoto = 0 : activePhoto = activePhoto ;


// if this value equal anything other than 0 , Button Next photo will not work
let canIClick = 0;

// this function we will use it one time when open the website
function useOneTimeAtStart()
{
    const classShowing = document.querySelector(".photos-bg .showing")
    const img1 = classShowing.children[0].children[0];
    const img2 = classShowing.children[1].children[0];
    const img3 = classShowing.children[2].children[0];


    if(activePhoto === 0)
    {
        img1.src = photos[photos.length - 1];
        img2.src = photos[activePhoto];
        img3.src = photos[activePhoto + 1];        
    }
    else if(activePhoto === photos.length - 1)
    {
        img1.src = photos[ activePhoto - 1];
        img2.src = photos[activePhoto];
        img3.src = photos[0];    
    }
    else{
        img1.src = photos[ activePhoto - 1];
        img2.src = photos[activePhoto];
        img3.src = photos[activePhoto + 1];   
    }
    
}
useOneTimeAtStart();





//this function create photos to slider and add them then handle loops
function createNextPhoto(dir = "left") {
    const showing = document.querySelector(".photos-bg .showing");
    const childsOfShowing = Array.from(showing.children);

    if(dir === "right")
    {
        if(activePhoto === 0)
        {
            childsOfShowing[0].innerHTML += `<img src="${photos[activePhoto]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[1]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[2]}" alt="" class="next-photo ${dir}">`
        }
        else if(activePhoto === photos.length - 1)
        {
            childsOfShowing[0].innerHTML += `<img src="${photos[activePhoto]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[0]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[1]}" alt="" class="next-photo ${dir}">`
        }
        else if(activePhoto === photos.length - 2)
        {
            childsOfShowing[0].innerHTML += `<img src="${photos[photos.length - 2]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[photos.length - 1]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[0]}" alt="" class="next-photo ${dir}">`
        }
        else{
            childsOfShowing[0].innerHTML += `<img src="${photos[activePhoto]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[activePhoto + 1]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[activePhoto +2 ]}" alt="" class="next-photo ${dir}">`
        }
    }
    else if(dir = "left")
    {
        if(activePhoto === 0)
        {
            childsOfShowing[0].innerHTML += `<img src="${photos[photos.length - 2]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[photos.length - 1]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[0]}" alt="" class="next-photo ${dir}">`
        }
        else if(activePhoto === 1)
        {
            childsOfShowing[0].innerHTML += `<img src="${photos[photos.length - 1]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[0]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[activePhoto]}" alt="" class="next-photo ${dir}">`
        }
        else if(activePhoto === photos.length - 1)
        {
            childsOfShowing[0].innerHTML += `<img src="${photos[photos.length - 3]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[photos.length - 2]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[photos.length - 1]}" alt="" class="next-photo ${dir}">`
        }
        else{
            childsOfShowing[0].innerHTML += `<img src="${photos[activePhoto - 2]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[1].innerHTML += `<img src="${photos[activePhoto - 1]}" alt="" class="next-photo ${dir}">`
            childsOfShowing[2].innerHTML += `<img src="${photos[activePhoto]}" alt="" class="next-photo ${dir}">`
        }
    }

}


function toggleClassesNextImg(dir){
    createNextPhoto(dir);
    const oldPhoto = Array.from(document.querySelectorAll(".photos-bg .main"));
    const nextPhoto = Array.from(document.querySelectorAll(".photos-bg .next-photo"));

    setTimeout(()=>{
        nextPhoto.forEach((element)=>{
            element.classList.toggle("active");
        });
    },0)
    setTimeout(()=>{
        oldPhoto.forEach((element)=>{
            element.src = element.nextElementSibling.src
        })
        nextPhoto.forEach((e)=>{
            e.remove();
        })
        canIClick = 0;
    },1500)

}




// right  left  btns -- first slider 
const leftBtn = document.querySelector(".photos-bg .left-btn");
const rightBtn = document.querySelector(".photos-bg .right-btn");

leftBtn.addEventListener("click",function(){ 
    if(canIClick != 0)
        return
    canIClick = 1 ;
    toggleClassesNextImg("left");
    activePhoto--;
    if(activePhoto <= 0 )
        activePhoto = photos.length - 1;
});
rightBtn.addEventListener("click",function(){
    if(canIClick != 0)
    return
    canIClick = 1 ;
    toggleClassesNextImg("right");
    activePhoto++;
    if(activePhoto >= photos.length - 1)
    activePhoto = 0 ;
});




//Navbar dropdown
const navbarBtn = document.querySelector(".my-nav .navbar-toggler");

navbarBtn.addEventListener("click",function(){
    navbarBtn.children[0].classList.toggle("active");
})


//Navbar scroll
const myNavbarPoint = document.querySelector(".my-nav").offsetTop;
function windowScroll(valueOfScroll,thePoint)
{
    if(valueOfScroll > thePoint)
        document.querySelector(".my-nav").classList.add("active");
    else
        document.querySelector(".my-nav").classList.remove("active");
}

window.addEventListener("scroll",()=>{
    windowScroll(window.pageYOffset , myNavbarPoint);

})












 ///  ===> غير مكتمل 

// function setTouchSlider()
// {
//     const elements = Array.from(document.querySelectorAll(".main"));
//     let available = "No";

//     let pointStart = 0;
//     //let displacement;
//     let pointEnd = 0;

//     elements.forEach((element)=>{
//         element.addEventListener("mousedown",(evClick)=>{

//             available = "Yes";
//             pointStart = evClick.offsetX;

//             element.addEventListener("mousemove",function(evMove){
//                 if(available === "No")
//                     return;

//                 if(evMove.offsetX > pointStart + 80)
//                 {
//                     evMove.preventDefault();
//                     console.log("ToRight");
//                 }

//             })
//             element.addEventListener("mouseup",function(evMouseUp){
//                 available = "No";
//             })
            
//             evClick.preventDefault();
            
//         })
//     })
// }
// setTouchSlider();

// function touch(arrayOfElements){

// }