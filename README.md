# Etch-a-Sketch

A Etch-a-Sketch webpage with tiles which change color when the cursor hovers above them. The user can input the number of tiles they want on the sides.

First, we create a default 16x16 grid in the DOM through Javascript.
    Create a big div container.
    Make that div a grid container (in the CSS).
    Create as many children divs as required (16 at first).

To have the CSS assign a random color to a hovered tile:
Each color can be defined as a hex value (#AAAAA), so you could get away with a loop which runs five times and assign a random character to each character of the hex value. There are 16 possibilities for each character (from 0 to 9, and a to f).
Run Math.random() five times, dividing the range in sixteen parts and assigning a value to each of these new ranges. Or code a function to give a result that's easier to exploit.