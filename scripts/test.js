window.onload = function () {
    
    const content = document.getElementById("content");
    const toc = document.getElementById("table-of-contents");
    let header = document.createElement("header");
    let main = document.createElement("main");

    tocAndContentToMain();
    createHeader();
    // tocTopResize();
    // tocFollowContent();
    
    // window.addEventListener('resize', tocFollowContent, true);

    // window.addEventListener('click', (e) => {
    // 	console.log(e);
    // });

    // let buttonTheme = document.createElement("button");
    // buttonTheme.addEventListener('click', toogleTheme);
    // toc.appendChild(buttonTheme);
    
    let themeCheck = document.createElement("input");
    themeCheck.id = "theme-switcher";
    themeCheck.type = "button";
    themeCheck.value = "Theme Switcher";
    toc.appendChild(themeCheck);
    
    themeCheck.addEventListener('click', toogleTheme);
    
    function createHeader() {
	header.appendChild(document.getElementsByClassName("title")[0]);
	document.body.insertBefore(header, main);
    }
    
    function tocAndContentToMain() {
	document.body.insertBefore(main, document.getElementById("postamble"));
	main.appendChild(toc);
	main.appendChild(content);
    }

    function tocFollowContent() {
	let marginLeftOfContent = getComputedStyle(content, null).marginLeft;
	marginLeftOfContent = parseInt(marginLeftOfContent, 10);

	let widthToc = getComputedStyle(toc, null).width;
	widthToc = parseInt(widthToc, 10);
	
	if (marginLeftOfContent > widthToc) {
	    content.style.margin = "0 auto";
	    toc.style.left = `${marginLeftOfContent - widthToc + 2}px`;
	}
    }

    function tocTopResize() {
	let heightTitle = getComputedStyle(document.getElementsByClassName("title")[0], null).height;
	toc.style.marginTop = heightTitle;
    }

    /* Theme Functions */
    
    function setTheme(themeName) {
	localStorage.setItem('theme', themeName);
	document.documentElement.className = themeName;
    }

    function toogleTheme() {
	if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-light');
	else setTheme('theme-dark');
    }

    (function() {
	if (localStorage.getItem('theme') === null) setTheme('theme-light');
	else if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-dark');
	else setTheme('theme-light');
    })();

    (function() {
	let images = document.getElementsByTagName('img');

	// console.log(images);

	for (let image of images) {
	    // console.log(image);
	    image.addEventListener('click', (e) => {
		let widget = document.createElement('div');
		widget.classList.add("widget");
		let bigImg = document.createElement('img');
		bigImg.src = image.src;
		widget.appendChild(bigImg);
		document.body.appendChild(widget);

		widget.addEventListener('click', () => {
		    widget.remove();
		});
	    });   
	}
    })();

    /* Media Query Toc */
    
    toc.getElementsByTagName('h2')[0].addEventListener('click', (e) => {
	if (!window.matchMedia("(min-width: 840px)").matches) {
	    let textOfToc = document.getElementById('text-table-of-contents');
	    if (getComputedStyle(textOfToc, null).visibility === 'hidden') {
		textOfToc.style.visibility = "visible";
		let rect = toc.getBoundingClientRect();
		textOfToc.style.top = `${parseInt(rect.y, 10)+parseInt(rect.height, 10)}px`;
		// console.log(`${parseInt(rect.y, 10)}px`);
		// console.log(`${parseInt(rect.top, 10)}px`);
		// console.log(`${parseInt(rect.height, 10)}px`);
	    }
	    else {
		textOfToc.style.visibility = "hidden";
	    }
	}
    });

    window.addEventListener('scroll', (e) => {
	if (!window.matchMedia("(min-width: 840px)").matches) {
	    let textOfToc = document.getElementById('text-table-of-contents');
	    if (getComputedStyle(textOfToc, null).visibility === 'visible') {
		let rect = toc.getBoundingClientRect();
		textOfToc.style.top = `${parseInt(rect.y, 10)+parseInt(rect.height, 10)}px`;
	    }
	}
    });

    window.addEventListener('resize', (e) => {
	let textOfToc = document.getElementById('text-table-of-contents');
	if (window.matchMedia("(min-width: 840px)").matches) {
	    if (getComputedStyle(textOfToc, null).visibility === 'hidden') {
		textOfToc.style.visibility = "visible";
	    }
	}
	else {
	    if (getComputedStyle(textOfToc, null).visibility === 'visible') {
		textOfToc.style.visibility = "hidden";
	    }
	}
    });

    function themeSwitcher500() {
	let themeSwitcher = document.getElementById('theme-switcher');
	if (!window.matchMedia("(min-width: 500px)").matches) {
	    themeSwitcher.value = "TS";
	}
	else themeSwitcher.value = "Theme Switcher";
    }

    themeSwitcher500();
    window.addEventListener('resize', themeSwitcher500);
}
