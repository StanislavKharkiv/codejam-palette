/* eslint-disable func-names */
(function () {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = '<h1 class="h1">CodeJam-Palette</h1>';
  const main = document.createElement('main');
  main.className = 'main';
  main.innerHTML = `<aside class="settings">
  <div class="toolbar">
      <ul class="instruments">
          <li class="instrument" data-name = "bucket">Paint bucket</li>
          <li class="instrument" data-name = "color">Choose color</li>
          <li class="instrument instr_active" data-name = "pencil">Pencil</li>
      </ul>
  </div>
  <div class="color-panel">
      <ul class="instruments">
          <li class="instrument">Current color</li>
          <li class="instrument">Prev color</li>
          <hr>
          <li class="instrument">red</li>
          <li class="instrument">blue</li>
      </ul>
  </div>
</aside>
<div class="image">
  <canvas class="canvas" id="canvas" width="512" height="512"></canvas>
</div>`;
  /* add into html */
  wrapper.appendChild(header);
  wrapper.appendChild(main);
  document.body.appendChild(wrapper);
}());
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// class Canvas {
//   constructor() {
//     this.allInstruments = ['pencil', 'bucket', 'colorPicker'];
//     [this.instrument] = this.allInstruments;
//   }

// }
