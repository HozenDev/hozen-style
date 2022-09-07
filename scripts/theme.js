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

/* set a default theme */
(function() {
    if (localStorage.getItem('theme') === null) setTheme('theme-light');
    else if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-dark');
    else setTheme('theme-light');
})();
