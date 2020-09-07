(function() {
    const MASTODON = "mastodon.online";
    const MASTODON_ID = "64626";
    const LIMIT = 6;

    let mastodonPosts = [];
    let feedDiv = null;
    let chatter = null;
    windowReady().then(() => feedDiv = document.getElementsByClassName("chatter__content")[0]);
    windowReady().then(() => chatter = document.getElementsByClassName("chatter")[0]);

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
        if (post.media_attachments.length > 0) {
            for (let media of post.media_attachments) {
                if (media.type === 'image') {
                    let img = document.createElement("img");
                    img.classList.add("chatter__mastodon__media");
                    img.src = media.preview_url;
                    img.alt = media.description
                    mastoPost.prepend(img);
                } else if (media.type === 'gifv') {
                    let gifv = document.createElement("video");
                    gifv.classList.add("chatter__mastodon__media");
                    gifv.src = media.url;
                    gifv.loop = true;
                    gifv.autoplay = true;
                    gifv.muted = true;
                    mastoPost.prepend(gifv);
                } else {
                    console.error('unhandled media type', media.type)
                    let err = document.createElement("p");
                    err.classList.add("chatter__mastodon__media");
                    err.innerHTML = "Could not display media";
                    mastoPost.prepend(err);
                }
            }
            
        }
        return mastoPost;
    }

    Promise.all([windowReady(), makeRequest('GET', `https://${MASTODON}/api/v1/accounts/${MASTODON_ID}/statuses?limit=${LIMIT}&exclude_reblogs=1`)]).then((results) => {
        mastodonPosts = JSON.parse(results[1]);
    }).catch(console.error);

    windowReady().then(() => document.getElementById('moar').addEventListener('click', () => {
        if (!feedDiv) return;
        let post = mastodonPosts[Math.floor(Math.random() * Math.floor(mastodonPosts.length))]
        feedDiv.innerHTML = MessageElement(post).outerHTML;
        if (post.media_attachments.length > 0) {
            chatter.classList.add("chatter--has-media");
        } else {
            chatter.classList.remove("chatter--has-media");
        }
    }));

})();
