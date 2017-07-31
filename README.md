React Collage Maker
======

Uses React & the HTML5 canvas to create downloadable photo collage images

This project is a sample project for my portfolio and is in development, so it's not yet an installable component, but you are welcome to try it out.

# Live Demo

[![Collage maker in action](/public/assets/img/collagedemopreview.jpg)](https://collage-demo.herokuapp.com/)

[Live Demo](https://collage-demo.herokuapp.com/)

# Example Output

![Example output](/public/assets/img/collageoutput.png)

# What It Does

The collage maker takes "template" images which have colored image areas on top of a transparent background, and loads them into a canvas where you can upload images into the slots, as well as move and scale the images and change the background color. Then by clicking "Generate Collage Image," you can export a downloadable image file of your created collage.

### Template Image Requirements

Template images must be named with the number of image slots in the filename, e.g. 5_squares.png. The template image must also contain some transparent space on the outside.