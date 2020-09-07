module.exports = {
  mozjpeg: {
    enabled: true,
    progressive: true,
  },
  gifsicle: {
    interlaced: false,
  },
  optipng: {
    optimizationLevel: 7,
  },
  pngquant: {
    quality: [0.65, 0.9],
    speed: 4,
    strip: true,
  },
  webp: {
    quality: 75,
  },
};
