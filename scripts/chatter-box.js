(function() {
    const MASTODON = "mastodon.online";
    const MASTODON_ID = "64626";
    const LIMIT = 25;

    let mastodonPosts = [];
    let feedDiv = null;
    let chatter = null;
    windowReady().then(() => feedDiv = document.getElementsByClassName("chatter__content")[0]);
    windowReady().then(() => layout = document.getElementsByClassName("chatter__layout")[0]);

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

    function clearMedia() {
        for (let e of layout.getElementsByClassName('chatter__mastodon__media')) {
            e.remove();
        }
        layout.classList.remove("chatter--has-media");
    }

    function updateMessage(post) {
        let mastoPost = document.createElement("div");
        mastoPost.classList.add("chatter__mastodon");
        mastoPost.innerHTML += `
        <div class="chatter__meta">
            <a href=${post.account.url}>@${post.account.username}@${MASTODON}</a>
            <a href=${post.url} class="nostyle--a" aria-label="Permanent link">
                Permanent link
                <span class="fas fa-link" aria-hidden="true"></span>
            </a>
        </div>
        `;
        if (post.in_reply_to_id) {
            mastoPost.innerHTML += `<a href="${post.url}">View context</a>`
        }
        mastoPost.innerHTML += post.content;

        clearMedia();

        if (post.media_attachments.length > 0) {
            let mediaContainer = document.createElement('div');
            mediaContainer.classList.add("chatter__mastodon__media");
            for (let media of post.media_attachments) {
                if (media.type === 'image') {
                    let img = document.createElement("img");
                    img.src = media.preview_url;
                    img.alt = media.description
                    mediaContainer.prepend(img);
                } else if (media.type === 'gifv') {
                    let gifv = document.createElement("video");
                    gifv.src = media.url;
                    gifv.loop = true;
                    gifv.autoplay = true;
                    gifv.muted = true;
                    mediaContainer.prepend(gifv);
                } else {
                    console.error('unhandled media type', media.type)
                    let err = document.createElement("p");
                    err.innerHTML = "Could not display media";
                    mediaContainer.classList.remove("chatter__mastodon__media");
                    mediaContainer.classList.add("chatter__mastodon__media--error");
                    mediaContainer.prepend(err);
                }
            }
            layout.prepend(mediaContainer);
            
        }
        feedDiv.innerHTML = mastoPost.outerHTML;
    }

    Promise.all([windowReady(), makeRequest('GET', `https://${MASTODON}/api/v1/accounts/${MASTODON_ID}/statuses?limit=${LIMIT}&exclude_reblogs=1`)]).then((results) => {
        mastodonPosts = JSON.parse(results[1]);
    }).catch(console.error);

    let postIndex = -1;
    let aboutText = "";
    windowReady().then(() => {
        let elem = document.getElementById("about-content");
        elem.classList.remove('noscript-fallback');
        aboutText = elem.outerHTML;
        elem.remove();
    })
    windowReady().then(() => document.getElementById('moar').addEventListener('click', () => {
        if (!feedDiv) return;
        postIndex = (postIndex + 1) % mastodonPosts.length;
        let post = mastodonPosts[postIndex]
        updateMessage(post);
        if (post.media_attachments.length > 0) {
            layout.classList.add("chatter--has-media");
        }
    }));
    windowReady().then(() => document.getElementById('about').addEventListener('click', () => {
        if (!feedDiv) return;
        clearMedia();
        feedDiv.innerHTML = aboutText;
    }));

})();
