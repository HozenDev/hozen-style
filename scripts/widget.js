window.addEventListener('load', function () {
    (function() {
	let images = document.getElementsByTagName('img');
	for (let image of images) {
	    image.addEventListener('click', (e) => {
		let widget = document.createElement('div');
		widget.classList.add("widget");
		let bigImg = document.createElement('img');
		bigImg.src = image.src;
		widget.appendChild(bigImg);
		document.body.insertBefore(widget,
					   document.body.firstChild);
		widget.addEventListener('click', () => {
		    widget.remove();
		});
	    });   
	}
    })();
});
