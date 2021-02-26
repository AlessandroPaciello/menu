"use strict";

var myPromise;
var divCategory = {
  list: []
};
var list;
var header;
var list_height;
var distance;

function preload() {
  list = select("#id_list");
  header = select("#id_header"); //crea e assegna il div header

  var header_element = createDiv("header")["class"]("header_element").id("id_header");
  header.child(header_element); //viene creata una promise per caricare il file json

  myPromise = new Promise(function (res, rej) {
    fetch("./menu.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      res(data.moresco.category);
    });
  });
}

;

function setup() {
  return regeneratorRuntime.async(function setup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          noCanvas(); //aspetta il caricemento del file json per creare i diversi elementi

          _context.next = 3;
          return regeneratorRuntime.awrap(myPromise.then(function (res) {
            for (i = 0; i < res.length; i++) {
              var n = i + 1;
              var div = createDiv(Object.keys(res[i])).id("id_list_element_" + n)["class"]("list_element");
              list.child(div);
              divCategory.list[i] = div;
            }

            ;
            set_element(divCategory.list);
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

;

function draw() {}

function windowResized() {
  set_element(divCategory.list);
}

function set_element(listElement) {
  list_height = windowHeight - header.elt.clientHeight;
  list.style("height", list_height + "px");
  list.style("width", windowWidth + "px");
  distance = list_height / listElement.length;
  listElement.forEach(function (el) {
    el.style("margin-top", distance / 2 + "px");
  });
}

;

function mouseClicked(event) {
  var padding = list_height * 75 / 100;
  divCategory.list.forEach(function (el) {
    if (event.target.id === el.elt.id) {
      el.addClass("open_list");
      el.removeClass("list_element");
      el.style("padding-top", padding / 2 + "px");
      el.style("padding-bottom", padding / 2 + "px");
    } else {
      el.hide();
    }

    ; // chiusura foreach
  });

  if (event.target.id === "id_header") {
    showElement();
  }
}

;

function showElement() {
  divCategory.list.forEach(function (el) {
    if (el.elt.className === "open_list") {
      el.removeClass("open_list");
      el.addClass("list_element");
      el.style("padding-top", 3 + "vh");
      el.style("padding-bottom", 3 + "vh");
    }

    ;
    el.show();
  });
}