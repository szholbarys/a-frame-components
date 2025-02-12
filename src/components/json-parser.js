document.getElementById("file-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const config = JSON.parse(e.target.result);
      document.getElementById("json-display").textContent = JSON.stringify(
        config,
        null,
        2
      );
      applyConfiguration(config);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Invalid JSON file");
    }
  };

  reader.readAsText(file);
});

function applyConfiguration(config) {
  const entity = document.getElementById("configurable-entity");

  while (entity.firstChild) {
    entity.removeChild(entity.firstChild);
  }

  while (entity.attributes.length > 0) {
    entity.removeAttribute(entity.attributes[0].name);
  }

  Object.entries(config.components).forEach(([component, value]) => {
    if (typeof value === "object") {
      entity.setAttribute(component, value);
    } else {
      entity.setAttribute(component, value);
    }
  });

  const textEntity = document.createElement("a-text");
  textEntity.setAttribute("value", config.name);
  textEntity.setAttribute("align", "center");
  textEntity.setAttribute("position", "0 1.5 0");
  textEntity.setAttribute("scale", "1.5 1.5 1.5");
  entity.appendChild(textEntity);
}

AFRAME.registerComponent("my-custom-component", {
  schema: {
    text: { type: "string", default: "" },
    number: { type: "number", default: 0 },
  },
  init: function () {
    console.log(
      `Custom component initialized with text: ${this.data.text} and number: ${this.data.number}`
    );
  },
});
