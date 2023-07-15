window.addEventListener('load', function () {

    let themeCheck = document.createElement("div");
    let spanThemeCheck = document.createElement("span");
    let labelThemeCheck = document.createElement("label");
    let inputThemeCheck = document.createElement("input");

    /* initialize each container */
    themeCheck.className = "theme-switch";
    labelThemeCheck.id = "switch";
    labelThemeCheck.className = "switch";
    inputThemeCheck.id = "slider";
    inputThemeCheck.type = "checkbox";
    spanThemeCheck.className = "slider round";

    /* add event listener on click */
    inputThemeCheck.addEventListener('click', toogleTheme);

    /* insert theme check */
    labelThemeCheck.appendChild(inputThemeCheck);
    labelThemeCheck.appendChild(spanThemeCheck);
    themeCheck.appendChild(labelThemeCheck);
    document.getElementById('table-of-contents').appendChild(themeCheck);

    /* set theme in html class */
    function setTheme(themeName) {
	localStorage.setItem('theme', themeName);
	document.documentElement.className = themeName;
    }

    /* toggle theme class in html tag */
    function toogleTheme() {
	if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-light');
	else setTheme('theme-dark');
    }

    /* set a default theme */
    (function() {
	if (localStorage.getItem('theme') === null) setTheme('theme-light');
	else if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-dark');
	else setTheme('theme-light');
    })();

    /* Change value of button theme-switcher media-query */
    function themeSwitcher500() {
	let themeSwitcher = document.getElementById('theme-switcher');
	if (!window.matchMedia("(min-width: 500px)").matches) {
	    themeSwitcher.value = "TS";
	}
	else themeSwitcher.value = "Theme Switcher";
    }

    /* on load */
    themeSwitcher500();
    window.addEventListener('resize', themeSwitcher500);
});
