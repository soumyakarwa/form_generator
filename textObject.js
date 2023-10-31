
// text wrapper class to access and change the color, location of text 
class textObject {
  constructor(content, x, y, text_color, text_size) {
    this.content = content;
    this.x = x;
    this.y = y;
    this.text_color = text_color; 
    this.active = true;
    this.text_size = text_size; 
  }

  display() {
      fill(this.text_color);
      textSize(this.text_size);
      text(this.content, this.x, this.y);
  }

  setColor(col) {
    this.text_color = col;
  }

  setSize(s) {
    this.size = s;
  }
  
  setPosition(x, y){
    this.x = x; 
    this.y = y; 
  }
}