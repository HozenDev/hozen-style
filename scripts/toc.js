window.addEventListener('load', function () {

    const content = document.getElementById("content");
    const toc = document.getElementById("table-of-contents");
    let header = document.createElement("header");
    let main = document.createElement("main");
    let textOfToc = document.getElementById('text-table-of-contents');

    function createHeader() {
	header.appendChild(document.getElementsByClassName("title")[0]);
	document.body.insertBefore(header, main);
    }

    function tocAndContentToMain() {
	document.body.insertBefore(main, document.getElementById("postamble"));
	main.appendChild(toc);
	main.appendChild(content);
    }

    tocAndContentToMain();
    createHeader();

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

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
	var timeout;
	return function() {
	    var context = this, args = arguments;
	    var later = function() {
		timeout = null;
		if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	};
    };
    
    /* listener to know if we need to look window resize for toc visibility */
    let resizeListener = false;

    /* show toc for resize if user end by hide it */
    let showToc = debounce(function() {
        if (resizeListener && window.innerWidth >= 840) {
            /* while to prevent too quick resize */
            while (textOfToc.style.visibility != "visible") {
                window.removeEventListener('resize', showToc, false);    
                resizeListener = false;
                textOfToc.style.visibility = "visible";
            }
        }
    }, 250);
    
    /* hide text of toc is click on h2 */
    toc.getElementsByTagName('h2')[0].addEventListener('click', (e) => {
        if (!window.matchMedia("(min-width: 840px)").matches) {
	    if (getComputedStyle(textOfToc, null).visibility === 'hidden') {
                if (!resizeListener) {
                    window.addEventListener('resize', showToc, true);
                    resizeListener = true;
                }
                let h2 = toc.getElementsByTagName('h2')[0];
                textOfToc.style.visibility = "visible";
                textOfToc.style.top = `${h2.offsetHeight}px`;
	    }
	    else {
		textOfToc.style.visibility = "hidden";
	    }
	}
        
    });
});
