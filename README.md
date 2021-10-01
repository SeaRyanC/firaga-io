
# What Is This?


# Settings

## Material Settings

Material settings controls what sort of pegboard and beads you'll be using.

### Color Matching

Unless *Palette* is set to *All Colors*, firaga uses a color-matching algorithm to select a set of bead colors that best matches the input image. You can tweak the algorithm's settings as follows.

 * **[CIEDE2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000)** is a perceptual color matching algorithm that generates ideal results for most images
 * **RGB** uses a naive sum-of-squares calculation on a per-color-channel basis. For some combination of input images and available palettes, this can generate better results.
 * The **No Duplicates** setting forces the algorithm to choose a different output bead for every different image color, if possible. This can be beneficial when, for example, it's more important to establish a color gradient for shading purposes than to have exact color accuracy. The built-in "Kirby" image, when using a smaller set of available bead colors, is a situation where you'd probably want to check this box.

### Palette

Self-explanatory; select the beads you'll be using to construct your artwork.

### Grid Size

When computing artwork size or printing "actual size" templates, firaga needs to know the exact model of pegboard you're using. Critically, **you must select this based on the pegboard, not the bead** -- while Perler and Artkal beads are interchangeable, they use slightly different spacings between pegboard pegs.

If you're unsure which pegboard you have, the shopping links take you to Amazon product pages where you can figure out which model you have.

## Image Settings

### Transparency

Assuming you've already cleaned up a sprite by putting it on a uniform background, firaga can simplify the plan by dropping pixels that should be ignored. You can change how this process works if needed.

 * **Auto**: Determine transparency automatically
 * **Alpha Channel**: Only drop pixels with zero opacity in the input image
 * **Magenta**: Only drop true magenta (#FF00FF) pixels
 * **Corners**: Use the corner pixels of the image to infer the background color
 * **None**: Do not drop any pixels

### Color Adjust

You can tweak the image before the paletting algorithm runs.

### Transforms

You can apply various transforms to the image. This is useful if you want to use an ironing method where the front of the artwork becomes the back. Note that combining **Flip** and **Mirror** does not result in a "reversed" image.

 * **Flip**: Reverse the image about the Y-axis
 * **Mirror**: Reverse the image about the X-axis
 * **Rotate**: Rotate 90 degrees clockwise

## Plan Settings

Once the image has been processed, you'll see a "Plan" in the center of the screen. You can change how the plan is displayed.

### Legend

You can overlay symbols over each pixel in the plan to aid in determining which color bead to use.

 * **Symbols + Spans**: Shows a condensed legend where runs of more than 2 pixels are notated as e.g. "A x 3" using their symbol from the Legend
 * **Spans**: Only show the length of each run of color
 * **Symbols**: Show the corresponding symbol from the Legend on each pixel
 * **None**: Don't overlay any symbols

### Grid

# Identifying Your Pegboard

What's the old pegboard you found? This is a list *transparent* pegboards I've found and how to identify them. "Mini" format pegboards are easily identified by their extremely tight peg spacing (mini beads are about the size of a grain of rice; regular beads are about the size of a raisin).

 * **Artkal Mini** pegboards are ~137mm square, with 50 pegs per side. On the reverse side you'll see two concentric circles.
 * **Perler Mini** pegboards are ~147mm square, with 56 pegs per side. On the reverse side you'll see a X pattern with a square in the middle
 * **Perler Standard** pegboards are ~140m square, with 29 pegs per side. On the reverse side you'll see a X pattern with a square in the middle

# Attributions

 * favicon by https://twemoji.twitter.com/ via https://favicon.io/emoji-favicons/abacus/
 * Image Icons from The Noun Project
   * ["Open" by yanuar rizki](https://thenounproject.com/search/?q=image&i=4129894)
   * ["Settings" by Focus](https://thenounproject.com/search/?q=settings&i=943929)
   * ["Print" by Rockicon](https://thenounproject.com/search/?q=print&i=1707522)
   * ["Legend" by orche7](https://thenounproject.com/search/?q=legend&i=1267167)
   * ["Help" alkhalifi_design](https://thenounproject.com/search/?q=help&i=4116027)

# Misc Notes

### Assembly Time Estimate

Assembly time is calculated at a rate of 1 bead every 4 seconds, based on a rough measure of myself placing some standard-size beads on an overlay pattern. Mini format beads are likely quite a bit slower, perhaps double, depending on operator skill and image complexity.

### Cost Estimate

The material cost is estimated on a range from $0.001-$0.003 / bead.

Actual costs in the wild as of 2021 vary considerably depending on what and how you're buying:
 * At the very lowest end, buying Artkal Mini Beads in single-color packs of 50,000 (!!) is only $0.0006/ea, but these are impractically large quantities for all but the most common colors used by the most dedicated crafter
 * In the middle, most methods of buying Mini beads average about $0.001-$0.0002/ea
 * Bulk purchases of standard-size beads (including the popular Perler Mega Mix bucket) usually average about $0.002/ea
 * Presorted name-brand trays of standard-size beads can go up to $0.003/ea
