/* eslint-disable no-console */
// eslint-disable-next-line max-classes-per-file
const allInstruments = ['pencil', 'bucket', 'color-picker'];
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
          <li class="instrument" id = "${allInstruments[1]}">Paint bucket</li>
          <li class="instrument" id = "${allInstruments[2]}">
          <input type="color" id="color" name="color-name" value="#FFC107" hidden><label for='color'>Choose color</label>
          </li>
          <li class="instrument instr_active" id = "${allInstruments[0]}">Pencil</li>
      </ul>
  </div>
  <div class="color-panel">
      <ul class="instruments">
          <li class="instrument"><span></span>Current color</li>
          <li class="instrument"><span></span>Prev color</li>
          <hr>
          <li class="instrument"><span></span>red</li>
          <li class="instrument"><span></span>blue</li>
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

class Instruments {
  constructor(arr) {
    this.colors = {
      current: '#FFC107',
      prev: '#FFEB3B',
    };
    [this.instrument] = arr;
  }

  changeInstrument = (dom, canvas) => {
    const instruments = document.querySelector('.toolbar .instruments');
    instruments.addEventListener('click', (e) => {
      const target = e.target.getAttribute('id');
      // eslint-disable-next-line no-useless-return
      if (e.target.classList.contains('instrument')) {
        if (target === this.instrument || target === 'color-picker') return;
        this.instrument = target;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < instruments.children.length; i++) {
          instruments.children[i].classList.remove('instr_active');
        }
        e.target.classList.add('instr_active');
        dom.eventsHandler(canvas, this.colors.current, this.instrument); // InstrumentsDom
      }
    });
    return this;
  }

  changeColor = (dom, canvas) => {
    const colorPicker = document.getElementById('color');
    colorPicker.addEventListener('change', () => {
      this.colors.prev = this.colors.current;
      this.colors.current = colorPicker.value;
      dom.changeColorDom(this.colors, canvas, this.instrument); // InstrumentsDom
      dom.eventsHandler(canvas, this.colors.current, this.instrument); // InstrumentsDom
      return this;
    });
  }
}

class InstrumentsDom {
  constructor() {
    this.elements = {
      currentColor: document.querySelector('.color-panel .instrument:first-child span'),
      prevColor: document.querySelector('.color-panel .instrument:nth-child(2) span'),
    };
  }

  startColorDom = (colors, canvas, instrument) => {
    this.elements.currentColor.style.background = colors.current;
    this.elements.prevColor.style.background = colors.prev;
    this.eventsHandler(canvas, colors.current, instrument);
    return this;
  }

  changeColorDom = (colors) => {
    this.elements.currentColor.style.background = colors.current;
    this.elements.prevColor.style.background = colors.prev;
    return this;
  }

  eventsHandler = (canv, color, instrument) => {
    const canvas = document.getElementById('canvas');
    canvas.onclick = () => {
      if (instrument === 'bucket') canv.bucket(color);
    };
    canvas.onmousedown = (e) => {
      if (instrument === 'pencil') canv.pencil(e, color);
    };
    return this;
  }
}

class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  bucket = (color) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  pencil = (event, color) => {
    const canvas = document.getElementById('canvas');
    this.ctx.fillStyle = color;
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    const matrix = {
      width: this.canvas.width / 16,
      height: this.canvas.height / 16,
    };
    this.ctx.fillRect(x - (matrix.width / 2), y - (matrix.height / 2), matrix.width, matrix.height);
  }
}

const palette = new Instruments(allInstruments);
const instrDom = new InstrumentsDom(allInstruments);
const canvasImage = new Canvas();

instrDom.startColorDom(palette.colors, canvasImage, palette.instrument);
palette.changeInstrument(instrDom, canvasImage).changeColor(instrDom, canvasImage);
