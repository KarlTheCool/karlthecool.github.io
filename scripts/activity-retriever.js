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

// date: in ISO 8601 format
// element: html element object
// platform: social media platform
let FeedItem = (date, platform, element) => {
    return {
        date, platform, element
    }
}

let renderFeed = (err, data) => {
    if (err !== 200) {
        console.error(err, "when getting feed");
        return
    }

    feedDiv.innerHTML = ""

    feedItems = [];
    // {
    //     date: in ISO 8601 format
    //     element: html element object
    //     platform: social media platform
    // }

    for (post of data) {
        if (post.reblog || post.in_reply_to_id) {
            continue
        }
        let mastoPost = document.createElement("div");
        mastoPost.innerHTML = post.content
        let ref = post.url.slice()
        mastoPost.addEventListener("click",
            () => {window.location = ref}
        );
        if (post.media_attachments) {
            for (let media of post.media_attachments) {
                if (media.type === 'image') {
                    let img = document.createElement("img");
                    img.src = media.preview_url;
                    img.alt = media.description
                    mastoPost.appendChild(img);
                } else {
                    console.error('unhandled media type', media.type)
                }
            }
        }
        feedItems.push(FeedItem(post.created_at, 'mastodon', mastoPost))
    }

    feedItems.sort()

    for (let i = 0; i < 10; i++) {
        feedDiv.appendChild(feedItems[i].element)
    }
}

getJSON(
    'https://mastodon.online/api/v1/accounts/64626/statuses?limit=25',
    renderFeed
);