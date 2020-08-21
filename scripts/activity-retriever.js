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

    let feedCount = 0

    for (post of data) {
        if (post.reblog || post.in_reply_to_id) {
            continue
        }
        let div = document.createElement("div");
        div.innerHTML = post.content
        let ref = post.url.slice()
        div.addEventListener("click",
            () => {window.location = ref}
        );
        feedDiv.appendChild(div)
        feedCount++
    }
}

getJSON(
    'https://mastodon.online/api/v1/accounts/64626/statuses?limit=25',
    renderFeed
);