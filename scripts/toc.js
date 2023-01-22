window.addEventListener('load', function () {

    const content = document.getElementById("content");
    const toc = document.getElementById("table-of-contents");
    let header = document.createElement("header");
    let main = document.createElement("main");

    tocAndContentToMain();
    createHeader();

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

    /* Media Query Toc */

    let firstTocTitles = document.querySelectorAll('#text-table-of-contents > ul > li > a');
    
    for (let i = 0; i < firstTocTitles.length ; i++) {
	firstTocTitles[i].addEventListener('click', (e) => {
	    let secondTocTitles = firstTocTitles[i].parentNode.querySelector('ul');
	    if (secondTocTitles.style.display != "contents") {
		secondTocTitles.style.display = "contents";
	    } else {
		secondTocTitles.style.display = "none";
	    }
	    for (let j = 0; j < firstTocTitles.length; j++) {
		if (j != i) {
		    secondTocTitles = firstTocTitles[j].parentNode.querySelector('ul');		
		    secondTocTitles.style.display = "none";
		}
	    }
	});
    }
    
    toc.getElementsByTagName('h2')[0].addEventListener('click', (e) => {
	if (!window.matchMedia("(min-width: 840px)").matches) {
	    let textOfToc = document.getElementById('text-table-of-contents');
	    if (getComputedStyle(textOfToc, null).visibility === 'hidden') {
		textOfToc.style.visibility = "visible";
		let rect = toc.getBoundingClientRect();
		textOfToc.style.top = `${parseInt(rect.y, 10)+parseInt(rect.height, 10)}px`;
	    }
	    else {
		textOfToc.style.visibility = "hidden";
	    }
	}
    });

    /* Evenement de défilement pour resize la toc quand visible sur petits écrans */

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
});
