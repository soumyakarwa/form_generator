/**
Assignment
Form Generator (https://parsonsdt.github.io/critical-computation-2023/assignment-2.html)


Objective
Build a simple generator that makes multiple variations of the same form


Description
I'm taking a Typography elective this semester and am feeling very inspired by the intricacy of type. I wanted to play around with the form of the word "curiosity." In DT and in our classes, we're encouraged to be curious and to think outside the box. Ironically we have a design constraint of a 400x400 box.

I created three interactions that are looped so that the program comes back to the first interaction after the third and so on.

The first one is pretty simple with the word "curiosity" following the mouse position on the canvas. I restricted the number of texts on the screen to 30 because I wanted to create a dynamic movement instead of the text permanentely drawn on a particular point. 

The second one was more complicated because I needed to keep track of each letter in the word. I wanted to demonstrate "curiosity" as a sum of it's parts. Hence, every time you hover over a certain letter, another word will show up at random positions of the screen. This word contains only the letters of "curiosity." I randomized the colors of the additional words while fading out the letters in "curiosity" that weren't used to demonstrate the correlation.

The third one was similar to the first except it is one letter at a time. I wanted to break down the word to explore it's structure in the barest form.


Functionality
I created a wrapper class called textObject to access and change it's different components like size and color more dynamically. 

*/

// colors  
let background_color = "#0E0D06";
let font_colors = ["#70F7FF", "#FAFF70", "#EF476F", "#379634"];

// experiment :let font_colors = ["#26547C", "#EF476F", "#00c49a", "#561643"]; let background_color = "#F2EFDF";

// miscellaneous variables
let roboto;
let current_animation = 1;
let mouse_stopped = false;
let animation_is_switched = false;
let animation_limit = 20;
let animation_text = "curiosity";
let canvas_width = 400;
let canvas_height = 400;
let text_offset = [94.5, 9.5];
let text_x = canvas_width / 2 - text_offset[0];
let text_y = canvas_height / 2 + text_offset[1];
let text_size = 35;

// animation_one variables
let counter_one = 0;
let animation_one_text_position_x = [];
let animation_one_text_position_y = [];
let animation_one_text_colors = [];
let animation_one_text = animation_text;
let animation_one_limit = 30;
let animation_one_text_size = 30;

// animation_two variables
let counter_two = 0;
let animation_two_text_position_x = [];
let animation_two_text_position_y = [];
let animation_two_text_colors = [];
let sample = 0;
let ellipse_size = 0;
let animation_two_color = font_colors[0];
let animation_two_text = animation_text.split("");
let animation_two_text_size = text_size;
let animation_two_text_spacing = 21; 
let x_animation = [];
let y_animation = [];
let used_letters = []; 
let words = [
  "city",
  "usury",
  "riot",
  "iris",
  "otic",
  "sour",
  "iris",
  "trio",
  "yurt",
];
let word_size = text_size*2; 
let last_word_display = 0;
let delay_between_words = 0.5;
let displayed_word = null;
let displayed_word_pos = { x: null, y: null };
let x_min = 0; 
let y_min = 20; 
let alpha_max = 255; 
let alpha_min = 100; 
let hover_offset = 22;

// animation_three variables
let counter_three = 0;
let animation_three_text_position_x = [];
let animation_three_text_position_y = [];
let animation_three_text_colors = [];
let animation_three_letters = animation_text.split("");
let animation_three_text = [];
let animation_three_limit = 45;
let animation_three_letter_counter = 0;

// PRELOAD
function preload() {
  roboto = loadFont("Roboto.ttf");
}

// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(background_color);
  prev_mouseX = mouseX;
  prev_mouseY = mouseY;
  textFont(roboto); 
  first = new textObject(
    animation_one_text,
    text_x,
    text_y,
    random(font_colors),
    text_size
  );
  first.display();
  //   line(0, height / 2, width, height / 2);

  //   // Vertical line
  //   line(width / 2, 0, width / 2, height);
}

// DRAW
function draw() {
  check_mouse_moving();
  if (!mouse_stopped) {
    background(background_color);

    if (current_animation === 1) {
      animation_one();
    } else if (current_animation === 2) {
      animation_two();
    } else if (current_animation === 3) {
      animation_three();
    }

    if (!animation_is_switched) {
      switch_animation();
    }
  }
}

