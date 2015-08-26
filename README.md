# WebApplication
[![Build Status](https://travis-ci.org/cssoc/WebApplication.svg?branch=master)](https://travis-ci.org/cssoc/WebApplication)

The official CSSoc website.

## Design Documentation
### Acceptable CSS Units of Measurement
  * px
    * Pixels (px) are relative to the viewing device. For low-dpi devices, 1px is one device pixel (dot) of the display. For printers and high resolution screens 1px implies multiple device pixels.
  * %
  * vw, vh
    * Always include px as well (to support ancient browsers) like so:
      * `height: 75px; height: 8vh;`
  * em
    * Only for input forms.

### Image Sizes
  * Maximum height of sponsor logo: **120px**.
  * Social media icons: **60px × 60px**.
  * Header icon: **50px × 50px**.

## License
MIT © [CSSoc](https://github.com/cssoc)