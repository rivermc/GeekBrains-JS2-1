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
	   return this.htmlCode;
	}


// Menu children Class Constructor Container

	function Menu(my_id, my_class, my_items){
	   Container.call(this);
	   this.id = my_id;
	   this.className = my_class;
	   this.items = my_items;
	}


// insert link prototype Menu - Container

	Menu.prototype = Object.create(Container.prototype);
	Menu.prototype.constructor = Menu;


// Menu render

	Menu.prototype.render = function(){
		var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
		for(var item in this.items){
			if(this.items[item] instanceof MenuItem) {
				result += this.items[item].render();
			}
		}
		result += "</ul>";
		return result;
	}


// Menu removeItem

	Menu.prototype.removeItem = function(e) {
	   MenuItem.prototype.removeItem(e);
	}


// MenuItem children Class Constructor Container

	function MenuItem(my_href, my_name, item_count) {
	   Container.call(this);
	   this.className = "menu-item";
	   this.href = my_href;
	   this.itemName = my_name;
	   this.itemCount = item_count;
	}


// insert link prototype MenuItem - Container

	MenuItem.prototype = Object.create(Container.prototype);
	MenuItem.prototype.constructor = MenuItem;


// MenuItem render

	MenuItem.prototype.render = function() {
		return '<li class="'+ this.className +'"><a href="'+ this.href +'">'+ this.itemName +'</a><span class="remove" id="'+ this.itemCount +'">X</span></li>';
	}


// MenuItem remove

	MenuItem.prototype.removeItem = function(e) {
		var elementRemove = e.target.id; 
		delete m_items[elementRemove];
		renderResult();
	}


// Variable Menu Item

	var m_item1 = new MenuItem("#", "Главная", 0);
	var m_item2 = new MenuItem("#", "Каталог", 1);
	var m_item3 = new MenuItem("#", "Галерея", 2);
	var m_item4 = new MenuItem("#", "О нас", 3);
	var m_item5 = new MenuItem("#", "Контакты", 4);

	var m_items = {
		0: m_item1,
		1: m_item2,
		2: m_item3,
		3: m_item4,
		4: m_item5
	};

	var menu = new Menu("my_menu", "My_class", m_items);


// Events

	document.addEventListener('click',function(e) {

		if (e.toElement.className == 'remove') { 
			menu.removeItem(e);
		}	
	});


// Render result

	var result = document.getElementById('result');

	function renderResult() {
		result.innerHTML = menu.render();
	}

	renderResult();

});