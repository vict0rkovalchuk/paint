class Painter {
  constructor() {
    this.canvas = document.querySelector('.canvas');
    this.context = this.canvas.getContext('2d');
    this.start_background_color = 'white';
    this.draw_color = 'black';
    this.draw_width = '1';
    this.is_drawing = false;
    this.restore_array = [];
    this.index = -1;
  }

  sizeWindow() {
    this.canvas.width = window.innerWidth - 60;
    this.canvas.height = window.innerHeight - 150;
    this.context.fillStyle = this.start_background_color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  change_color(element) {
    this.draw_color = element.style.background;
  }

  addListeners() {
    this.canvas.addEventListener('touchstart', start, false);
    this.canvas.addEventListener('touchmove', draw, false);
    this.canvas.addEventListener('mousedown', start, false);
    this.canvas.addEventListener('mousemove', draw, false);

    this.canvas.addEventListener('touchend', stop, false);
    this.canvas.addEventListener('mouseup', stop, false);
    this.canvas.addEventListener('mouseout', stop, false);
  }

  start(event) {
    this.is_drawing = true;
    this.context.beginPath();
    this.context.moveTo(
      event.clientX - this.canvas.offsetLeft,
      event.clientY - this.canvas.offsetTop
    );
    event.preventDefault();
  }

  draw(event) {
    if (this.is_drawing) {
      this.context.lineTo(
        event.clientX - this.canvas.offsetLeft,
        event.clientY - this.canvas.offsetTop
      );
      this.context.strokeStyle = this.draw_color;
      this.context.lineWidth = this.draw_width;
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.stroke();
    }
    event.preventDefault();
  }

  stop(event) {
    if (this.is_drawing) {
      this.context.stroke();
      this.context.closePath();
      this.is_drawing = false;
    }
    event.preventDefault();

    if (event.type != 'mouseout') {
      this.restore_array.push(
        this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
      this.index += 1;
    }
  }

  clear_canvas() {
    this.context.fillStyle = this.start_background_color;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.restore_array = [];
    this.index = -1;
  }

  undo_last() {
    if (this.index <= 0) {
      clear_canvas();
    } else {
      this.index -= 1;
      this.restore_array.pop();
      this.context.putImageData(this.restore_array[this.index], 0, 0);
    }
  }
}

let painter = new Painter();
painter.sizeWindow();
painter.addListeners();
