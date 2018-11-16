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
			renderResult(); //e.target.parentNode.remove();
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









/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
* @throws {HamburgerException}  При неправильном использовании
*/
	function Hamburger(size, stuffing) {
		this.size = size;
		this.stuffing = [];
		this.topping = [];
		this.totalPriceTopping = 0;
		this.totalPriceStuffing = 0;
		this.totalCalrTopping = 0;
		this.totalCalrStuffing = 0;
		this.countTopping = 0;
		this.countStuffing = 0;
	} 


/* Размеры, виды начинок и добавок */
	Hamburger.SIZE_SMALL = {
		'price' : 50,
		'calr' : 20
	};
	Hamburger.SIZE_LARGE = {
		'price' : 100,
		'calr' : 40
	};
	Hamburger.STUFFING_CHEESE = {
		'price' : 10,
		'calr' : 20
	};
	Hamburger.STUFFING_SALAD = {
		'price' : 20,
		'calr' : 5
	};
	Hamburger.STUFFING_POTATO = {
		'price' : 15,
		'calr' : 10
	};
	Hamburger.TOPPING_MAYO = {
		'price' : 15,
		'calr' : 0
	};
	Hamburger.TOPPING_SPICE = {
		'price' : 20,
		'calr' : 5
	};
	


	var hamburg = new Hamburger();


/**
* Вывод результатов гамбургера
* 
* @param arguments     Параметры гамбургера
* @throws {HamburgerException}  При неправильном использовании
*/
	
	Hamburger.prototype.render = function ()  {
		var self_price = (this.size) ? this.size.price : 0;
		var self_calr = (this.size) ? this.size.calr : 0;
		var totalPrice = self_price + this.totalPriceStuffing + this.totalPriceTopping;
		var totalCalr = self_calr + this.totalCalrStuffing + this.totalCalrTopping;
		var renderDiv = '<div id="render-result">';
		renderDiv += '<div class="burger-price">Стоимость вашего бургера: <span>'+ self_price +' руб.</span> В нем  <span>'+ self_calr +' ккаллорий </span></div>';
		renderDiv += '<div class="burger-price">Добавлено добавок: <span>'+ this.countStuffing +' шт.</span> Стоимость добавок <span>'+ this.totalPriceStuffing +'руб.</span> Энергетическая ценность <span>'+ this.totalCalrStuffing +' ккаллорий</span></div>';
		renderDiv += '<div class="burger-price">Добавлено приправок: <span>'+ this.countTopping +' шт.</span> Стоимость приправок <span>'+ this.totalPriceTopping +'руб.</span> Энергетическая ценность <span>'+ this.totalCalrTopping +' ккаллорий</span></div>';
		renderDiv += '<div class="burger-price burger-price-total">Итого на сумму: <span>'+ totalPrice +' руб.</span> Энергетическая ценность вашего заказа <span>'+ totalCalr +' ккаллорий</span></div>'; 
		renderDiv += '</div>';

		return renderDiv;
		
	}
/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* 
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании
*/


Hamburger.prototype.addTopping = function (topping, e)  {
		var toppingBtn = document.getElementById(e);

		if (this.topping.indexOf(topping) == -1 ) {
			this.topping.push(topping);
			toppingBtn.classList.add("active");
			

		}
		else {
			this.removeTopping(topping);
			toppingBtn.classList.remove("active");

		}
}
/**
* Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * 
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping)  {

	this.topping.splice(this.topping.indexOf(topping), 1);
}
/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function ()  {

	return this.topping;
}
/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function ()  {

	return this.size;
}
/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* 
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании
*/


Hamburger.prototype.addSize = function (sizeItem, e)  {
		var sizeBtn = document.getElementById(e);
		var parentBtn = sizeBtn.parentNode.getElementsByTagName('button');
		for (var i = 0; i <= parentBtn.length - 1; i++) {
			parentBtn[i].classList.remove("active");
		}
		sizeBtn.classList.add("active");
		this.size = sizeItem;
		HamburgerException('');
		
}
/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* 
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании
*/


