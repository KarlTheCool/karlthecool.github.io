let feedDiv = document.getElementById("feed");

let getJSON = function(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        callback(status, xhr.response);
    };
    xhr.send();
};

let renderFeed = (err, data) => {
    if (err !== 200) {
        console.error(err, "when getting feed");
        return
    }

    feedDiv.innerHTML = ""

    for (post of data) {
        feedDiv.innerHTML += `
        <div>
            ${post.content}
        </div>
        `
    }
}

getJSON(
    'https://mastodon.online/api/v1/accounts/64626/statuses?limit=10',
    renderFeed
);