// ANIMATION_ONE HELPER
function animation_one() {
  if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
    animation_is_switched = false;
    animation_one_text_position_x.push(mouseX);
    animation_one_text_position_y.push(mouseY);
    animation_one_text_colors.push(random(font_colors));
    counter_one++;

    // once the number of curiosities on the canvas exceed 30
    if (counter_one > animation_one_limit) {
      animation_one_text_position_x.shift();
      animation_one_text_position_y.shift();
      animation_one_text_colors.shift();
      counter_one--;
    }

    // write the texts in the stored location
    for (let i = 0; i < animation_one_text_position_x.length; i++) {
      temp = new textObject(
        animation_one_text,
        animation_one_text_position_x[i],
        animation_one_text_position_y[i],
        animation_one_text_colors[i],
        animation_one_text_size
      );
      temp.display();
    }
  }
}

// Animation Two Helper Method
function animation_two() {
  
  // checks if the mouse in on the canvas
  if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
    animation_is_switched = false;
    
    let x_loc = text_x;
    let y_loc = text_y;
    
    // writing each individual letter
    for (i = 0; i < animation_two_text.length; i++) {
      x_animation[i] = x_loc;
      y_animation[i] = y_loc;
      
      // changing the alpha value for each letter
      let alphaValue = used_letters.includes(animation_two_text[i])         ? alpha_max : alpha_min; 

      let col = hex_alpha(font_colors[1], alphaValue); 
      
      current = new textObject(
        animation_two_text[i],
        x_loc,
        y_loc,
        col,
        text_size
      );
      current.display();
      x_loc = x_loc + animation_two_text_spacing;
    }
    
    // loop to check if a letter is being hovered over and to display the appropriate word - starting with the letter that's being hovered on
    for (j = 0; j < x_animation.length; j++) {
      
      // if mouse position is within the bounds for each letter
      if (
        mouseX < x_animation[j] + hover_offset &&
        mouseX > x_animation[j] &&
        mouseY < y_animation[j] + hover_offset &&
        mouseY > y_animation[j] - 2*hover_offset
      ) {
        // causing a split second delay between each random word
        if (!displayed_word ||
            frameCount - last_word_display > delay_between_words) {
          displayed_word_pos.x = random(x_min, width);
          displayed_word_pos.y = random(y_min, height);
          displayed_word = new textObject(
            words[j],
            displayed_word_pos.x,
            displayed_word_pos.y,
            random([font_colors[0], font_colors[2], font_colors[3]]),
            word_size
          );
          last_word_display = frameCount;
          used_letters = [...new Set(words[j].split(''))];  
        }
        displayed_word.display();
      }
    }
  }
}

// Animation Three Helper Method
function animation_three() {
  
  // checks if the mouse is on the canvas
  if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
    
    animation_is_switched = false;
    animation_three_text_position_x.push(mouseX);
    animation_three_text_position_y.push(mouseY);
    animation_three_text_colors.push(random(font_colors));
    animation_three_text.push(
      animation_three_letters[animation_three_letter_counter]
    );
    
    // if all the letters of curiosity has been written
    if (animation_three_letter_counter === 8) {
      animation_three_letter_counter = 0;
    } else {
      animation_three_letter_counter++;
    }

    counter_three++;

    // once the number of letters on the canvas exceed 30
    if (counter_three > animation_three_limit) {
      animation_three_text_position_x.shift();
      animation_three_text_position_y.shift();
      animation_three_text_colors.shift();
      animation_three_text.shift();
      counter_three--;
    }

    // write the texts in the stored location
    for (let i = 0; i < animation_three_text_position_x.length; i++) {
      obj = new textObject(
        animation_three_text[i],
        animation_three_text_position_x[i],
        animation_three_text_position_y[i],
        animation_three_text_colors[i],
        text_size
      );
      obj.display();
    }
  }
}

// changes the animation through a loop once the mouse exits the canvas
function switch_animation() {
  // once the mouse exits the canvas, change the animation
  if (mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) {
    clear();
    background(background_color);

    // from first to second
    if (current_animation === 1) {
      current_animation = 2;
    }

    // from second to third
    else if (current_animation === 2) {
      current_animation = 3;
    }

    // from third, back to first
    else if (current_animation === 3) {
      current_animation = 1;
    }

    animation_is_switched = true;
  }
}

// this helper method pauses the animation if the mouse stops moving
function check_mouse_moving() {
  if (mouseX === prev_mouseX && mouseY === prev_mouseY) {
    mouse_stopped = true;
  } else {
    mouse_stopped = false;
    prev_mouseX = mouseX;
    prev_mouseY = mouseY;
  }
}

// converting a hex code into rgb and adding alpha
function hex_alpha(hex, alpha) {
  // Parse the hex code
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Return a p5.Color with the desired alpha value
  return color(r, g, b, alpha);
}
