window.addEventListener('load', function () {

    let themeCheck = document.createElement("input");
    themeCheck.id = "theme-switcher";
    themeCheck.type = "button";
    themeCheck.value = "Theme Switcher";

    themeCheck.addEventListener('click', toogleTheme);

    document.body.getElementById('table-of-contents').appendChild(themeCheck);

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
