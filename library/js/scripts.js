var fw = fw || {};
fw.events = fw.events || {};
fw.form = fw.form || {};
fw.animate = fw.animate || {};

$(function() {
    
    //HERO CAROUSEL SLIDE
	$('.c__hero--carousel__wrapper').slick({
		dots: true,
		prevArrow: $('.c__hero--carousel__pagination__item__left'),
		nextArrow: $('.c__hero--carousel__pagination__item__right')
	});

	//STANDARD CAROUSEL SLIDE
	$('.m__carousel__items').slick({
		dots: true,
		prevArrow: false,
		nextArrow: false
	});

	//FORM VALIDATION AND SUBMISSION
	if (document.getElementById('contactform')) {
		var form = document.getElementById('submitcontactform');
		fw.events.formValidateEvent(form);
	}
	
    //CONTENT ANIMATION
	fw.animate();
	window.addEventListener('scroll', fw.animate);
	
});

//Add global event listeners to the events object
fw.events = {
    formValidateEvent: function (el) {
        el.addEventListener('click', function(e) {
			e.preventDefault();
			if (fw.form.validateForm(form)) {
				console.log('Valid form');
			}
		});
    }
};

fw.form.validateForm = function (form) {
	
	$('.validate-error-l__row').remove();
	
	var valItems = $('[data-required="true"]'),
		formValid = true;
	
	function insertValidation(el, msg) {
		
		var er = document.createElement('span');
		er.className = "validate-error-l__row";
		er.innerHTML = msg;
		$(er.outerHTML).insertAfter(el);
		
	}
	
	for (var i = 0, valItem; !!(valItem = valItems[i++]);) {
		
		var node = valItem.nodeName,
			valid = true,
			msg;
		
		if (node === "INPUT") {
			
			if (valItem.getAttribute('type') != "email") {
				
				if (valItem.getAttribute('type') == "text") {
				
					valid = valItem.value.length < 1 ? false: valid;
					msg = "Please enter a value";
					
				} else if (valItem.getAttribute('type') == "file") {
					
					valid = valItem.value.length < 1 ? false: valid;
					msg = "Please select a file";
					
				} else if (valItem.getAttribute('type') == "checkbox") {
					
					valid = !valItem.checked ? false : valid;
					msg = "You must select this option";
					
				}
				
			} else {
				
				valid = valItem.value.length < 1 ? false: valid;
				msg = "Please enter a value";
				if (valid) {
					var emReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  					valid = !emReg.test(valItem.value) ? false : valid;
					msg = "Please enter a valid email";
				}
				
			}
			
		} else if (node === "SELECT") {
			
			valid = valItem.value === 0 ? false: valid;
			msg = "Please select from one of the options";
			
		} else if (node === "TEXTAREA") {
			
			valid = valItem.value.length < 1 ? false: valid;
			msg = "Please enter a value";
			
		}
		
		if (!valid) {
			insertValidation(valItem, msg);
			formValid = false;
		}
		
	}
	
	return formValid;
	
};

fw.animate = function () {
	var animationItem = document.querySelectorAll('[data-anim__scroll]'),
        doc = document.documentElement;
    for (var i = 0, item; !!(item = animationItem[i++]);) {
        var itemPosTop = item.getBoundingClientRect();
        if (itemPosTop.bottom > 100 && itemPosTop.top < (window.innerHeight || doc.clientHeight) - 50) {
            item.setAttribute('data-anim__animate', true);
        }
    }
};