Hamburger.prototype.addStuffing = function (stuffing, e)  {
		var stuffingBtn = document.getElementById(e);

		if (this.stuffing.indexOf(stuffing) == -1 ) {
			this.stuffing.push(stuffing);
			stuffingBtn.classList.add("active");
		}
		else {
			this.removeStuffing(stuffing);
			stuffingBtn.classList.remove("active");
		}
}
/**
* Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * 
 * @param stuffing   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeStuffing = function (stuffing)  {

	this.stuffing.splice(this.stuffing.indexOf(stuffing), 1);
}
/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function ()  {

	return this.stuffing;
}
/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */

Hamburger.prototype.calculatePrice = function () {

	var totalPriceSize = this.size;

	if (totalPriceSize === undefined) {
		HamburgerException('Выберите размер бургера');
	}
	else {
		totalPriceSize = this.size.price;

		var totalTopping = this.getToppings();
		this.totalPriceTopping = 0;

		for (var i = 0; i < totalTopping.length; i++) {
	        this.totalPriceTopping += totalTopping[i].price;
	        this.countTopping = totalTopping.length;
	    }
	    if (totalTopping.length == 0) {
	    	this.countTopping = 0;
	    }

		var totalStuffing = this.getStuffing();
		this.totalPriceStuffing = 0;

		for (var i = 0; i < totalStuffing.length; i++) {
	        this.totalPriceStuffing += totalStuffing[i].price;
	        this.countStuffing = totalStuffing.length;
	    }
	    if (totalStuffing.length == 0) {
	    	this.countStuffing = 0;
	    }

	    return totalPriceSize + this.totalPriceTopping + this.totalPriceStuffing;
	}



	
}
/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
	var totalCalrSize = this.size;
	if (totalCalrSize !== undefined) {
		totalCalrSize = this.size.calr;
		var totalCalrSize = this.size.calr;

		var totalTopping = this.getToppings();
		this.totalCalrTopping = 0;

		for (var i = 0; i < totalTopping.length; i++) {
	        this.totalCalrTopping += totalTopping[i].calr;
	    }

		var totalStuffing = this.getStuffing();
		this.totalCalrStuffing = 0;

		for (var i = 0; i < totalStuffing.length; i++) {
	        this.totalCalrStuffing += totalStuffing[i].calr;
	    }

	    return totalCalrSize + this.totalCalrTopping + this.totalCalrStuffing;
	}

}
/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */
	function HamburgerException (message) { 
		var error = document.getElementById('error_block');
		error.innerHTML = message;
	}


// Events

	document.addEventListener('click',function(e) {

		if (e.target.parentNode.id == 'size') {

			switch(e.target.id) {
			  case 'small': 
			  	hamburg.addSize(Hamburger.SIZE_SMALL, e.target.id);
			    break;

			  case 'big':
			  	hamburg.addSize(Hamburger.SIZE_LARGE, e.target.id);
			    break;

			  default:
			  	hamburg.addSize(Hamburger.SIZE_SMALL, e.target.id);
			}

		}
		else if (e.target.parentNode.id == 'stuffing') {

			switch(e.target.id) {
			  case 'cheese': 
			    hamburg.addStuffing(Hamburger.STUFFING_CHEESE, e.target.id);
			    break;

			  case 'salad':
			    hamburg.addStuffing(Hamburger.STUFFING_SALAD, e.target.id);
			    break;

			  case 'potato':
			    hamburg.addStuffing(Hamburger.STUFFING_POTATO, e.target.id);
			    break;

			  default:
			    hamburg.stuffing = '';
			}

		}
		else if (e.target.parentNode.id == 'topping') {

			switch(e.target.id) {
			  case 'spice': 
			    hamburg.addTopping(Hamburger.TOPPING_SPICE, e.target.id);
			    break;

			  case 'maoy':
			  	hamburg.addTopping(Hamburger.TOPPING_MAYO, e.target.id);
			    break;

			  default:
			    hamburg.addTopping();
			}

		}

		hamburg.calculatePrice();	
		hamburg.calculateCalories();	
		renderResultHamburger();
	});



// Render result

	var result3 = document.getElementById('result-3');

	function renderResultHamburger() {
		result3.innerHTML = hamburg.render();
	}


































});