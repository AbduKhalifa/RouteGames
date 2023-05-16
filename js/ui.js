
const classes = Array.from(document.querySelectorAll(".my-nav .nav-item a"));

classes.forEach((element)=>{
    element.addEventListener("click",async function(e){
        e.preventDefault();
        toggleActiveClass(e.target);
        sendRequest(e.target.dataset.category);
    })
})

function toggleActiveClass(element)
{
    classes.forEach((e)=>{
        e.classList.remove("active");
        element.classList.add("active");
    }) 
}

function loading()
{
    const overlayLoading = document.querySelector(".loading");

    overlayLoading.classList.toggle("d-none")
}


async function sendRequest(category = "mmorpg"){

    loading();
    const api = await fetch(`https:free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    {
        method:"GET",
        headers: {
            'X-RapidAPI-Key': 'cb416f0485msh2b0032a167f2719p1df42djsn2e23f9b24032',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
    }
    );

    const response = await api.json();

    displayGames(response);
    loading();
    setEventOnAllFree();

}
sendRequest();


function displayGames(arrayOfGames)
{
    const storeHouse = document.querySelector("#storehouse");
    storeHouse.innerHTML = "";
    for(let i = 0 ; i < arrayOfGames.length;i++)
    {
        storeHouse.innerHTML += `
        <div class="col-xxl-3 col-lg-4 col-sm-6 package px-3 pb-3 mb-3">
        <div class="card" style="width: 18rem;">
            <img src="${arrayOfGames[i].thumbnail}" class="card-img-top" alt="...">
            <div class="card-body p-0 p-3 d-flex flex-wrap">
                <div class="d-flex justify-content-between align-items-center mb-2 w-100">
                    <h5 class="card-title name-of-game">${arrayOfGames[i].title}</h5>
                    <button class="free" data-id-value="${arrayOfGames[i].id}">Free</button>
                </div>
                <p class="card-text desc-of-game pb-2 text-center">
                ${arrayOfGames[i].short_description}
                    </p>
            </div>
            <div
                    class="card-footer px-2 d-flex justify-content-between align-items-center py-2 px-0">
                    <span>${arrayOfGames[i].genre}</span>
                    <span>${arrayOfGames[i].platform}</span>
                </div>
            </div>
        </div>
        `;
    }

}




function setEventOnAllFree()
{
    let freeBtn = document.querySelectorAll(".free");

    freeBtn.forEach((e)=>{
        e.addEventListener("click",function(){
            aboutDetails(e.dataset.idValue);
        })
    })

}
setEventOnAllFree();



async function aboutDetails(id = "65"){

    const elements = [
        document.querySelector(".photos-bg"),
        document.querySelector(".my-nav"),
        document.querySelector(".show-games"),
    ]
    const details = document.querySelector(".details");

    loading();
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    {
        method:"GET",
        headers: {
            'X-RapidAPI-Key': 'cb416f0485msh2b0032a167f2719p1df42djsn2e23f9b24032',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
    }
    )
    const response = await api.json();

    details.innerHTML =`
    <div class="container-fluid">
    <div class="container py-5">
        <h2 class="mb-4">Details Game</h2>
        <div class="row">
        <div id="exit-details">
        <i class="fa-solid fa-xmark"></i>
        </div>
            <div class="col-sm-3 p-2">
                <img src="${response.thumbnail}" alt="" class="mx-auto">
            </div>
            <div class="col-sm-9">
                <h1 class="mb-2">Title: <span>${response.title}</span></h1>
                <h3 class="mb-2">Category: <span>${response.genre}</span></h3>
                <h3 class="mb-2">platform: <span>${response.platform}</span></h3>
                <h3 class="mb-4">status: <span>${response.status}</span></h3>
                <p>
                    ${response.description}
                </p>
            </div>
        </div>
    </div>
</div>
    `;
    elements.forEach((e)=>{e.classList.toggle("d-none")});
    details.classList.toggle("d-none");

    document.querySelector("#exit-details").addEventListener("click",function(){
        aboutDetails();
    })
    loading();
}

