# Regex Fractals

The origin of this project is from [here](https://ssodelta.wordpress.com/2014/03/25/creating-colored-images-from-regular-expressions/)

The recursive version of the grid-generating algorithm is not mine, I ported it from python code written by reddit user /u/wadehn [here](https://www.reddit.com/r/dailyprogrammer/comments/2fkh8u/9052014_challenge_178_hard_regular_expression/cka4fiz)

# Description

The Cartesian coordinate system has four quadrants

![](https://raw.githubusercontent.com/tonygaetani/fregex/master/Vk2ZUy5.png)

We split each image into quadrants

![](https://raw.githubusercontent.com/tonygaetani/fregex/master/B8gYt80.png)

And each quadrant into four more quadrants

![](https://raw.githubusercontent.com/tonygaetani/fregex/master/8l0bMOW.png)

And continue doing so until each quadrant is a pixel.

![](https://raw.githubusercontent.com/tonygaetani/fregex/master/9V96KXx.png)

We mark each square that matches the RegExp `.*1.*`

![](https://raw.githubusercontent.com/tonygaetani/fregex/master/obltWkk.png)

