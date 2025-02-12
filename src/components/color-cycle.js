AFRAME.registerComponent("color-cycle", {
  schema: {
    colors: { type: "array", default: ["#ff0000", "#00ff00", "#0000ff"] },
    interval: { type: "number", default: 1000 },
  },

  init: function () {
    this.colorIndex = 0;
    this.intervalId = setInterval(
      this.cycleColor.bind(this),
      this.data.interval
    );
  },

  cycleColor: function () {
    this.colorIndex = (this.colorIndex + 1) % this.data.colors.length;
    this.el.setAttribute(
      "material",
      "color",
      this.data.colors[this.colorIndex]
    );
  },

  remove: function () {
    clearInterval(this.intervalId);
  },
});
