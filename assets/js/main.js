document.addEventListener("DOMContentLoaded", function() { 

// Class Constructor Container

	function Container() {
	  this.id = "";
	  this.className= "";
	  this.htmlCode = "";
	}


// Container render

	Container.prototype.render = function() {
	   return this.htmlCode;
	}


// Container removeItem

	Container.prototype.removeItem = function() {
	   return true;
	}

// Container renderSub

	Container.prototype.renderSub = function() {
	   return true;
	}


// Menu children Class Constructor Container

	function Menu(my_id, my_class, my_items){
	   Container.call(this);
	   this.id = my_id;
	   this.class = my_class;
	   this.items = my_items;
	}


// Insert link prototype Menu - Container

	Menu.prototype = Object.create(Container.prototype);
	Menu.prototype.constructor = Menu;


// Menu render

	Menu.prototype.render = function(){
		var result = "<ul class='"+ this.class +"' id='"+ this.id +"'>";

		for(var item in this.items ){
			if(this.items[item] instanceof MenuItem) {
				result += this.items[item].render(item);
			}
			else if (this.items[item] instanceof Menu) {
				result += this.items[item].renderSub();
			}
		}
		result += "</ul>";
		return result;
	}

	Menu.prototype.renderSub = function(){
		var result = '<li class="menu-item parent"><ul class="'+ this.class +'" id="'+ this.id +'">';

		for( var item in this.items ){
			if(this.items[item] instanceof MenuItem) {
				result += this.items[item].render(item);
			}
			else if (this.items[item] instanceof Menu) {
				result += this.items[item].renderSub();
			}
		}
		result += "</ul></li>";
		return result;
	}

// Menu removeItem

	Menu.prototype.removeItem = function(indexElement, obj) {
	   MenuItem.prototype.removeItem(indexElement, obj);
	}


// MenuItem children Class Constructor Container

	function MenuItem(my_href, my_name) {
	   Container.call(this);
	   this.className = "menu-item";
	   this.href = my_href;
	   this.itemName = my_name;
	}


// Insert link prototype MenuItem - Container

	MenuItem.prototype = Object.create(Container.prototype);
	MenuItem.prototype.constructor = MenuItem;


// MenuItem render

	MenuItem.prototype.render = function(item) {
		return '<li class="'+ this.className +'"><a href="'+ this.href +'">'+ this.itemName +'</a><span class="remove" id="'+ item +'">X</span></li>';
	}


// MenuItem remove

	MenuItem.prototype.removeItem = function(indexElement, obj) {

		for (key in obj) {

			if (obj[key] instanceof MenuItem  && key == indexElement) {
				delete obj[indexElement];
			}
			else if (obj[key] instanceof Menu) {

				for (keySub in obj[key].items) {
					if (keySub == indexElement) {
						delete obj[key].items[indexElement];
					}
				}
			}
		}
	}


// Variable Menu First

	var m_item1 = new MenuItem("#", "Главная");
	var m_item2 = new MenuItem("#", "Каталог");
	var m_item3 = new MenuItem("#", "Галерея");
	var m_item4 = new MenuItem("#", "О нас");
	var m_item5 = new MenuItem("#", "Контакты");


	var m_items = {
		0: m_item1,
		1: m_item2,
		2: m_item3,
		3: m_item4,
		4: m_item5
	};

	var menu = new Menu("my_sub_menu", "My_class", m_items);


// Variable Menu Second

	var m_items2 = {
		5: m_item1,
		6: m_item2,
		7: m_item3,
		8: m_item4,
		9: m_item5,
		10: menu
	};

	var menuWithSub = new Menu("my_menu2", "My_class2", m_items2);


// Events

	document.addEventListener('click',function(e) {

		if (e.toElement.className == 'remove') { 
			menu.removeItem(e.target.id, m_items2);
			//e.target.parentNode.remove();
			renderResult();
		}	
	});


// Render result

	var result1 = document.getElementById('result-1');
	var result2 = document.getElementById('result-2');

	function renderResult() {
		result1.innerHTML = menu.render();
		result2.innerHTML = menuWithSub.render();
	}

	renderResult();

});