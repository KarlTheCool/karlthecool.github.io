(function() {
    /**
     * By Ken Fyrstenberg Nilsen
     *
     * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
     *
     * If image and context are only arguments rectangle will equal canvas
    */
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill    
        if (nw < w) ar = w / nw;                             
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }

    function emote(emotion) {
        let img = document.createElement('img');
        img.src = '/images/character/' + emotion + '.png';
        return img;
    }

    function start() { // body onload 
        let avatar_canvas = document.getElementsByClassName('chatter__avatar__canvas')[0]
        let ctx = avatar_canvas.getContext("2d");

        let happy = emote('happy');
        let ecstatic = emote('ecstatic');
        let distress = emote('distress');
        let grumpy = emote('grumpy');

        let emotion = ecstatic;

        let contentBox = document.getElementsByClassName('chatter__content')[0];

        function draw(){
            avatar_canvas.width  = avatar_canvas.offsetWidth;
            avatar_canvas.height = avatar_canvas.offsetHeight;

            drawImageProp(ctx, emotion, 0, 0, avatar_canvas.width, avatar_canvas.height);
        }
        window.addEventListener('resize', draw);
        // onInterval(draw) // animate
        ecstatic.addEventListener('load', draw);

        document.getElementsByClassName('chatter__content')[0].addEventListener('DOMSubtreeModified', () => {
            console.log(contentBox.innerHTML);
            emotion = [happy, ecstatic, distress, grumpy][Math.floor(Math.random() * Math.floor(4))]
            draw();
        })
    }

    window.addEventListener('load', start);

})();
