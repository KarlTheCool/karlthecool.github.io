// So Android includes the system bar in viewport height (vh).
// making the footer tab appear under it
// Luckily, it reports the correct height via window.innerHeight
(function () {
    let mobileViewportFix = (e) => {
            let innerHeight = window.innerHeight;
            document.documentElement.style.setProperty('--actual-view-height', `${innerHeight}px`);
    };
    mobileViewportFix();
    window.addEventListener('resize', debounce(mobileViewportFix, 55));

    /* Debounce function taken from https://github.com/jashkenas/underscore */
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
})();
