window.addEventListener('load', function () {

    const content = document.getElementById("content");
    const toc = document.getElementById("table-of-contents");
    let header = document.createElement("header");
    let main = document.createElement("main");
    let textOfToc = document.getElementById('text-table-of-contents');

    function createHeader() {
        if (document.getElementsByClassName("title")[0]) {
            header.appendChild(document.getElementsByClassName("title")[0]);
            document.body.insertBefore(header, main);
        }
    }

    function tocAndContentToMain() {
        const postamble = document.getElementById("postamble");
        if (postamble) {
            document.body.insertBefore(main, postamble);
        } else {
            document.body.appendChild(main);
        }
        if (toc) main.appendChild(toc);
        if (content) main.appendChild(content);
    }

    tocAndContentToMain();
    createHeader();

    /* --- IntersectionObserver for Top-Level & Sub-Sections --- */

    const allTocLinks = document.querySelectorAll('#text-table-of-contents a');
    const sectionMap = new Map();

    allTocLinks.forEach(link => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        if (targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                sectionMap.set(targetSection, link);
            }
        }
    });

    function updateVisibilityAndHighlight(activeLink) {
        allTocLinks.forEach(link => link.classList.remove('active-toc-link'));
        activeLink.classList.add('active-toc-link');

        const topLevelItems = document.querySelectorAll('#text-table-of-contents > ul > li');
        topLevelItems.forEach(li => {
            const subMenu = li.querySelector('ul');
            if (subMenu) subMenu.style.display = 'none';
        });

        const parentTopLi = activeLink.closest('#text-table-of-contents > ul > li');
        if (parentTopLi) {
            const subMenu = parentTopLi.querySelector('ul');
            if (subMenu) {
                subMenu.style.display = 'block';
            }
        }
    }

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = sectionMap.get(entry.target);
                if (activeLink) {
                    updateVisibilityAndHighlight(activeLink);
                }
            }
        });
    }, observerOptions);

    sectionMap.forEach((_, section) => observer.observe(section));

    /* --- Two-Click Navigation Logic --- */

    const firstTocItems = document.querySelectorAll('#text-table-of-contents > ul > li');

    firstTocItems.forEach(li => {
        const topLink = li.querySelector('a');
        const subMenu = li.querySelector('ul');

        if (topLink && subMenu) {
            topLink.addEventListener('click', function (e) {
                const isHidden = getComputedStyle(subMenu).display === 'none';

                if (isHidden) {
                    e.preventDefault();
                    updateVisibilityAndHighlight(topLink);
                }
            });
        }
    });

    /* --- Media Query & Mobile Toggle Utilities --- */

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
    }

    let showToc = debounce(function() {
        if (window.innerWidth > 840) {
            textOfToc.style.visibility = "visible";
        } else {
            textOfToc.style.visibility = "hidden";
        }
    }, 200);

    const h2 = toc.getElementsByTagName('h2')[0];
    if (h2) {
        h2.addEventListener('click', () => {
            if (!window.matchMedia("(min-width: 840px)").matches) {
                if (getComputedStyle(textOfToc, null).visibility === 'hidden') {
                    textOfToc.style.visibility = "visible";
                    textOfToc.style.top = `${h2.offsetHeight}px`;
                } else {
                    textOfToc.style.visibility = "hidden";
                }
            }
        });
    }

    window.addEventListener('resize', showToc);                
});
