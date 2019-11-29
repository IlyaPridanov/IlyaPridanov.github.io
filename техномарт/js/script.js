var link_write = document.querySelector(".contacts-button");

var link_purchase = document.querySelectorAll(".purchase");
		
var popup_write = document.querySelector(".write-popap");

var form = popup_write.querySelector("form");

var name_write = popup_write.querySelector("[name=username]");

var mail_write = popup_write.querySelector("[name=mail]");

var textmail_write = popup_write.querySelector("[name=textmail]");

var link_map = document.querySelector(".min-cart");

var popup_map = document.querySelector(".big-map");
//33
var popup_purchase = document.querySelector(".added-to-cart");

var close_write = popup_write.querySelector(".write-popap-exit");

var close_map = popup_map.querySelector(".big-map-close");

var isStorageSupport = true;

var storage = "";

try {
	storage = localStorage.getItem("name");
} catch (err) {
	isStorageSupport = false;
}

var close_purchase = popup_purchase.querySelector(".added-to-cart-close");
	
link_write.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup_write.classList.add("popap-on");
	if (storage) {
		name_write.value = storage;
		mail_write.focus();
	} else {
		name_write.focus();
		//mail_write.value = storage;
	}
	name_write.focus();
});
	
link_map.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup_map.classList.add("popap-on");
});

for (var i = 0; i < link_purchase.length; i++) {
	link_purchase[i].addEventListener("click", function (evt) {
		evt.preventDefault();
		popup_purchase.classList.add("popap-on");
	});
};
close_write.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup_write.classList.remove("popap-on");
});
  
close_map.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup_map.classList.remove("popap-on");
});
	
form.addEventListener("submit", function (evt) {
	evt.preventDefault();
	if (!name_write.value || !mail_write.value || !textmail_write.value) {
		evt.preventDefault();
		console.log("Нужно ввести логин и пароль");
	} else {
		if (isStorageSupport) { 
			localStorage.setItem("name", name_write.value);
			localStorage.setItem("mail", mail_write.value); 
		}
	}
});
 
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (popup_write.classList.contains("popup-on")) {
		popup_write.classList.remove("popup-on");
		}
	}
});

close_purchase.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup_purchase.classList.remove("popap-on");
});