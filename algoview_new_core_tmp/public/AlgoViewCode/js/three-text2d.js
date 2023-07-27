!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e(require("THREE")))
    : "function" == typeof define && define.amd
    ? define(["THREE"], e)
    : "object" == typeof exports
    ? (exports.THREE_Text2D = e(require("THREE")))
    : (t.THREE_Text2D = e(t.THREE));
})(window, function (t) {
  return (function (t) {
    var e = {};
    function i(n) {
      if (e[n]) return e[n].exports;
      var r = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
    }
    return (
      (i.m = t),
      (i.c = e),
      (i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (i.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            i.d(
              n,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return n;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (i.p = ""),
      i((i.s = 3))
    );
  })([
    function (e, i) {
      e.exports = t;
    },
    function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(0);
      e.textAlign = {
        center: new n.Vector2(0, 0),
        left: new n.Vector2(1, 0),
        topLeft: new n.Vector2(1, -1),
        topRight: new n.Vector2(-1, -1),
        right: new n.Vector2(-1, 0),
        bottomLeft: new n.Vector2(1, 1),
        bottomRight: new n.Vector2(-1, 1),
      };
      var r = {};
      e.getFontHeight = function (t) {
        var e = r[t];
        if (!e) {
          var i = document.getElementsByTagName("body")[0],
            n = document.createElement("div"),
            s = document.createTextNode("MÉq");
          n.appendChild(s),
            n.setAttribute(
              "style",
              "font:" + t + ";position:absolute;top:0;left:0"
            ),
            i.appendChild(n),
            (e = n.offsetHeight),
            (r[t] = e),
            i.removeChild(n);
        }
        return e;
      };
    },
    function (t, e, i) {
      "use strict";
      var n,
        r =
          (this && this.__extends) ||
          ((n = function (t, e) {
            return (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
              })(t, e);
          }),
          function (t, e) {
            function i() {
              this.constructor = t;
            }
            n(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((i.prototype = e.prototype), new i()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var s = i(0),
        o = i(1),
        a = i(5),
        h = (function (t) {
          function e(e, i) {
            void 0 === e && (e = ""), void 0 === i && (i = {});
            var n = t.call(this) || this;
            return (
              (n._align = new s.Vector2()),
              (n._font = i.font || "30px Arial"),
              (n._fillStyle = i.fillStyle || "#FFFFFF"),
              (n._shadowColor = i.shadowColor || "rgba(0, 0, 0, 0)"),
              (n._shadowBlur = i.shadowBlur || 0),
              (n._shadowOffsetX = i.shadowOffsetX || 0),
              (n._shadowOffsetY = i.shadowOffsetY || 0),
              (n.canvas = new a.CanvasText()),
              (n.align = i.align || o.textAlign.center),
              (n.side = i.side || s.DoubleSide),
              (n.antialias = void 0 === i.antialias || i.antialias),
              (n.text = e),
              n
            );
          }
          return (
            r(e, t),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return this.canvas.textWidth;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return this.canvas.textHeight;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "text", {
              get: function () {
                return this._text;
              },
              set: function (t) {
                this._text !== t && ((this._text = t), this.updateText());
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "font", {
              get: function () {
                return this._font;
              },
              set: function (t) {
                this._font !== t && ((this._font = t), this.updateText());
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "fillStyle", {
              get: function () {
                return this._fillStyle;
              },
              set: function (t) {
                this._fillStyle !== t &&
                  ((this._fillStyle = t), this.updateText());
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "align", {
              get: function () {
                return this._align;
              },
              set: function (t) {
                this._align.copy(t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.cleanUp = function () {
              this.texture && this.texture.dispose();
            }),
            (e.prototype.applyAntiAlias = function () {
              !1 === this.antialias &&
                ((this.texture.magFilter = s.NearestFilter),
                (this.texture.minFilter = s.LinearMipMapLinearFilter));
            }),
            e
          );
        })(s.Object3D);
      e.Text2D = h;
    },
    function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(4);
      e.SpriteText2D = n.SpriteText2D;
      var r = i(6);
      e.MeshText2D = r.MeshText2D;
      var s = i(1);
      e.textAlign = s.textAlign;
    },
    function (t, e, i) {
      "use strict";
      var n,
        r =
          (this && this.__extends) ||
          ((n = function (t, e) {
            return (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
              })(t, e);
          }),
          function (t, e) {
            function i() {
              this.constructor = t;
            }
            n(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((i.prototype = e.prototype), new i()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var s = i(0),
        o = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            r(e, t),
            (e.prototype.raycast = function () {
              return this.sprite.raycast.apply(this.sprite, arguments);
            }),
            (e.prototype.updateText = function () {
              this.canvas.drawText(this._text, {
                font: this._font,
                fillStyle: this._fillStyle,
              }),
                this.cleanUp(),
                (this.texture = new s.Texture(this.canvas.canvas)),
                (this.texture.needsUpdate = !0),
                this.applyAntiAlias(),
                this.material
                  ? (this.material.map = this.texture)
                  : (this.material = new s.SpriteMaterial({
                      map: this.texture,
                    })),
                this.sprite ||
                  ((this.sprite = new s.Sprite(this.material)),
                  this.add(this.sprite)),
                this.sprite.scale.set(this.canvas.width, this.canvas.height, 1),
                this.updateAlign();
            }),
            (e.prototype.updateAlign = function () {
              this.sprite &&
                ((this.sprite.center.x =
                  (this._align.x * this.canvas.textWidth) / this.canvas.width),
                (this.sprite.center.y =
                  1 -
                  ((1 - this._align.y) * this.canvas.textHeight) /
                    this.canvas.height));
            }),
            Object.defineProperty(e.prototype, "align", {
              set: function (t) {
                this._align.copy(t),
                  this._align.multiplyScalar(0.5),
                  this._align.addScalar(0.5),
                  this.updateAlign();
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(i(2).Text2D);
      e.SpriteText2D = o;
    },
    function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(0),
        r = i(1),
        s = (function () {
          function t() {
            (this.textWidth = null),
              (this.textHeight = null),
              (this.canvas = document.createElement("canvas")),
              (this.ctx = this.canvas.getContext("2d"));
          }
          return (
            Object.defineProperty(t.prototype, "width", {
              get: function () {
                return this.canvas.width;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "height", {
              get: function () {
                return this.canvas.height;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.drawText = function (t, e) {
              return (
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                (this.ctx.font = e.font),
                (this.textWidth = Math.ceil(this.ctx.measureText(t).width)),
                (this.textHeight = r.getFontHeight(this.ctx.font)),
                (this.canvas.width = n.Math.ceilPowerOfTwo(this.textWidth)),
                (this.canvas.height = n.Math.ceilPowerOfTwo(this.textHeight)),
                (this.ctx.font = e.font),
                (this.ctx.fillStyle = e.fillStyle),
                (this.ctx.textAlign = "left"),
                (this.ctx.textBaseline = "top"),
                (this.ctx.shadowColor = e.shadowColor),
                (this.ctx.shadowBlur = e.shadowBlur),
                (this.ctx.shadowOffsetX = e.shadowOffsetX),
                (this.ctx.shadowOffsetY = e.shadowOffsetY),
                this.ctx.fillText(t, 0, 0),
                this.canvas
              );
            }),
            t
          );
        })();
      e.CanvasText = s;
    },
    function (t, e, i) {
      "use strict";
      var n,
        r =
          (this && this.__extends) ||
          ((n = function (t, e) {
            return (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
              })(t, e);
          }),
          function (t, e) {
            function i() {
              this.constructor = t;
            }
            n(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((i.prototype = e.prototype), new i()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var s = i(0),
        o = (function (t) {
          function e(e, i) {
            return (
              void 0 === e && (e = ""),
              void 0 === i && (i = {}),
              t.call(this, e, i) || this
            );
          }
          return (
            r(e, t),
            (e.prototype.raycast = function () {
              this.mesh.raycast.apply(this.mesh, arguments);
            }),
            (e.prototype.updateText = function () {
              this.cleanUp(),
                this.canvas.drawText(this._text, {
                  font: this._font,
                  fillStyle: this._fillStyle,
                  shadowBlur: this._shadowBlur,
                  shadowColor: this._shadowColor,
                  shadowOffsetX: this._shadowOffsetX,
                  shadowOffsetY: this._shadowOffsetY,
                }),
                (this.texture = new s.Texture(this.canvas.canvas)),
                (this.texture.needsUpdate = !0),
                this.applyAntiAlias(),
                this.material
                  ? (this.material.map = this.texture)
                  : ((this.material = new s.MeshBasicMaterial({
                      map: this.texture,
                      side: this.side,
                    })),
                    (this.material.transparent = !0)),
                this.mesh ||
                  ((this.geometry = new s.PlaneGeometry(
                    this.canvas.width,
                    this.canvas.height
                  )),
                  (this.mesh = new s.Mesh(this.geometry, this.material)),
                  this.add(this.mesh)),
                (this.mesh.position.x =
                  this.canvas.width / 2 -
                  this.canvas.textWidth / 2 +
                  (this.canvas.textWidth / 2) * this.align.x),
                (this.mesh.position.y =
                  -this.canvas.height / 2 +
                  (this.canvas.textHeight / 2) * this.align.y),
                (this.geometry.vertices[0].x = this.geometry.vertices[2].x =
                  -this.canvas.width / 2),
                (this.geometry.vertices[1].x = this.geometry.vertices[3].x =
                  this.canvas.width / 2),
                (this.geometry.vertices[0].y = this.geometry.vertices[1].y =
                  this.canvas.height / 2),
                (this.geometry.vertices[2].y = this.geometry.vertices[3].y =
                  -this.canvas.height / 2),
                (this.geometry.verticesNeedUpdate = !0);
            }),
            e
          );
        })(i(2).Text2D);
      e.MeshText2D = o;
    },
  ]);
});
