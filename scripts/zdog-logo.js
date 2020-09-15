(function() {
  function zdogLogo() {
    // Init Zfont plugin and bind to Zdog
    Zfont.init(Zdog);

    let canvas = document.getElementsByClassName("zdog-logo")[0]

    // Create Zdog Illustration
    // https://zzz.dog/api#illustration
    var illo = new Zdog.Illustration({
      element: canvas,
      rotate: {x: -0.32, y: 0.64, z: 0},
      resize: true,
      onResize: function(width, height) {
        var minSize = Math.min(width, height);
        this.zoom = minSize / 190;
      }
    });

    let font = new Zdog.Font({
      /**
       * Notice: wt028.ttf is part of a font family copyrighted under GPL v2.
       * I am redistributing only wt028.ttf. If you wish to access the
       * full set, visit https://code.google.com/archive/p/wangfonts/
       * 
       * Copyright (C) 2012 Prof. Hann-Tzong WANG
       * 
       * This program is free software; you can redistribute it and/or modify
       * it under the terms of the GNU General Public License as published by
       * the Free Software Foundation; either version 2 of the License, or
       * (at your option) any later version.
       * 
       * This program is distributed in the hope that it will be useful,
       * but WITHOUT ANY WARRANTY; without even the implied warranty of
       * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
       * GNU General Public License for more details.
       * 
       * You should have received a copy of the GNU General Public License
       * along with this program; if not, write to the Free Software
       * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
       */
        src: 'styles/fonts/wangfonts/wt028.ttf'
      // license: 'styles/fonts/wangfonts/license.txt'
      });

    // Create a TextGroup object for the title
    // https://github.com/jaames/zfont#zdogtextgroup
    var title = new Zdog.TextGroup({
      addTo: illo,
      font: font,
      value: "家豪",
      fontSize: 60,
      translate: {y: -70},
      textAlign: 'center',
      textBaseline: 'middle',
      color: 'white',
      fill: true
    });

    // Duplicate the title to create a shadow effect
    var titleShadow = title.copyGraph({
      translate: { z: -12, y: -70 },
      fontSize: 70,
      color: 'gray'
    });

    // Create a TextGroup object for the subtitle
    // https://github.com/jaames/zfont#zdogtextgroup
    var sub = new Zdog.TextGroup({
      addTo: illo,
      font: font,
      // Pass an array as the text value for multiline text:   
      value: [
        'Karl Phillips',
      ],
      fontSize: 50,
      textAlign: 'center',
      textBaseline: 'middle',
      color: 'white',
      fill: true,
    });

    // Duplicate the subtitle to create a shadow effect
    var subShadow = sub.copyGraph({
      translate: { z: -6 },
      fontSize: 60,
      color: 'gray'
    })

    // Settings for the wave animation
    var t = 0;
    var tStep = 5;
    var amplitude = 0.75;
    var frequency = 80;

    // Wave function
    // This loops through every shape in a TextGroup and modifies its position according to a sine wave
    function wave(group) {
      group.children.forEach(shape => {
        var x = shape.translate.x + t;
        shape.translate.y += amplitude * Math.sin(x / frequency);
      });
    }

    // Animation loop
    function animate() {
      wave(title);
      wave(titleShadow);
      wave(sub);
      wave(subShadow);
      t += tStep;
      illo.updateRenderGraph();
      requestAnimationFrame(animate);
    }
    animate();
  }

  window.addEventListener('load', zdogLogo);

})();
