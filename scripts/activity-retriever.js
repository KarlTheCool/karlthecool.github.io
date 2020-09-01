const MAX_RETRIEVE = 25;
const MAX_POST = 10;

let feedDiv = document.getElementsByClassName("feed")[0];

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
        mastoPost.classList.add("feed__item");
        mastoPost.innerHTML = post.content
        // let ref = post.url.slice()
        // mastoPost.addEventListener("click",
        //     () => {window.location = ref}
        // );
        if (false && post.media_attachments) { // FIXME
            for (let media of post.media_attachments) {
                if (media.type === 'image') {
                    let img = document.createElement("img");
                    img.src = media.preview_url;
                    img.alt = media.description
                    mastoPost.appendChild(img);
                } else if (media.type === 'gifv') {
                    let gifv = document.createElement("video");
                    gifv.src = media.url;
                    gifv.loop = true;
                    gifv.autoplay = true;
                    gifv.muted = true;
                    mastoPost.appendChild(gifv);
                } else {
                    console.error('unhandled media type', media.type)
                    let err = document.createElement("p");
                    err.innerHTML = "Could not display media";
                    mastoPost.appendChild(err);
                }
            }
        }
        feedItems.push(FeedItem(post.created_at, 'mastodon', mastoPost))
    }

    feedItems.sort()

    for (let i = 0; i < MAX_POST; i++) {
        feedDiv.appendChild(feedItems[i].element)
    }
}

getJSON(
    'https://mastodon.online/api/v1/accounts/64626/statuses?limit=' + MAX_RETRIEVE,
    renderFeed
);