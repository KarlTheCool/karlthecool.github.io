(function() {

    function windowReady() {
        return new Promise(function (resolve) {
            window.addEventListener('load', resolve);
        });
    }

    // 1 click copy email address
    windowReady().then(() => {
        document.getElementById('email-address').addEventListener('click', (e) => {
            e.target.select();
            document.execCommand("copy");
        });
        document.getElementById('email-address').setAttribute("cursor", "copy");
    });

    // 1 click copy pgp key
    windowReady().then(() => {
        document.getElementById('pgp-key').addEventListener('click', (e) => {
            e.target.select();
            document.execCommand("copy");
        });
        document.getElementById('pgp-key').setAttribute("cursor", "copy");
    });
})();
