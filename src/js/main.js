const hotspots = document.querySelectorAll('.btn');
const list = document.querySelector('.data-container');
let resultTitle = document.querySelector('.result-title');

// EventListener
const menu = document.querySelector('select');
menu.addEventListener('change', getInfo);

// Loop for button
for (let i = 0; i < hotspots.length; i++){
    hotspots[i].addEventListener('click', getInfo);
};


// Access data function
function getInfo(e) {
    //AJAX
    let info = [];
    let xhr = new XMLHttpRequest();
    const url = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
    xhr.open('get', url, true);
    xhr.send();
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        info = data.result.records;
         //access data
        const selectedItem = e.target.value;
        resultTitle.textContent = selectedItem;   
        let card = [];
        for (i = 0; i < info.length; i++){
            if (selectedItem == info[i].Zone) {
                card.push({
                    address: info[i].Add,
                    name: info[i].Name,
                    opentime: info[i].Opentime,
                    tel: info[i].Tel,
                    pic: info[i].Picture1,
                    zone: info[i].Zone,
                    tag: info[i].Ticketinfo
                });            
            };
        };
        let output = '';
        for (i = 0; i < card.length; i++) {
            output += 
            `
            <div class="data">
                <div class="img-container" style="background-image:url(${card[i].pic});">
                    <span class="spotName">${card[i].name}</span>  
                    <span class="regionName">${card[i].zone}</span>         
                </div>
                
                <div class="text-container">
                    <div class="text-info">
                        <img src="src/img/icons_clock.png">
                        <p class="hours">${card[i].opentime}</p>
                    </div>
                    <div class="text-info">
                        <img src="src/img/icons_pin.png" alt="icon">
                        <p class="address" >${card[i].address}</p>
                    </div>
                    <div class="text-info">
                        <img src="src/img/icons_phone.png" alt="icon">
                        <p class="tel" >${card[i].tel}</p>
                    </div>
                    <div class="tag-info">
                        <img src="src/img/icons_tag.png" alt="icon">
                        <p class="tag">${card[i].tag}</p>
                    </div>   
                </div>
            </div>`
        };
        list.innerHTML = output;
    };    
};




