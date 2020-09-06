(function() {
    const MASTODON = "mastodon.online";
    const MASTODON_ID = "64626";

    function makeRequest (method, url) {
        return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
            } else {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
            }
        };
        xhr.onerror = function () {
            reject({
            status: this.status,
            statusText: xhr.statusText
            });
        };
        xhr.send();
        });
    }

    function windowReady() {
        return new Promise(function (resolve) {
            window.addEventListener('load', resolve);
        });
    }

    // date: in ISO 8601 format
    // element: html element object
    // platform: social media platform
    function FeedItem (date, platform, element) {
        return {
            date, platform, element
        }
    }

    function MessageElement (post) {
        let mastoPost = document.createElement("div");
        mastoPost.classList.add("chatter__mastodon");
        mastoPost.innerHTML += `
        <div class="chatter__mastodon__meta">
            <a href=${post.account.url}>@${post.account.username}@${MASTODON}</a>
            ${post.in_reply_to_id ? `
                <a href="${post.url}" class="nostyle--a" title="View full conversation" aria-label="View full conversation">
                    <span class="fas fa-comments" aria-hidden="true"></span>
                </a>
            ` : '' }
            <a href=${post.url} class="nostyle--a" title="Permanent link" aria-label="Permanent link">
                <span class="fas fa-link" aria-hidden="true"></span>
            </a>
        </div>
        `;
        mastoPost.innerHTML += post.content;
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
        return mastoPost;
    }

    let feedItems = [];
    let feedDiv = null;
    windowReady().then(() => feedDiv = document.getElementsByClassName("chatter__content")[0]);

    Promise.all([windowReady(), makeRequest('GET', 'https://' + MASTODON + '/api/v1/accounts/' + MASTODON_ID + '/statuses?limit=25&exclude_reblogs=1')]).then((results) => {

        let data = JSON.parse(results[1]);

        for (post of data) {
            feedItems.push(FeedItem(post.created_at, 'mastodon', MessageElement(post)));
        }

        feedItems.sort()
    }).catch(console.error);

    windowReady().then(() => document.getElementById('moar').addEventListener('click', () => {
        if (!feedDiv) return;
        feedDiv.innerHTML = ""
        feedDiv.appendChild(feedItems[Math.floor(Math.random() * Math.floor(feedItems.length))].element);
    }));

})();
