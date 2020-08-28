// Init Zfont plugin and bind to Zdog
Zfont.init(Zdog);

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

let canvas = document.getElementById("zdog-logo")
canvas.height = canvas.width / 3 * 4

let illo = new Zdog.Illustration({
  element: canvas,
  dragRotate: true,
  onPrerender: function (ctx) {
    ctx.globalCompositeOperation = 'screen';
  },
  resize: true,
  onResize: function(width, height) {
    var minSize = Math.min(width, height);
    document.getElementById("zdog-logo").height = width / 3 * 4
    this.zoom = minSize / 420;
  }
});

let nameCyan = new Zdog.TextGroup({
  addTo: illo,
  font: font,
  value: [
  '家KA',
  '豪RL'
  ],
  rotate: {x: 0, y: 0, z: 0},
  fontSize: 60,
  textAlign: 'center',
  textBaseline: 'middle',
  color: 'cyan',
  fill: true,
  stroke: 1,
});

let nameMagenta = nameCyan.copyGraph({
  translate: {z: -6 },
  color: 'magenta'
});

let nameYellow = nameCyan.copyGraph({
  translate: {z: 6 },
  color: 'yellow'
});

// Settings for the wave animation
var t = 0;
var tStep = 5;
var frequency = 80;

// Wave function
// This loops through every shape in a TextGroup and modifies its position according to a sine wave
function wave(group, amp) {
  group.children.forEach(shape => {
    var x = shape.translate.x + t;
    shape.translate.y += amp * Math.sin(x / frequency);
  });
}

// Animation loop
function animate() {
  wave(nameMagenta, 0.25);
  wave(nameCyan, 0.5);
  wave(nameYellow, 0.75);
  t += tStep;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate()