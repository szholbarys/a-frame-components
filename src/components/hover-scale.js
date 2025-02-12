AFRAME.registerComponent("hover-scale", {
  schema: {
    scale: { type: "vec3", default: { x: 1.2, y: 1.2, z: 1.2 } },
    duration: { type: "number", default: 200 },
  },

  init: function () {
    this.originalScale = this.el.object3D.scale.clone();
    this.el.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  },

  onMouseEnter: function () {
    const targetScale = this.data.scale;
    this.el.setAttribute("animation", {
      property: "scale",
      to: `${targetScale.x} ${targetScale.y} ${targetScale.z}`,
      dur: this.data.duration,
      easing: "easeOutQuad",
    });
  },

  onMouseLeave: function () {
    this.el.setAttribute("animation", {
      property: "scale",
      to: `${this.originalScale.x} ${this.originalScale.y} ${this.originalScale.z}`,
      dur: this.data.duration,
      easing: "easeOutQuad",
    });
  },
});
