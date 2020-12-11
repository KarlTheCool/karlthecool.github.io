(function() {

    function windowReady() {
        return new Promise(function (resolve) {
            window.addEventListener('load', resolve);
        });
    }

    function getArrayOfClassName(name) {
        return Array.from(document.getElementsByClassName(name));
    }

    // Replace home target with browser back so browser history isn't unexpected
    windowReady().then(() => {
        getArrayOfClassName('email__exit').forEach((e) => e.href = 'javascript:history.back()');
    });

    // Allow going back by clicking outside the modal
    windowReady().then(() => {
        getArrayOfClassName('modal').forEach(function (e) {
            e.addEventListener('click', () => history.back())
            for (e of e.children) {
                // But not if a child is clicked
                e.addEventListener('click', e => e.stopPropagation());
            }
        });
    });

})();
