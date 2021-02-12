let myPromise;
let category;
let divCategory = [];
let list;
let header;
let status = false;


function preload() {
    list = select(".list");
    
    header = select(".header");

    //crea e assegna il div header
    let header_element = createDiv("header").class("header_element");
    header.child(header_element);

    //viene creata una promise per caricare il file json
    myPromise = new Promise((res, rej) => {
        fetch("./menu.json").then(response => {
            return response.json();
        }).then(data => {
            res(category = data.moresco.category);
        })
    })
};

async function setup() {
    noCanvas();

    //aspetta il caricemento del file json per creare i diversi elementi
    await myPromise.then(() => {
        category.forEach((el, i) => {
            let n_el = i + 1;
            let div = createDiv(Object.keys(el)).id("id_list_element_" + n_el).class("list_element");
            list.child(div);
            divCategory.push(div);
            status = true;
        });
        
    });
    
};

function draw() {
    if(status) {
        set_element(divCategory);
    }
};


function set_element(listElement) {
    let element = document.getElementById("id_list_element_1").clientHeight;
    let height_list = document.getElementById("id_list");
    let distance;
    let width_list = (windowWidth * 80) / 100;
    list.style("height", windowHeight - document.getElementById("id_header").clientHeight + "px");

    distance = (height_list.clientHeight / listElement.length) - element;

    
    for (i = 0; i < listElement.length; i++) {
        listElement[i].style("padding-left", width_list / 2 + "px");
        listElement[i].style("padding-right", width_list / 2 + "px");
        listElement[i].style("margin-top", distance / 2 + "px");
        listElement[i].style("margin-bottom", distance / 2 + "px");
    };
    
};


function mousePressed(event) {
    divCategory.forEach(el => {
        if(event.target.id === el.elt.id){
            el.toggleClass("list_element");
            el.toggleClass("open_list");
        }

    });

}







