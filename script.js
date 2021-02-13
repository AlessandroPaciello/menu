let myPromise;
let divCategory = {
    list : [],
    height: 50,
};
let list;
let header;
let status = false;
let list_height;
let distance;


function preload() {
    list= select("#id_list");
    header = select("#id_header");

    //crea e assegna il div header
    let header_element = createDiv("header").class("header_element");
    header.child(header_element);

    //viene creata una promise per caricare il file json
    myPromise = new Promise((res, rej) => {
        fetch("./menu.json").then(response => {
            return response.json();
        }).then(data => {
            res(data.moresco.category);
        })
    })
};

async function setup() {
    noCanvas();

    //aspetta il caricemento del file json per creare i diversi elementi
    await myPromise.then((res) => {
        for (i = 0; i < res.length; i++) {
            let n = i + 1;
            let div = createDiv(Object.keys(res[i])).id("id_list_element_" + n).class("list_element");
            list.child(div);
            divCategory.list[i] = div;
        };
        status = true;
    });
    
};

function draw() {
    if(status) {
        set_element(divCategory.list);
    }
}

function windowResized() {
}


function set_element(listElement) {

    list_height = windowHeight - header.elt.clientHeight;
    distance = (list_height / listElement.length) - divCategory.height;


    listElement.forEach(el => {
        if(el.hasClass("list_element")) {
            el.style("padding-top", 3 + "vh");
            el.style("padding-bottom", 3 + "vh");
        }else{
            el.style("padding-top", 60 + "vh");
        }
        el.style("margin-top", distance / 2 + "px");
        el.style("margin-bottom", distance / 2 + "px");
    });
    
};


function mouseClicked(event) {
    divCategory.list.forEach(el => {
        if(event.target.id === el.elt.id){
            el.toggleClass("list_element");
            el.toggleClass("open_list");
        }
    });
};







