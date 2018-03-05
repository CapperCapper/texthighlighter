(function(window) {
  "use strict";

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  ColorPicker.prototype = {
    defaults: {
      colors: ["#FFFF7B"],
      class_selected: "selected"
    },
    onColorChange: function(callback) {
      this.callback = callback;
    }
  };
  /*
  @param {Object} - el - javascript dom element
  @param {Object} - options 
  @param {Array} - options.colors 
  @param {string} - options.colors[0] 
   */

  function ColorPicker(el, options) {
    var self = this;
    this.options = extend(this.defaults, options);
    this.colors = this.options.colors;
    this.color = this.options.colors[0];
    this.selected = null;
    this.colors.forEach(function(color) {
      var div = document.createElement("div");
      div.style.backgroundColor = color;

      if (self.color === color) {
        div.className = self.options.class_selected;
        self.selected = div;
      }

      div.addEventListener(
        "click",
        function() {
          if (color !== self.color) {
            self.color = color;

            if (self.selected) {
              self.selected.className = "";
            }
            self.selected = div;
            self.selected.className = self.options.class_selected;

            if (typeof self.callback === "function") {
              self.callback.call(self, color);
            }
          }
        },
        false
      );

      el.appendChild(div);
    });
  }

  window.ColorPicker = ColorPicker;
})(window);
