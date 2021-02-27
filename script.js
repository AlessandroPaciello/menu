let myPromise;
let divCategory = {
    list : [],
};
let list;
let header;
let list_height;
let distance;


function preload() {
    list= select("#id_list");
    header = select("#id_header");

    //crea e assegna il div header
    let header_element = createDiv("header").class("header_element").id("id_header");
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
            let div = createDiv(Object.keys(res[i])).id("id_list_element_" + n).class("list_element").addClass("show");
            list.child(div);
            divCategory.list[i] = div;
        };
        set_element(divCategory.list);

        header.mouseClicked(showElement)

        divCategory.list.forEach(el => {
            el.mouseClicked(openElement)
        })    
    });
    
};



function windowResized() {voce
    set_element(divCategory.list);
}


function set_element(listElement) {
    list_height = windowHeight - header.elt.clientHeight;

    list.style("height", list_height + "px");
    list.style("width", windowWidth + "px");
    distance = (list_height / listElement.length);


    listElement.forEach(el => {
        el.style("margin-top", distance / 2 + "px");
    });
    
};


function openElement(event) {
    let padding = (list_height * 75) / 100;

    
        divCategory.list.forEach(el => {
            if(event.target.id === el.elt.id){
                el.addClass("open_list");
                el.removeClass("list_element");
                el.style("padding-top", padding / 2 + "px")
                el.style("padding-bottom", padding / 2 + "px");
            }
            else if(divCategory.list.includes(el)){
                el.removeClass("show");
                el.addClass("hide");
                el.style("transition", "opacity " + 2 + "s")
                setTimeout(() => {el.hide()}, 2000)
            }
            // chiusura foreach
        });
}

function showElement() {
    divCategory.list.forEach(el => {
        if(el.hasClass("open_list")) {
            el.removeClass("open_list");
            el.addClass("list_element");

            el.style("padding-top", 3 + "vh")
            el.style("padding-bottom", 3 + "vh");
        }
        else{
            el.removeClass("hide");
            el.addClass("show");
        }
        
    })
}










