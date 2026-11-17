(() => {
  var ml = "170";
  var Pd = 0, sh = 1, Ld = 2;
  var vu = 1, gl = 2, Nn = 3, ai = 0, Fe = 1, un = 2, si = 0, as = 1, sa = 2, rh = 3, ah = 4, Dd = 5, bi = 100, Ud = 101, Nd = 102, Fd = 103, Od = 104, Bd = 200, zd = 201, kd = 202, Vd = 203, Go = 204, Wo = 205, Hd = 206, Gd = 207, Wd = 208, Xd = 209, qd = 210, Yd = 211, Zd = 212, Jd = 213, $d = 214, Xo = 0, qo = 1, Yo = 2, hs = 3, Zo = 4, Jo = 5, $o = 6, Ko = 7, yu = 0, Kd = 1, Qd = 2, ri = 0, jd = 1, tf = 2, ef = 3, _l = 4, nf = 5, sf = 6, rf = 7;
  var Mu = 300, us = 301, ds = 302, Qo = 303, jo = 304, Oa = 306, tc = 1e3, Ti = 1001, ec = 1002, Qe = 1003, af = 1004;
  var br = 1005;
  var Sn = 1006, oo = 1007;
  var Ai = 1008;
  var zn = 1009, Su = 1010, bu = 1011, Ks = 1012, xl = 1013, Ri = 1014, bn = 1015, ur = 1016, vl = 1017, yl = 1018, fs = 1020, Eu = 35902, wu = 1021, Tu = 1022, dn = 1023, Au = 1024, Ru = 1025, os = 1026, ps = 1027, Ml = 1028, Sl = 1029, Cu = 1030, bl = 1031;
  var El = 1033, jr = 33776, ta = 33777, ea = 33778, na = 33779, nc = 35840, ic = 35841, sc = 35842, rc = 35843, ac = 36196, oc = 37492, cc = 37496, lc = 37808, hc = 37809, uc = 37810, dc = 37811, fc = 37812, pc = 37813, mc = 37814, gc = 37815, _c = 37816, xc = 37817, vc = 37818, yc = 37819, Mc = 37820, Sc = 37821, ia = 36492, bc = 36494, Ec = 36495, Iu = 36283, wc = 36284, Tc = 36285, Ac = 36286;
  var ra = 2300, Rc = 2301, co = 2302, oh = 2400, ch = 2401, lh = 2402;
  var of = 3200, cf = 3201;
  var Pu = 0, lf = 1, ii = "", Xe = "srgb", Ms = "srgb-linear", Ba = "linear", oe = "srgb";
  var Gi = 7680;
  var hh = 519, hf = 512, uf = 513, df = 514, Lu = 515, ff = 516, pf = 517, mf = 518, gf = 519, uh = 35044;
  var dh = "300 es", On = 2e3, aa = 2001, oi = class {
    addEventListener(t, e) {
      this._listeners === void 0 && (this._listeners = {});
      let n = this._listeners;
      n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
    }
    hasEventListener(t, e) {
      if (this._listeners === void 0) return false;
      let n = this._listeners;
      return n[t] !== void 0 && n[t].indexOf(e) !== -1;
    }
    removeEventListener(t, e) {
      if (this._listeners === void 0) return;
      let s = this._listeners[t];
      if (s !== void 0) {
        let r = s.indexOf(e);
        r !== -1 && s.splice(r, 1);
      }
    }
    dispatchEvent(t) {
      if (this._listeners === void 0) return;
      let n = this._listeners[t.type];
      if (n !== void 0) {
        t.target = this;
        let s = n.slice(0);
        for (let r = 0, a = s.length; r < a; r++) s[r].call(this, t);
        t.target = null;
      }
    }
  }, De = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
  var lo = Math.PI / 180, Cc = 180 / Math.PI;
  function Ss() {
    let i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
    return (De[i & 255] + De[i >> 8 & 255] + De[i >> 16 & 255] + De[i >> 24 & 255] + "-" + De[t & 255] + De[t >> 8 & 255] + "-" + De[t >> 16 & 15 | 64] + De[t >> 24 & 255] + "-" + De[e & 63 | 128] + De[e >> 8 & 255] + "-" + De[e >> 16 & 255] + De[e >> 24 & 255] + De[n & 255] + De[n >> 8 & 255] + De[n >> 16 & 255] + De[n >> 24 & 255]).toLowerCase();
  }
  function Ne(i, t, e) {
    return Math.max(t, Math.min(e, i));
  }
  function _f(i, t) {
    return (i % t + t) % t;
  }
  function ho(i, t, e) {
    return (1 - e) * i + e * t;
  }
  function Os(i, t) {
    switch (t.constructor) {
      case Float32Array:
        return i;
      case Uint32Array:
        return i / 4294967295;
      case Uint16Array:
        return i / 65535;
      case Uint8Array:
        return i / 255;
      case Int32Array:
        return Math.max(i / 2147483647, -1);
      case Int16Array:
        return Math.max(i / 32767, -1);
      case Int8Array:
        return Math.max(i / 127, -1);
      default:
        throw new Error("Invalid component type.");
    }
  }
  function We(i, t) {
    switch (t.constructor) {
      case Float32Array:
        return i;
      case Uint32Array:
        return Math.round(i * 4294967295);
      case Uint16Array:
        return Math.round(i * 65535);
      case Uint8Array:
        return Math.round(i * 255);
      case Int32Array:
        return Math.round(i * 2147483647);
      case Int16Array:
        return Math.round(i * 32767);
      case Int8Array:
        return Math.round(i * 127);
      default:
        throw new Error("Invalid component type.");
    }
  }
  var ht = class i {
    constructor(t = 0, e = 0) {
      i.prototype.isVector2 = true, this.x = t, this.y = e;
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return this.x = t, this.y = e, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this;
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      let e = this.x, n = this.y, s = t.elements;
      return this.x = s[0] * e + s[3] * n + s[6], this.y = s[1] * e + s[4] * n + s[7], this;
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
    }
    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
    }
    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
    }
    clampLength(t, e) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(t) {
      let e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      let n = this.dot(t) / e;
      return Math.acos(Ne(n, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      let e = this.x - t.x, n = this.y - t.y;
      return e * e + n * n;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
    }
    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this;
    }
    rotateAround(t, e) {
      let n = Math.cos(e), s = Math.sin(e), r = this.x - t.x, a = this.y - t.y;
      return this.x = r * n - a * s + t.x, this.y = r * s + a * n + t.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y;
    }
  }, Xt = class i {
    constructor(t, e, n, s, r, a, o, c, l) {
      i.prototype.isMatrix3 = true, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, c, l);
    }
    set(t, e, n, s, r, a, o, c, l) {
      let h = this.elements;
      return h[0] = t, h[1] = s, h[2] = o, h[3] = e, h[4] = r, h[5] = c, h[6] = n, h[7] = a, h[8] = l, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(t) {
      let e = this.elements, n = t.elements;
      return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
    }
    extractBasis(t, e, n) {
      return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
    }
    setFromMatrix4(t) {
      let e = t.elements;
      return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      let n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[3], c = n[6], l = n[1], h = n[4], d = n[7], u = n[2], p = n[5], g = n[8], v = s[0], m = s[3], f = s[6], E = s[1], x = s[4], _ = s[7], D = s[2], R = s[5], C = s[8];
      return r[0] = a * v + o * E + c * D, r[3] = a * m + o * x + c * R, r[6] = a * f + o * _ + c * C, r[1] = l * v + h * E + d * D, r[4] = l * m + h * x + d * R, r[7] = l * f + h * _ + d * C, r[2] = u * v + p * E + g * D, r[5] = u * m + p * x + g * R, r[8] = u * f + p * _ + g * C, this;
    }
    multiplyScalar(t) {
      let e = this.elements;
      return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
    }
    determinant() {
      let t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], c = t[6], l = t[7], h = t[8];
      return e * a * h - e * o * l - n * r * h + n * o * c + s * r * l - s * a * c;
    }
    invert() {
      let t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], c = t[6], l = t[7], h = t[8], d = h * a - o * l, u = o * c - h * r, p = l * r - a * c, g = e * d + n * u + s * p;
      if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      let v = 1 / g;
      return t[0] = d * v, t[1] = (s * l - h * n) * v, t[2] = (o * n - s * a) * v, t[3] = u * v, t[4] = (h * e - s * c) * v, t[5] = (s * r - o * e) * v, t[6] = p * v, t[7] = (n * c - l * e) * v, t[8] = (a * e - n * r) * v, this;
    }
    transpose() {
      let t, e = this.elements;
      return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      let e = this.elements;
      return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
    }
    setUvTransform(t, e, n, s, r, a, o) {
      let c = Math.cos(r), l = Math.sin(r);
      return this.set(n * c, n * l, -n * (c * a + l * o) + a + t, -s * l, s * c, -s * (-l * a + c * o) + o + e, 0, 0, 1), this;
    }
    scale(t, e) {
      return this.premultiply(uo.makeScale(t, e)), this;
    }
    rotate(t) {
      return this.premultiply(uo.makeRotation(-t)), this;
    }
    translate(t, e) {
      return this.premultiply(uo.makeTranslation(t, e)), this;
    }
    makeTranslation(t, e) {
      return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
    }
    makeRotation(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(e, -n, 0, n, e, 0, 0, 0, 1), this;
    }
    makeScale(t, e) {
      return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
    }
    equals(t) {
      let e = this.elements, n = t.elements;
      for (let s = 0; s < 9; s++) if (e[s] !== n[s]) return false;
      return true;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      let n = this.elements;
      return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }, uo = new Xt();
  function Du(i) {
    for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return true;
    return false;
  }
  function oa(i) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", i);
  }
  function xf() {
    let i = oa("canvas");
    return i.style.display = "block", i;
  }
  var fh = {};
  function Xs(i) {
    i in fh || (fh[i] = true, console.warn(i));
  }
  function vf(i, t, e) {
    return new Promise(function(n, s) {
      function r() {
        switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
          case i.WAIT_FAILED:
            s();
            break;
          case i.TIMEOUT_EXPIRED:
            setTimeout(r, e);
            break;
          default:
            n();
        }
      }
      setTimeout(r, e);
    });
  }
  function yf(i) {
    let t = i.elements;
    t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
  }
  function Mf(i) {
    let t = i.elements;
    t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
  }
  var Qt = { enabled: true, workingColorSpace: Ms, spaces: {}, convert: function(i, t, e) {
    return this.enabled === false || t === e || !t || !e || (this.spaces[t].transfer === oe && (i.r = Bn(i.r), i.g = Bn(i.g), i.b = Bn(i.b)), this.spaces[t].primaries !== this.spaces[e].primaries && (i.applyMatrix3(this.spaces[t].toXYZ), i.applyMatrix3(this.spaces[e].fromXYZ)), this.spaces[e].transfer === oe && (i.r = cs(i.r), i.g = cs(i.g), i.b = cs(i.b))), i;
  }, fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this.workingColorSpace, t);
  }, toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this.workingColorSpace);
  }, getPrimaries: function(i) {
    return this.spaces[i].primaries;
  }, getTransfer: function(i) {
    return i === ii ? Ba : this.spaces[i].transfer;
  }, getLuminanceCoefficients: function(i, t = this.workingColorSpace) {
    return i.fromArray(this.spaces[t].luminanceCoefficients);
  }, define: function(i) {
    Object.assign(this.spaces, i);
  }, _getMatrix: function(i, t, e) {
    return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ);
  }, _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  }, _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  } };
  function Bn(i) {
    return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
  }
  function cs(i) {
    return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
  }
  var ph = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], mh = [0.2126, 0.7152, 0.0722], gh = [0.3127, 0.329], _h = new Xt().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), xh = new Xt().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
  Qt.define({ [Ms]: { primaries: ph, whitePoint: gh, transfer: Ba, toXYZ: _h, fromXYZ: xh, luminanceCoefficients: mh, workingColorSpaceConfig: { unpackColorSpace: Xe }, outputColorSpaceConfig: { drawingBufferColorSpace: Xe } }, [Xe]: { primaries: ph, whitePoint: gh, transfer: oe, toXYZ: _h, fromXYZ: xh, luminanceCoefficients: mh, outputColorSpaceConfig: { drawingBufferColorSpace: Xe } } });
  var Wi, Ic = class {
    static getDataURL(t) {
      if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
      let e;
      if (t instanceof HTMLCanvasElement) e = t;
      else {
        Wi === void 0 && (Wi = oa("canvas")), Wi.width = t.width, Wi.height = t.height;
        let n = Wi.getContext("2d");
        t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = Wi;
      }
      return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
    }
    static sRGBToLinear(t) {
      if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
        let e = oa("canvas");
        e.width = t.width, e.height = t.height;
        let n = e.getContext("2d");
        n.drawImage(t, 0, 0, t.width, t.height);
        let s = n.getImageData(0, 0, t.width, t.height), r = s.data;
        for (let a = 0; a < r.length; a++) r[a] = Bn(r[a] / 255) * 255;
        return n.putImageData(s, 0, 0), e;
      } else if (t.data) {
        let e = t.data.slice(0);
        for (let n = 0; n < e.length; n++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(Bn(e[n] / 255) * 255) : e[n] = Bn(e[n]);
        return { data: e, width: t.width, height: t.height };
      } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
    }
  }, Sf = 0, ca = class {
    constructor(t = null) {
      this.isSource = true, Object.defineProperty(this, "id", { value: Sf++ }), this.uuid = Ss(), this.data = t, this.dataReady = true, this.version = 0;
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string";
      if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
      let n = { uuid: this.uuid, url: "" }, s = this.data;
      if (s !== null) {
        let r;
        if (Array.isArray(s)) {
          r = [];
          for (let a = 0, o = s.length; a < o; a++) s[a].isDataTexture ? r.push(fo(s[a].image)) : r.push(fo(s[a]));
        } else r = fo(s);
        n.url = r;
      }
      return e || (t.images[this.uuid] = n), n;
    }
  };
  function fo(i) {
    return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Ic.getDataURL(i) : i.data ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  var bf = 0, je = class i extends oi {
    constructor(t = i.DEFAULT_IMAGE, e = i.DEFAULT_MAPPING, n = Ti, s = Ti, r = Sn, a = Ai, o = dn, c = zn, l = i.DEFAULT_ANISOTROPY, h = ii) {
      super(), this.isTexture = true, Object.defineProperty(this, "id", { value: bf++ }), this.uuid = Ss(), this.name = "", this.source = new ca(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new ht(0, 0), this.repeat = new ht(1, 1), this.center = new ht(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new Xt(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = false, this.pmremVersion = 0;
    }
    get image() {
      return this.source.data;
    }
    set image(t = null) {
      this.source.data = t;
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = true, this;
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string";
      if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
      let n = { metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(t).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
      return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(t) {
      if (this.mapping !== Mu) return t;
      if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
        case tc:
          t.x = t.x - Math.floor(t.x);
          break;
        case Ti:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case ec:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
      if (t.y < 0 || t.y > 1) switch (this.wrapT) {
        case tc:
          t.y = t.y - Math.floor(t.y);
          break;
        case Ti:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case ec:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
      return this.flipY && (t.y = 1 - t.y), t;
    }
    set needsUpdate(t) {
      t === true && (this.version++, this.source.needsUpdate = true);
    }
    set needsPMREMUpdate(t) {
      t === true && this.pmremVersion++;
    }
  };
  je.DEFAULT_IMAGE = null;
  je.DEFAULT_MAPPING = Mu;
  je.DEFAULT_ANISOTROPY = 1;
  var ye = class i {
    constructor(t = 0, e = 0, n = 0, s = 1) {
      i.prototype.isVector4 = true, this.x = t, this.y = e, this.z = n, this.w = s;
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, n, s) {
      return this.x = t, this.y = e, this.z = n, this.w = s, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this.w = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setZ(t) {
      return this.z = t, this;
    }
    setW(t) {
      return this.w = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this.w += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }
    applyMatrix4(t) {
      let e = this.x, n = this.y, s = this.z, r = this.w, a = t.elements;
      return this.x = a[0] * e + a[4] * n + a[8] * s + a[12] * r, this.y = a[1] * e + a[5] * n + a[9] * s + a[13] * r, this.z = a[2] * e + a[6] * n + a[10] * s + a[14] * r, this.w = a[3] * e + a[7] * n + a[11] * s + a[15] * r, this;
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      let e = Math.sqrt(1 - t.w * t.w);
      return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, n, s, r, c = t.elements, l = c[0], h = c[4], d = c[8], u = c[1], p = c[5], g = c[9], v = c[2], m = c[6], f = c[10];
      if (Math.abs(h - u) < 0.01 && Math.abs(d - v) < 0.01 && Math.abs(g - m) < 0.01) {
        if (Math.abs(h + u) < 0.1 && Math.abs(d + v) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(l + p + f - 3) < 0.1) return this.set(1, 0, 0, 0), this;
        e = Math.PI;
        let x = (l + 1) / 2, _ = (p + 1) / 2, D = (f + 1) / 2, R = (h + u) / 4, C = (d + v) / 4, L = (g + m) / 4;
        return x > _ && x > D ? x < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(x), s = R / n, r = C / n) : _ > D ? _ < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(_), n = R / s, r = L / s) : D < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(D), n = C / r, s = L / r), this.set(n, s, r, e), this;
      }
      let E = Math.sqrt((m - g) * (m - g) + (d - v) * (d - v) + (u - h) * (u - h));
      return Math.abs(E) < 1e-3 && (E = 1), this.x = (m - g) / E, this.y = (d - v) / E, this.z = (u - h) / E, this.w = Math.acos((l + p + f - 1) / 2), this;
    }
    setFromMatrixPosition(t) {
      let e = t.elements;
      return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
    }
    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
    }
    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
    }
    clampLength(t, e) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
    }
    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w;
    }
  }, Pc = class extends oi {
    constructor(t = 1, e = 1, n = {}) {
      super(), this.isRenderTarget = true, this.width = t, this.height = e, this.depth = 1, this.scissor = new ye(0, 0, t, e), this.scissorTest = false, this.viewport = new ye(0, 0, t, e);
      let s = { width: t, height: e, depth: 1 };
      n = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: Sn, depthBuffer: true, stencilBuffer: false, resolveDepthBuffer: true, resolveStencilBuffer: true, depthTexture: null, samples: 0, count: 1 }, n);
      let r = new je(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
      r.flipY = false, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
      let a = n.count;
      for (let o = 0; o < a; o++) this.textures[o] = r.clone(), this.textures[o].isRenderTargetTexture = true;
      this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
    }
    get texture() {
      return this.textures[0];
    }
    set texture(t) {
      this.textures[0] = t;
    }
    setSize(t, e, n = 1) {
      if (this.width !== t || this.height !== e || this.depth !== n) {
        this.width = t, this.height = e, this.depth = n;
        for (let s = 0, r = this.textures.length; s < r; s++) this.textures[s].image.width = t, this.textures[s].image.height = e, this.textures[s].image.depth = n;
        this.dispose();
      }
      this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
      for (let n = 0, s = t.textures.length; n < s; n++) this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = true;
      let e = Object.assign({}, t.texture.image);
      return this.texture.source = new ca(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }, kn = class extends Pc {
    constructor(t = 1, e = 1, n = {}) {
      super(t, e, n), this.isWebGLRenderTarget = true;
    }
  }, la = class extends je {
    constructor(t = null, e = 1, n = 1, s = 1) {
      super(null), this.isDataArrayTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Qe, this.minFilter = Qe, this.wrapR = Ti, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
    }
    addLayerUpdate(t) {
      this.layerUpdates.add(t);
    }
    clearLayerUpdates() {
      this.layerUpdates.clear();
    }
  };
  var Lc = class extends je {
    constructor(t = null, e = 1, n = 1, s = 1) {
      super(null), this.isData3DTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Qe, this.minFilter = Qe, this.wrapR = Ti, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  };
  var fn = class {
    constructor(t = 0, e = 0, n = 0, s = 1) {
      this.isQuaternion = true, this._x = t, this._y = e, this._z = n, this._w = s;
    }
    static slerpFlat(t, e, n, s, r, a, o) {
      let c = n[s + 0], l = n[s + 1], h = n[s + 2], d = n[s + 3], u = r[a + 0], p = r[a + 1], g = r[a + 2], v = r[a + 3];
      if (o === 0) {
        t[e + 0] = c, t[e + 1] = l, t[e + 2] = h, t[e + 3] = d;
        return;
      }
      if (o === 1) {
        t[e + 0] = u, t[e + 1] = p, t[e + 2] = g, t[e + 3] = v;
        return;
      }
      if (d !== v || c !== u || l !== p || h !== g) {
        let m = 1 - o, f = c * u + l * p + h * g + d * v, E = f >= 0 ? 1 : -1, x = 1 - f * f;
        if (x > Number.EPSILON) {
          let D = Math.sqrt(x), R = Math.atan2(D, f * E);
          m = Math.sin(m * R) / D, o = Math.sin(o * R) / D;
        }
        let _ = o * E;
        if (c = c * m + u * _, l = l * m + p * _, h = h * m + g * _, d = d * m + v * _, m === 1 - o) {
          let D = 1 / Math.sqrt(c * c + l * l + h * h + d * d);
          c *= D, l *= D, h *= D, d *= D;
        }
      }
      t[e] = c, t[e + 1] = l, t[e + 2] = h, t[e + 3] = d;
    }
    static multiplyQuaternionsFlat(t, e, n, s, r, a) {
      let o = n[s], c = n[s + 1], l = n[s + 2], h = n[s + 3], d = r[a], u = r[a + 1], p = r[a + 2], g = r[a + 3];
      return t[e] = o * g + h * d + c * p - l * u, t[e + 1] = c * g + h * u + l * d - o * p, t[e + 2] = l * g + h * p + o * u - c * d, t[e + 3] = h * g - o * d - c * u - l * p, t;
    }
    get x() {
      return this._x;
    }
    set x(t) {
      this._x = t, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      this._y = t, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      this._z = t, this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      this._w = t, this._onChangeCallback();
    }
    set(t, e, n, s) {
      return this._x = t, this._y = e, this._z = n, this._w = s, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
    }
    setFromEuler(t, e = true) {
      let n = t._x, s = t._y, r = t._z, a = t._order, o = Math.cos, c = Math.sin, l = o(n / 2), h = o(s / 2), d = o(r / 2), u = c(n / 2), p = c(s / 2), g = c(r / 2);
      switch (a) {
        case "XYZ":
          this._x = u * h * d + l * p * g, this._y = l * p * d - u * h * g, this._z = l * h * g + u * p * d, this._w = l * h * d - u * p * g;
          break;
        case "YXZ":
          this._x = u * h * d + l * p * g, this._y = l * p * d - u * h * g, this._z = l * h * g - u * p * d, this._w = l * h * d + u * p * g;
          break;
        case "ZXY":
          this._x = u * h * d - l * p * g, this._y = l * p * d + u * h * g, this._z = l * h * g + u * p * d, this._w = l * h * d - u * p * g;
          break;
        case "ZYX":
          this._x = u * h * d - l * p * g, this._y = l * p * d + u * h * g, this._z = l * h * g - u * p * d, this._w = l * h * d + u * p * g;
          break;
        case "YZX":
          this._x = u * h * d + l * p * g, this._y = l * p * d + u * h * g, this._z = l * h * g - u * p * d, this._w = l * h * d - u * p * g;
          break;
        case "XZY":
          this._x = u * h * d - l * p * g, this._y = l * p * d - u * h * g, this._z = l * h * g + u * p * d, this._w = l * h * d + u * p * g;
          break;
        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
      }
      return e === true && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      let n = e / 2, s = Math.sin(n);
      return this._x = t.x * s, this._y = t.y * s, this._z = t.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
    }
    setFromRotationMatrix(t) {
      let e = t.elements, n = e[0], s = e[4], r = e[8], a = e[1], o = e[5], c = e[9], l = e[2], h = e[6], d = e[10], u = n + o + d;
      if (u > 0) {
        let p = 0.5 / Math.sqrt(u + 1);
        this._w = 0.25 / p, this._x = (h - c) * p, this._y = (r - l) * p, this._z = (a - s) * p;
      } else if (n > o && n > d) {
        let p = 2 * Math.sqrt(1 + n - o - d);
        this._w = (h - c) / p, this._x = 0.25 * p, this._y = (s + a) / p, this._z = (r + l) / p;
      } else if (o > d) {
        let p = 2 * Math.sqrt(1 + o - n - d);
        this._w = (r - l) / p, this._x = (s + a) / p, this._y = 0.25 * p, this._z = (c + h) / p;
      } else {
        let p = 2 * Math.sqrt(1 + d - n - o);
        this._w = (a - s) / p, this._x = (r + l) / p, this._y = (c + h) / p, this._z = 0.25 * p;
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let n = t.dot(e) + 1;
      return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(Ne(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      let n = this.angleTo(t);
      if (n === 0) return this;
      let s = Math.min(1, e / n);
      return this.slerp(t, s), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let t = this.length();
      return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
    }
    multiply(t) {
      return this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      let n = t._x, s = t._y, r = t._z, a = t._w, o = e._x, c = e._y, l = e._z, h = e._w;
      return this._x = n * h + a * o + s * l - r * c, this._y = s * h + a * c + r * o - n * l, this._z = r * h + a * l + n * c - s * o, this._w = a * h - n * o - s * c - r * l, this._onChangeCallback(), this;
    }
    slerp(t, e) {
      if (e === 0) return this;
      if (e === 1) return this.copy(t);
      let n = this._x, s = this._y, r = this._z, a = this._w, o = a * t._w + n * t._x + s * t._y + r * t._z;
      if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1) return this._w = a, this._x = n, this._y = s, this._z = r, this;
      let c = 1 - o * o;
      if (c <= Number.EPSILON) {
        let p = 1 - e;
        return this._w = p * a + e * this._w, this._x = p * n + e * this._x, this._y = p * s + e * this._y, this._z = p * r + e * this._z, this.normalize(), this;
      }
      let l = Math.sqrt(c), h = Math.atan2(l, o), d = Math.sin((1 - e) * h) / l, u = Math.sin(e * h) / l;
      return this._w = a * d + this._w * u, this._x = n * d + this._x * u, this._y = s * d + this._y * u, this._z = r * d + this._z * u, this._onChangeCallback(), this;
    }
    slerpQuaternions(t, e, n) {
      return this.copy(t).slerp(e, n);
    }
    random() {
      let t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n);
      return this.set(s * Math.sin(t), s * Math.cos(t), r * Math.sin(e), r * Math.cos(e));
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
    }
    fromArray(t, e = 0) {
      return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
    }
    fromBufferAttribute(t, e) {
      return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(t) {
      return this._onChangeCallback = t, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  }, T = class i {
    constructor(t = 0, e = 0, n = 0) {
      i.prototype.isVector3 = true, this.x = t, this.y = e, this.z = n;
    }
    set(t, e, n) {
      return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setZ(t) {
      return this.z = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this;
    }
    multiplyVectors(t, e) {
      return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
    }
    applyEuler(t) {
      return this.applyQuaternion(vh.setFromEuler(t));
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(vh.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      let e = this.x, n = this.y, s = this.z, r = t.elements;
      return this.x = r[0] * e + r[3] * n + r[6] * s, this.y = r[1] * e + r[4] * n + r[7] * s, this.z = r[2] * e + r[5] * n + r[8] * s, this;
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      let e = this.x, n = this.y, s = this.z, r = t.elements, a = 1 / (r[3] * e + r[7] * n + r[11] * s + r[15]);
      return this.x = (r[0] * e + r[4] * n + r[8] * s + r[12]) * a, this.y = (r[1] * e + r[5] * n + r[9] * s + r[13]) * a, this.z = (r[2] * e + r[6] * n + r[10] * s + r[14]) * a, this;
    }
    applyQuaternion(t) {
      let e = this.x, n = this.y, s = this.z, r = t.x, a = t.y, o = t.z, c = t.w, l = 2 * (a * s - o * n), h = 2 * (o * e - r * s), d = 2 * (r * n - a * e);
      return this.x = e + c * l + a * d - o * h, this.y = n + c * h + o * l - r * d, this.z = s + c * d + r * h - a * l, this;
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
    }
    transformDirection(t) {
      let e = this.x, n = this.y, s = this.z, r = t.elements;
      return this.x = r[0] * e + r[4] * n + r[8] * s, this.y = r[1] * e + r[5] * n + r[9] * s, this.z = r[2] * e + r[6] * n + r[10] * s, this.normalize();
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
    }
    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
    }
    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
    }
    clampLength(t, e) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
    }
    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
    }
    cross(t) {
      return this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      let n = t.x, s = t.y, r = t.z, a = e.x, o = e.y, c = e.z;
      return this.x = s * c - r * o, this.y = r * a - n * c, this.z = n * o - s * a, this;
    }
    projectOnVector(t) {
      let e = t.lengthSq();
      if (e === 0) return this.set(0, 0, 0);
      let n = t.dot(this) / e;
      return this.copy(t).multiplyScalar(n);
    }
    projectOnPlane(t) {
      return po.copy(this).projectOnVector(t), this.sub(po);
    }
    reflect(t) {
      return this.sub(po.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      let e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      let n = this.dot(t) / e;
      return Math.acos(Ne(n, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      let e = this.x - t.x, n = this.y - t.y, s = this.z - t.z;
      return e * e + n * n + s * s;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, n) {
      let s = Math.sin(e) * t;
      return this.x = s * Math.sin(n), this.y = Math.cos(e) * t, this.z = s * Math.cos(n), this;
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, n) {
      return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
    }
    setFromMatrixPosition(t) {
      let e = t.elements;
      return this.x = e[12], this.y = e[13], this.z = e[14], this;
    }
    setFromMatrixScale(t) {
      let e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), s = this.setFromMatrixColumn(t, 2).length();
      return this.x = e, this.y = n, this.z = s, this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, e * 4);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, e * 3);
    }
    setFromEuler(t) {
      return this.x = t._x, this.y = t._y, this.z = t._z, this;
    }
    setFromColor(t) {
      return this.x = t.r, this.y = t.g, this.z = t.b, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }
    randomDirection() {
      let t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
      return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  }, po = new T(), vh = new fn(), Vn = class {
    constructor(t = new T(1 / 0, 1 / 0, 1 / 0), e = new T(-1 / 0, -1 / 0, -1 / 0)) {
      this.isBox3 = true, this.min = t, this.max = e;
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromArray(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(cn.fromArray(t, e));
      return this;
    }
    setFromBufferAttribute(t) {
      this.makeEmpty();
      for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(cn.fromBufferAttribute(t, e));
      return this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      let n = cn.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
    }
    setFromObject(t, e = false) {
      return this.makeEmpty(), this.expandByObject(t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    expandByObject(t, e = false) {
      t.updateWorldMatrix(false, false);
      let n = t.geometry;
      if (n !== void 0) {
        let r = n.getAttribute("position");
        if (e === true && r !== void 0 && t.isInstancedMesh !== true) for (let a = 0, o = r.count; a < o; a++) t.isMesh === true ? t.getVertexPosition(a, cn) : cn.fromBufferAttribute(r, a), cn.applyMatrix4(t.matrixWorld), this.expandByPoint(cn);
        else t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Er.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Er.copy(n.boundingBox)), Er.applyMatrix4(t.matrixWorld), this.union(Er);
      }
      let s = t.children;
      for (let r = 0, a = s.length; r < a; r++) this.expandByObject(s[r], e);
      return this;
    }
    containsPoint(t) {
      return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
    }
    containsBox(t) {
      return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
    }
    getParameter(t, e) {
      return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(t) {
      return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
    }
    intersectsSphere(t) {
      return this.clampPoint(t.center, cn), cn.distanceToSquared(t.center) <= t.radius * t.radius;
    }
    intersectsPlane(t) {
      let e, n;
      return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return false;
      this.getCenter(Bs), wr.subVectors(this.max, Bs), Xi.subVectors(t.a, Bs), qi.subVectors(t.b, Bs), Yi.subVectors(t.c, Bs), Kn.subVectors(qi, Xi), Qn.subVectors(Yi, qi), gi.subVectors(Xi, Yi);
      let e = [0, -Kn.z, Kn.y, 0, -Qn.z, Qn.y, 0, -gi.z, gi.y, Kn.z, 0, -Kn.x, Qn.z, 0, -Qn.x, gi.z, 0, -gi.x, -Kn.y, Kn.x, 0, -Qn.y, Qn.x, 0, -gi.y, gi.x, 0];
      return !mo(e, Xi, qi, Yi, wr) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !mo(e, Xi, qi, Yi, wr)) ? false : (Tr.crossVectors(Kn, Qn), e = [Tr.x, Tr.y, Tr.z], mo(e, Xi, qi, Yi, wr));
    }
    clampPoint(t, e) {
      return e.copy(t).clamp(this.min, this.max);
    }
    distanceToPoint(t) {
      return this.clampPoint(t, cn).distanceTo(t);
    }
    getBoundingSphere(t) {
      return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(cn).length() * 0.5), t;
    }
    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    applyMatrix4(t) {
      return this.isEmpty() ? this : (In[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), In[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), In[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), In[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), In[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), In[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), In[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), In[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(In), this);
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }, In = [new T(), new T(), new T(), new T(), new T(), new T(), new T(), new T()], cn = new T(), Er = new Vn(), Xi = new T(), qi = new T(), Yi = new T(), Kn = new T(), Qn = new T(), gi = new T(), Bs = new T(), wr = new T(), Tr = new T(), _i = new T();
  function mo(i, t, e, n, s) {
    for (let r = 0, a = i.length - 3; r <= a; r += 3) {
      _i.fromArray(i, r);
      let o = s.x * Math.abs(_i.x) + s.y * Math.abs(_i.y) + s.z * Math.abs(_i.z), c = t.dot(_i), l = e.dot(_i), h = n.dot(_i);
      if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > o) return false;
    }
    return true;
  }
  var Ef = new Vn(), zs = new T(), go = new T(), Hn = class {
    constructor(t = new T(), e = -1) {
      this.isSphere = true, this.center = t, this.radius = e;
    }
    set(t, e) {
      return this.center.copy(t), this.radius = e, this;
    }
    setFromPoints(t, e) {
      let n = this.center;
      e !== void 0 ? n.copy(e) : Ef.setFromPoints(t).getCenter(n);
      let s = 0;
      for (let r = 0, a = t.length; r < a; r++) s = Math.max(s, n.distanceToSquared(t[r]));
      return this.radius = Math.sqrt(s), this;
    }
    copy(t) {
      return this.center.copy(t.center), this.radius = t.radius, this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = -1, this;
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      let e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      let n = this.center.distanceToSquared(t);
      return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
    }
    getBoundingBox(t) {
      return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
    }
    applyMatrix4(t) {
      return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
    }
    translate(t) {
      return this.center.add(t), this;
    }
    expandByPoint(t) {
      if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
      zs.subVectors(t, this.center);
      let e = zs.lengthSq();
      if (e > this.radius * this.radius) {
        let n = Math.sqrt(e), s = (n - this.radius) * 0.5;
        this.center.addScaledVector(zs, s / n), this.radius += s;
      }
      return this;
    }
    union(t) {
      return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === true ? this.radius = Math.max(this.radius, t.radius) : (go.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(zs.copy(t.center).add(go)), this.expandByPoint(zs.copy(t.center).sub(go))), this);
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, Pn = new T(), _o = new T(), Ar = new T(), jn = new T(), xo = new T(), Rr = new T(), vo = new T(), ms = class {
    constructor(t = new T(), e = new T(0, 0, -1)) {
      this.origin = t, this.direction = e;
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }
    at(t, e) {
      return e.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }
    recast(t) {
      return this.origin.copy(this.at(t, Pn)), this;
    }
    closestPointToPoint(t, e) {
      e.subVectors(t, this.origin);
      let n = e.dot(this.direction);
      return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }
    distanceSqToPoint(t) {
      let e = Pn.subVectors(t, this.origin).dot(this.direction);
      return e < 0 ? this.origin.distanceToSquared(t) : (Pn.copy(this.origin).addScaledVector(this.direction, e), Pn.distanceToSquared(t));
    }
    distanceSqToSegment(t, e, n, s) {
      _o.copy(t).add(e).multiplyScalar(0.5), Ar.copy(e).sub(t).normalize(), jn.copy(this.origin).sub(_o);
      let r = t.distanceTo(e) * 0.5, a = -this.direction.dot(Ar), o = jn.dot(this.direction), c = -jn.dot(Ar), l = jn.lengthSq(), h = Math.abs(1 - a * a), d, u, p, g;
      if (h > 0) if (d = a * c - o, u = a * o - c, g = r * h, d >= 0) if (u >= -g) if (u <= g) {
        let v = 1 / h;
        d *= v, u *= v, p = d * (d + a * u + 2 * o) + u * (a * d + u + 2 * c) + l;
      } else u = r, d = Math.max(0, -(a * u + o)), p = -d * d + u * (u + 2 * c) + l;
      else u = -r, d = Math.max(0, -(a * u + o)), p = -d * d + u * (u + 2 * c) + l;
      else u <= -g ? (d = Math.max(0, -(-a * r + o)), u = d > 0 ? -r : Math.min(Math.max(-r, -c), r), p = -d * d + u * (u + 2 * c) + l) : u <= g ? (d = 0, u = Math.min(Math.max(-r, -c), r), p = u * (u + 2 * c) + l) : (d = Math.max(0, -(a * r + o)), u = d > 0 ? r : Math.min(Math.max(-r, -c), r), p = -d * d + u * (u + 2 * c) + l);
      else u = a > 0 ? -r : r, d = Math.max(0, -(a * u + o)), p = -d * d + u * (u + 2 * c) + l;
      return n && n.copy(this.origin).addScaledVector(this.direction, d), s && s.copy(_o).addScaledVector(Ar, u), p;
    }
    intersectSphere(t, e) {
      Pn.subVectors(t.center, this.origin);
      let n = Pn.dot(this.direction), s = Pn.dot(Pn) - n * n, r = t.radius * t.radius;
      if (s > r) return null;
      let a = Math.sqrt(r - s), o = n - a, c = n + a;
      return c < 0 ? null : o < 0 ? this.at(c, e) : this.at(o, e);
    }
    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }
    distanceToPlane(t) {
      let e = t.normal.dot(this.direction);
      if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
      let n = -(this.origin.dot(t.normal) + t.constant) / e;
      return n >= 0 ? n : null;
    }
    intersectPlane(t, e) {
      let n = this.distanceToPlane(t);
      return n === null ? null : this.at(n, e);
    }
    intersectsPlane(t) {
      let e = t.distanceToPoint(this.origin);
      return e === 0 || t.normal.dot(this.direction) * e < 0;
    }
    intersectBox(t, e) {
      let n, s, r, a, o, c, l = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, u = this.origin;
      return l >= 0 ? (n = (t.min.x - u.x) * l, s = (t.max.x - u.x) * l) : (n = (t.max.x - u.x) * l, s = (t.min.x - u.x) * l), h >= 0 ? (r = (t.min.y - u.y) * h, a = (t.max.y - u.y) * h) : (r = (t.max.y - u.y) * h, a = (t.min.y - u.y) * h), n > a || r > s || ((r > n || isNaN(n)) && (n = r), (a < s || isNaN(s)) && (s = a), d >= 0 ? (o = (t.min.z - u.z) * d, c = (t.max.z - u.z) * d) : (o = (t.max.z - u.z) * d, c = (t.min.z - u.z) * d), n > c || o > s) || ((o > n || n !== n) && (n = o), (c < s || s !== s) && (s = c), s < 0) ? null : this.at(n >= 0 ? n : s, e);
    }
    intersectsBox(t) {
      return this.intersectBox(t, Pn) !== null;
    }
    intersectTriangle(t, e, n, s, r) {
      xo.subVectors(e, t), Rr.subVectors(n, t), vo.crossVectors(xo, Rr);
      let a = this.direction.dot(vo), o;
      if (a > 0) {
        if (s) return null;
        o = 1;
      } else if (a < 0) o = -1, a = -a;
      else return null;
      jn.subVectors(this.origin, t);
      let c = o * this.direction.dot(Rr.crossVectors(jn, Rr));
      if (c < 0) return null;
      let l = o * this.direction.dot(xo.cross(jn));
      if (l < 0 || c + l > a) return null;
      let h = -o * jn.dot(vo);
      return h < 0 ? null : this.at(h / a, r);
    }
    applyMatrix4(t) {
      return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, ee = class i {
    constructor(t, e, n, s, r, a, o, c, l, h, d, u, p, g, v, m) {
      i.prototype.isMatrix4 = true, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, c, l, h, d, u, p, g, v, m);
    }
    set(t, e, n, s, r, a, o, c, l, h, d, u, p, g, v, m) {
      let f = this.elements;
      return f[0] = t, f[4] = e, f[8] = n, f[12] = s, f[1] = r, f[5] = a, f[9] = o, f[13] = c, f[2] = l, f[6] = h, f[10] = d, f[14] = u, f[3] = p, f[7] = g, f[11] = v, f[15] = m, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new i().fromArray(this.elements);
    }
    copy(t) {
      let e = this.elements, n = t.elements;
      return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
    }
    copyPosition(t) {
      let e = this.elements, n = t.elements;
      return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
    }
    setFromMatrix3(t) {
      let e = t.elements;
      return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
    }
    extractBasis(t, e, n) {
      return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
    }
    makeBasis(t, e, n) {
      return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this;
    }
    extractRotation(t) {
      let e = this.elements, n = t.elements, s = 1 / Zi.setFromMatrixColumn(t, 0).length(), r = 1 / Zi.setFromMatrixColumn(t, 1).length(), a = 1 / Zi.setFromMatrixColumn(t, 2).length();
      return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }
    makeRotationFromEuler(t) {
      let e = this.elements, n = t.x, s = t.y, r = t.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(s), l = Math.sin(s), h = Math.cos(r), d = Math.sin(r);
      if (t.order === "XYZ") {
        let u = a * h, p = a * d, g = o * h, v = o * d;
        e[0] = c * h, e[4] = -c * d, e[8] = l, e[1] = p + g * l, e[5] = u - v * l, e[9] = -o * c, e[2] = v - u * l, e[6] = g + p * l, e[10] = a * c;
      } else if (t.order === "YXZ") {
        let u = c * h, p = c * d, g = l * h, v = l * d;
        e[0] = u + v * o, e[4] = g * o - p, e[8] = a * l, e[1] = a * d, e[5] = a * h, e[9] = -o, e[2] = p * o - g, e[6] = v + u * o, e[10] = a * c;
      } else if (t.order === "ZXY") {
        let u = c * h, p = c * d, g = l * h, v = l * d;
        e[0] = u - v * o, e[4] = -a * d, e[8] = g + p * o, e[1] = p + g * o, e[5] = a * h, e[9] = v - u * o, e[2] = -a * l, e[6] = o, e[10] = a * c;
      } else if (t.order === "ZYX") {
        let u = a * h, p = a * d, g = o * h, v = o * d;
        e[0] = c * h, e[4] = g * l - p, e[8] = u * l + v, e[1] = c * d, e[5] = v * l + u, e[9] = p * l - g, e[2] = -l, e[6] = o * c, e[10] = a * c;
      } else if (t.order === "YZX") {
        let u = a * c, p = a * l, g = o * c, v = o * l;
        e[0] = c * h, e[4] = v - u * d, e[8] = g * d + p, e[1] = d, e[5] = a * h, e[9] = -o * h, e[2] = -l * h, e[6] = p * d + g, e[10] = u - v * d;
      } else if (t.order === "XZY") {
        let u = a * c, p = a * l, g = o * c, v = o * l;
        e[0] = c * h, e[4] = -d, e[8] = l * h, e[1] = u * d + v, e[5] = a * h, e[9] = p * d - g, e[2] = g * d - p, e[6] = o * h, e[10] = v * d + u;
      }
      return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }
    makeRotationFromQuaternion(t) {
      return this.compose(wf, t, Tf);
    }
    lookAt(t, e, n) {
      let s = this.elements;
      return $e.subVectors(t, e), $e.lengthSq() === 0 && ($e.z = 1), $e.normalize(), ti.crossVectors(n, $e), ti.lengthSq() === 0 && (Math.abs(n.z) === 1 ? $e.x += 1e-4 : $e.z += 1e-4, $e.normalize(), ti.crossVectors(n, $e)), ti.normalize(), Cr.crossVectors($e, ti), s[0] = ti.x, s[4] = Cr.x, s[8] = $e.x, s[1] = ti.y, s[5] = Cr.y, s[9] = $e.y, s[2] = ti.z, s[6] = Cr.z, s[10] = $e.z, this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      let n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], h = n[1], d = n[5], u = n[9], p = n[13], g = n[2], v = n[6], m = n[10], f = n[14], E = n[3], x = n[7], _ = n[11], D = n[15], R = s[0], C = s[4], L = s[8], b = s[12], M = s[1], I = s[5], H = s[9], B = s[13], G = s[2], $ = s[6], W = s[10], nt = s[14], X = s[3], lt = s[7], xt = s[11], Et = s[15];
      return r[0] = a * R + o * M + c * G + l * X, r[4] = a * C + o * I + c * $ + l * lt, r[8] = a * L + o * H + c * W + l * xt, r[12] = a * b + o * B + c * nt + l * Et, r[1] = h * R + d * M + u * G + p * X, r[5] = h * C + d * I + u * $ + p * lt, r[9] = h * L + d * H + u * W + p * xt, r[13] = h * b + d * B + u * nt + p * Et, r[2] = g * R + v * M + m * G + f * X, r[6] = g * C + v * I + m * $ + f * lt, r[10] = g * L + v * H + m * W + f * xt, r[14] = g * b + v * B + m * nt + f * Et, r[3] = E * R + x * M + _ * G + D * X, r[7] = E * C + x * I + _ * $ + D * lt, r[11] = E * L + x * H + _ * W + D * xt, r[15] = E * b + x * B + _ * nt + D * Et, this;
    }
    multiplyScalar(t) {
      let e = this.elements;
      return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
    }
    determinant() {
      let t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], a = t[1], o = t[5], c = t[9], l = t[13], h = t[2], d = t[6], u = t[10], p = t[14], g = t[3], v = t[7], m = t[11], f = t[15];
      return g * (+r * c * d - s * l * d - r * o * u + n * l * u + s * o * p - n * c * p) + v * (+e * c * p - e * l * u + r * a * u - s * a * p + s * l * h - r * c * h) + m * (+e * l * d - e * o * p - r * a * d + n * a * p + r * o * h - n * l * h) + f * (-s * o * h - e * c * d + e * o * u + s * a * d - n * a * u + n * c * h);
    }
    transpose() {
      let t = this.elements, e;
      return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
    }
    setPosition(t, e, n) {
      let s = this.elements;
      return t.isVector3 ? (s[12] = t.x, s[13] = t.y, s[14] = t.z) : (s[12] = t, s[13] = e, s[14] = n), this;
    }
    invert() {
      let t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], c = t[6], l = t[7], h = t[8], d = t[9], u = t[10], p = t[11], g = t[12], v = t[13], m = t[14], f = t[15], E = d * m * l - v * u * l + v * c * p - o * m * p - d * c * f + o * u * f, x = g * u * l - h * m * l - g * c * p + a * m * p + h * c * f - a * u * f, _ = h * v * l - g * d * l + g * o * p - a * v * p - h * o * f + a * d * f, D = g * d * c - h * v * c - g * o * u + a * v * u + h * o * m - a * d * m, R = e * E + n * x + s * _ + r * D;
      if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let C = 1 / R;
      return t[0] = E * C, t[1] = (v * u * r - d * m * r - v * s * p + n * m * p + d * s * f - n * u * f) * C, t[2] = (o * m * r - v * c * r + v * s * l - n * m * l - o * s * f + n * c * f) * C, t[3] = (d * c * r - o * u * r - d * s * l + n * u * l + o * s * p - n * c * p) * C, t[4] = x * C, t[5] = (h * m * r - g * u * r + g * s * p - e * m * p - h * s * f + e * u * f) * C, t[6] = (g * c * r - a * m * r - g * s * l + e * m * l + a * s * f - e * c * f) * C, t[7] = (a * u * r - h * c * r + h * s * l - e * u * l - a * s * p + e * c * p) * C, t[8] = _ * C, t[9] = (g * d * r - h * v * r - g * n * p + e * v * p + h * n * f - e * d * f) * C, t[10] = (a * v * r - g * o * r + g * n * l - e * v * l - a * n * f + e * o * f) * C, t[11] = (h * o * r - a * d * r - h * n * l + e * d * l + a * n * p - e * o * p) * C, t[12] = D * C, t[13] = (h * v * s - g * d * s + g * n * u - e * v * u - h * n * m + e * d * m) * C, t[14] = (g * o * s - a * v * s - g * n * c + e * v * c + a * n * m - e * o * m) * C, t[15] = (a * d * s - h * o * s + h * n * c - e * d * c - a * n * u + e * o * u) * C, this;
    }
    scale(t) {
      let e = this.elements, n = t.x, s = t.y, r = t.z;
      return e[0] *= n, e[4] *= s, e[8] *= r, e[1] *= n, e[5] *= s, e[9] *= r, e[2] *= n, e[6] *= s, e[10] *= r, e[3] *= n, e[7] *= s, e[11] *= r, this;
    }
    getMaxScaleOnAxis() {
      let t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, n, s));
    }
    makeTranslation(t, e, n) {
      return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
    }
    makeRotationX(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      let n = Math.cos(e), s = Math.sin(e), r = 1 - n, a = t.x, o = t.y, c = t.z, l = r * a, h = r * o;
      return this.set(l * a + n, l * o - s * c, l * c + s * o, 0, l * o + s * c, h * o + n, h * c - s * a, 0, l * c - s * o, h * c + s * a, r * c * c + n, 0, 0, 0, 0, 1), this;
    }
    makeScale(t, e, n) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, n, s, r, a) {
      return this.set(1, n, r, 0, t, 1, a, 0, e, s, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, n) {
      let s = this.elements, r = e._x, a = e._y, o = e._z, c = e._w, l = r + r, h = a + a, d = o + o, u = r * l, p = r * h, g = r * d, v = a * h, m = a * d, f = o * d, E = c * l, x = c * h, _ = c * d, D = n.x, R = n.y, C = n.z;
      return s[0] = (1 - (v + f)) * D, s[1] = (p + _) * D, s[2] = (g - x) * D, s[3] = 0, s[4] = (p - _) * R, s[5] = (1 - (u + f)) * R, s[6] = (m + E) * R, s[7] = 0, s[8] = (g + x) * C, s[9] = (m - E) * C, s[10] = (1 - (u + v)) * C, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
    }
    decompose(t, e, n) {
      let s = this.elements, r = Zi.set(s[0], s[1], s[2]).length(), a = Zi.set(s[4], s[5], s[6]).length(), o = Zi.set(s[8], s[9], s[10]).length();
      this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], ln.copy(this);
      let l = 1 / r, h = 1 / a, d = 1 / o;
      return ln.elements[0] *= l, ln.elements[1] *= l, ln.elements[2] *= l, ln.elements[4] *= h, ln.elements[5] *= h, ln.elements[6] *= h, ln.elements[8] *= d, ln.elements[9] *= d, ln.elements[10] *= d, e.setFromRotationMatrix(ln), n.x = r, n.y = a, n.z = o, this;
    }
    makePerspective(t, e, n, s, r, a, o = On) {
      let c = this.elements, l = 2 * r / (e - t), h = 2 * r / (n - s), d = (e + t) / (e - t), u = (n + s) / (n - s), p, g;
      if (o === On) p = -(a + r) / (a - r), g = -2 * a * r / (a - r);
      else if (o === aa) p = -a / (a - r), g = -a * r / (a - r);
      else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
      return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = h, c[9] = u, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = g, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
    }
    makeOrthographic(t, e, n, s, r, a, o = On) {
      let c = this.elements, l = 1 / (e - t), h = 1 / (n - s), d = 1 / (a - r), u = (e + t) * l, p = (n + s) * h, g, v;
      if (o === On) g = (a + r) * d, v = -2 * d;
      else if (o === aa) g = r * d, v = -1 * d;
      else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
      return c[0] = 2 * l, c[4] = 0, c[8] = 0, c[12] = -u, c[1] = 0, c[5] = 2 * h, c[9] = 0, c[13] = -p, c[2] = 0, c[6] = 0, c[10] = v, c[14] = -g, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
    }
    equals(t) {
      let e = this.elements, n = t.elements;
      for (let s = 0; s < 16; s++) if (e[s] !== n[s]) return false;
      return true;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      let n = this.elements;
      return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
    }
  }, Zi = new T(), ln = new ee(), wf = new T(0, 0, 0), Tf = new T(1, 1, 1), ti = new T(), Cr = new T(), $e = new T(), yh = new ee(), Mh = new fn(), En = class i {
    constructor(t = 0, e = 0, n = 0, s = i.DEFAULT_ORDER) {
      this.isEuler = true, this._x = t, this._y = e, this._z = n, this._order = s;
    }
    get x() {
      return this._x;
    }
    set x(t) {
      this._x = t, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      this._y = t, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      this._z = t, this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      this._order = t, this._onChangeCallback();
    }
    set(t, e, n, s = this._order) {
      return this._x = t, this._y = e, this._z = n, this._order = s, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
    }
    setFromRotationMatrix(t, e = this._order, n = true) {
      let s = t.elements, r = s[0], a = s[4], o = s[8], c = s[1], l = s[5], h = s[9], d = s[2], u = s[6], p = s[10];
      switch (e) {
        case "XYZ":
          this._y = Math.asin(Ne(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(u, l), this._z = 0);
          break;
        case "YXZ":
          this._x = Math.asin(-Ne(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-d, r), this._z = 0);
          break;
        case "ZXY":
          this._x = Math.asin(Ne(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-d, p), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, r));
          break;
        case "ZYX":
          this._y = Math.asin(-Ne(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(u, p), this._z = Math.atan2(c, r)) : (this._x = 0, this._z = Math.atan2(-a, l));
          break;
        case "YZX":
          this._z = Math.asin(Ne(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-d, r)) : (this._x = 0, this._y = Math.atan2(o, p));
          break;
        case "XZY":
          this._z = Math.asin(-Ne(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-h, p), this._y = 0);
          break;
        default:
          console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
      }
      return this._order = e, n === true && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, n) {
      return yh.makeRotationFromQuaternion(t), this.setFromRotationMatrix(yh, e, n);
    }
    setFromVector3(t, e = this._order) {
      return this.set(t.x, t.y, t.z, e);
    }
    reorder(t) {
      return Mh.setFromEuler(this), this.setFromQuaternion(Mh, t);
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
    }
    fromArray(t) {
      return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
    }
    _onChange(t) {
      return this._onChangeCallback = t, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  };
  En.DEFAULT_ORDER = "XYZ";
  var Qs = class {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = (1 << t | 0) >>> 0;
    }
    enable(t) {
      this.mask |= 1 << t | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= 1 << t | 0;
    }
    disable(t) {
      this.mask &= ~(1 << t | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return (this.mask & t.mask) !== 0;
    }
    isEnabled(t) {
      return (this.mask & (1 << t | 0)) !== 0;
    }
  }, Af = 0, Sh = new T(), Ji = new fn(), Ln = new ee(), Ir = new T(), ks = new T(), Rf = new T(), Cf = new fn(), bh = new T(1, 0, 0), Eh = new T(0, 1, 0), wh = new T(0, 0, 1), Th = { type: "added" }, If = { type: "removed" }, $i = { type: "childadded", child: null }, yo = { type: "childremoved", child: null }, Pe = class i extends oi {
    constructor() {
      super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: Af++ }), this.uuid = Ss(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = i.DEFAULT_UP.clone();
      let t = new T(), e = new En(), n = new fn(), s = new T(1, 1, 1);
      function r() {
        n.setFromEuler(e, false);
      }
      function a() {
        e.setFromQuaternion(n, void 0, false);
      }
      e._onChange(r), n._onChange(a), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: t }, rotation: { configurable: true, enumerable: true, value: e }, quaternion: { configurable: true, enumerable: true, value: n }, scale: { configurable: true, enumerable: true, value: s }, modelViewMatrix: { value: new ee() }, normalMatrix: { value: new Xt() } }), this.matrix = new ee(), this.matrixWorld = new ee(), this.matrixAutoUpdate = i.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new Qs(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.userData = {};
    }
    onBeforeShadow() {
    }
    onAfterShadow() {
    }
    onBeforeRender() {
    }
    onAfterRender() {
    }
    applyMatrix4(t) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(t) {
      return this.quaternion.premultiply(t), this;
    }
    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }
    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, true);
    }
    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }
    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }
    rotateOnAxis(t, e) {
      return Ji.setFromAxisAngle(t, e), this.quaternion.multiply(Ji), this;
    }
    rotateOnWorldAxis(t, e) {
      return Ji.setFromAxisAngle(t, e), this.quaternion.premultiply(Ji), this;
    }
    rotateX(t) {
      return this.rotateOnAxis(bh, t);
    }
    rotateY(t) {
      return this.rotateOnAxis(Eh, t);
    }
    rotateZ(t) {
      return this.rotateOnAxis(wh, t);
    }
    translateOnAxis(t, e) {
      return Sh.copy(t).applyQuaternion(this.quaternion), this.position.add(Sh.multiplyScalar(e)), this;
    }
    translateX(t) {
      return this.translateOnAxis(bh, t);
    }
    translateY(t) {
      return this.translateOnAxis(Eh, t);
    }
    translateZ(t) {
      return this.translateOnAxis(wh, t);
    }
    localToWorld(t) {
      return this.updateWorldMatrix(true, false), t.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(t) {
      return this.updateWorldMatrix(true, false), t.applyMatrix4(Ln.copy(this.matrixWorld).invert());
    }
    lookAt(t, e, n) {
      t.isVector3 ? Ir.copy(t) : Ir.set(t, e, n);
      let s = this.parent;
      this.updateWorldMatrix(true, false), ks.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Ln.lookAt(ks, Ir, this.up) : Ln.lookAt(Ir, ks, this.up), this.quaternion.setFromRotationMatrix(Ln), s && (Ln.extractRotation(s.matrixWorld), Ji.setFromRotationMatrix(Ln), this.quaternion.premultiply(Ji.invert()));
    }
    add(t) {
      if (arguments.length > 1) {
        for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
        return this;
      }
      return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Th), $i.child = t, this.dispatchEvent($i), $i.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
    }
    remove(t) {
      if (arguments.length > 1) {
        for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
        return this;
      }
      let e = this.children.indexOf(t);
      return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(If), yo.child = t, this.dispatchEvent(yo), yo.child = null), this;
    }
    removeFromParent() {
      let t = this.parent;
      return t !== null && t.remove(this), this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(t) {
      return this.updateWorldMatrix(true, false), Ln.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(true, false), Ln.multiply(t.parent.matrixWorld)), t.applyMatrix4(Ln), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(false, true), t.dispatchEvent(Th), $i.child = t, this.dispatchEvent($i), $i.child = null, this;
    }
    getObjectById(t) {
      return this.getObjectByProperty("id", t);
    }
    getObjectByName(t) {
      return this.getObjectByProperty("name", t);
    }
    getObjectByProperty(t, e) {
      if (this[t] === e) return this;
      for (let n = 0, s = this.children.length; n < s; n++) {
        let a = this.children[n].getObjectByProperty(t, e);
        if (a !== void 0) return a;
      }
    }
    getObjectsByProperty(t, e, n = []) {
      this[t] === e && n.push(this);
      let s = this.children;
      for (let r = 0, a = s.length; r < a; r++) s[r].getObjectsByProperty(t, e, n);
      return n;
    }
    getWorldPosition(t) {
      return this.updateWorldMatrix(true, false), t.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(t) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(ks, t, Rf), t;
    }
    getWorldScale(t) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(ks, Cf, t), t;
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(true, false);
      let e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {
    }
    traverse(t) {
      t(this);
      let e = this.children;
      for (let n = 0, s = e.length; n < s; n++) e[n].traverse(t);
    }
    traverseVisible(t) {
      if (this.visible === false) return;
      t(this);
      let e = this.children;
      for (let n = 0, s = e.length; n < s; n++) e[n].traverseVisible(t);
    }
    traverseAncestors(t) {
      let e = this.parent;
      e !== null && (t(e), e.traverseAncestors(t));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, t = true);
      let e = this.children;
      for (let n = 0, s = e.length; n < s; n++) e[n].updateMatrixWorld(t);
    }
    updateWorldMatrix(t, e) {
      let n = this.parent;
      if (t === true && n !== null && n.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === true) {
        let s = this.children;
        for (let r = 0, a = s.length; r < a; r++) s[r].updateWorldMatrix(false, true);
      }
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string", n = {};
      e && (t = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" });
      let s = {};
      s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === true && (s.castShadow = true), this.receiveShadow === true && (s.receiveShadow = true), this.visible === false && (s.visible = false), this.frustumCulled === false && (s.frustumCulled = false), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === false && (s.matrixAutoUpdate = false), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map((o) => ({ boxInitialized: o.boxInitialized, boxMin: o.box.min.toArray(), boxMax: o.box.max.toArray(), sphereInitialized: o.sphereInitialized, sphereRadius: o.sphere.radius, sphereCenter: o.sphere.center.toArray() })), s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (s.boundingSphere = { center: s.boundingSphere.center.toArray(), radius: s.boundingSphere.radius }), this.boundingBox !== null && (s.boundingBox = { min: s.boundingBox.min.toArray(), max: s.boundingBox.max.toArray() }));
      function r(o, c) {
        return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(t)), c.uuid;
      }
      if (this.isScene) this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true && (s.environment = this.environment.toJSON(t).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        s.geometry = r(t.geometries, this.geometry);
        let o = this.geometry.parameters;
        if (o !== void 0 && o.shapes !== void 0) {
          let c = o.shapes;
          if (Array.isArray(c)) for (let l = 0, h = c.length; l < h; l++) {
            let d = c[l];
            r(t.shapes, d);
          }
          else r(t.shapes, c);
        }
      }
      if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
        let o = [];
        for (let c = 0, l = this.material.length; c < l; c++) o.push(r(t.materials, this.material[c]));
        s.material = o;
      } else s.material = r(t.materials, this.material);
      if (this.children.length > 0) {
        s.children = [];
        for (let o = 0; o < this.children.length; o++) s.children.push(this.children[o].toJSON(t).object);
      }
      if (this.animations.length > 0) {
        s.animations = [];
        for (let o = 0; o < this.animations.length; o++) {
          let c = this.animations[o];
          s.animations.push(r(t.animations, c));
        }
      }
      if (e) {
        let o = a(t.geometries), c = a(t.materials), l = a(t.textures), h = a(t.images), d = a(t.shapes), u = a(t.skeletons), p = a(t.animations), g = a(t.nodes);
        o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), u.length > 0 && (n.skeletons = u), p.length > 0 && (n.animations = p), g.length > 0 && (n.nodes = g);
      }
      return n.object = s, n;
      function a(o) {
        let c = [];
        for (let l in o) {
          let h = o[l];
          delete h.metadata, c.push(h);
        }
        return c;
      }
    }
    clone(t) {
      return new this.constructor().copy(this, t);
    }
    copy(t, e = true) {
      if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === true) for (let n = 0; n < t.children.length; n++) {
        let s = t.children[n];
        this.add(s.clone());
      }
      return this;
    }
  };
  Pe.DEFAULT_UP = new T(0, 1, 0);
  Pe.DEFAULT_MATRIX_AUTO_UPDATE = true;
  Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
  var hn = new T(), Dn = new T(), Mo = new T(), Un = new T(), Ki = new T(), Qi = new T(), Ah = new T(), So = new T(), bo = new T(), Eo = new T(), wo = new ye(), To = new ye(), Ao = new ye(), Ei = class i {
    constructor(t = new T(), e = new T(), n = new T()) {
      this.a = t, this.b = e, this.c = n;
    }
    static getNormal(t, e, n, s) {
      s.subVectors(n, e), hn.subVectors(t, e), s.cross(hn);
      let r = s.lengthSq();
      return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
    }
    static getBarycoord(t, e, n, s, r) {
      hn.subVectors(s, e), Dn.subVectors(n, e), Mo.subVectors(t, e);
      let a = hn.dot(hn), o = hn.dot(Dn), c = hn.dot(Mo), l = Dn.dot(Dn), h = Dn.dot(Mo), d = a * l - o * o;
      if (d === 0) return r.set(0, 0, 0), null;
      let u = 1 / d, p = (l * c - o * h) * u, g = (a * h - o * c) * u;
      return r.set(1 - p - g, g, p);
    }
    static containsPoint(t, e, n, s) {
      return this.getBarycoord(t, e, n, s, Un) === null ? false : Un.x >= 0 && Un.y >= 0 && Un.x + Un.y <= 1;
    }
    static getInterpolation(t, e, n, s, r, a, o, c) {
      return this.getBarycoord(t, e, n, s, Un) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(r, Un.x), c.addScaledVector(a, Un.y), c.addScaledVector(o, Un.z), c);
    }
    static getInterpolatedAttribute(t, e, n, s, r, a) {
      return wo.setScalar(0), To.setScalar(0), Ao.setScalar(0), wo.fromBufferAttribute(t, e), To.fromBufferAttribute(t, n), Ao.fromBufferAttribute(t, s), a.setScalar(0), a.addScaledVector(wo, r.x), a.addScaledVector(To, r.y), a.addScaledVector(Ao, r.z), a;
    }
    static isFrontFacing(t, e, n, s) {
      return hn.subVectors(n, e), Dn.subVectors(t, e), hn.cross(Dn).dot(s) < 0;
    }
    set(t, e, n) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
    }
    setFromPointsAndIndices(t, e, n, s) {
      return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[s]), this;
    }
    setFromAttributeAndIndices(t, e, n, s) {
      return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, s), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }
    getArea() {
      return hn.subVectors(this.c, this.b), Dn.subVectors(this.a, this.b), hn.cross(Dn).length() * 0.5;
    }
    getMidpoint(t) {
      return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(t) {
      return i.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(t) {
      return t.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(t, e) {
      return i.getBarycoord(t, this.a, this.b, this.c, e);
    }
    getInterpolation(t, e, n, s, r) {
      return i.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
    }
    containsPoint(t) {
      return i.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
      return i.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }
    closestPointToPoint(t, e) {
      let n = this.a, s = this.b, r = this.c, a, o;
      Ki.subVectors(s, n), Qi.subVectors(r, n), So.subVectors(t, n);
      let c = Ki.dot(So), l = Qi.dot(So);
      if (c <= 0 && l <= 0) return e.copy(n);
      bo.subVectors(t, s);
      let h = Ki.dot(bo), d = Qi.dot(bo);
      if (h >= 0 && d <= h) return e.copy(s);
      let u = c * d - h * l;
      if (u <= 0 && c >= 0 && h <= 0) return a = c / (c - h), e.copy(n).addScaledVector(Ki, a);
      Eo.subVectors(t, r);
      let p = Ki.dot(Eo), g = Qi.dot(Eo);
      if (g >= 0 && p <= g) return e.copy(r);
      let v = p * l - c * g;
      if (v <= 0 && l >= 0 && g <= 0) return o = l / (l - g), e.copy(n).addScaledVector(Qi, o);
      let m = h * g - p * d;
      if (m <= 0 && d - h >= 0 && p - g >= 0) return Ah.subVectors(r, s), o = (d - h) / (d - h + (p - g)), e.copy(s).addScaledVector(Ah, o);
      let f = 1 / (m + v + u);
      return a = v * f, o = u * f, e.copy(n).addScaledVector(Ki, a).addScaledVector(Qi, o);
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }
  }, Uu = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, ei = { h: 0, s: 0, l: 0 }, Pr = { h: 0, s: 0, l: 0 };
  function Ro(i, t, e) {
    return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
  }
  var Ht = class {
    constructor(t, e, n) {
      return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
    }
    set(t, e, n) {
      if (e === void 0 && n === void 0) {
        let s = t;
        s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
      } else this.setRGB(t, e, n);
      return this;
    }
    setScalar(t) {
      return this.r = t, this.g = t, this.b = t, this;
    }
    setHex(t, e = Xe) {
      return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Qt.toWorkingColorSpace(this, e), this;
    }
    setRGB(t, e, n, s = Qt.workingColorSpace) {
      return this.r = t, this.g = e, this.b = n, Qt.toWorkingColorSpace(this, s), this;
    }
    setHSL(t, e, n, s = Qt.workingColorSpace) {
      if (t = _f(t, 1), e = Ne(e, 0, 1), n = Ne(n, 0, 1), e === 0) this.r = this.g = this.b = n;
      else {
        let r = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - r;
        this.r = Ro(a, r, t + 1 / 3), this.g = Ro(a, r, t), this.b = Ro(a, r, t - 1 / 3);
      }
      return Qt.toWorkingColorSpace(this, s), this;
    }
    setStyle(t, e = Xe) {
      function n(r) {
        r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
      }
      let s;
      if (s = /^(\w+)\(([^\)]*)\)/.exec(t)) {
        let r, a = s[1], o = s[2];
        switch (a) {
          case "rgb":
          case "rgba":
            if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, e);
            if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, e);
            break;
          case "hsl":
          case "hsla":
            if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, e);
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + t);
        }
      } else if (s = /^\#([A-Fa-f\d]+)$/.exec(t)) {
        let r = s[1], a = r.length;
        if (a === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, e);
        if (a === 6) return this.setHex(parseInt(r, 16), e);
        console.warn("THREE.Color: Invalid hex color " + t);
      } else if (t && t.length > 0) return this.setColorName(t, e);
      return this;
    }
    setColorName(t, e = Xe) {
      let n = Uu[t.toLowerCase()];
      return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return this.r = t.r, this.g = t.g, this.b = t.b, this;
    }
    copySRGBToLinear(t) {
      return this.r = Bn(t.r), this.g = Bn(t.g), this.b = Bn(t.b), this;
    }
    copyLinearToSRGB(t) {
      return this.r = cs(t.r), this.g = cs(t.g), this.b = cs(t.b), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex(t = Xe) {
      return Qt.fromWorkingColorSpace(Ue.copy(this), t), Math.round(Ne(Ue.r * 255, 0, 255)) * 65536 + Math.round(Ne(Ue.g * 255, 0, 255)) * 256 + Math.round(Ne(Ue.b * 255, 0, 255));
    }
    getHexString(t = Xe) {
      return ("000000" + this.getHex(t).toString(16)).slice(-6);
    }
    getHSL(t, e = Qt.workingColorSpace) {
      Qt.fromWorkingColorSpace(Ue.copy(this), e);
      let n = Ue.r, s = Ue.g, r = Ue.b, a = Math.max(n, s, r), o = Math.min(n, s, r), c, l, h = (o + a) / 2;
      if (o === a) c = 0, l = 0;
      else {
        let d = a - o;
        switch (l = h <= 0.5 ? d / (a + o) : d / (2 - a - o), a) {
          case n:
            c = (s - r) / d + (s < r ? 6 : 0);
            break;
          case s:
            c = (r - n) / d + 2;
            break;
          case r:
            c = (n - s) / d + 4;
            break;
        }
        c /= 6;
      }
      return t.h = c, t.s = l, t.l = h, t;
    }
    getRGB(t, e = Qt.workingColorSpace) {
      return Qt.fromWorkingColorSpace(Ue.copy(this), e), t.r = Ue.r, t.g = Ue.g, t.b = Ue.b, t;
    }
    getStyle(t = Xe) {
      Qt.fromWorkingColorSpace(Ue.copy(this), t);
      let e = Ue.r, n = Ue.g, s = Ue.b;
      return t !== Xe ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
    }
    offsetHSL(t, e, n) {
      return this.getHSL(ei), this.setHSL(ei.h + t, ei.s + e, ei.l + n);
    }
    add(t) {
      return this.r += t.r, this.g += t.g, this.b += t.b, this;
    }
    addColors(t, e) {
      return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
    }
    addScalar(t) {
      return this.r += t, this.g += t, this.b += t, this;
    }
    sub(t) {
      return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
    }
    multiply(t) {
      return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
    }
    multiplyScalar(t) {
      return this.r *= t, this.g *= t, this.b *= t, this;
    }
    lerp(t, e) {
      return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
    }
    lerpColors(t, e, n) {
      return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
    }
    lerpHSL(t, e) {
      this.getHSL(ei), t.getHSL(Pr);
      let n = ho(ei.h, Pr.h, e), s = ho(ei.s, Pr.s, e), r = ho(ei.l, Pr.l, e);
      return this.setHSL(n, s, r), this;
    }
    setFromVector3(t) {
      return this.r = t.x, this.g = t.y, this.b = t.z, this;
    }
    applyMatrix3(t) {
      let e = this.r, n = this.g, s = this.b, r = t.elements;
      return this.r = r[0] * e + r[3] * n + r[6] * s, this.g = r[1] * e + r[4] * n + r[7] * s, this.b = r[2] * e + r[5] * n + r[8] * s, this;
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
    }
    fromBufferAttribute(t, e) {
      return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b;
    }
  }, Ue = new Ht();
  Ht.NAMES = Uu;
  var Pf = 0, Gn = class extends oi {
    static get type() {
      return "Material";
    }
    get type() {
      return this.constructor.type;
    }
    set type(t) {
    }
    constructor() {
      super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: Pf++ }), this.uuid = Ss(), this.name = "", this.blending = as, this.side = ai, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = Go, this.blendDst = Wo, this.blendEquation = bi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ht(0, 0, 0), this.blendAlpha = 0, this.depthFunc = hs, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = hh, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Gi, this.stencilZFail = Gi, this.stencilZPass = Gi, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(t) {
      this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
    }
    onBeforeRender() {
    }
    onBeforeCompile() {
    }
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(t) {
      if (t !== void 0) for (let e in t) {
        let n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        let s = this[e];
        if (s === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[e] = n;
      }
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string";
      e && (t = { textures: {}, images: {} });
      let n = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
      n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== as && (n.blending = this.blending), this.side !== ai && (n.side = this.side), this.vertexColors === true && (n.vertexColors = true), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === true && (n.transparent = true), this.blendSrc !== Go && (n.blendSrc = this.blendSrc), this.blendDst !== Wo && (n.blendDst = this.blendDst), this.blendEquation !== bi && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== hs && (n.depthFunc = this.depthFunc), this.depthTest === false && (n.depthTest = this.depthTest), this.depthWrite === false && (n.depthWrite = this.depthWrite), this.colorWrite === false && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== hh && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Gi && (n.stencilFail = this.stencilFail), this.stencilZFail !== Gi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Gi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === true && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === true && (n.polygonOffset = true), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === true && (n.dithering = true), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === true && (n.alphaHash = true), this.alphaToCoverage === true && (n.alphaToCoverage = true), this.premultipliedAlpha === true && (n.premultipliedAlpha = true), this.forceSinglePass === true && (n.forceSinglePass = true), this.wireframe === true && (n.wireframe = true), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === true && (n.flatShading = true), this.visible === false && (n.visible = false), this.toneMapped === false && (n.toneMapped = false), this.fog === false && (n.fog = false), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
      function s(r) {
        let a = [];
        for (let o in r) {
          let c = r[o];
          delete c.metadata, a.push(c);
        }
        return a;
      }
      if (e) {
        let r = s(t.textures), a = s(t.images);
        r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a);
      }
      return n;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
      let e = t.clippingPlanes, n = null;
      if (e !== null) {
        let s = e.length;
        n = new Array(s);
        for (let r = 0; r !== s; ++r) n[r] = e[r].clone();
      }
      return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
    onBuild() {
      console.warn("Material: onBuild() has been removed.");
    }
  }, ci = class extends Gn {
    static get type() {
      return "MeshBasicMaterial";
    }
    constructor(t) {
      super(), this.isMeshBasicMaterial = true, this.color = new Ht(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new En(), this.combine = yu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
    }
  };
  var we = new T(), Lr = new ht(), Ie = class {
    constructor(t, e, n = false) {
      if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.isBufferAttribute = true, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = uh, this.updateRanges = [], this.gpuType = bn, this.version = 0;
    }
    onUploadCallback() {
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
    setUsage(t) {
      return this.usage = t, this;
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(t) {
      return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
    }
    copyAt(t, e, n) {
      t *= this.itemSize, n *= e.itemSize;
      for (let s = 0, r = this.itemSize; s < r; s++) this.array[t + s] = e.array[n + s];
      return this;
    }
    copyArray(t) {
      return this.array.set(t), this;
    }
    applyMatrix3(t) {
      if (this.itemSize === 2) for (let e = 0, n = this.count; e < n; e++) Lr.fromBufferAttribute(this, e), Lr.applyMatrix3(t), this.setXY(e, Lr.x, Lr.y);
      else if (this.itemSize === 3) for (let e = 0, n = this.count; e < n; e++) we.fromBufferAttribute(this, e), we.applyMatrix3(t), this.setXYZ(e, we.x, we.y, we.z);
      return this;
    }
    applyMatrix4(t) {
      for (let e = 0, n = this.count; e < n; e++) we.fromBufferAttribute(this, e), we.applyMatrix4(t), this.setXYZ(e, we.x, we.y, we.z);
      return this;
    }
    applyNormalMatrix(t) {
      for (let e = 0, n = this.count; e < n; e++) we.fromBufferAttribute(this, e), we.applyNormalMatrix(t), this.setXYZ(e, we.x, we.y, we.z);
      return this;
    }
    transformDirection(t) {
      for (let e = 0, n = this.count; e < n; e++) we.fromBufferAttribute(this, e), we.transformDirection(t), this.setXYZ(e, we.x, we.y, we.z);
      return this;
    }
    set(t, e = 0) {
      return this.array.set(t, e), this;
    }
    getComponent(t, e) {
      let n = this.array[t * this.itemSize + e];
      return this.normalized && (n = Os(n, this.array)), n;
    }
    setComponent(t, e, n) {
      return this.normalized && (n = We(n, this.array)), this.array[t * this.itemSize + e] = n, this;
    }
    getX(t) {
      let e = this.array[t * this.itemSize];
      return this.normalized && (e = Os(e, this.array)), e;
    }
    setX(t, e) {
      return this.normalized && (e = We(e, this.array)), this.array[t * this.itemSize] = e, this;
    }
    getY(t) {
      let e = this.array[t * this.itemSize + 1];
      return this.normalized && (e = Os(e, this.array)), e;
    }
    setY(t, e) {
      return this.normalized && (e = We(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
    }
    getZ(t) {
      let e = this.array[t * this.itemSize + 2];
      return this.normalized && (e = Os(e, this.array)), e;
    }
    setZ(t, e) {
      return this.normalized && (e = We(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
    }
    getW(t) {
      let e = this.array[t * this.itemSize + 3];
      return this.normalized && (e = Os(e, this.array)), e;
    }
    setW(t, e) {
      return this.normalized && (e = We(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
    }
    setXY(t, e, n) {
      return t *= this.itemSize, this.normalized && (e = We(e, this.array), n = We(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
    }
    setXYZ(t, e, n, s) {
      return t *= this.itemSize, this.normalized && (e = We(e, this.array), n = We(n, this.array), s = We(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
    }
    setXYZW(t, e, n, s, r) {
      return t *= this.itemSize, this.normalized && (e = We(e, this.array), n = We(n, this.array), s = We(s, this.array), r = We(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
    }
    onUpload(t) {
      return this.onUploadCallback = t, this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      let t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
      return this.name !== "" && (t.name = this.name), this.usage !== uh && (t.usage = this.usage), t;
    }
  };
  var ha = class extends Ie {
    constructor(t, e, n) {
      super(new Uint16Array(t), e, n);
    }
  };
  var ua = class extends Ie {
    constructor(t, e, n) {
      super(new Uint32Array(t), e, n);
    }
  };
  var te = class extends Ie {
    constructor(t, e, n) {
      super(new Float32Array(t), e, n);
    }
  }, Lf = 0, en = new ee(), Co = new Pe(), ji = new T(), Ke = new Vn(), Vs = new Vn(), Re = new T(), Se = class i extends oi {
    constructor() {
      super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: Lf++ }), this.uuid = Ss(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
    }
    getIndex() {
      return this.index;
    }
    setIndex(t) {
      return Array.isArray(t) ? this.index = new (Du(t) ? ua : ha)(t, 1) : this.index = t, this;
    }
    setIndirect(t) {
      return this.indirect = t, this;
    }
    getIndirect() {
      return this.indirect;
    }
    getAttribute(t) {
      return this.attributes[t];
    }
    setAttribute(t, e) {
      return this.attributes[t] = e, this;
    }
    deleteAttribute(t) {
      return delete this.attributes[t], this;
    }
    hasAttribute(t) {
      return this.attributes[t] !== void 0;
    }
    addGroup(t, e, n = 0) {
      this.groups.push({ start: t, count: e, materialIndex: n });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(t, e) {
      this.drawRange.start = t, this.drawRange.count = e;
    }
    applyMatrix4(t) {
      let e = this.attributes.position;
      e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = true);
      let n = this.attributes.normal;
      if (n !== void 0) {
        let r = new Xt().getNormalMatrix(t);
        n.applyNormalMatrix(r), n.needsUpdate = true;
      }
      let s = this.attributes.tangent;
      return s !== void 0 && (s.transformDirection(t), s.needsUpdate = true), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
    }
    applyQuaternion(t) {
      return en.makeRotationFromQuaternion(t), this.applyMatrix4(en), this;
    }
    rotateX(t) {
      return en.makeRotationX(t), this.applyMatrix4(en), this;
    }
    rotateY(t) {
      return en.makeRotationY(t), this.applyMatrix4(en), this;
    }
    rotateZ(t) {
      return en.makeRotationZ(t), this.applyMatrix4(en), this;
    }
    translate(t, e, n) {
      return en.makeTranslation(t, e, n), this.applyMatrix4(en), this;
    }
    scale(t, e, n) {
      return en.makeScale(t, e, n), this.applyMatrix4(en), this;
    }
    lookAt(t) {
      return Co.lookAt(t), Co.updateMatrix(), this.applyMatrix4(Co.matrix), this;
    }
    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(ji).negate(), this.translate(ji.x, ji.y, ji.z), this;
    }
    setFromPoints(t) {
      let e = this.getAttribute("position");
      if (e === void 0) {
        let n = [];
        for (let s = 0, r = t.length; s < r; s++) {
          let a = t[s];
          n.push(a.x, a.y, a.z || 0);
        }
        this.setAttribute("position", new te(n, 3));
      } else {
        for (let n = 0, s = e.count; n < s; n++) {
          let r = t[n];
          e.setXYZ(n, r.x, r.y, r.z || 0);
        }
        t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = true;
      }
      return this;
    }
    computeBoundingBox() {
      this.boundingBox === null && (this.boundingBox = new Vn());
      let t = this.attributes.position, e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new T(-1 / 0, -1 / 0, -1 / 0), new T(1 / 0, 1 / 0, 1 / 0));
        return;
      }
      if (t !== void 0) {
        if (this.boundingBox.setFromBufferAttribute(t), e) for (let n = 0, s = e.length; n < s; n++) {
          let r = e[n];
          Ke.setFromBufferAttribute(r), this.morphTargetsRelative ? (Re.addVectors(this.boundingBox.min, Ke.min), this.boundingBox.expandByPoint(Re), Re.addVectors(this.boundingBox.max, Ke.max), this.boundingBox.expandByPoint(Re)) : (this.boundingBox.expandByPoint(Ke.min), this.boundingBox.expandByPoint(Ke.max));
        }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }
    computeBoundingSphere() {
      this.boundingSphere === null && (this.boundingSphere = new Hn());
      let t = this.attributes.position, e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new T(), 1 / 0);
        return;
      }
      if (t) {
        let n = this.boundingSphere.center;
        if (Ke.setFromBufferAttribute(t), e) for (let r = 0, a = e.length; r < a; r++) {
          let o = e[r];
          Vs.setFromBufferAttribute(o), this.morphTargetsRelative ? (Re.addVectors(Ke.min, Vs.min), Ke.expandByPoint(Re), Re.addVectors(Ke.max, Vs.max), Ke.expandByPoint(Re)) : (Ke.expandByPoint(Vs.min), Ke.expandByPoint(Vs.max));
        }
        Ke.getCenter(n);
        let s = 0;
        for (let r = 0, a = t.count; r < a; r++) Re.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(Re));
        if (e) for (let r = 0, a = e.length; r < a; r++) {
          let o = e[r], c = this.morphTargetsRelative;
          for (let l = 0, h = o.count; l < h; l++) Re.fromBufferAttribute(o, l), c && (ji.fromBufferAttribute(t, l), Re.add(ji)), s = Math.max(s, n.distanceToSquared(Re));
        }
        this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
      }
    }
    computeTangents() {
      let t = this.index, e = this.attributes;
      if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
        console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
        return;
      }
      let n = e.position, s = e.normal, r = e.uv;
      this.hasAttribute("tangent") === false && this.setAttribute("tangent", new Ie(new Float32Array(4 * n.count), 4));
      let a = this.getAttribute("tangent"), o = [], c = [];
      for (let L = 0; L < n.count; L++) o[L] = new T(), c[L] = new T();
      let l = new T(), h = new T(), d = new T(), u = new ht(), p = new ht(), g = new ht(), v = new T(), m = new T();
      function f(L, b, M) {
        l.fromBufferAttribute(n, L), h.fromBufferAttribute(n, b), d.fromBufferAttribute(n, M), u.fromBufferAttribute(r, L), p.fromBufferAttribute(r, b), g.fromBufferAttribute(r, M), h.sub(l), d.sub(l), p.sub(u), g.sub(u);
        let I = 1 / (p.x * g.y - g.x * p.y);
        isFinite(I) && (v.copy(h).multiplyScalar(g.y).addScaledVector(d, -p.y).multiplyScalar(I), m.copy(d).multiplyScalar(p.x).addScaledVector(h, -g.x).multiplyScalar(I), o[L].add(v), o[b].add(v), o[M].add(v), c[L].add(m), c[b].add(m), c[M].add(m));
      }
      let E = this.groups;
      E.length === 0 && (E = [{ start: 0, count: t.count }]);
      for (let L = 0, b = E.length; L < b; ++L) {
        let M = E[L], I = M.start, H = M.count;
        for (let B = I, G = I + H; B < G; B += 3) f(t.getX(B + 0), t.getX(B + 1), t.getX(B + 2));
      }
      let x = new T(), _ = new T(), D = new T(), R = new T();
      function C(L) {
        D.fromBufferAttribute(s, L), R.copy(D);
        let b = o[L];
        x.copy(b), x.sub(D.multiplyScalar(D.dot(b))).normalize(), _.crossVectors(R, b);
        let I = _.dot(c[L]) < 0 ? -1 : 1;
        a.setXYZW(L, x.x, x.y, x.z, I);
      }
      for (let L = 0, b = E.length; L < b; ++L) {
        let M = E[L], I = M.start, H = M.count;
        for (let B = I, G = I + H; B < G; B += 3) C(t.getX(B + 0)), C(t.getX(B + 1)), C(t.getX(B + 2));
      }
    }
    computeVertexNormals() {
      let t = this.index, e = this.getAttribute("position");
      if (e !== void 0) {
        let n = this.getAttribute("normal");
        if (n === void 0) n = new Ie(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
        else for (let u = 0, p = n.count; u < p; u++) n.setXYZ(u, 0, 0, 0);
        let s = new T(), r = new T(), a = new T(), o = new T(), c = new T(), l = new T(), h = new T(), d = new T();
        if (t) for (let u = 0, p = t.count; u < p; u += 3) {
          let g = t.getX(u + 0), v = t.getX(u + 1), m = t.getX(u + 2);
          s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, v), a.fromBufferAttribute(e, m), h.subVectors(a, r), d.subVectors(s, r), h.cross(d), o.fromBufferAttribute(n, g), c.fromBufferAttribute(n, v), l.fromBufferAttribute(n, m), o.add(h), c.add(h), l.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(v, c.x, c.y, c.z), n.setXYZ(m, l.x, l.y, l.z);
        }
        else for (let u = 0, p = e.count; u < p; u += 3) s.fromBufferAttribute(e, u + 0), r.fromBufferAttribute(e, u + 1), a.fromBufferAttribute(e, u + 2), h.subVectors(a, r), d.subVectors(s, r), h.cross(d), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z);
        this.normalizeNormals(), n.needsUpdate = true;
      }
    }
    normalizeNormals() {
      let t = this.attributes.normal;
      for (let e = 0, n = t.count; e < n; e++) Re.fromBufferAttribute(t, e), Re.normalize(), t.setXYZ(e, Re.x, Re.y, Re.z);
    }
    toNonIndexed() {
      function t(o, c) {
        let l = o.array, h = o.itemSize, d = o.normalized, u = new l.constructor(c.length * h), p = 0, g = 0;
        for (let v = 0, m = c.length; v < m; v++) {
          o.isInterleavedBufferAttribute ? p = c[v] * o.data.stride + o.offset : p = c[v] * h;
          for (let f = 0; f < h; f++) u[g++] = l[p++];
        }
        return new Ie(u, h, d);
      }
      if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
      let e = new i(), n = this.index.array, s = this.attributes;
      for (let o in s) {
        let c = s[o], l = t(c, n);
        e.setAttribute(o, l);
      }
      let r = this.morphAttributes;
      for (let o in r) {
        let c = [], l = r[o];
        for (let h = 0, d = l.length; h < d; h++) {
          let u = l[h], p = t(u, n);
          c.push(p);
        }
        e.morphAttributes[o] = c;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      let a = this.groups;
      for (let o = 0, c = a.length; o < c; o++) {
        let l = a[o];
        e.addGroup(l.start, l.count, l.materialIndex);
      }
      return e;
    }
    toJSON() {
      let t = { metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
      if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
        let c = this.parameters;
        for (let l in c) c[l] !== void 0 && (t[l] = c[l]);
        return t;
      }
      t.data = { attributes: {} };
      let e = this.index;
      e !== null && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
      let n = this.attributes;
      for (let c in n) {
        let l = n[c];
        t.data.attributes[c] = l.toJSON(t.data);
      }
      let s = {}, r = false;
      for (let c in this.morphAttributes) {
        let l = this.morphAttributes[c], h = [];
        for (let d = 0, u = l.length; d < u; d++) {
          let p = l[d];
          h.push(p.toJSON(t.data));
        }
        h.length > 0 && (s[c] = h, r = true);
      }
      r && (t.data.morphAttributes = s, t.data.morphTargetsRelative = this.morphTargetsRelative);
      let a = this.groups;
      a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
      let o = this.boundingSphere;
      return o !== null && (t.data.boundingSphere = { center: o.center.toArray(), radius: o.radius }), t;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      let e = {};
      this.name = t.name;
      let n = t.index;
      n !== null && this.setIndex(n.clone(e));
      let s = t.attributes;
      for (let l in s) {
        let h = s[l];
        this.setAttribute(l, h.clone(e));
      }
      let r = t.morphAttributes;
      for (let l in r) {
        let h = [], d = r[l];
        for (let u = 0, p = d.length; u < p; u++) h.push(d[u].clone(e));
        this.morphAttributes[l] = h;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      let a = t.groups;
      for (let l = 0, h = a.length; l < h; l++) {
        let d = a[l];
        this.addGroup(d.start, d.count, d.materialIndex);
      }
      let o = t.boundingBox;
      o !== null && (this.boundingBox = o.clone());
      let c = t.boundingSphere;
      return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }, Rh = new ee(), xi = new ms(), Dr = new Hn(), Ch = new T(), Ur = new T(), Nr = new T(), Fr = new T(), Io = new T(), Or = new T(), Ih = new T(), Br = new T(), Ce = class extends Pe {
    constructor(t = new Se(), e = new ci()) {
      super(), this.isMesh = true, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
    }
    copy(t, e) {
      return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes, n = Object.keys(e);
      if (n.length > 0) {
        let s = e[n[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let r = 0, a = s.length; r < a; r++) {
            let o = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
          }
        }
      }
    }
    getVertexPosition(t, e) {
      let n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, a = n.morphTargetsRelative;
      e.fromBufferAttribute(s, t);
      let o = this.morphTargetInfluences;
      if (r && o) {
        Or.set(0, 0, 0);
        for (let c = 0, l = r.length; c < l; c++) {
          let h = o[c], d = r[c];
          h !== 0 && (Io.fromBufferAttribute(d, t), a ? Or.addScaledVector(Io, h) : Or.addScaledVector(Io.sub(e), h));
        }
        e.add(Or);
      }
      return e;
    }
    raycast(t, e) {
      let n = this.geometry, s = this.material, r = this.matrixWorld;
      s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Dr.copy(n.boundingSphere), Dr.applyMatrix4(r), xi.copy(t.ray).recast(t.near), !(Dr.containsPoint(xi.origin) === false && (xi.intersectSphere(Dr, Ch) === null || xi.origin.distanceToSquared(Ch) > (t.far - t.near) ** 2)) && (Rh.copy(r).invert(), xi.copy(t.ray).applyMatrix4(Rh), !(n.boundingBox !== null && xi.intersectsBox(n.boundingBox) === false) && this._computeIntersections(t, e, xi)));
    }
    _computeIntersections(t, e, n) {
      let s, r = this.geometry, a = this.material, o = r.index, c = r.attributes.position, l = r.attributes.uv, h = r.attributes.uv1, d = r.attributes.normal, u = r.groups, p = r.drawRange;
      if (o !== null) if (Array.isArray(a)) for (let g = 0, v = u.length; g < v; g++) {
        let m = u[g], f = a[m.materialIndex], E = Math.max(m.start, p.start), x = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
        for (let _ = E, D = x; _ < D; _ += 3) {
          let R = o.getX(_), C = o.getX(_ + 1), L = o.getX(_ + 2);
          s = zr(this, f, t, n, l, h, d, R, C, L), s && (s.faceIndex = Math.floor(_ / 3), s.face.materialIndex = m.materialIndex, e.push(s));
        }
      }
      else {
        let g = Math.max(0, p.start), v = Math.min(o.count, p.start + p.count);
        for (let m = g, f = v; m < f; m += 3) {
          let E = o.getX(m), x = o.getX(m + 1), _ = o.getX(m + 2);
          s = zr(this, a, t, n, l, h, d, E, x, _), s && (s.faceIndex = Math.floor(m / 3), e.push(s));
        }
      }
      else if (c !== void 0) if (Array.isArray(a)) for (let g = 0, v = u.length; g < v; g++) {
        let m = u[g], f = a[m.materialIndex], E = Math.max(m.start, p.start), x = Math.min(c.count, Math.min(m.start + m.count, p.start + p.count));
        for (let _ = E, D = x; _ < D; _ += 3) {
          let R = _, C = _ + 1, L = _ + 2;
          s = zr(this, f, t, n, l, h, d, R, C, L), s && (s.faceIndex = Math.floor(_ / 3), s.face.materialIndex = m.materialIndex, e.push(s));
        }
      }
      else {
        let g = Math.max(0, p.start), v = Math.min(c.count, p.start + p.count);
        for (let m = g, f = v; m < f; m += 3) {
          let E = m, x = m + 1, _ = m + 2;
          s = zr(this, a, t, n, l, h, d, E, x, _), s && (s.faceIndex = Math.floor(m / 3), e.push(s));
        }
      }
    }
  };
  function Df(i, t, e, n, s, r, a, o) {
    let c;
    if (t.side === Fe ? c = n.intersectTriangle(a, r, s, true, o) : c = n.intersectTriangle(s, r, a, t.side === ai, o), c === null) return null;
    Br.copy(o), Br.applyMatrix4(i.matrixWorld);
    let l = e.ray.origin.distanceTo(Br);
    return l < e.near || l > e.far ? null : { distance: l, point: Br.clone(), object: i };
  }
  function zr(i, t, e, n, s, r, a, o, c, l) {
    i.getVertexPosition(o, Ur), i.getVertexPosition(c, Nr), i.getVertexPosition(l, Fr);
    let h = Df(i, t, e, n, Ur, Nr, Fr, Ih);
    if (h) {
      let d = new T();
      Ei.getBarycoord(Ih, Ur, Nr, Fr, d), s && (h.uv = Ei.getInterpolatedAttribute(s, o, c, l, d, new ht())), r && (h.uv1 = Ei.getInterpolatedAttribute(r, o, c, l, d, new ht())), a && (h.normal = Ei.getInterpolatedAttribute(a, o, c, l, d, new T()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
      let u = { a: o, b: c, c: l, normal: new T(), materialIndex: 0 };
      Ei.getNormal(Ur, Nr, Fr, u.normal), h.face = u, h.barycoord = d;
    }
    return h;
  }
  var Ci = class i extends Se {
    constructor(t = 1, e = 1, n = 1, s = 1, r = 1, a = 1) {
      super(), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: n, widthSegments: s, heightSegments: r, depthSegments: a };
      let o = this;
      s = Math.floor(s), r = Math.floor(r), a = Math.floor(a);
      let c = [], l = [], h = [], d = [], u = 0, p = 0;
      g("z", "y", "x", -1, -1, n, e, t, a, r, 0), g("z", "y", "x", 1, -1, n, e, -t, a, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, a, 2), g("x", "z", "y", 1, -1, t, n, -e, s, a, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(c), this.setAttribute("position", new te(l, 3)), this.setAttribute("normal", new te(h, 3)), this.setAttribute("uv", new te(d, 2));
      function g(v, m, f, E, x, _, D, R, C, L, b) {
        let M = _ / C, I = D / L, H = _ / 2, B = D / 2, G = R / 2, $ = C + 1, W = L + 1, nt = 0, X = 0, lt = new T();
        for (let xt = 0; xt < W; xt++) {
          let Et = xt * I - B;
          for (let Vt = 0; Vt < $; Vt++) {
            let ne = Vt * M - H;
            lt[v] = ne * E, lt[m] = Et * x, lt[f] = G, l.push(lt.x, lt.y, lt.z), lt[v] = 0, lt[m] = 0, lt[f] = R > 0 ? 1 : -1, h.push(lt.x, lt.y, lt.z), d.push(Vt / C), d.push(1 - xt / L), nt += 1;
          }
        }
        for (let xt = 0; xt < L; xt++) for (let Et = 0; Et < C; Et++) {
          let Vt = u + Et + $ * xt, ne = u + Et + $ * (xt + 1), J = u + (Et + 1) + $ * (xt + 1), st = u + (Et + 1) + $ * xt;
          c.push(Vt, ne, st), c.push(ne, J, st), X += 6;
        }
        o.addGroup(p, X, b), p += X, u += nt;
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
    }
  };
  function gs(i) {
    let t = {};
    for (let e in i) {
      t[e] = {};
      for (let n in i[e]) {
        let s = i[e][n];
        s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = s.clone() : Array.isArray(s) ? t[e][n] = s.slice() : t[e][n] = s;
      }
    }
    return t;
  }
  function ze(i) {
    let t = {};
    for (let e = 0; e < i.length; e++) {
      let n = gs(i[e]);
      for (let s in n) t[s] = n[s];
    }
    return t;
  }
  function Uf(i) {
    let t = [];
    for (let e = 0; e < i.length; e++) t.push(i[e].clone());
    return t;
  }
  function Nu(i) {
    let t = i.getRenderTarget();
    return t === null ? i.outputColorSpace : t.isXRRenderTarget === true ? t.texture.colorSpace : Qt.workingColorSpace;
  }
  var Nf = { clone: gs, merge: ze }, Ff = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Of = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, nn = class extends Gn {
    static get type() {
      return "ShaderMaterial";
    }
    constructor(t) {
      super(), this.isShaderMaterial = true, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ff, this.fragmentShader = Of, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { clipCullDistance: false, multiDraw: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, t !== void 0 && this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = gs(t.uniforms), this.uniformsGroups = Uf(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      e.glslVersion = this.glslVersion, e.uniforms = {};
      for (let s in this.uniforms) {
        let a = this.uniforms[s].value;
        a && a.isTexture ? e.uniforms[s] = { type: "t", value: a.toJSON(t).uuid } : a && a.isColor ? e.uniforms[s] = { type: "c", value: a.getHex() } : a && a.isVector2 ? e.uniforms[s] = { type: "v2", value: a.toArray() } : a && a.isVector3 ? e.uniforms[s] = { type: "v3", value: a.toArray() } : a && a.isVector4 ? e.uniforms[s] = { type: "v4", value: a.toArray() } : a && a.isMatrix3 ? e.uniforms[s] = { type: "m3", value: a.toArray() } : a && a.isMatrix4 ? e.uniforms[s] = { type: "m4", value: a.toArray() } : e.uniforms[s] = { value: a };
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
      let n = {};
      for (let s in this.extensions) this.extensions[s] === true && (n[s] = true);
      return Object.keys(n).length > 0 && (e.extensions = n), e;
    }
  }, da = class extends Pe {
    constructor() {
      super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new ee(), this.projectionMatrix = new ee(), this.projectionMatrixInverse = new ee(), this.coordinateSystem = On;
    }
    copy(t, e) {
      return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
    }
    getWorldDirection(t) {
      return super.getWorldDirection(t).negate();
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(t, e) {
      super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, ni = new T(), Ph = new ht(), Lh = new ht(), ke = class extends da {
    constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
      super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
    }
    copy(t, e) {
      return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
    }
    setFocalLength(t) {
      let e = 0.5 * this.getFilmHeight() / t;
      this.fov = Cc * 2 * Math.atan(e), this.updateProjectionMatrix();
    }
    getFocalLength() {
      let t = Math.tan(lo * 0.5 * this.fov);
      return 0.5 * this.getFilmHeight() / t;
    }
    getEffectiveFOV() {
      return Cc * 2 * Math.atan(Math.tan(lo * 0.5 * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    getViewBounds(t, e, n) {
      ni.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(ni.x, ni.y).multiplyScalar(-t / ni.z), ni.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(ni.x, ni.y).multiplyScalar(-t / ni.z);
    }
    getViewSize(t, e) {
      return this.getViewBounds(t, Ph, Lh), e.subVectors(Lh, Ph);
    }
    setViewOffset(t, e, n, s, r, a) {
      this.aspect = t / e, this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let t = this.near, e = t * Math.tan(lo * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s, a = this.view;
      if (this.view !== null && this.view.enabled) {
        let c = a.fullWidth, l = a.fullHeight;
        r += a.offsetX * s / c, e -= a.offsetY * n / l, s *= a.width / c, n *= a.height / l;
      }
      let o = this.filmOffset;
      o !== 0 && (r += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
    }
  }, ts = -90, es = 1, Dc = class extends Pe {
    constructor(t, e, n) {
      super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
      let s = new ke(ts, es, t, e);
      s.layers = this.layers, this.add(s);
      let r = new ke(ts, es, t, e);
      r.layers = this.layers, this.add(r);
      let a = new ke(ts, es, t, e);
      a.layers = this.layers, this.add(a);
      let o = new ke(ts, es, t, e);
      o.layers = this.layers, this.add(o);
      let c = new ke(ts, es, t, e);
      c.layers = this.layers, this.add(c);
      let l = new ke(ts, es, t, e);
      l.layers = this.layers, this.add(l);
    }
    updateCoordinateSystem() {
      let t = this.coordinateSystem, e = this.children.concat(), [n, s, r, a, o, c] = e;
      for (let l of e) this.remove(l);
      if (t === On) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
      else if (t === aa) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
      else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
      for (let l of e) this.add(l), l.updateMatrixWorld();
    }
    update(t, e) {
      this.parent === null && this.updateMatrixWorld();
      let { renderTarget: n, activeMipmapLevel: s } = this;
      this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
      let [r, a, o, c, l, h] = this.children, d = t.getRenderTarget(), u = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), g = t.xr.enabled;
      t.xr.enabled = false;
      let v = n.texture.generateMipmaps;
      n.texture.generateMipmaps = false, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, a), t.setRenderTarget(n, 2, s), t.render(e, o), t.setRenderTarget(n, 3, s), t.render(e, c), t.setRenderTarget(n, 4, s), t.render(e, l), n.texture.generateMipmaps = v, t.setRenderTarget(n, 5, s), t.render(e, h), t.setRenderTarget(d, u, p), t.xr.enabled = g, n.texture.needsPMREMUpdate = true;
    }
  }, fa = class extends je {
    constructor(t, e, n, s, r, a, o, c, l, h) {
      t = t !== void 0 ? t : [], e = e !== void 0 ? e : us, super(t, e, n, s, r, a, o, c, l, h), this.isCubeTexture = true, this.flipY = false;
    }
    get images() {
      return this.image;
    }
    set images(t) {
      this.image = t;
    }
  }, Uc = class extends kn {
    constructor(t = 1, e = {}) {
      super(t, t, e), this.isWebGLCubeRenderTarget = true;
      let n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
      this.texture = new fa(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = true, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : false, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : Sn;
    }
    fromEquirectangularTexture(t, e) {
      this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
      let n = { uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			` }, s = new Ci(5, 5, 5), r = new nn({ name: "CubemapFromEquirect", uniforms: gs(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: Fe, blending: si });
      r.uniforms.tEquirect.value = e;
      let a = new Ce(s, r), o = e.minFilter;
      return e.minFilter === Ai && (e.minFilter = Sn), new Dc(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
    }
    clear(t, e, n, s) {
      let r = t.getRenderTarget();
      for (let a = 0; a < 6; a++) t.setRenderTarget(this, a), t.clear(e, n, s);
      t.setRenderTarget(r);
    }
  }, Po = new T(), Bf = new T(), zf = new Xt(), Fn = class {
    constructor(t = new T(1, 0, 0), e = 0) {
      this.isPlane = true, this.normal = t, this.constant = e;
    }
    set(t, e) {
      return this.normal.copy(t), this.constant = e, this;
    }
    setComponents(t, e, n, s) {
      return this.normal.set(t, e, n), this.constant = s, this;
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
    }
    setFromCoplanarPoints(t, e, n) {
      let s = Po.subVectors(n, e).cross(Bf.subVectors(t, e)).normalize();
      return this.setFromNormalAndCoplanarPoint(s, t), this;
    }
    copy(t) {
      return this.normal.copy(t.normal), this.constant = t.constant, this;
    }
    normalize() {
      let t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), this.constant *= t, this;
    }
    negate() {
      return this.constant *= -1, this.normal.negate(), this;
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }
    projectPoint(t, e) {
      return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
    }
    intersectLine(t, e) {
      let n = t.delta(Po), s = this.normal.dot(n);
      if (s === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
      let r = -(t.start.dot(this.normal) + this.constant) / s;
      return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r);
    }
    intersectsLine(t) {
      let e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
      return e < 0 && n > 0 || n < 0 && e > 0;
    }
    intersectsBox(t) {
      return t.intersectsPlane(this);
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }
    coplanarPoint(t) {
      return t.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(t, e) {
      let n = e || zf.getNormalMatrix(t), s = this.coplanarPoint(Po).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
      return this.constant = -s.dot(r), this;
    }
    translate(t) {
      return this.constant -= t.dot(this.normal), this;
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, vi = new Hn(), kr = new T(), js = class {
    constructor(t = new Fn(), e = new Fn(), n = new Fn(), s = new Fn(), r = new Fn(), a = new Fn()) {
      this.planes = [t, e, n, s, r, a];
    }
    set(t, e, n, s, r, a) {
      let o = this.planes;
      return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(s), o[4].copy(r), o[5].copy(a), this;
    }
    copy(t) {
      let e = this.planes;
      for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
      return this;
    }
    setFromProjectionMatrix(t, e = On) {
      let n = this.planes, s = t.elements, r = s[0], a = s[1], o = s[2], c = s[3], l = s[4], h = s[5], d = s[6], u = s[7], p = s[8], g = s[9], v = s[10], m = s[11], f = s[12], E = s[13], x = s[14], _ = s[15];
      if (n[0].setComponents(c - r, u - l, m - p, _ - f).normalize(), n[1].setComponents(c + r, u + l, m + p, _ + f).normalize(), n[2].setComponents(c + a, u + h, m + g, _ + E).normalize(), n[3].setComponents(c - a, u - h, m - g, _ - E).normalize(), n[4].setComponents(c - o, u - d, m - v, _ - x).normalize(), e === On) n[5].setComponents(c + o, u + d, m + v, _ + x).normalize();
      else if (e === aa) n[5].setComponents(o, d, v, x).normalize();
      else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
      return this;
    }
    intersectsObject(t) {
      if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
      else {
        let e = t.geometry;
        e.boundingSphere === null && e.computeBoundingSphere(), vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
      }
      return this.intersectsSphere(vi);
    }
    intersectsSprite(t) {
      return vi.center.set(0, 0, 0), vi.radius = 0.7071067811865476, vi.applyMatrix4(t.matrixWorld), this.intersectsSphere(vi);
    }
    intersectsSphere(t) {
      let e = this.planes, n = t.center, s = -t.radius;
      for (let r = 0; r < 6; r++) if (e[r].distanceToPoint(n) < s) return false;
      return true;
    }
    intersectsBox(t) {
      let e = this.planes;
      for (let n = 0; n < 6; n++) {
        let s = e[n];
        if (kr.x = s.normal.x > 0 ? t.max.x : t.min.x, kr.y = s.normal.y > 0 ? t.max.y : t.min.y, kr.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(kr) < 0) return false;
      }
      return true;
    }
    containsPoint(t) {
      let e = this.planes;
      for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return false;
      return true;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  function Fu() {
    let i = null, t = false, e = null, n = null;
    function s(r, a) {
      e(r, a), n = i.requestAnimationFrame(s);
    }
    return { start: function() {
      t !== true && e !== null && (n = i.requestAnimationFrame(s), t = true);
    }, stop: function() {
      i.cancelAnimationFrame(n), t = false;
    }, setAnimationLoop: function(r) {
      e = r;
    }, setContext: function(r) {
      i = r;
    } };
  }
  function kf(i) {
    let t = /* @__PURE__ */ new WeakMap();
    function e(o, c) {
      let l = o.array, h = o.usage, d = l.byteLength, u = i.createBuffer();
      i.bindBuffer(c, u), i.bufferData(c, l, h), o.onUploadCallback();
      let p;
      if (l instanceof Float32Array) p = i.FLOAT;
      else if (l instanceof Uint16Array) o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
      else if (l instanceof Int16Array) p = i.SHORT;
      else if (l instanceof Uint32Array) p = i.UNSIGNED_INT;
      else if (l instanceof Int32Array) p = i.INT;
      else if (l instanceof Int8Array) p = i.BYTE;
      else if (l instanceof Uint8Array) p = i.UNSIGNED_BYTE;
      else if (l instanceof Uint8ClampedArray) p = i.UNSIGNED_BYTE;
      else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
      return { buffer: u, type: p, bytesPerElement: l.BYTES_PER_ELEMENT, version: o.version, size: d };
    }
    function n(o, c, l) {
      let h = c.array, d = c.updateRanges;
      if (i.bindBuffer(l, o), d.length === 0) i.bufferSubData(l, 0, h);
      else {
        d.sort((p, g) => p.start - g.start);
        let u = 0;
        for (let p = 1; p < d.length; p++) {
          let g = d[u], v = d[p];
          v.start <= g.start + g.count + 1 ? g.count = Math.max(g.count, v.start + v.count - g.start) : (++u, d[u] = v);
        }
        d.length = u + 1;
        for (let p = 0, g = d.length; p < g; p++) {
          let v = d[p];
          i.bufferSubData(l, v.start * h.BYTES_PER_ELEMENT, h, v.start, v.count);
        }
        c.clearUpdateRanges();
      }
      c.onUploadCallback();
    }
    function s(o) {
      return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
    }
    function r(o) {
      o.isInterleavedBufferAttribute && (o = o.data);
      let c = t.get(o);
      c && (i.deleteBuffer(c.buffer), t.delete(o));
    }
    function a(o, c) {
      if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
        let h = t.get(o);
        (!h || h.version < o.version) && t.set(o, { buffer: o.buffer, type: o.type, bytesPerElement: o.elementSize, version: o.version });
        return;
      }
      let l = t.get(o);
      if (l === void 0) t.set(o, e(o, c));
      else if (l.version < o.version) {
        if (l.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        n(l.buffer, o, c), l.version = o.version;
      }
    }
    return { get: s, remove: r, update: a };
  }
  var _s = class i extends Se {
    constructor(t = 1, e = 1, n = 1, s = 1) {
      super(), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: n, heightSegments: s };
      let r = t / 2, a = e / 2, o = Math.floor(n), c = Math.floor(s), l = o + 1, h = c + 1, d = t / o, u = e / c, p = [], g = [], v = [], m = [];
      for (let f = 0; f < h; f++) {
        let E = f * u - a;
        for (let x = 0; x < l; x++) {
          let _ = x * d - r;
          g.push(_, -E, 0), v.push(0, 0, 1), m.push(x / o), m.push(1 - f / c);
        }
      }
      for (let f = 0; f < c; f++) for (let E = 0; E < o; E++) {
        let x = E + l * f, _ = E + l * (f + 1), D = E + 1 + l * (f + 1), R = E + 1 + l * f;
        p.push(x, _, R), p.push(_, D, R);
      }
      this.setIndex(p), this.setAttribute("position", new te(g, 3)), this.setAttribute("normal", new te(v, 3)), this.setAttribute("uv", new te(m, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.width, t.height, t.widthSegments, t.heightSegments);
    }
  }, Vf = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Hf = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Gf = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Wf = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Xf = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, qf = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Yf = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Zf = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Jf = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, $f = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Kf = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Qf = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, jf = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, tp = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, ep = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, np = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, ip = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, sp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, rp = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, ap = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, op = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, cp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, lp = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, hp = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, up = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, dp = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, fp = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, pp = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, mp = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, gp = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, _p = "gl_FragColor = linearToOutputTexel( gl_FragColor );", xp = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, vp = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, yp = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Mp = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Sp = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, bp = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Ep = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, wp = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Tp = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Ap = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Rp = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Cp = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Ip = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Pp = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Lp = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Dp = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Up = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Np = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Fp = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Op = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Bp = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, zp = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, kp = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Vp = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Hp = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Gp = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Wp = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Xp = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, qp = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Yp = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Zp = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Jp = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, $p = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Kp = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Qp = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, jp = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, tm = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, em = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, nm = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, im = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, sm = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, rm = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, am = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, om = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, cm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, lm = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, hm = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, um = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, dm = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, fm = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, pm = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, mm = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, gm = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, _m = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, xm = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, vm = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, ym = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Mm = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Sm = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, bm = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Em = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, wm = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Tm = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Am = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Rm = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Cm = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Im = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Pm = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Lm = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Dm = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Um = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Nm = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Fm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Om = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Bm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, zm = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`, km = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Vm = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Hm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Gm = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Wm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Xm = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, qm = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Ym = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, Zm = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Jm = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, $m = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Km = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Qm = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, jm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, tg = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, eg = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, ng = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, ig = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, sg = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, rg = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, ag = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, og = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, cg = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, lg = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, hg = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, ug = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, dg = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, fg = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, pg = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, mg = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, gg = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, _g = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, xg = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, vg = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Yt = { alphahash_fragment: Vf, alphahash_pars_fragment: Hf, alphamap_fragment: Gf, alphamap_pars_fragment: Wf, alphatest_fragment: Xf, alphatest_pars_fragment: qf, aomap_fragment: Yf, aomap_pars_fragment: Zf, batching_pars_vertex: Jf, batching_vertex: $f, begin_vertex: Kf, beginnormal_vertex: Qf, bsdfs: jf, iridescence_fragment: tp, bumpmap_pars_fragment: ep, clipping_planes_fragment: np, clipping_planes_pars_fragment: ip, clipping_planes_pars_vertex: sp, clipping_planes_vertex: rp, color_fragment: ap, color_pars_fragment: op, color_pars_vertex: cp, color_vertex: lp, common: hp, cube_uv_reflection_fragment: up, defaultnormal_vertex: dp, displacementmap_pars_vertex: fp, displacementmap_vertex: pp, emissivemap_fragment: mp, emissivemap_pars_fragment: gp, colorspace_fragment: _p, colorspace_pars_fragment: xp, envmap_fragment: vp, envmap_common_pars_fragment: yp, envmap_pars_fragment: Mp, envmap_pars_vertex: Sp, envmap_physical_pars_fragment: Dp, envmap_vertex: bp, fog_vertex: Ep, fog_pars_vertex: wp, fog_fragment: Tp, fog_pars_fragment: Ap, gradientmap_pars_fragment: Rp, lightmap_pars_fragment: Cp, lights_lambert_fragment: Ip, lights_lambert_pars_fragment: Pp, lights_pars_begin: Lp, lights_toon_fragment: Up, lights_toon_pars_fragment: Np, lights_phong_fragment: Fp, lights_phong_pars_fragment: Op, lights_physical_fragment: Bp, lights_physical_pars_fragment: zp, lights_fragment_begin: kp, lights_fragment_maps: Vp, lights_fragment_end: Hp, logdepthbuf_fragment: Gp, logdepthbuf_pars_fragment: Wp, logdepthbuf_pars_vertex: Xp, logdepthbuf_vertex: qp, map_fragment: Yp, map_pars_fragment: Zp, map_particle_fragment: Jp, map_particle_pars_fragment: $p, metalnessmap_fragment: Kp, metalnessmap_pars_fragment: Qp, morphinstance_vertex: jp, morphcolor_vertex: tm, morphnormal_vertex: em, morphtarget_pars_vertex: nm, morphtarget_vertex: im, normal_fragment_begin: sm, normal_fragment_maps: rm, normal_pars_fragment: am, normal_pars_vertex: om, normal_vertex: cm, normalmap_pars_fragment: lm, clearcoat_normal_fragment_begin: hm, clearcoat_normal_fragment_maps: um, clearcoat_pars_fragment: dm, iridescence_pars_fragment: fm, opaque_fragment: pm, packing: mm, premultiplied_alpha_fragment: gm, project_vertex: _m, dithering_fragment: xm, dithering_pars_fragment: vm, roughnessmap_fragment: ym, roughnessmap_pars_fragment: Mm, shadowmap_pars_fragment: Sm, shadowmap_pars_vertex: bm, shadowmap_vertex: Em, shadowmask_pars_fragment: wm, skinbase_vertex: Tm, skinning_pars_vertex: Am, skinning_vertex: Rm, skinnormal_vertex: Cm, specularmap_fragment: Im, specularmap_pars_fragment: Pm, tonemapping_fragment: Lm, tonemapping_pars_fragment: Dm, transmission_fragment: Um, transmission_pars_fragment: Nm, uv_pars_fragment: Fm, uv_pars_vertex: Om, uv_vertex: Bm, worldpos_vertex: zm, background_vert: km, background_frag: Vm, backgroundCube_vert: Hm, backgroundCube_frag: Gm, cube_vert: Wm, cube_frag: Xm, depth_vert: qm, depth_frag: Ym, distanceRGBA_vert: Zm, distanceRGBA_frag: Jm, equirect_vert: $m, equirect_frag: Km, linedashed_vert: Qm, linedashed_frag: jm, meshbasic_vert: tg, meshbasic_frag: eg, meshlambert_vert: ng, meshlambert_frag: ig, meshmatcap_vert: sg, meshmatcap_frag: rg, meshnormal_vert: ag, meshnormal_frag: og, meshphong_vert: cg, meshphong_frag: lg, meshphysical_vert: hg, meshphysical_frag: ug, meshtoon_vert: dg, meshtoon_frag: fg, points_vert: pg, points_frag: mg, shadow_vert: gg, shadow_frag: _g, sprite_vert: xg, sprite_frag: vg }, dt = { common: { diffuse: { value: new Ht(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new Xt() }, alphaMap: { value: null }, alphaMapTransform: { value: new Xt() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Xt() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new Xt() }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Xt() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Xt() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Xt() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new Xt() }, normalScale: { value: new ht(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new Xt() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Xt() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Xt() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Xt() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Ht(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new Ht(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new Xt() }, alphaTest: { value: 0 }, uvTransform: { value: new Xt() } }, sprite: { diffuse: { value: new Ht(16777215) }, opacity: { value: 1 }, center: { value: new ht(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new Xt() }, alphaMap: { value: null }, alphaMapTransform: { value: new Xt() }, alphaTest: { value: 0 } } }, Mn = { basic: { uniforms: ze([dt.common, dt.specularmap, dt.envmap, dt.aomap, dt.lightmap, dt.fog]), vertexShader: Yt.meshbasic_vert, fragmentShader: Yt.meshbasic_frag }, lambert: { uniforms: ze([dt.common, dt.specularmap, dt.envmap, dt.aomap, dt.lightmap, dt.emissivemap, dt.bumpmap, dt.normalmap, dt.displacementmap, dt.fog, dt.lights, { emissive: { value: new Ht(0) } }]), vertexShader: Yt.meshlambert_vert, fragmentShader: Yt.meshlambert_frag }, phong: { uniforms: ze([dt.common, dt.specularmap, dt.envmap, dt.aomap, dt.lightmap, dt.emissivemap, dt.bumpmap, dt.normalmap, dt.displacementmap, dt.fog, dt.lights, { emissive: { value: new Ht(0) }, specular: { value: new Ht(1118481) }, shininess: { value: 30 } }]), vertexShader: Yt.meshphong_vert, fragmentShader: Yt.meshphong_frag }, standard: { uniforms: ze([dt.common, dt.envmap, dt.aomap, dt.lightmap, dt.emissivemap, dt.bumpmap, dt.normalmap, dt.displacementmap, dt.roughnessmap, dt.metalnessmap, dt.fog, dt.lights, { emissive: { value: new Ht(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Yt.meshphysical_vert, fragmentShader: Yt.meshphysical_frag }, toon: { uniforms: ze([dt.common, dt.aomap, dt.lightmap, dt.emissivemap, dt.bumpmap, dt.normalmap, dt.displacementmap, dt.gradientmap, dt.fog, dt.lights, { emissive: { value: new Ht(0) } }]), vertexShader: Yt.meshtoon_vert, fragmentShader: Yt.meshtoon_frag }, matcap: { uniforms: ze([dt.common, dt.bumpmap, dt.normalmap, dt.displacementmap, dt.fog, { matcap: { value: null } }]), vertexShader: Yt.meshmatcap_vert, fragmentShader: Yt.meshmatcap_frag }, points: { uniforms: ze([dt.points, dt.fog]), vertexShader: Yt.points_vert, fragmentShader: Yt.points_frag }, dashed: { uniforms: ze([dt.common, dt.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Yt.linedashed_vert, fragmentShader: Yt.linedashed_frag }, depth: { uniforms: ze([dt.common, dt.displacementmap]), vertexShader: Yt.depth_vert, fragmentShader: Yt.depth_frag }, normal: { uniforms: ze([dt.common, dt.bumpmap, dt.normalmap, dt.displacementmap, { opacity: { value: 1 } }]), vertexShader: Yt.meshnormal_vert, fragmentShader: Yt.meshnormal_frag }, sprite: { uniforms: ze([dt.sprite, dt.fog]), vertexShader: Yt.sprite_vert, fragmentShader: Yt.sprite_frag }, background: { uniforms: { uvTransform: { value: new Xt() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Yt.background_vert, fragmentShader: Yt.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new Xt() } }, vertexShader: Yt.backgroundCube_vert, fragmentShader: Yt.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Yt.cube_vert, fragmentShader: Yt.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Yt.equirect_vert, fragmentShader: Yt.equirect_frag }, distanceRGBA: { uniforms: ze([dt.common, dt.displacementmap, { referencePosition: { value: new T() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Yt.distanceRGBA_vert, fragmentShader: Yt.distanceRGBA_frag }, shadow: { uniforms: ze([dt.lights, dt.fog, { color: { value: new Ht(0) }, opacity: { value: 1 } }]), vertexShader: Yt.shadow_vert, fragmentShader: Yt.shadow_frag } };
  Mn.physical = { uniforms: ze([Mn.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new Xt() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new Xt() }, clearcoatNormalScale: { value: new ht(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new Xt() }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new Xt() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new Xt() }, sheen: { value: 0 }, sheenColor: { value: new Ht(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new Xt() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new Xt() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new Xt() }, transmissionSamplerSize: { value: new ht() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new Xt() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Ht(0) }, specularColor: { value: new Ht(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new Xt() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new Xt() }, anisotropyVector: { value: new ht() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new Xt() } }]), vertexShader: Yt.meshphysical_vert, fragmentShader: Yt.meshphysical_frag };
  var Vr = { r: 0, b: 0, g: 0 }, yi = new En(), yg = new ee();
  function Mg(i, t, e, n, s, r, a) {
    let o = new Ht(0), c = r === true ? 0 : 1, l, h, d = null, u = 0, p = null;
    function g(E) {
      let x = E.isScene === true ? E.background : null;
      return x && x.isTexture && (x = (E.backgroundBlurriness > 0 ? e : t).get(x)), x;
    }
    function v(E) {
      let x = false, _ = g(E);
      _ === null ? f(o, c) : _ && _.isColor && (f(_, 1), x = true);
      let D = i.xr.getEnvironmentBlendMode();
      D === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : D === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || x) && (n.buffers.depth.setTest(true), n.buffers.depth.setMask(true), n.buffers.color.setMask(true), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
    }
    function m(E, x) {
      let _ = g(x);
      _ && (_.isCubeTexture || _.mapping === Oa) ? (h === void 0 && (h = new Ce(new Ci(1, 1, 1), new nn({ name: "BackgroundCubeMaterial", uniforms: gs(Mn.backgroundCube.uniforms), vertexShader: Mn.backgroundCube.vertexShader, fragmentShader: Mn.backgroundCube.fragmentShader, side: Fe, depthTest: false, depthWrite: false, fog: false })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(D, R, C) {
        this.matrixWorld.copyPosition(C.matrixWorld);
      }, Object.defineProperty(h.material, "envMap", { get: function() {
        return this.uniforms.envMap.value;
      } }), s.update(h)), yi.copy(x.backgroundRotation), yi.x *= -1, yi.y *= -1, yi.z *= -1, _.isCubeTexture && _.isRenderTargetTexture === false && (yi.y *= -1, yi.z *= -1), h.material.uniforms.envMap.value = _, h.material.uniforms.flipEnvMap.value = _.isCubeTexture && _.isRenderTargetTexture === false ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = x.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(yg.makeRotationFromEuler(yi)), h.material.toneMapped = Qt.getTransfer(_.colorSpace) !== oe, (d !== _ || u !== _.version || p !== i.toneMapping) && (h.material.needsUpdate = true, d = _, u = _.version, p = i.toneMapping), h.layers.enableAll(), E.unshift(h, h.geometry, h.material, 0, 0, null)) : _ && _.isTexture && (l === void 0 && (l = new Ce(new _s(2, 2), new nn({ name: "BackgroundMaterial", uniforms: gs(Mn.background.uniforms), vertexShader: Mn.background.vertexShader, fragmentShader: Mn.background.fragmentShader, side: ai, depthTest: false, depthWrite: false, fog: false })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function() {
        return this.uniforms.t2D.value;
      } }), s.update(l)), l.material.uniforms.t2D.value = _, l.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, l.material.toneMapped = Qt.getTransfer(_.colorSpace) !== oe, _.matrixAutoUpdate === true && _.updateMatrix(), l.material.uniforms.uvTransform.value.copy(_.matrix), (d !== _ || u !== _.version || p !== i.toneMapping) && (l.material.needsUpdate = true, d = _, u = _.version, p = i.toneMapping), l.layers.enableAll(), E.unshift(l, l.geometry, l.material, 0, 0, null));
    }
    function f(E, x) {
      E.getRGB(Vr, Nu(i)), n.buffers.color.setClear(Vr.r, Vr.g, Vr.b, x, a);
    }
    return { getClearColor: function() {
      return o;
    }, setClearColor: function(E, x = 1) {
      o.set(E), c = x, f(o, c);
    }, getClearAlpha: function() {
      return c;
    }, setClearAlpha: function(E) {
      c = E, f(o, c);
    }, render: v, addToRenderList: m };
  }
  function Sg(i, t) {
    let e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = u(null), r = s, a = false;
    function o(M, I, H, B, G) {
      let $ = false, W = d(B, H, I);
      r !== W && (r = W, l(r.object)), $ = p(M, B, H, G), $ && g(M, B, H, G), G !== null && t.update(G, i.ELEMENT_ARRAY_BUFFER), ($ || a) && (a = false, _(M, I, H, B), G !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(G).buffer));
    }
    function c() {
      return i.createVertexArray();
    }
    function l(M) {
      return i.bindVertexArray(M);
    }
    function h(M) {
      return i.deleteVertexArray(M);
    }
    function d(M, I, H) {
      let B = H.wireframe === true, G = n[M.id];
      G === void 0 && (G = {}, n[M.id] = G);
      let $ = G[I.id];
      $ === void 0 && ($ = {}, G[I.id] = $);
      let W = $[B];
      return W === void 0 && (W = u(c()), $[B] = W), W;
    }
    function u(M) {
      let I = [], H = [], B = [];
      for (let G = 0; G < e; G++) I[G] = 0, H[G] = 0, B[G] = 0;
      return { geometry: null, program: null, wireframe: false, newAttributes: I, enabledAttributes: H, attributeDivisors: B, object: M, attributes: {}, index: null };
    }
    function p(M, I, H, B) {
      let G = r.attributes, $ = I.attributes, W = 0, nt = H.getAttributes();
      for (let X in nt) if (nt[X].location >= 0) {
        let xt = G[X], Et = $[X];
        if (Et === void 0 && (X === "instanceMatrix" && M.instanceMatrix && (Et = M.instanceMatrix), X === "instanceColor" && M.instanceColor && (Et = M.instanceColor)), xt === void 0 || xt.attribute !== Et || Et && xt.data !== Et.data) return true;
        W++;
      }
      return r.attributesNum !== W || r.index !== B;
    }
    function g(M, I, H, B) {
      let G = {}, $ = I.attributes, W = 0, nt = H.getAttributes();
      for (let X in nt) if (nt[X].location >= 0) {
        let xt = $[X];
        xt === void 0 && (X === "instanceMatrix" && M.instanceMatrix && (xt = M.instanceMatrix), X === "instanceColor" && M.instanceColor && (xt = M.instanceColor));
        let Et = {};
        Et.attribute = xt, xt && xt.data && (Et.data = xt.data), G[X] = Et, W++;
      }
      r.attributes = G, r.attributesNum = W, r.index = B;
    }
    function v() {
      let M = r.newAttributes;
      for (let I = 0, H = M.length; I < H; I++) M[I] = 0;
    }
    function m(M) {
      f(M, 0);
    }
    function f(M, I) {
      let H = r.newAttributes, B = r.enabledAttributes, G = r.attributeDivisors;
      H[M] = 1, B[M] === 0 && (i.enableVertexAttribArray(M), B[M] = 1), G[M] !== I && (i.vertexAttribDivisor(M, I), G[M] = I);
    }
    function E() {
      let M = r.newAttributes, I = r.enabledAttributes;
      for (let H = 0, B = I.length; H < B; H++) I[H] !== M[H] && (i.disableVertexAttribArray(H), I[H] = 0);
    }
    function x(M, I, H, B, G, $, W) {
      W === true ? i.vertexAttribIPointer(M, I, H, G, $) : i.vertexAttribPointer(M, I, H, B, G, $);
    }
    function _(M, I, H, B) {
      v();
      let G = B.attributes, $ = H.getAttributes(), W = I.defaultAttributeValues;
      for (let nt in $) {
        let X = $[nt];
        if (X.location >= 0) {
          let lt = G[nt];
          if (lt === void 0 && (nt === "instanceMatrix" && M.instanceMatrix && (lt = M.instanceMatrix), nt === "instanceColor" && M.instanceColor && (lt = M.instanceColor)), lt !== void 0) {
            let xt = lt.normalized, Et = lt.itemSize, Vt = t.get(lt);
            if (Vt === void 0) continue;
            let ne = Vt.buffer, J = Vt.type, st = Vt.bytesPerElement, wt = J === i.INT || J === i.UNSIGNED_INT || lt.gpuType === xl;
            if (lt.isInterleavedBufferAttribute) {
              let at = lt.data, Lt = at.stride, zt = lt.offset;
              if (at.isInstancedInterleavedBuffer) {
                for (let Ot = 0; Ot < X.locationSize; Ot++) f(X.location + Ot, at.meshPerAttribute);
                M.isInstancedMesh !== true && B._maxInstanceCount === void 0 && (B._maxInstanceCount = at.meshPerAttribute * at.count);
              } else for (let Ot = 0; Ot < X.locationSize; Ot++) m(X.location + Ot);
              i.bindBuffer(i.ARRAY_BUFFER, ne);
              for (let Ot = 0; Ot < X.locationSize; Ot++) x(X.location + Ot, Et / X.locationSize, J, xt, Lt * st, (zt + Et / X.locationSize * Ot) * st, wt);
            } else {
              if (lt.isInstancedBufferAttribute) {
                for (let at = 0; at < X.locationSize; at++) f(X.location + at, lt.meshPerAttribute);
                M.isInstancedMesh !== true && B._maxInstanceCount === void 0 && (B._maxInstanceCount = lt.meshPerAttribute * lt.count);
              } else for (let at = 0; at < X.locationSize; at++) m(X.location + at);
              i.bindBuffer(i.ARRAY_BUFFER, ne);
              for (let at = 0; at < X.locationSize; at++) x(X.location + at, Et / X.locationSize, J, xt, Et * st, Et / X.locationSize * at * st, wt);
            }
          } else if (W !== void 0) {
            let xt = W[nt];
            if (xt !== void 0) switch (xt.length) {
              case 2:
                i.vertexAttrib2fv(X.location, xt);
                break;
              case 3:
                i.vertexAttrib3fv(X.location, xt);
                break;
              case 4:
                i.vertexAttrib4fv(X.location, xt);
                break;
              default:
                i.vertexAttrib1fv(X.location, xt);
            }
          }
        }
      }
      E();
    }
    function D() {
      L();
      for (let M in n) {
        let I = n[M];
        for (let H in I) {
          let B = I[H];
          for (let G in B) h(B[G].object), delete B[G];
          delete I[H];
        }
        delete n[M];
      }
    }
    function R(M) {
      if (n[M.id] === void 0) return;
      let I = n[M.id];
      for (let H in I) {
        let B = I[H];
        for (let G in B) h(B[G].object), delete B[G];
        delete I[H];
      }
      delete n[M.id];
    }
    function C(M) {
      for (let I in n) {
        let H = n[I];
        if (H[M.id] === void 0) continue;
        let B = H[M.id];
        for (let G in B) h(B[G].object), delete B[G];
        delete H[M.id];
      }
    }
    function L() {
      b(), a = true, r !== s && (r = s, l(r.object));
    }
    function b() {
      s.geometry = null, s.program = null, s.wireframe = false;
    }
    return { setup: o, reset: L, resetDefaultState: b, dispose: D, releaseStatesOfGeometry: R, releaseStatesOfProgram: C, initAttributes: v, enableAttribute: m, disableUnusedAttributes: E };
  }
  function bg(i, t, e) {
    let n;
    function s(l) {
      n = l;
    }
    function r(l, h) {
      i.drawArrays(n, l, h), e.update(h, n, 1);
    }
    function a(l, h, d) {
      d !== 0 && (i.drawArraysInstanced(n, l, h, d), e.update(h, n, d));
    }
    function o(l, h, d) {
      if (d === 0) return;
      t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, h, 0, d);
      let p = 0;
      for (let g = 0; g < d; g++) p += h[g];
      e.update(p, n, 1);
    }
    function c(l, h, d, u) {
      if (d === 0) return;
      let p = t.get("WEBGL_multi_draw");
      if (p === null) for (let g = 0; g < l.length; g++) a(l[g], h[g], u[g]);
      else {
        p.multiDrawArraysInstancedWEBGL(n, l, 0, h, 0, u, 0, d);
        let g = 0;
        for (let v = 0; v < d; v++) g += h[v] * u[v];
        e.update(g, n, 1);
      }
    }
    this.setMode = s, this.render = r, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = c;
  }
  function Eg(i, t, e, n) {
    let s;
    function r() {
      if (s !== void 0) return s;
      if (t.has("EXT_texture_filter_anisotropic") === true) {
        let C = t.get("EXT_texture_filter_anisotropic");
        s = i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else s = 0;
      return s;
    }
    function a(C) {
      return !(C !== dn && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
    }
    function o(C) {
      let L = C === ur && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
      return !(C !== zn && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && C !== bn && !L);
    }
    function c(C) {
      if (C === "highp") {
        if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0) return "highp";
        C = "mediump";
      }
      return C === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
    }
    let l = e.precision !== void 0 ? e.precision : "highp", h = c(l);
    h !== l && (console.warn("THREE.WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
    let d = e.logarithmicDepthBuffer === true, u = e.reverseDepthBuffer === true && t.has("EXT_clip_control"), p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), v = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), f = i.getParameter(i.MAX_VERTEX_ATTRIBS), E = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), x = i.getParameter(i.MAX_VARYING_VECTORS), _ = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), D = g > 0, R = i.getParameter(i.MAX_SAMPLES);
    return { isWebGL2: true, getMaxAnisotropy: r, getMaxPrecision: c, textureFormatReadable: a, textureTypeReadable: o, precision: l, logarithmicDepthBuffer: d, reverseDepthBuffer: u, maxTextures: p, maxVertexTextures: g, maxTextureSize: v, maxCubemapSize: m, maxAttributes: f, maxVertexUniforms: E, maxVaryings: x, maxFragmentUniforms: _, vertexTextures: D, maxSamples: R };
  }
  function wg(i) {
    let t = this, e = null, n = 0, s = false, r = false, a = new Fn(), o = new Xt(), c = { value: null, needsUpdate: false };
    this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, u) {
      let p = d.length !== 0 || u || n !== 0 || s;
      return s = u, n = d.length, p;
    }, this.beginShadows = function() {
      r = true, h(null);
    }, this.endShadows = function() {
      r = false;
    }, this.setGlobalState = function(d, u) {
      e = h(d, u, 0);
    }, this.setState = function(d, u, p) {
      let g = d.clippingPlanes, v = d.clipIntersection, m = d.clipShadows, f = i.get(d);
      if (!s || g === null || g.length === 0 || r && !m) r ? h(null) : l();
      else {
        let E = r ? 0 : n, x = E * 4, _ = f.clippingState || null;
        c.value = _, _ = h(g, u, x, p);
        for (let D = 0; D !== x; ++D) _[D] = e[D];
        f.clippingState = _, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += E;
      }
    };
    function l() {
      c.value !== e && (c.value = e, c.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
    }
    function h(d, u, p, g) {
      let v = d !== null ? d.length : 0, m = null;
      if (v !== 0) {
        if (m = c.value, g !== true || m === null) {
          let f = p + v * 4, E = u.matrixWorldInverse;
          o.getNormalMatrix(E), (m === null || m.length < f) && (m = new Float32Array(f));
          for (let x = 0, _ = p; x !== v; ++x, _ += 4) a.copy(d[x]).applyMatrix4(E, o), a.normal.toArray(m, _), m[_ + 3] = a.constant;
        }
        c.value = m, c.needsUpdate = true;
      }
      return t.numPlanes = v, t.numIntersection = 0, m;
    }
  }
  function Tg(i) {
    let t = /* @__PURE__ */ new WeakMap();
    function e(a, o) {
      return o === Qo ? a.mapping = us : o === jo && (a.mapping = ds), a;
    }
    function n(a) {
      if (a && a.isTexture) {
        let o = a.mapping;
        if (o === Qo || o === jo) if (t.has(a)) {
          let c = t.get(a).texture;
          return e(c, a.mapping);
        } else {
          let c = a.image;
          if (c && c.height > 0) {
            let l = new Uc(c.height);
            return l.fromEquirectangularTexture(i, a), t.set(a, l), a.addEventListener("dispose", s), e(l.texture, a.mapping);
          } else return null;
        }
      }
      return a;
    }
    function s(a) {
      let o = a.target;
      o.removeEventListener("dispose", s);
      let c = t.get(o);
      c !== void 0 && (t.delete(o), c.dispose());
    }
    function r() {
      t = /* @__PURE__ */ new WeakMap();
    }
    return { get: n, dispose: r };
  }
  var pa = class extends da {
    constructor(t = -1, e = 1, n = 1, s = -1, r = 0.1, a = 2e3) {
      super(), this.isOrthographicCamera = true, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = s, this.near = r, this.far = a, this.updateProjectionMatrix();
    }
    copy(t, e) {
      return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
    }
    setViewOffset(t, e, n, s, r, a) {
      this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2, r = n - t, a = n + t, o = s + e, c = s - e;
      if (this.view !== null && this.view.enabled) {
        let l = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        r += l * this.view.offsetX, a = r + l * this.view.width, o -= h * this.view.offsetY, c = o - h * this.view.height;
      }
      this.projectionMatrix.makeOrthographic(r, a, o, c, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
    }
  }, ss = 4, Dh = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], wi = 20, Lo = new pa(), Uh = new Ht(), Do = null, Uo = 0, No = 0, Fo = false, Si = (1 + Math.sqrt(5)) / 2, ns = 1 / Si, Nh = [new T(-Si, ns, 0), new T(Si, ns, 0), new T(-ns, 0, Si), new T(ns, 0, Si), new T(0, Si, -ns), new T(0, Si, ns), new T(-1, 1, -1), new T(1, 1, -1), new T(-1, 1, 1), new T(1, 1, 1)], ma = class {
    constructor(t) {
      this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
    }
    fromScene(t, e = 0, n = 0.1, s = 100) {
      Do = this._renderer.getRenderTarget(), Uo = this._renderer.getActiveCubeFace(), No = this._renderer.getActiveMipmapLevel(), Fo = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(256);
      let r = this._allocateTargets();
      return r.depthBuffer = true, this._sceneToCubeUV(t, n, s, r), e > 0 && this._blur(r, 0, 0, e), this._applyPMREM(r), this._cleanup(r), r;
    }
    fromEquirectangular(t, e = null) {
      return this._fromTexture(t, e);
    }
    fromCubemap(t, e = null) {
      return this._fromTexture(t, e);
    }
    compileCubemapShader() {
      this._cubemapMaterial === null && (this._cubemapMaterial = Bh(), this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      this._equirectMaterial === null && (this._equirectMaterial = Oh(), this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
    }
    _setSize(t) {
      this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
    }
    _dispose() {
      this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
      for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose();
    }
    _cleanup(t) {
      this._renderer.setRenderTarget(Do, Uo, No), this._renderer.xr.enabled = Fo, t.scissorTest = false, Hr(t, 0, 0, t.width, t.height);
    }
    _fromTexture(t, e) {
      t.mapping === us || t.mapping === ds ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Do = this._renderer.getRenderTarget(), Uo = this._renderer.getActiveCubeFace(), No = this._renderer.getActiveMipmapLevel(), Fo = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
      let n = e || this._allocateTargets();
      return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
    }
    _allocateTargets() {
      let t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = { magFilter: Sn, minFilter: Sn, generateMipmaps: false, type: ur, format: dn, colorSpace: Ms, depthBuffer: false }, s = Fh(t, e, n);
      if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
        this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Fh(t, e, n);
        let { _lodMax: r } = this;
        ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Ag(r)), this._blurMaterial = Rg(r, t, e);
      }
      return s;
    }
    _compileMaterial(t) {
      let e = new Ce(this._lodPlanes[0], t);
      this._renderer.compile(e, Lo);
    }
    _sceneToCubeUV(t, e, n, s) {
      let o = new ke(90, 1, e, n), c = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], h = this._renderer, d = h.autoClear, u = h.toneMapping;
      h.getClearColor(Uh), h.toneMapping = ri, h.autoClear = false;
      let p = new ci({ name: "PMREM.Background", side: Fe, depthWrite: false, depthTest: false }), g = new Ce(new Ci(), p), v = false, m = t.background;
      m ? m.isColor && (p.color.copy(m), t.background = null, v = true) : (p.color.copy(Uh), v = true);
      for (let f = 0; f < 6; f++) {
        let E = f % 3;
        E === 0 ? (o.up.set(0, c[f], 0), o.lookAt(l[f], 0, 0)) : E === 1 ? (o.up.set(0, 0, c[f]), o.lookAt(0, l[f], 0)) : (o.up.set(0, c[f], 0), o.lookAt(0, 0, l[f]));
        let x = this._cubeSize;
        Hr(s, E * x, f > 2 ? x : 0, x, x), h.setRenderTarget(s), v && h.render(g, o), h.render(t, o);
      }
      g.geometry.dispose(), g.material.dispose(), h.toneMapping = u, h.autoClear = d, t.background = m;
    }
    _textureToCubeUV(t, e) {
      let n = this._renderer, s = t.mapping === us || t.mapping === ds;
      s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Bh()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === false ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Oh());
      let r = s ? this._cubemapMaterial : this._equirectMaterial, a = new Ce(this._lodPlanes[0], r), o = r.uniforms;
      o.envMap.value = t;
      let c = this._cubeSize;
      Hr(e, 0, 0, 3 * c, 2 * c), n.setRenderTarget(e), n.render(a, Lo);
    }
    _applyPMREM(t) {
      let e = this._renderer, n = e.autoClear;
      e.autoClear = false;
      let s = this._lodPlanes.length;
      for (let r = 1; r < s; r++) {
        let a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = Nh[(s - r - 1) % Nh.length];
        this._blur(t, r - 1, r, a, o);
      }
      e.autoClear = n;
    }
    _blur(t, e, n, s, r) {
      let a = this._pingPongRenderTarget;
      this._halfBlur(t, a, e, n, s, "latitudinal", r), this._halfBlur(a, t, n, n, s, "longitudinal", r);
    }
    _halfBlur(t, e, n, s, r, a, o) {
      let c = this._renderer, l = this._blurMaterial;
      a !== "latitudinal" && a !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
      let h = 3, d = new Ce(this._lodPlanes[s], l), u = l.uniforms, p = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * wi - 1), v = r / g, m = isFinite(r) ? 1 + Math.floor(h * v) : wi;
      m > wi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);
      let f = [], E = 0;
      for (let C = 0; C < wi; ++C) {
        let L = C / v, b = Math.exp(-L * L / 2);
        f.push(b), C === 0 ? E += b : C < m && (E += 2 * b);
      }
      for (let C = 0; C < f.length; C++) f[C] = f[C] / E;
      u.envMap.value = t.texture, u.samples.value = m, u.weights.value = f, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o);
      let { _lodMax: x } = this;
      u.dTheta.value = g, u.mipInt.value = x - n;
      let _ = this._sizeLods[s], D = 3 * _ * (s > x - ss ? s - x + ss : 0), R = 4 * (this._cubeSize - _);
      Hr(e, D, R, 3 * _, 2 * _), c.setRenderTarget(e), c.render(d, Lo);
    }
  };
  function Ag(i) {
    let t = [], e = [], n = [], s = i, r = i - ss + 1 + Dh.length;
    for (let a = 0; a < r; a++) {
      let o = Math.pow(2, s);
      e.push(o);
      let c = 1 / o;
      a > i - ss ? c = Dh[a - i + ss - 1] : a === 0 && (c = 0), n.push(c);
      let l = 1 / (o - 2), h = -l, d = 1 + l, u = [h, h, d, h, d, d, h, h, d, d, h, d], p = 6, g = 6, v = 3, m = 2, f = 1, E = new Float32Array(v * g * p), x = new Float32Array(m * g * p), _ = new Float32Array(f * g * p);
      for (let R = 0; R < p; R++) {
        let C = R % 3 * 2 / 3 - 1, L = R > 2 ? 0 : -1, b = [C, L, 0, C + 2 / 3, L, 0, C + 2 / 3, L + 1, 0, C, L, 0, C + 2 / 3, L + 1, 0, C, L + 1, 0];
        E.set(b, v * g * R), x.set(u, m * g * R);
        let M = [R, R, R, R, R, R];
        _.set(M, f * g * R);
      }
      let D = new Se();
      D.setAttribute("position", new Ie(E, v)), D.setAttribute("uv", new Ie(x, m)), D.setAttribute("faceIndex", new Ie(_, f)), t.push(D), s > ss && s--;
    }
    return { lodPlanes: t, sizeLods: e, sigmas: n };
  }
  function Fh(i, t, e) {
    let n = new kn(i, t, e);
    return n.texture.mapping = Oa, n.texture.name = "PMREM.cubeUv", n.scissorTest = true, n;
  }
  function Hr(i, t, e, n, s) {
    i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
  }
  function Rg(i, t, e) {
    let n = new Float32Array(wi), s = new T(0, 1, 0);
    return new nn({ name: "SphericalGaussianBlur", defines: { n: wi, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: `${i}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: false }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: s } }, vertexShader: wl(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: si, depthTest: false, depthWrite: false });
  }
  function Oh() {
    return new nn({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: wl(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: si, depthTest: false, depthWrite: false });
  }
  function Bh() {
    return new nn({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: wl(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: si, depthTest: false, depthWrite: false });
  }
  function wl() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
  }
  function Cg(i) {
    let t = /* @__PURE__ */ new WeakMap(), e = null;
    function n(o) {
      if (o && o.isTexture) {
        let c = o.mapping, l = c === Qo || c === jo, h = c === us || c === ds;
        if (l || h) {
          let d = t.get(o), u = d !== void 0 ? d.texture.pmremVersion : 0;
          if (o.isRenderTargetTexture && o.pmremVersion !== u) return e === null && (e = new ma(i)), d = l ? e.fromEquirectangular(o, d) : e.fromCubemap(o, d), d.texture.pmremVersion = o.pmremVersion, t.set(o, d), d.texture;
          if (d !== void 0) return d.texture;
          {
            let p = o.image;
            return l && p && p.height > 0 || h && p && s(p) ? (e === null && (e = new ma(i)), d = l ? e.fromEquirectangular(o) : e.fromCubemap(o), d.texture.pmremVersion = o.pmremVersion, t.set(o, d), o.addEventListener("dispose", r), d.texture) : null;
          }
        }
      }
      return o;
    }
    function s(o) {
      let c = 0, l = 6;
      for (let h = 0; h < l; h++) o[h] !== void 0 && c++;
      return c === l;
    }
    function r(o) {
      let c = o.target;
      c.removeEventListener("dispose", r);
      let l = t.get(c);
      l !== void 0 && (t.delete(c), l.dispose());
    }
    function a() {
      t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
    }
    return { get: n, dispose: a };
  }
  function Ig(i) {
    let t = {};
    function e(n) {
      if (t[n] !== void 0) return t[n];
      let s;
      switch (n) {
        case "WEBGL_depth_texture":
          s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
          break;
        case "EXT_texture_filter_anisotropic":
          s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;
        case "WEBGL_compressed_texture_s3tc":
          s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;
        case "WEBGL_compressed_texture_pvrtc":
          s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;
        default:
          s = i.getExtension(n);
      }
      return t[n] = s, s;
    }
    return { has: function(n) {
      return e(n) !== null;
    }, init: function() {
      e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
    }, get: function(n) {
      let s = e(n);
      return s === null && Xs("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    } };
  }
  function Pg(i, t, e, n) {
    let s = {}, r = /* @__PURE__ */ new WeakMap();
    function a(d) {
      let u = d.target;
      u.index !== null && t.remove(u.index);
      for (let g in u.attributes) t.remove(u.attributes[g]);
      for (let g in u.morphAttributes) {
        let v = u.morphAttributes[g];
        for (let m = 0, f = v.length; m < f; m++) t.remove(v[m]);
      }
      u.removeEventListener("dispose", a), delete s[u.id];
      let p = r.get(u);
      p && (t.remove(p), r.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === true && delete u._maxInstanceCount, e.memory.geometries--;
    }
    function o(d, u) {
      return s[u.id] === true || (u.addEventListener("dispose", a), s[u.id] = true, e.memory.geometries++), u;
    }
    function c(d) {
      let u = d.attributes;
      for (let g in u) t.update(u[g], i.ARRAY_BUFFER);
      let p = d.morphAttributes;
      for (let g in p) {
        let v = p[g];
        for (let m = 0, f = v.length; m < f; m++) t.update(v[m], i.ARRAY_BUFFER);
      }
    }
    function l(d) {
      let u = [], p = d.index, g = d.attributes.position, v = 0;
      if (p !== null) {
        let E = p.array;
        v = p.version;
        for (let x = 0, _ = E.length; x < _; x += 3) {
          let D = E[x + 0], R = E[x + 1], C = E[x + 2];
          u.push(D, R, R, C, C, D);
        }
      } else if (g !== void 0) {
        let E = g.array;
        v = g.version;
        for (let x = 0, _ = E.length / 3 - 1; x < _; x += 3) {
          let D = x + 0, R = x + 1, C = x + 2;
          u.push(D, R, R, C, C, D);
        }
      } else return;
      let m = new (Du(u) ? ua : ha)(u, 1);
      m.version = v;
      let f = r.get(d);
      f && t.remove(f), r.set(d, m);
    }
    function h(d) {
      let u = r.get(d);
      if (u) {
        let p = d.index;
        p !== null && u.version < p.version && l(d);
      } else l(d);
      return r.get(d);
    }
    return { get: o, update: c, getWireframeAttribute: h };
  }
  function Lg(i, t, e) {
    let n;
    function s(u) {
      n = u;
    }
    let r, a;
    function o(u) {
      r = u.type, a = u.bytesPerElement;
    }
    function c(u, p) {
      i.drawElements(n, p, r, u * a), e.update(p, n, 1);
    }
    function l(u, p, g) {
      g !== 0 && (i.drawElementsInstanced(n, p, r, u * a, g), e.update(p, n, g));
    }
    function h(u, p, g) {
      if (g === 0) return;
      t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, p, 0, r, u, 0, g);
      let m = 0;
      for (let f = 0; f < g; f++) m += p[f];
      e.update(m, n, 1);
    }
    function d(u, p, g, v) {
      if (g === 0) return;
      let m = t.get("WEBGL_multi_draw");
      if (m === null) for (let f = 0; f < u.length; f++) l(u[f] / a, p[f], v[f]);
      else {
        m.multiDrawElementsInstancedWEBGL(n, p, 0, r, u, 0, v, 0, g);
        let f = 0;
        for (let E = 0; E < g; E++) f += p[E] * v[E];
        e.update(f, n, 1);
      }
    }
    this.setMode = s, this.setIndex = o, this.render = c, this.renderInstances = l, this.renderMultiDraw = h, this.renderMultiDrawInstances = d;
  }
  function Dg(i) {
    let t = { geometries: 0, textures: 0 }, e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    function n(r, a, o) {
      switch (e.calls++, a) {
        case i.TRIANGLES:
          e.triangles += o * (r / 3);
          break;
        case i.LINES:
          e.lines += o * (r / 2);
          break;
        case i.LINE_STRIP:
          e.lines += o * (r - 1);
          break;
        case i.LINE_LOOP:
          e.lines += o * r;
          break;
        case i.POINTS:
          e.points += o * r;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", a);
          break;
      }
    }
    function s() {
      e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
    }
    return { memory: t, render: e, programs: null, autoReset: true, reset: s, update: n };
  }
  function Ug(i, t, e) {
    let n = /* @__PURE__ */ new WeakMap(), s = new ye();
    function r(a, o, c) {
      let l = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = h !== void 0 ? h.length : 0, u = n.get(o);
      if (u === void 0 || u.count !== d) {
        let b = function() {
          C.dispose(), n.delete(o), o.removeEventListener("dispose", b);
        };
        u !== void 0 && u.texture.dispose();
        let p = o.morphAttributes.position !== void 0, g = o.morphAttributes.normal !== void 0, v = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], f = o.morphAttributes.normal || [], E = o.morphAttributes.color || [], x = 0;
        p === true && (x = 1), g === true && (x = 2), v === true && (x = 3);
        let _ = o.attributes.position.count * x, D = 1;
        _ > t.maxTextureSize && (D = Math.ceil(_ / t.maxTextureSize), _ = t.maxTextureSize);
        let R = new Float32Array(_ * D * 4 * d), C = new la(R, _, D, d);
        C.type = bn, C.needsUpdate = true;
        let L = x * 4;
        for (let M = 0; M < d; M++) {
          let I = m[M], H = f[M], B = E[M], G = _ * D * 4 * M;
          for (let $ = 0; $ < I.count; $++) {
            let W = $ * L;
            p === true && (s.fromBufferAttribute(I, $), R[G + W + 0] = s.x, R[G + W + 1] = s.y, R[G + W + 2] = s.z, R[G + W + 3] = 0), g === true && (s.fromBufferAttribute(H, $), R[G + W + 4] = s.x, R[G + W + 5] = s.y, R[G + W + 6] = s.z, R[G + W + 7] = 0), v === true && (s.fromBufferAttribute(B, $), R[G + W + 8] = s.x, R[G + W + 9] = s.y, R[G + W + 10] = s.z, R[G + W + 11] = B.itemSize === 4 ? s.w : 1);
          }
        }
        u = { count: d, texture: C, size: new ht(_, D) }, n.set(o, u), o.addEventListener("dispose", b);
      }
      if (a.isInstancedMesh === true && a.morphTexture !== null) c.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
      else {
        let p = 0;
        for (let v = 0; v < l.length; v++) p += l[v];
        let g = o.morphTargetsRelative ? 1 : 1 - p;
        c.getUniforms().setValue(i, "morphTargetBaseInfluence", g), c.getUniforms().setValue(i, "morphTargetInfluences", l);
      }
      c.getUniforms().setValue(i, "morphTargetsTexture", u.texture, e), c.getUniforms().setValue(i, "morphTargetsTextureSize", u.size);
    }
    return { update: r };
  }
  function Ng(i, t, e, n) {
    let s = /* @__PURE__ */ new WeakMap();
    function r(c) {
      let l = n.render.frame, h = c.geometry, d = t.get(c, h);
      if (s.get(d) !== l && (t.update(d), s.set(d, l)), c.isInstancedMesh && (c.hasEventListener("dispose", o) === false && c.addEventListener("dispose", o), s.get(c) !== l && (e.update(c.instanceMatrix, i.ARRAY_BUFFER), c.instanceColor !== null && e.update(c.instanceColor, i.ARRAY_BUFFER), s.set(c, l))), c.isSkinnedMesh) {
        let u = c.skeleton;
        s.get(u) !== l && (u.update(), s.set(u, l));
      }
      return d;
    }
    function a() {
      s = /* @__PURE__ */ new WeakMap();
    }
    function o(c) {
      let l = c.target;
      l.removeEventListener("dispose", o), e.remove(l.instanceMatrix), l.instanceColor !== null && e.remove(l.instanceColor);
    }
    return { update: r, dispose: a };
  }
  var ga = class extends je {
    constructor(t, e, n, s, r, a, o, c, l, h = os) {
      if (h !== os && h !== ps) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      n === void 0 && h === os && (n = Ri), n === void 0 && h === ps && (n = fs), super(null, s, r, a, o, c, h, n, l), this.isDepthTexture = true, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : Qe, this.minFilter = c !== void 0 ? c : Qe, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
    }
    copy(t) {
      return super.copy(t), this.compareFunction = t.compareFunction, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
    }
  }, Ou = new je(), zh = new ga(1, 1), Bu = new la(), zu = new Lc(), ku = new fa(), kh = [], Vh = [], Hh = new Float32Array(16), Gh = new Float32Array(9), Wh = new Float32Array(4);
  function bs(i, t, e) {
    let n = i[0];
    if (n <= 0 || n > 0) return i;
    let s = t * e, r = kh[s];
    if (r === void 0 && (r = new Float32Array(s), kh[s] = r), t !== 0) {
      n.toArray(r, 0);
      for (let a = 1, o = 0; a !== t; ++a) o += e, i[a].toArray(r, o);
    }
    return r;
  }
  function Te(i, t) {
    if (i.length !== t.length) return false;
    for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return false;
    return true;
  }
  function Ae(i, t) {
    for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
  }
  function za(i, t) {
    let e = Vh[t];
    e === void 0 && (e = new Int32Array(t), Vh[t] = e);
    for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
    return e;
  }
  function Fg(i, t) {
    let e = this.cache;
    e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
  }
  function Og(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
    else {
      if (Te(e, t)) return;
      i.uniform2fv(this.addr, t), Ae(e, t);
    }
  }
  function Bg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
    else if (t.r !== void 0) (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
    else {
      if (Te(e, t)) return;
      i.uniform3fv(this.addr, t), Ae(e, t);
    }
  }
  function zg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
    else {
      if (Te(e, t)) return;
      i.uniform4fv(this.addr, t), Ae(e, t);
    }
  }
  function kg(i, t) {
    let e = this.cache, n = t.elements;
    if (n === void 0) {
      if (Te(e, t)) return;
      i.uniformMatrix2fv(this.addr, false, t), Ae(e, t);
    } else {
      if (Te(e, n)) return;
      Wh.set(n), i.uniformMatrix2fv(this.addr, false, Wh), Ae(e, n);
    }
  }
  function Vg(i, t) {
    let e = this.cache, n = t.elements;
    if (n === void 0) {
      if (Te(e, t)) return;
      i.uniformMatrix3fv(this.addr, false, t), Ae(e, t);
    } else {
      if (Te(e, n)) return;
      Gh.set(n), i.uniformMatrix3fv(this.addr, false, Gh), Ae(e, n);
    }
  }
  function Hg(i, t) {
    let e = this.cache, n = t.elements;
    if (n === void 0) {
      if (Te(e, t)) return;
      i.uniformMatrix4fv(this.addr, false, t), Ae(e, t);
    } else {
      if (Te(e, n)) return;
      Hh.set(n), i.uniformMatrix4fv(this.addr, false, Hh), Ae(e, n);
    }
  }
  function Gg(i, t) {
    let e = this.cache;
    e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
  }
  function Wg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
    else {
      if (Te(e, t)) return;
      i.uniform2iv(this.addr, t), Ae(e, t);
    }
  }
  function Xg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
    else {
      if (Te(e, t)) return;
      i.uniform3iv(this.addr, t), Ae(e, t);
    }
  }
  function qg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
    else {
      if (Te(e, t)) return;
      i.uniform4iv(this.addr, t), Ae(e, t);
    }
  }
  function Yg(i, t) {
    let e = this.cache;
    e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
  }
  function Zg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
    else {
      if (Te(e, t)) return;
      i.uniform2uiv(this.addr, t), Ae(e, t);
    }
  }
  function Jg(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
    else {
      if (Te(e, t)) return;
      i.uniform3uiv(this.addr, t), Ae(e, t);
    }
  }
  function $g(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
    else {
      if (Te(e, t)) return;
      i.uniform4uiv(this.addr, t), Ae(e, t);
    }
  }
  function Kg(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
    let r;
    this.type === i.SAMPLER_2D_SHADOW ? (zh.compareFunction = Lu, r = zh) : r = Ou, e.setTexture2D(t || r, s);
  }
  function Qg(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || zu, s);
  }
  function jg(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || ku, s);
  }
  function t0(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || Bu, s);
  }
  function e0(i) {
    switch (i) {
      case 5126:
        return Fg;
      case 35664:
        return Og;
      case 35665:
        return Bg;
      case 35666:
        return zg;
      case 35674:
        return kg;
      case 35675:
        return Vg;
      case 35676:
        return Hg;
      case 5124:
      case 35670:
        return Gg;
      case 35667:
      case 35671:
        return Wg;
      case 35668:
      case 35672:
        return Xg;
      case 35669:
      case 35673:
        return qg;
      case 5125:
        return Yg;
      case 36294:
        return Zg;
      case 36295:
        return Jg;
      case 36296:
        return $g;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return Kg;
      case 35679:
      case 36299:
      case 36307:
        return Qg;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return jg;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return t0;
    }
  }
  function n0(i, t) {
    i.uniform1fv(this.addr, t);
  }
  function i0(i, t) {
    let e = bs(t, this.size, 2);
    i.uniform2fv(this.addr, e);
  }
  function s0(i, t) {
    let e = bs(t, this.size, 3);
    i.uniform3fv(this.addr, e);
  }
  function r0(i, t) {
    let e = bs(t, this.size, 4);
    i.uniform4fv(this.addr, e);
  }
  function a0(i, t) {
    let e = bs(t, this.size, 4);
    i.uniformMatrix2fv(this.addr, false, e);
  }
  function o0(i, t) {
    let e = bs(t, this.size, 9);
    i.uniformMatrix3fv(this.addr, false, e);
  }
  function c0(i, t) {
    let e = bs(t, this.size, 16);
    i.uniformMatrix4fv(this.addr, false, e);
  }
  function l0(i, t) {
    i.uniform1iv(this.addr, t);
  }
  function h0(i, t) {
    i.uniform2iv(this.addr, t);
  }
  function u0(i, t) {
    i.uniform3iv(this.addr, t);
  }
  function d0(i, t) {
    i.uniform4iv(this.addr, t);
  }
  function f0(i, t) {
    i.uniform1uiv(this.addr, t);
  }
  function p0(i, t) {
    i.uniform2uiv(this.addr, t);
  }
  function m0(i, t) {
    i.uniform3uiv(this.addr, t);
  }
  function g0(i, t) {
    i.uniform4uiv(this.addr, t);
  }
  function _0(i, t, e) {
    let n = this.cache, s = t.length, r = za(e, s);
    Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
    for (let a = 0; a !== s; ++a) e.setTexture2D(t[a] || Ou, r[a]);
  }
  function x0(i, t, e) {
    let n = this.cache, s = t.length, r = za(e, s);
    Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
    for (let a = 0; a !== s; ++a) e.setTexture3D(t[a] || zu, r[a]);
  }
  function v0(i, t, e) {
    let n = this.cache, s = t.length, r = za(e, s);
    Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
    for (let a = 0; a !== s; ++a) e.setTextureCube(t[a] || ku, r[a]);
  }
  function y0(i, t, e) {
    let n = this.cache, s = t.length, r = za(e, s);
    Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
    for (let a = 0; a !== s; ++a) e.setTexture2DArray(t[a] || Bu, r[a]);
  }
  function M0(i) {
    switch (i) {
      case 5126:
        return n0;
      case 35664:
        return i0;
      case 35665:
        return s0;
      case 35666:
        return r0;
      case 35674:
        return a0;
      case 35675:
        return o0;
      case 35676:
        return c0;
      case 5124:
      case 35670:
        return l0;
      case 35667:
      case 35671:
        return h0;
      case 35668:
      case 35672:
        return u0;
      case 35669:
      case 35673:
        return d0;
      case 5125:
        return f0;
      case 36294:
        return p0;
      case 36295:
        return m0;
      case 36296:
        return g0;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return _0;
      case 35679:
      case 36299:
      case 36307:
        return x0;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return v0;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return y0;
    }
  }
  var Nc = class {
    constructor(t, e, n) {
      this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = e0(e.type);
    }
  }, Fc = class {
    constructor(t, e, n) {
      this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = M0(e.type);
    }
  }, Oc = class {
    constructor(t) {
      this.id = t, this.seq = [], this.map = {};
    }
    setValue(t, e, n) {
      let s = this.seq;
      for (let r = 0, a = s.length; r !== a; ++r) {
        let o = s[r];
        o.setValue(t, e[o.id], n);
      }
    }
  }, Oo = /(\w+)(\])?(\[|\.)?/g;
  function Xh(i, t) {
    i.seq.push(t), i.map[t.id] = t;
  }
  function S0(i, t, e) {
    let n = i.name, s = n.length;
    for (Oo.lastIndex = 0; ; ) {
      let r = Oo.exec(n), a = Oo.lastIndex, o = r[1], c = r[2] === "]", l = r[3];
      if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === s) {
        Xh(e, l === void 0 ? new Nc(o, i, t) : new Fc(o, i, t));
        break;
      } else {
        let d = e.map[o];
        d === void 0 && (d = new Oc(o), Xh(e, d)), e = d;
      }
    }
  }
  var ls = class {
    constructor(t, e) {
      this.seq = [], this.map = {};
      let n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
      for (let s = 0; s < n; ++s) {
        let r = t.getActiveUniform(e, s), a = t.getUniformLocation(e, r.name);
        S0(r, a, this);
      }
    }
    setValue(t, e, n, s) {
      let r = this.map[e];
      r !== void 0 && r.setValue(t, n, s);
    }
    setOptional(t, e, n) {
      let s = e[n];
      s !== void 0 && this.setValue(t, n, s);
    }
    static upload(t, e, n, s) {
      for (let r = 0, a = e.length; r !== a; ++r) {
        let o = e[r], c = n[o.id];
        c.needsUpdate !== false && o.setValue(t, c.value, s);
      }
    }
    static seqWithValue(t, e) {
      let n = [];
      for (let s = 0, r = t.length; s !== r; ++s) {
        let a = t[s];
        a.id in e && n.push(a);
      }
      return n;
    }
  };
  function qh(i, t, e) {
    let n = i.createShader(t);
    return i.shaderSource(n, e), i.compileShader(n), n;
  }
  var b0 = 37297, E0 = 0;
  function w0(i, t) {
    let e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
    for (let a = s; a < r; a++) {
      let o = a + 1;
      n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
    }
    return n.join(`
`);
  }
  var Yh = new Xt();
  function T0(i) {
    Qt._getMatrix(Yh, Qt.workingColorSpace, i);
    let t = `mat3( ${Yh.elements.map((e) => e.toFixed(4))} )`;
    switch (Qt.getTransfer(i)) {
      case Ba:
        return [t, "LinearTransferOETF"];
      case oe:
        return [t, "sRGBTransferOETF"];
      default:
        return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
    }
  }
  function Zh(i, t, e) {
    let n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
    if (n && s === "") return "";
    let r = /ERROR: 0:(\d+)/.exec(s);
    if (r) {
      let a = parseInt(r[1]);
      return e.toUpperCase() + `

` + s + `

` + w0(i.getShaderSource(t), a);
    } else return s;
  }
  function A0(i, t) {
    let e = T0(t);
    return [`vec4 ${i}( vec4 value ) {`, `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`, "}"].join(`
`);
  }
  function R0(i, t) {
    let e;
    switch (t) {
      case jd:
        e = "Linear";
        break;
      case tf:
        e = "Reinhard";
        break;
      case ef:
        e = "Cineon";
        break;
      case _l:
        e = "ACESFilmic";
        break;
      case sf:
        e = "AgX";
        break;
      case rf:
        e = "Neutral";
        break;
      case nf:
        e = "Custom";
        break;
      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
    }
    return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
  }
  var Gr = new T();
  function C0() {
    Qt.getLuminanceCoefficients(Gr);
    let i = Gr.x.toFixed(4), t = Gr.y.toFixed(4), e = Gr.z.toFixed(4);
    return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`, "	return dot( weights, rgb );", "}"].join(`
`);
  }
  function I0(i) {
    return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(qs).join(`
`);
  }
  function P0(i) {
    let t = [];
    for (let e in i) {
      let n = i[e];
      n !== false && t.push("#define " + e + " " + n);
    }
    return t.join(`
`);
  }
  function L0(i, t) {
    let e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
    for (let s = 0; s < n; s++) {
      let r = i.getActiveAttrib(t, s), a = r.name, o = 1;
      r.type === i.FLOAT_MAT2 && (o = 2), r.type === i.FLOAT_MAT3 && (o = 3), r.type === i.FLOAT_MAT4 && (o = 4), e[a] = { type: r.type, location: i.getAttribLocation(t, a), locationSize: o };
    }
    return e;
  }
  function qs(i) {
    return i !== "";
  }
  function Jh(i, t) {
    let e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
    return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
  }
  function $h(i, t) {
    return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
  }
  var D0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function Bc(i) {
    return i.replace(D0, N0);
  }
  var U0 = /* @__PURE__ */ new Map();
  function N0(i, t) {
    let e = Yt[t];
    if (e === void 0) {
      let n = U0.get(t);
      if (n !== void 0) e = Yt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
      else throw new Error("Can not resolve #include <" + t + ">");
    }
    return Bc(e);
  }
  var F0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function Kh(i) {
    return i.replace(F0, O0);
  }
  function O0(i, t, e, n) {
    let s = "";
    for (let r = parseInt(t); r < parseInt(e); r++) s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
    return s;
  }
  function Qh(i) {
    let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
    return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
  }
  function B0(i) {
    let t = "SHADOWMAP_TYPE_BASIC";
    return i.shadowMapType === vu ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === gl ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === Nn && (t = "SHADOWMAP_TYPE_VSM"), t;
  }
  function z0(i) {
    let t = "ENVMAP_TYPE_CUBE";
    if (i.envMap) switch (i.envMapMode) {
      case us:
      case ds:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case Oa:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
    return t;
  }
  function k0(i) {
    let t = "ENVMAP_MODE_REFLECTION";
    if (i.envMap) switch (i.envMapMode) {
      case ds:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
    return t;
  }
  function V0(i) {
    let t = "ENVMAP_BLENDING_NONE";
    if (i.envMap) switch (i.combine) {
      case yu:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case Kd:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case Qd:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
    return t;
  }
  function H0(i) {
    let t = i.envMapCubeUVHeight;
    if (t === null) return null;
    let e = Math.log2(t) - 2, n = 1 / t;
    return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 7 * 16)), texelHeight: n, maxMip: e };
  }
  function G0(i, t, e, n) {
    let s = i.getContext(), r = e.defines, a = e.vertexShader, o = e.fragmentShader, c = B0(e), l = z0(e), h = k0(e), d = V0(e), u = H0(e), p = I0(e), g = P0(r), v = s.createProgram(), m, f, E = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
    e.isRawShaderMaterial ? (m = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g].filter(qs).join(`
`), m.length > 0 && (m += `
`), f = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g].filter(qs).join(`
`), f.length > 0 && (f += `
`)) : (m = [Qh(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g, e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", e.batching ? "#define USE_BATCHING" : "", e.batchingColor ? "#define USE_BATCHING_COLOR" : "", e.instancing ? "#define USE_INSTANCING" : "", e.instancingColor ? "#define USE_INSTANCING_COLOR" : "", e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.map ? "#define USE_MAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + h : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.mapUv ? "#define MAP_UV " + e.mapUv : "", e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "", e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "", e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "", e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "", e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "", e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "", e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "", e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "", e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "", e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "", e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "", e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "", e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "", e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "", e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "", e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "", e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "", e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "", e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "", e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "", e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "", e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.skinning ? "#define USE_SKINNING" : "", e.morphTargets ? "#define USE_MORPHTARGETS" : "", e.morphNormals && e.flatShading === false ? "#define USE_MORPHNORMALS" : "", e.morphColors ? "#define USE_MORPHCOLORS" : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + c : "", e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(qs).join(`
`), f = [Qh(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, g, e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", e.map ? "#define USE_MAP" : "", e.matcap ? "#define USE_MATCAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + l : "", e.envMap ? "#define " + h : "", e.envMap ? "#define " + d : "", u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "", u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "", u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoat ? "#define USE_CLEARCOAT" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.dispersion ? "#define USE_DISPERSION" : "", e.iridescence ? "#define USE_IRIDESCENCE" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaTest ? "#define USE_ALPHATEST" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.sheen ? "#define USE_SHEEN" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.gradientMap ? "#define USE_GRADIENTMAP" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + c : "", e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", e.toneMapping !== ri ? "#define TONE_MAPPING" : "", e.toneMapping !== ri ? Yt.tonemapping_pars_fragment : "", e.toneMapping !== ri ? R0("toneMapping", e.toneMapping) : "", e.dithering ? "#define DITHERING" : "", e.opaque ? "#define OPAQUE" : "", Yt.colorspace_pars_fragment, A0("linearToOutputTexel", e.outputColorSpace), C0(), e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "", `
`].filter(qs).join(`
`)), a = Bc(a), a = Jh(a, e), a = $h(a, e), o = Bc(o), o = Jh(o, e), o = $h(o, e), a = Kh(a), o = Kh(o), e.isRawShaderMaterial !== true && (E = `#version 300 es
`, m = [p, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + m, f = ["#define varying in", e.glslVersion === dh ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", e.glslVersion === dh ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + f);
    let x = E + m + a, _ = E + f + o, D = qh(s, s.VERTEX_SHADER, x), R = qh(s, s.FRAGMENT_SHADER, _);
    s.attachShader(v, D), s.attachShader(v, R), e.index0AttributeName !== void 0 ? s.bindAttribLocation(v, 0, e.index0AttributeName) : e.morphTargets === true && s.bindAttribLocation(v, 0, "position"), s.linkProgram(v);
    function C(I) {
      if (i.debug.checkShaderErrors) {
        let H = s.getProgramInfoLog(v).trim(), B = s.getShaderInfoLog(D).trim(), G = s.getShaderInfoLog(R).trim(), $ = true, W = true;
        if (s.getProgramParameter(v, s.LINK_STATUS) === false) if ($ = false, typeof i.debug.onShaderError == "function") i.debug.onShaderError(s, v, D, R);
        else {
          let nt = Zh(s, D, "vertex"), X = Zh(s, R, "fragment");
          console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(v, s.VALIDATE_STATUS) + `

Material Name: ` + I.name + `
Material Type: ` + I.type + `

Program Info Log: ` + H + `
` + nt + `
` + X);
        }
        else H !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", H) : (B === "" || G === "") && (W = false);
        W && (I.diagnostics = { runnable: $, programLog: H, vertexShader: { log: B, prefix: m }, fragmentShader: { log: G, prefix: f } });
      }
      s.deleteShader(D), s.deleteShader(R), L = new ls(s, v), b = L0(s, v);
    }
    let L;
    this.getUniforms = function() {
      return L === void 0 && C(this), L;
    };
    let b;
    this.getAttributes = function() {
      return b === void 0 && C(this), b;
    };
    let M = e.rendererExtensionParallelShaderCompile === false;
    return this.isReady = function() {
      return M === false && (M = s.getProgramParameter(v, b0)), M;
    }, this.destroy = function() {
      n.releaseStatesOfProgram(this), s.deleteProgram(v), this.program = void 0;
    }, this.type = e.shaderType, this.name = e.shaderName, this.id = E0++, this.cacheKey = t, this.usedTimes = 1, this.program = v, this.vertexShader = D, this.fragmentShader = R, this;
  }
  var W0 = 0, zc = class {
    constructor() {
      this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
    }
    update(t) {
      let e = t.vertexShader, n = t.fragmentShader, s = this._getShaderStage(e), r = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
      return a.has(s) === false && (a.add(s), s.usedTimes++), a.has(r) === false && (a.add(r), r.usedTimes++), this;
    }
    remove(t) {
      let e = this.materialCache.get(t);
      for (let n of e) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
      return this.materialCache.delete(t), this;
    }
    getVertexShaderID(t) {
      return this._getShaderStage(t.vertexShader).id;
    }
    getFragmentShaderID(t) {
      return this._getShaderStage(t.fragmentShader).id;
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear();
    }
    _getShaderCacheForMaterial(t) {
      let e = this.materialCache, n = e.get(t);
      return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
    }
    _getShaderStage(t) {
      let e = this.shaderCache, n = e.get(t);
      return n === void 0 && (n = new kc(t), e.set(t, n)), n;
    }
  }, kc = class {
    constructor(t) {
      this.id = W0++, this.code = t, this.usedTimes = 0;
    }
  };
  function X0(i, t, e, n, s, r, a) {
    let o = new Qs(), c = new zc(), l = /* @__PURE__ */ new Set(), h = [], d = s.logarithmicDepthBuffer, u = s.vertexTextures, p = s.precision, g = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
    function v(b) {
      return l.add(b), b === 0 ? "uv" : `uv${b}`;
    }
    function m(b, M, I, H, B) {
      let G = H.fog, $ = B.geometry, W = b.isMeshStandardMaterial ? H.environment : null, nt = (b.isMeshStandardMaterial ? e : t).get(b.envMap || W), X = nt && nt.mapping === Oa ? nt.image.height : null, lt = g[b.type];
      b.precision !== null && (p = s.getMaxPrecision(b.precision), p !== b.precision && console.warn("THREE.WebGLProgram.getParameters:", b.precision, "not supported, using", p, "instead."));
      let xt = $.morphAttributes.position || $.morphAttributes.normal || $.morphAttributes.color, Et = xt !== void 0 ? xt.length : 0, Vt = 0;
      $.morphAttributes.position !== void 0 && (Vt = 1), $.morphAttributes.normal !== void 0 && (Vt = 2), $.morphAttributes.color !== void 0 && (Vt = 3);
      let ne, J, st, wt;
      if (lt) {
        let re = Mn[lt];
        ne = re.vertexShader, J = re.fragmentShader;
      } else ne = b.vertexShader, J = b.fragmentShader, c.update(b), st = c.getVertexShaderID(b), wt = c.getFragmentShaderID(b);
      let at = i.getRenderTarget(), Lt = i.state.buffers.depth.getReversed(), zt = B.isInstancedMesh === true, Ot = B.isBatchedMesh === true, Kt = !!b.map, Q = !!b.matcap, it = !!nt, A = !!b.aoMap, It = !!b.lightMap, tt = !!b.bumpMap, Mt = !!b.normalMap, ct = !!b.displacementMap, Nt = !!b.emissiveMap, vt = !!b.metalnessMap, w = !!b.roughnessMap, y = b.anisotropy > 0, O = b.clearcoat > 0, Y = b.dispersion > 0, j = b.iridescence > 0, Z = b.sheen > 0, Tt = b.transmission > 0, ft = y && !!b.anisotropyMap, yt = O && !!b.clearcoatMap, Zt = O && !!b.clearcoatNormalMap, et = O && !!b.clearcoatRoughnessMap, St = j && !!b.iridescenceMap, Ft = j && !!b.iridescenceThicknessMap, Bt = Z && !!b.sheenColorMap, bt = Z && !!b.sheenRoughnessMap, Jt = !!b.specularMap, qt = !!b.specularColorMap, ce = !!b.specularIntensityMap, U = Tt && !!b.transmissionMap, pt = Tt && !!b.thicknessMap, q = !!b.gradientMap, K = !!b.alphaMap, _t = b.alphaTest > 0, mt = !!b.alphaHash, Gt = !!b.extensions, ve = ri;
      b.toneMapped && (at === null || at.isXRRenderTarget === true) && (ve = i.toneMapping);
      let Le = { shaderID: lt, shaderType: b.type, shaderName: b.name, vertexShader: ne, fragmentShader: J, defines: b.defines, customVertexShaderID: st, customFragmentShaderID: wt, isRawShaderMaterial: b.isRawShaderMaterial === true, glslVersion: b.glslVersion, precision: p, batching: Ot, batchingColor: Ot && B._colorsTexture !== null, instancing: zt, instancingColor: zt && B.instanceColor !== null, instancingMorph: zt && B.morphTexture !== null, supportsVertexTextures: u, outputColorSpace: at === null ? i.outputColorSpace : at.isXRRenderTarget === true ? at.texture.colorSpace : Ms, alphaToCoverage: !!b.alphaToCoverage, map: Kt, matcap: Q, envMap: it, envMapMode: it && nt.mapping, envMapCubeUVHeight: X, aoMap: A, lightMap: It, bumpMap: tt, normalMap: Mt, displacementMap: u && ct, emissiveMap: Nt, normalMapObjectSpace: Mt && b.normalMapType === lf, normalMapTangentSpace: Mt && b.normalMapType === Pu, metalnessMap: vt, roughnessMap: w, anisotropy: y, anisotropyMap: ft, clearcoat: O, clearcoatMap: yt, clearcoatNormalMap: Zt, clearcoatRoughnessMap: et, dispersion: Y, iridescence: j, iridescenceMap: St, iridescenceThicknessMap: Ft, sheen: Z, sheenColorMap: Bt, sheenRoughnessMap: bt, specularMap: Jt, specularColorMap: qt, specularIntensityMap: ce, transmission: Tt, transmissionMap: U, thicknessMap: pt, gradientMap: q, opaque: b.transparent === false && b.blending === as && b.alphaToCoverage === false, alphaMap: K, alphaTest: _t, alphaHash: mt, combine: b.combine, mapUv: Kt && v(b.map.channel), aoMapUv: A && v(b.aoMap.channel), lightMapUv: It && v(b.lightMap.channel), bumpMapUv: tt && v(b.bumpMap.channel), normalMapUv: Mt && v(b.normalMap.channel), displacementMapUv: ct && v(b.displacementMap.channel), emissiveMapUv: Nt && v(b.emissiveMap.channel), metalnessMapUv: vt && v(b.metalnessMap.channel), roughnessMapUv: w && v(b.roughnessMap.channel), anisotropyMapUv: ft && v(b.anisotropyMap.channel), clearcoatMapUv: yt && v(b.clearcoatMap.channel), clearcoatNormalMapUv: Zt && v(b.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: et && v(b.clearcoatRoughnessMap.channel), iridescenceMapUv: St && v(b.iridescenceMap.channel), iridescenceThicknessMapUv: Ft && v(b.iridescenceThicknessMap.channel), sheenColorMapUv: Bt && v(b.sheenColorMap.channel), sheenRoughnessMapUv: bt && v(b.sheenRoughnessMap.channel), specularMapUv: Jt && v(b.specularMap.channel), specularColorMapUv: qt && v(b.specularColorMap.channel), specularIntensityMapUv: ce && v(b.specularIntensityMap.channel), transmissionMapUv: U && v(b.transmissionMap.channel), thicknessMapUv: pt && v(b.thicknessMap.channel), alphaMapUv: K && v(b.alphaMap.channel), vertexTangents: !!$.attributes.tangent && (Mt || y), vertexColors: b.vertexColors, vertexAlphas: b.vertexColors === true && !!$.attributes.color && $.attributes.color.itemSize === 4, pointsUvs: B.isPoints === true && !!$.attributes.uv && (Kt || K), fog: !!G, useFog: b.fog === true, fogExp2: !!G && G.isFogExp2, flatShading: b.flatShading === true, sizeAttenuation: b.sizeAttenuation === true, logarithmicDepthBuffer: d, reverseDepthBuffer: Lt, skinning: B.isSkinnedMesh === true, morphTargets: $.morphAttributes.position !== void 0, morphNormals: $.morphAttributes.normal !== void 0, morphColors: $.morphAttributes.color !== void 0, morphTargetsCount: Et, morphTextureStride: Vt, numDirLights: M.directional.length, numPointLights: M.point.length, numSpotLights: M.spot.length, numSpotLightMaps: M.spotLightMap.length, numRectAreaLights: M.rectArea.length, numHemiLights: M.hemi.length, numDirLightShadows: M.directionalShadowMap.length, numPointLightShadows: M.pointShadowMap.length, numSpotLightShadows: M.spotShadowMap.length, numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps, numLightProbes: M.numLightProbes, numClippingPlanes: a.numPlanes, numClipIntersection: a.numIntersection, dithering: b.dithering, shadowMapEnabled: i.shadowMap.enabled && I.length > 0, shadowMapType: i.shadowMap.type, toneMapping: ve, decodeVideoTexture: Kt && b.map.isVideoTexture === true && Qt.getTransfer(b.map.colorSpace) === oe, decodeVideoTextureEmissive: Nt && b.emissiveMap.isVideoTexture === true && Qt.getTransfer(b.emissiveMap.colorSpace) === oe, premultipliedAlpha: b.premultipliedAlpha, doubleSided: b.side === un, flipSided: b.side === Fe, useDepthPacking: b.depthPacking >= 0, depthPacking: b.depthPacking || 0, index0AttributeName: b.index0AttributeName, extensionClipCullDistance: Gt && b.extensions.clipCullDistance === true && n.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (Gt && b.extensions.multiDraw === true || Ot) && n.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: b.customProgramCacheKey() };
      return Le.vertexUv1s = l.has(1), Le.vertexUv2s = l.has(2), Le.vertexUv3s = l.has(3), l.clear(), Le;
    }
    function f(b) {
      let M = [];
      if (b.shaderID ? M.push(b.shaderID) : (M.push(b.customVertexShaderID), M.push(b.customFragmentShaderID)), b.defines !== void 0) for (let I in b.defines) M.push(I), M.push(b.defines[I]);
      return b.isRawShaderMaterial === false && (E(M, b), x(M, b), M.push(i.outputColorSpace)), M.push(b.customProgramCacheKey), M.join();
    }
    function E(b, M) {
      b.push(M.precision), b.push(M.outputColorSpace), b.push(M.envMapMode), b.push(M.envMapCubeUVHeight), b.push(M.mapUv), b.push(M.alphaMapUv), b.push(M.lightMapUv), b.push(M.aoMapUv), b.push(M.bumpMapUv), b.push(M.normalMapUv), b.push(M.displacementMapUv), b.push(M.emissiveMapUv), b.push(M.metalnessMapUv), b.push(M.roughnessMapUv), b.push(M.anisotropyMapUv), b.push(M.clearcoatMapUv), b.push(M.clearcoatNormalMapUv), b.push(M.clearcoatRoughnessMapUv), b.push(M.iridescenceMapUv), b.push(M.iridescenceThicknessMapUv), b.push(M.sheenColorMapUv), b.push(M.sheenRoughnessMapUv), b.push(M.specularMapUv), b.push(M.specularColorMapUv), b.push(M.specularIntensityMapUv), b.push(M.transmissionMapUv), b.push(M.thicknessMapUv), b.push(M.combine), b.push(M.fogExp2), b.push(M.sizeAttenuation), b.push(M.morphTargetsCount), b.push(M.morphAttributeCount), b.push(M.numDirLights), b.push(M.numPointLights), b.push(M.numSpotLights), b.push(M.numSpotLightMaps), b.push(M.numHemiLights), b.push(M.numRectAreaLights), b.push(M.numDirLightShadows), b.push(M.numPointLightShadows), b.push(M.numSpotLightShadows), b.push(M.numSpotLightShadowsWithMaps), b.push(M.numLightProbes), b.push(M.shadowMapType), b.push(M.toneMapping), b.push(M.numClippingPlanes), b.push(M.numClipIntersection), b.push(M.depthPacking);
    }
    function x(b, M) {
      o.disableAll(), M.supportsVertexTextures && o.enable(0), M.instancing && o.enable(1), M.instancingColor && o.enable(2), M.instancingMorph && o.enable(3), M.matcap && o.enable(4), M.envMap && o.enable(5), M.normalMapObjectSpace && o.enable(6), M.normalMapTangentSpace && o.enable(7), M.clearcoat && o.enable(8), M.iridescence && o.enable(9), M.alphaTest && o.enable(10), M.vertexColors && o.enable(11), M.vertexAlphas && o.enable(12), M.vertexUv1s && o.enable(13), M.vertexUv2s && o.enable(14), M.vertexUv3s && o.enable(15), M.vertexTangents && o.enable(16), M.anisotropy && o.enable(17), M.alphaHash && o.enable(18), M.batching && o.enable(19), M.dispersion && o.enable(20), M.batchingColor && o.enable(21), b.push(o.mask), o.disableAll(), M.fog && o.enable(0), M.useFog && o.enable(1), M.flatShading && o.enable(2), M.logarithmicDepthBuffer && o.enable(3), M.reverseDepthBuffer && o.enable(4), M.skinning && o.enable(5), M.morphTargets && o.enable(6), M.morphNormals && o.enable(7), M.morphColors && o.enable(8), M.premultipliedAlpha && o.enable(9), M.shadowMapEnabled && o.enable(10), M.doubleSided && o.enable(11), M.flipSided && o.enable(12), M.useDepthPacking && o.enable(13), M.dithering && o.enable(14), M.transmission && o.enable(15), M.sheen && o.enable(16), M.opaque && o.enable(17), M.pointsUvs && o.enable(18), M.decodeVideoTexture && o.enable(19), M.decodeVideoTextureEmissive && o.enable(20), M.alphaToCoverage && o.enable(21), b.push(o.mask);
    }
    function _(b) {
      let M = g[b.type], I;
      if (M) {
        let H = Mn[M];
        I = Nf.clone(H.uniforms);
      } else I = b.uniforms;
      return I;
    }
    function D(b, M) {
      let I;
      for (let H = 0, B = h.length; H < B; H++) {
        let G = h[H];
        if (G.cacheKey === M) {
          I = G, ++I.usedTimes;
          break;
        }
      }
      return I === void 0 && (I = new G0(i, M, b, r), h.push(I)), I;
    }
    function R(b) {
      if (--b.usedTimes === 0) {
        let M = h.indexOf(b);
        h[M] = h[h.length - 1], h.pop(), b.destroy();
      }
    }
    function C(b) {
      c.remove(b);
    }
    function L() {
      c.dispose();
    }
    return { getParameters: m, getProgramCacheKey: f, getUniforms: _, acquireProgram: D, releaseProgram: R, releaseShaderCache: C, programs: h, dispose: L };
  }
  function q0() {
    let i = /* @__PURE__ */ new WeakMap();
    function t(a) {
      return i.has(a);
    }
    function e(a) {
      let o = i.get(a);
      return o === void 0 && (o = {}, i.set(a, o)), o;
    }
    function n(a) {
      i.delete(a);
    }
    function s(a, o, c) {
      i.get(a)[o] = c;
    }
    function r() {
      i = /* @__PURE__ */ new WeakMap();
    }
    return { has: t, get: e, remove: n, update: s, dispose: r };
  }
  function Y0(i, t) {
    return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
  }
  function jh(i, t) {
    return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
  }
  function tu() {
    let i = [], t = 0, e = [], n = [], s = [];
    function r() {
      t = 0, e.length = 0, n.length = 0, s.length = 0;
    }
    function a(d, u, p, g, v, m) {
      let f = i[t];
      return f === void 0 ? (f = { id: d.id, object: d, geometry: u, material: p, groupOrder: g, renderOrder: d.renderOrder, z: v, group: m }, i[t] = f) : (f.id = d.id, f.object = d, f.geometry = u, f.material = p, f.groupOrder = g, f.renderOrder = d.renderOrder, f.z = v, f.group = m), t++, f;
    }
    function o(d, u, p, g, v, m) {
      let f = a(d, u, p, g, v, m);
      p.transmission > 0 ? n.push(f) : p.transparent === true ? s.push(f) : e.push(f);
    }
    function c(d, u, p, g, v, m) {
      let f = a(d, u, p, g, v, m);
      p.transmission > 0 ? n.unshift(f) : p.transparent === true ? s.unshift(f) : e.unshift(f);
    }
    function l(d, u) {
      e.length > 1 && e.sort(d || Y0), n.length > 1 && n.sort(u || jh), s.length > 1 && s.sort(u || jh);
    }
    function h() {
      for (let d = t, u = i.length; d < u; d++) {
        let p = i[d];
        if (p.id === null) break;
        p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
      }
    }
    return { opaque: e, transmissive: n, transparent: s, init: r, push: o, unshift: c, finish: h, sort: l };
  }
  function Z0() {
    let i = /* @__PURE__ */ new WeakMap();
    function t(n, s) {
      let r = i.get(n), a;
      return r === void 0 ? (a = new tu(), i.set(n, [a])) : s >= r.length ? (a = new tu(), r.push(a)) : a = r[s], a;
    }
    function e() {
      i = /* @__PURE__ */ new WeakMap();
    }
    return { get: t, dispose: e };
  }
  function J0() {
    let i = {};
    return { get: function(t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { direction: new T(), color: new Ht() };
          break;
        case "SpotLight":
          e = { position: new T(), direction: new T(), color: new Ht(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
          break;
        case "PointLight":
          e = { position: new T(), color: new Ht(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          e = { direction: new T(), skyColor: new Ht(), groundColor: new Ht() };
          break;
        case "RectAreaLight":
          e = { color: new Ht(), position: new T(), halfWidth: new T(), halfHeight: new T() };
          break;
      }
      return i[t.id] = e, e;
    } };
  }
  function $0() {
    let i = {};
    return { get: function(t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new ht() };
          break;
        case "SpotLight":
          e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new ht() };
          break;
        case "PointLight":
          e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new ht(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
          break;
      }
      return i[t.id] = e, e;
    } };
  }
  var K0 = 0;
  function Q0(i, t) {
    return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
  }
  function j0(i) {
    let t = new J0(), e = $0(), n = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
    for (let l = 0; l < 9; l++) n.probe.push(new T());
    let s = new T(), r = new ee(), a = new ee();
    function o(l) {
      let h = 0, d = 0, u = 0;
      for (let b = 0; b < 9; b++) n.probe[b].set(0, 0, 0);
      let p = 0, g = 0, v = 0, m = 0, f = 0, E = 0, x = 0, _ = 0, D = 0, R = 0, C = 0;
      l.sort(Q0);
      for (let b = 0, M = l.length; b < M; b++) {
        let I = l[b], H = I.color, B = I.intensity, G = I.distance, $ = I.shadow && I.shadow.map ? I.shadow.map.texture : null;
        if (I.isAmbientLight) h += H.r * B, d += H.g * B, u += H.b * B;
        else if (I.isLightProbe) {
          for (let W = 0; W < 9; W++) n.probe[W].addScaledVector(I.sh.coefficients[W], B);
          C++;
        } else if (I.isDirectionalLight) {
          let W = t.get(I);
          if (W.color.copy(I.color).multiplyScalar(I.intensity), I.castShadow) {
            let nt = I.shadow, X = e.get(I);
            X.shadowIntensity = nt.intensity, X.shadowBias = nt.bias, X.shadowNormalBias = nt.normalBias, X.shadowRadius = nt.radius, X.shadowMapSize = nt.mapSize, n.directionalShadow[p] = X, n.directionalShadowMap[p] = $, n.directionalShadowMatrix[p] = I.shadow.matrix, E++;
          }
          n.directional[p] = W, p++;
        } else if (I.isSpotLight) {
          let W = t.get(I);
          W.position.setFromMatrixPosition(I.matrixWorld), W.color.copy(H).multiplyScalar(B), W.distance = G, W.coneCos = Math.cos(I.angle), W.penumbraCos = Math.cos(I.angle * (1 - I.penumbra)), W.decay = I.decay, n.spot[v] = W;
          let nt = I.shadow;
          if (I.map && (n.spotLightMap[D] = I.map, D++, nt.updateMatrices(I), I.castShadow && R++), n.spotLightMatrix[v] = nt.matrix, I.castShadow) {
            let X = e.get(I);
            X.shadowIntensity = nt.intensity, X.shadowBias = nt.bias, X.shadowNormalBias = nt.normalBias, X.shadowRadius = nt.radius, X.shadowMapSize = nt.mapSize, n.spotShadow[v] = X, n.spotShadowMap[v] = $, _++;
          }
          v++;
        } else if (I.isRectAreaLight) {
          let W = t.get(I);
          W.color.copy(H).multiplyScalar(B), W.halfWidth.set(I.width * 0.5, 0, 0), W.halfHeight.set(0, I.height * 0.5, 0), n.rectArea[m] = W, m++;
        } else if (I.isPointLight) {
          let W = t.get(I);
          if (W.color.copy(I.color).multiplyScalar(I.intensity), W.distance = I.distance, W.decay = I.decay, I.castShadow) {
            let nt = I.shadow, X = e.get(I);
            X.shadowIntensity = nt.intensity, X.shadowBias = nt.bias, X.shadowNormalBias = nt.normalBias, X.shadowRadius = nt.radius, X.shadowMapSize = nt.mapSize, X.shadowCameraNear = nt.camera.near, X.shadowCameraFar = nt.camera.far, n.pointShadow[g] = X, n.pointShadowMap[g] = $, n.pointShadowMatrix[g] = I.shadow.matrix, x++;
          }
          n.point[g] = W, g++;
        } else if (I.isHemisphereLight) {
          let W = t.get(I);
          W.skyColor.copy(I.color).multiplyScalar(B), W.groundColor.copy(I.groundColor).multiplyScalar(B), n.hemi[f] = W, f++;
        }
      }
      m > 0 && (i.has("OES_texture_float_linear") === true ? (n.rectAreaLTC1 = dt.LTC_FLOAT_1, n.rectAreaLTC2 = dt.LTC_FLOAT_2) : (n.rectAreaLTC1 = dt.LTC_HALF_1, n.rectAreaLTC2 = dt.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = u;
      let L = n.hash;
      (L.directionalLength !== p || L.pointLength !== g || L.spotLength !== v || L.rectAreaLength !== m || L.hemiLength !== f || L.numDirectionalShadows !== E || L.numPointShadows !== x || L.numSpotShadows !== _ || L.numSpotMaps !== D || L.numLightProbes !== C) && (n.directional.length = p, n.spot.length = v, n.rectArea.length = m, n.point.length = g, n.hemi.length = f, n.directionalShadow.length = E, n.directionalShadowMap.length = E, n.pointShadow.length = x, n.pointShadowMap.length = x, n.spotShadow.length = _, n.spotShadowMap.length = _, n.directionalShadowMatrix.length = E, n.pointShadowMatrix.length = x, n.spotLightMatrix.length = _ + D - R, n.spotLightMap.length = D, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = C, L.directionalLength = p, L.pointLength = g, L.spotLength = v, L.rectAreaLength = m, L.hemiLength = f, L.numDirectionalShadows = E, L.numPointShadows = x, L.numSpotShadows = _, L.numSpotMaps = D, L.numLightProbes = C, n.version = K0++);
    }
    function c(l, h) {
      let d = 0, u = 0, p = 0, g = 0, v = 0, m = h.matrixWorldInverse;
      for (let f = 0, E = l.length; f < E; f++) {
        let x = l[f];
        if (x.isDirectionalLight) {
          let _ = n.directional[d];
          _.direction.setFromMatrixPosition(x.matrixWorld), s.setFromMatrixPosition(x.target.matrixWorld), _.direction.sub(s), _.direction.transformDirection(m), d++;
        } else if (x.isSpotLight) {
          let _ = n.spot[p];
          _.position.setFromMatrixPosition(x.matrixWorld), _.position.applyMatrix4(m), _.direction.setFromMatrixPosition(x.matrixWorld), s.setFromMatrixPosition(x.target.matrixWorld), _.direction.sub(s), _.direction.transformDirection(m), p++;
        } else if (x.isRectAreaLight) {
          let _ = n.rectArea[g];
          _.position.setFromMatrixPosition(x.matrixWorld), _.position.applyMatrix4(m), a.identity(), r.copy(x.matrixWorld), r.premultiply(m), a.extractRotation(r), _.halfWidth.set(x.width * 0.5, 0, 0), _.halfHeight.set(0, x.height * 0.5, 0), _.halfWidth.applyMatrix4(a), _.halfHeight.applyMatrix4(a), g++;
        } else if (x.isPointLight) {
          let _ = n.point[u];
          _.position.setFromMatrixPosition(x.matrixWorld), _.position.applyMatrix4(m), u++;
        } else if (x.isHemisphereLight) {
          let _ = n.hemi[v];
          _.direction.setFromMatrixPosition(x.matrixWorld), _.direction.transformDirection(m), v++;
        }
      }
    }
    return { setup: o, setupView: c, state: n };
  }
  function eu(i) {
    let t = new j0(i), e = [], n = [];
    function s(h) {
      l.camera = h, e.length = 0, n.length = 0;
    }
    function r(h) {
      e.push(h);
    }
    function a(h) {
      n.push(h);
    }
    function o() {
      t.setup(e);
    }
    function c(h) {
      t.setupView(e, h);
    }
    let l = { lightsArray: e, shadowsArray: n, camera: null, lights: t, transmissionRenderTarget: {} };
    return { init: s, state: l, setupLights: o, setupLightsView: c, pushLight: r, pushShadow: a };
  }
  function t_(i) {
    let t = /* @__PURE__ */ new WeakMap();
    function e(s, r = 0) {
      let a = t.get(s), o;
      return a === void 0 ? (o = new eu(i), t.set(s, [o])) : r >= a.length ? (o = new eu(i), a.push(o)) : o = a[r], o;
    }
    function n() {
      t = /* @__PURE__ */ new WeakMap();
    }
    return { get: e, dispose: n };
  }
  var Vc = class extends Gn {
    static get type() {
      return "MeshDepthMaterial";
    }
    constructor(t) {
      super(), this.isMeshDepthMaterial = true, this.depthPacking = of, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
    }
  }, Hc = class extends Gn {
    static get type() {
      return "MeshDistanceMaterial";
    }
    constructor(t) {
      super(), this.isMeshDistanceMaterial = true, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
    }
  }, e_ = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, n_ = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
  function i_(i, t, e) {
    let n = new js(), s = new ht(), r = new ht(), a = new ye(), o = new Vc({ depthPacking: cf }), c = new Hc(), l = {}, h = e.maxTextureSize, d = { [ai]: Fe, [Fe]: ai, [un]: un }, u = new nn({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new ht() }, radius: { value: 4 } }, vertexShader: e_, fragmentShader: n_ }), p = u.clone();
    p.defines.HORIZONTAL_PASS = 1;
    let g = new Se();
    g.setAttribute("position", new Ie(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
    let v = new Ce(g, u), m = this;
    this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = vu;
    let f = this.type;
    this.render = function(R, C, L) {
      if (m.enabled === false || m.autoUpdate === false && m.needsUpdate === false || R.length === 0) return;
      let b = i.getRenderTarget(), M = i.getActiveCubeFace(), I = i.getActiveMipmapLevel(), H = i.state;
      H.setBlending(si), H.buffers.color.setClear(1, 1, 1, 1), H.buffers.depth.setTest(true), H.setScissorTest(false);
      let B = f !== Nn && this.type === Nn, G = f === Nn && this.type !== Nn;
      for (let $ = 0, W = R.length; $ < W; $++) {
        let nt = R[$], X = nt.shadow;
        if (X === void 0) {
          console.warn("THREE.WebGLShadowMap:", nt, "has no shadow.");
          continue;
        }
        if (X.autoUpdate === false && X.needsUpdate === false) continue;
        s.copy(X.mapSize);
        let lt = X.getFrameExtents();
        if (s.multiply(lt), r.copy(X.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / lt.x), s.x = r.x * lt.x, X.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / lt.y), s.y = r.y * lt.y, X.mapSize.y = r.y)), X.map === null || B === true || G === true) {
          let Et = this.type !== Nn ? { minFilter: Qe, magFilter: Qe } : {};
          X.map !== null && X.map.dispose(), X.map = new kn(s.x, s.y, Et), X.map.texture.name = nt.name + ".shadowMap", X.camera.updateProjectionMatrix();
        }
        i.setRenderTarget(X.map), i.clear();
        let xt = X.getViewportCount();
        for (let Et = 0; Et < xt; Et++) {
          let Vt = X.getViewport(Et);
          a.set(r.x * Vt.x, r.y * Vt.y, r.x * Vt.z, r.y * Vt.w), H.viewport(a), X.updateMatrices(nt, Et), n = X.getFrustum(), _(C, L, X.camera, nt, this.type);
        }
        X.isPointLightShadow !== true && this.type === Nn && E(X, L), X.needsUpdate = false;
      }
      f = this.type, m.needsUpdate = false, i.setRenderTarget(b, M, I);
    };
    function E(R, C) {
      let L = t.update(v);
      u.defines.VSM_SAMPLES !== R.blurSamples && (u.defines.VSM_SAMPLES = R.blurSamples, p.defines.VSM_SAMPLES = R.blurSamples, u.needsUpdate = true, p.needsUpdate = true), R.mapPass === null && (R.mapPass = new kn(s.x, s.y)), u.uniforms.shadow_pass.value = R.map.texture, u.uniforms.resolution.value = R.mapSize, u.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(C, null, L, u, v, null), p.uniforms.shadow_pass.value = R.mapPass.texture, p.uniforms.resolution.value = R.mapSize, p.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(C, null, L, p, v, null);
    }
    function x(R, C, L, b) {
      let M = null, I = L.isPointLight === true ? R.customDistanceMaterial : R.customDepthMaterial;
      if (I !== void 0) M = I;
      else if (M = L.isPointLight === true ? c : o, i.localClippingEnabled && C.clipShadows === true && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0) {
        let H = M.uuid, B = C.uuid, G = l[H];
        G === void 0 && (G = {}, l[H] = G);
        let $ = G[B];
        $ === void 0 && ($ = M.clone(), G[B] = $, C.addEventListener("dispose", D)), M = $;
      }
      if (M.visible = C.visible, M.wireframe = C.wireframe, b === Nn ? M.side = C.shadowSide !== null ? C.shadowSide : C.side : M.side = C.shadowSide !== null ? C.shadowSide : d[C.side], M.alphaMap = C.alphaMap, M.alphaTest = C.alphaTest, M.map = C.map, M.clipShadows = C.clipShadows, M.clippingPlanes = C.clippingPlanes, M.clipIntersection = C.clipIntersection, M.displacementMap = C.displacementMap, M.displacementScale = C.displacementScale, M.displacementBias = C.displacementBias, M.wireframeLinewidth = C.wireframeLinewidth, M.linewidth = C.linewidth, L.isPointLight === true && M.isMeshDistanceMaterial === true) {
        let H = i.properties.get(M);
        H.light = L;
      }
      return M;
    }
    function _(R, C, L, b, M) {
      if (R.visible === false) return;
      if (R.layers.test(C.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && M === Nn) && (!R.frustumCulled || n.intersectsObject(R))) {
        R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, R.matrixWorld);
        let B = t.update(R), G = R.material;
        if (Array.isArray(G)) {
          let $ = B.groups;
          for (let W = 0, nt = $.length; W < nt; W++) {
            let X = $[W], lt = G[X.materialIndex];
            if (lt && lt.visible) {
              let xt = x(R, lt, b, M);
              R.onBeforeShadow(i, R, C, L, B, xt, X), i.renderBufferDirect(L, null, B, xt, R, X), R.onAfterShadow(i, R, C, L, B, xt, X);
            }
          }
        } else if (G.visible) {
          let $ = x(R, G, b, M);
          R.onBeforeShadow(i, R, C, L, B, $, null), i.renderBufferDirect(L, null, B, $, R, null), R.onAfterShadow(i, R, C, L, B, $, null);
        }
      }
      let H = R.children;
      for (let B = 0, G = H.length; B < G; B++) _(H[B], C, L, b, M);
    }
    function D(R) {
      R.target.removeEventListener("dispose", D);
      for (let L in l) {
        let b = l[L], M = R.target.uuid;
        M in b && (b[M].dispose(), delete b[M]);
      }
    }
  }
  var s_ = { [Xo]: qo, [Yo]: $o, [Zo]: Ko, [hs]: Jo, [qo]: Xo, [$o]: Yo, [Ko]: Zo, [Jo]: hs };
  function r_(i, t) {
    function e() {
      let U = false, pt = new ye(), q = null, K = new ye(0, 0, 0, 0);
      return { setMask: function(_t) {
        q !== _t && !U && (i.colorMask(_t, _t, _t, _t), q = _t);
      }, setLocked: function(_t) {
        U = _t;
      }, setClear: function(_t, mt, Gt, ve, Le) {
        Le === true && (_t *= ve, mt *= ve, Gt *= ve), pt.set(_t, mt, Gt, ve), K.equals(pt) === false && (i.clearColor(_t, mt, Gt, ve), K.copy(pt));
      }, reset: function() {
        U = false, q = null, K.set(-1, 0, 0, 0);
      } };
    }
    function n() {
      let U = false, pt = false, q = null, K = null, _t = null;
      return { setReversed: function(mt) {
        if (pt !== mt) {
          let Gt = t.get("EXT_clip_control");
          pt ? Gt.clipControlEXT(Gt.LOWER_LEFT_EXT, Gt.ZERO_TO_ONE_EXT) : Gt.clipControlEXT(Gt.LOWER_LEFT_EXT, Gt.NEGATIVE_ONE_TO_ONE_EXT);
          let ve = _t;
          _t = null, this.setClear(ve);
        }
        pt = mt;
      }, getReversed: function() {
        return pt;
      }, setTest: function(mt) {
        mt ? at(i.DEPTH_TEST) : Lt(i.DEPTH_TEST);
      }, setMask: function(mt) {
        q !== mt && !U && (i.depthMask(mt), q = mt);
      }, setFunc: function(mt) {
        if (pt && (mt = s_[mt]), K !== mt) {
          switch (mt) {
            case Xo:
              i.depthFunc(i.NEVER);
              break;
            case qo:
              i.depthFunc(i.ALWAYS);
              break;
            case Yo:
              i.depthFunc(i.LESS);
              break;
            case hs:
              i.depthFunc(i.LEQUAL);
              break;
            case Zo:
              i.depthFunc(i.EQUAL);
              break;
            case Jo:
              i.depthFunc(i.GEQUAL);
              break;
            case $o:
              i.depthFunc(i.GREATER);
              break;
            case Ko:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          K = mt;
        }
      }, setLocked: function(mt) {
        U = mt;
      }, setClear: function(mt) {
        _t !== mt && (pt && (mt = 1 - mt), i.clearDepth(mt), _t = mt);
      }, reset: function() {
        U = false, q = null, K = null, _t = null, pt = false;
      } };
    }
    function s() {
      let U = false, pt = null, q = null, K = null, _t = null, mt = null, Gt = null, ve = null, Le = null;
      return { setTest: function(re) {
        U || (re ? at(i.STENCIL_TEST) : Lt(i.STENCIL_TEST));
      }, setMask: function(re) {
        pt !== re && !U && (i.stencilMask(re), pt = re);
      }, setFunc: function(re, an, Rn) {
        (q !== re || K !== an || _t !== Rn) && (i.stencilFunc(re, an, Rn), q = re, K = an, _t = Rn);
      }, setOp: function(re, an, Rn) {
        (mt !== re || Gt !== an || ve !== Rn) && (i.stencilOp(re, an, Rn), mt = re, Gt = an, ve = Rn);
      }, setLocked: function(re) {
        U = re;
      }, setClear: function(re) {
        Le !== re && (i.clearStencil(re), Le = re);
      }, reset: function() {
        U = false, pt = null, q = null, K = null, _t = null, mt = null, Gt = null, ve = null, Le = null;
      } };
    }
    let r = new e(), a = new n(), o = new s(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), h = {}, d = {}, u = /* @__PURE__ */ new WeakMap(), p = [], g = null, v = false, m = null, f = null, E = null, x = null, _ = null, D = null, R = null, C = new Ht(0, 0, 0), L = 0, b = false, M = null, I = null, H = null, B = null, G = null, $ = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS), W = false, nt = 0, X = i.getParameter(i.VERSION);
    X.indexOf("WebGL") !== -1 ? (nt = parseFloat(/^WebGL (\d)/.exec(X)[1]), W = nt >= 1) : X.indexOf("OpenGL ES") !== -1 && (nt = parseFloat(/^OpenGL ES (\d)/.exec(X)[1]), W = nt >= 2);
    let lt = null, xt = {}, Et = i.getParameter(i.SCISSOR_BOX), Vt = i.getParameter(i.VIEWPORT), ne = new ye().fromArray(Et), J = new ye().fromArray(Vt);
    function st(U, pt, q, K) {
      let _t = new Uint8Array(4), mt = i.createTexture();
      i.bindTexture(U, mt), i.texParameteri(U, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(U, i.TEXTURE_MAG_FILTER, i.NEAREST);
      for (let Gt = 0; Gt < q; Gt++) U === i.TEXTURE_3D || U === i.TEXTURE_2D_ARRAY ? i.texImage3D(pt, 0, i.RGBA, 1, 1, K, 0, i.RGBA, i.UNSIGNED_BYTE, _t) : i.texImage2D(pt + Gt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, _t);
      return mt;
    }
    let wt = {};
    wt[i.TEXTURE_2D] = st(i.TEXTURE_2D, i.TEXTURE_2D, 1), wt[i.TEXTURE_CUBE_MAP] = st(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), wt[i.TEXTURE_2D_ARRAY] = st(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), wt[i.TEXTURE_3D] = st(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), at(i.DEPTH_TEST), a.setFunc(hs), tt(false), Mt(sh), at(i.CULL_FACE), A(si);
    function at(U) {
      h[U] !== true && (i.enable(U), h[U] = true);
    }
    function Lt(U) {
      h[U] !== false && (i.disable(U), h[U] = false);
    }
    function zt(U, pt) {
      return d[U] !== pt ? (i.bindFramebuffer(U, pt), d[U] = pt, U === i.DRAW_FRAMEBUFFER && (d[i.FRAMEBUFFER] = pt), U === i.FRAMEBUFFER && (d[i.DRAW_FRAMEBUFFER] = pt), true) : false;
    }
    function Ot(U, pt) {
      let q = p, K = false;
      if (U) {
        q = u.get(pt), q === void 0 && (q = [], u.set(pt, q));
        let _t = U.textures;
        if (q.length !== _t.length || q[0] !== i.COLOR_ATTACHMENT0) {
          for (let mt = 0, Gt = _t.length; mt < Gt; mt++) q[mt] = i.COLOR_ATTACHMENT0 + mt;
          q.length = _t.length, K = true;
        }
      } else q[0] !== i.BACK && (q[0] = i.BACK, K = true);
      K && i.drawBuffers(q);
    }
    function Kt(U) {
      return g !== U ? (i.useProgram(U), g = U, true) : false;
    }
    let Q = { [bi]: i.FUNC_ADD, [Ud]: i.FUNC_SUBTRACT, [Nd]: i.FUNC_REVERSE_SUBTRACT };
    Q[Fd] = i.MIN, Q[Od] = i.MAX;
    let it = { [Bd]: i.ZERO, [zd]: i.ONE, [kd]: i.SRC_COLOR, [Go]: i.SRC_ALPHA, [qd]: i.SRC_ALPHA_SATURATE, [Wd]: i.DST_COLOR, [Hd]: i.DST_ALPHA, [Vd]: i.ONE_MINUS_SRC_COLOR, [Wo]: i.ONE_MINUS_SRC_ALPHA, [Xd]: i.ONE_MINUS_DST_COLOR, [Gd]: i.ONE_MINUS_DST_ALPHA, [Yd]: i.CONSTANT_COLOR, [Zd]: i.ONE_MINUS_CONSTANT_COLOR, [Jd]: i.CONSTANT_ALPHA, [$d]: i.ONE_MINUS_CONSTANT_ALPHA };
    function A(U, pt, q, K, _t, mt, Gt, ve, Le, re) {
      if (U === si) {
        v === true && (Lt(i.BLEND), v = false);
        return;
      }
      if (v === false && (at(i.BLEND), v = true), U !== Dd) {
        if (U !== m || re !== b) {
          if ((f !== bi || _ !== bi) && (i.blendEquation(i.FUNC_ADD), f = bi, _ = bi), re) switch (U) {
            case as:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case sa:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case rh:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case ah:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", U);
              break;
          }
          else switch (U) {
            case as:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case sa:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case rh:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case ah:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", U);
              break;
          }
          E = null, x = null, D = null, R = null, C.set(0, 0, 0), L = 0, m = U, b = re;
        }
        return;
      }
      _t = _t || pt, mt = mt || q, Gt = Gt || K, (pt !== f || _t !== _) && (i.blendEquationSeparate(Q[pt], Q[_t]), f = pt, _ = _t), (q !== E || K !== x || mt !== D || Gt !== R) && (i.blendFuncSeparate(it[q], it[K], it[mt], it[Gt]), E = q, x = K, D = mt, R = Gt), (ve.equals(C) === false || Le !== L) && (i.blendColor(ve.r, ve.g, ve.b, Le), C.copy(ve), L = Le), m = U, b = false;
    }
    function It(U, pt) {
      U.side === un ? Lt(i.CULL_FACE) : at(i.CULL_FACE);
      let q = U.side === Fe;
      pt && (q = !q), tt(q), U.blending === as && U.transparent === false ? A(si) : A(U.blending, U.blendEquation, U.blendSrc, U.blendDst, U.blendEquationAlpha, U.blendSrcAlpha, U.blendDstAlpha, U.blendColor, U.blendAlpha, U.premultipliedAlpha), a.setFunc(U.depthFunc), a.setTest(U.depthTest), a.setMask(U.depthWrite), r.setMask(U.colorWrite);
      let K = U.stencilWrite;
      o.setTest(K), K && (o.setMask(U.stencilWriteMask), o.setFunc(U.stencilFunc, U.stencilRef, U.stencilFuncMask), o.setOp(U.stencilFail, U.stencilZFail, U.stencilZPass)), Nt(U.polygonOffset, U.polygonOffsetFactor, U.polygonOffsetUnits), U.alphaToCoverage === true ? at(i.SAMPLE_ALPHA_TO_COVERAGE) : Lt(i.SAMPLE_ALPHA_TO_COVERAGE);
    }
    function tt(U) {
      M !== U && (U ? i.frontFace(i.CW) : i.frontFace(i.CCW), M = U);
    }
    function Mt(U) {
      U !== Pd ? (at(i.CULL_FACE), U !== I && (U === sh ? i.cullFace(i.BACK) : U === Ld ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Lt(i.CULL_FACE), I = U;
    }
    function ct(U) {
      U !== H && (W && i.lineWidth(U), H = U);
    }
    function Nt(U, pt, q) {
      U ? (at(i.POLYGON_OFFSET_FILL), (B !== pt || G !== q) && (i.polygonOffset(pt, q), B = pt, G = q)) : Lt(i.POLYGON_OFFSET_FILL);
    }
    function vt(U) {
      U ? at(i.SCISSOR_TEST) : Lt(i.SCISSOR_TEST);
    }
    function w(U) {
      U === void 0 && (U = i.TEXTURE0 + $ - 1), lt !== U && (i.activeTexture(U), lt = U);
    }
    function y(U, pt, q) {
      q === void 0 && (lt === null ? q = i.TEXTURE0 + $ - 1 : q = lt);
      let K = xt[q];
      K === void 0 && (K = { type: void 0, texture: void 0 }, xt[q] = K), (K.type !== U || K.texture !== pt) && (lt !== q && (i.activeTexture(q), lt = q), i.bindTexture(U, pt || wt[U]), K.type = U, K.texture = pt);
    }
    function O() {
      let U = xt[lt];
      U !== void 0 && U.type !== void 0 && (i.bindTexture(U.type, null), U.type = void 0, U.texture = void 0);
    }
    function Y() {
      try {
        i.compressedTexImage2D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function j() {
      try {
        i.compressedTexImage3D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function Z() {
      try {
        i.texSubImage2D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function Tt() {
      try {
        i.texSubImage3D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function ft() {
      try {
        i.compressedTexSubImage2D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function yt() {
      try {
        i.compressedTexSubImage3D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function Zt() {
      try {
        i.texStorage2D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function et() {
      try {
        i.texStorage3D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function St() {
      try {
        i.texImage2D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function Ft() {
      try {
        i.texImage3D.apply(i, arguments);
      } catch (U) {
        console.error("THREE.WebGLState:", U);
      }
    }
    function Bt(U) {
      ne.equals(U) === false && (i.scissor(U.x, U.y, U.z, U.w), ne.copy(U));
    }
    function bt(U) {
      J.equals(U) === false && (i.viewport(U.x, U.y, U.z, U.w), J.copy(U));
    }
    function Jt(U, pt) {
      let q = l.get(pt);
      q === void 0 && (q = /* @__PURE__ */ new WeakMap(), l.set(pt, q));
      let K = q.get(U);
      K === void 0 && (K = i.getUniformBlockIndex(pt, U.name), q.set(U, K));
    }
    function qt(U, pt) {
      let K = l.get(pt).get(U);
      c.get(pt) !== K && (i.uniformBlockBinding(pt, K, U.__bindingPointIndex), c.set(pt, K));
    }
    function ce() {
      i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(true, true, true, true), i.clearColor(0, 0, 0, 0), i.depthMask(true), i.depthFunc(i.LESS), a.setReversed(false), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, lt = null, xt = {}, d = {}, u = /* @__PURE__ */ new WeakMap(), p = [], g = null, v = false, m = null, f = null, E = null, x = null, _ = null, D = null, R = null, C = new Ht(0, 0, 0), L = 0, b = false, M = null, I = null, H = null, B = null, G = null, ne.set(0, 0, i.canvas.width, i.canvas.height), J.set(0, 0, i.canvas.width, i.canvas.height), r.reset(), a.reset(), o.reset();
    }
    return { buffers: { color: r, depth: a, stencil: o }, enable: at, disable: Lt, bindFramebuffer: zt, drawBuffers: Ot, useProgram: Kt, setBlending: A, setMaterial: It, setFlipSided: tt, setCullFace: Mt, setLineWidth: ct, setPolygonOffset: Nt, setScissorTest: vt, activeTexture: w, bindTexture: y, unbindTexture: O, compressedTexImage2D: Y, compressedTexImage3D: j, texImage2D: St, texImage3D: Ft, updateUBOMapping: Jt, uniformBlockBinding: qt, texStorage2D: Zt, texStorage3D: et, texSubImage2D: Z, texSubImage3D: Tt, compressedTexSubImage2D: ft, compressedTexSubImage3D: yt, scissor: Bt, viewport: bt, reset: ce };
  }
  function nu(i, t, e, n) {
    let s = a_(n);
    switch (e) {
      case wu:
        return i * t;
      case Au:
        return i * t;
      case Ru:
        return i * t * 2;
      case Ml:
        return i * t / s.components * s.byteLength;
      case Sl:
        return i * t / s.components * s.byteLength;
      case Cu:
        return i * t * 2 / s.components * s.byteLength;
      case bl:
        return i * t * 2 / s.components * s.byteLength;
      case Tu:
        return i * t * 3 / s.components * s.byteLength;
      case dn:
        return i * t * 4 / s.components * s.byteLength;
      case El:
        return i * t * 4 / s.components * s.byteLength;
      case jr:
      case ta:
        return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
      case ea:
      case na:
        return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
      case ic:
      case rc:
        return Math.max(i, 16) * Math.max(t, 8) / 4;
      case nc:
      case sc:
        return Math.max(i, 8) * Math.max(t, 8) / 2;
      case ac:
      case oc:
        return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
      case cc:
        return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
      case lc:
        return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
      case hc:
        return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
      case uc:
        return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
      case dc:
        return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
      case fc:
        return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
      case pc:
        return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
      case mc:
        return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
      case gc:
        return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
      case _c:
        return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
      case xc:
        return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
      case vc:
        return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
      case yc:
        return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
      case Mc:
        return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
      case Sc:
        return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
      case ia:
      case bc:
      case Ec:
        return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
      case Iu:
      case wc:
        return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
      case Tc:
      case Ac:
        return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    }
    throw new Error(`Unable to determine texture byte length for ${e} format.`);
  }
  function a_(i) {
    switch (i) {
      case zn:
      case Su:
        return { byteLength: 1, components: 1 };
      case Ks:
      case bu:
      case ur:
        return { byteLength: 2, components: 1 };
      case vl:
      case yl:
        return { byteLength: 2, components: 4 };
      case Ri:
      case xl:
      case bn:
        return { byteLength: 4, components: 1 };
      case Eu:
        return { byteLength: 4, components: 3 };
    }
    throw new Error(`Unknown texture type ${i}.`);
  }
  function o_(i, t, e, n, s, r, a) {
    let o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? false : /OculusBrowser/g.test(navigator.userAgent), l = new ht(), h = /* @__PURE__ */ new WeakMap(), d, u = /* @__PURE__ */ new WeakMap(), p = false;
    try {
      p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
    } catch {
    }
    function g(w, y) {
      return p ? new OffscreenCanvas(w, y) : oa("canvas");
    }
    function v(w, y, O) {
      let Y = 1, j = vt(w);
      if ((j.width > O || j.height > O) && (Y = O / Math.max(j.width, j.height)), Y < 1) if (typeof HTMLImageElement < "u" && w instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && w instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && w instanceof ImageBitmap || typeof VideoFrame < "u" && w instanceof VideoFrame) {
        let Z = Math.floor(Y * j.width), Tt = Math.floor(Y * j.height);
        d === void 0 && (d = g(Z, Tt));
        let ft = y ? g(Z, Tt) : d;
        return ft.width = Z, ft.height = Tt, ft.getContext("2d").drawImage(w, 0, 0, Z, Tt), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + j.width + "x" + j.height + ") to (" + Z + "x" + Tt + ")."), ft;
      } else return "data" in w && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + j.width + "x" + j.height + ")."), w;
      return w;
    }
    function m(w) {
      return w.generateMipmaps;
    }
    function f(w) {
      i.generateMipmap(w);
    }
    function E(w) {
      return w.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : w.isWebGL3DRenderTarget ? i.TEXTURE_3D : w.isWebGLArrayRenderTarget || w.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
    }
    function x(w, y, O, Y, j = false) {
      if (w !== null) {
        if (i[w] !== void 0) return i[w];
        console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + w + "'");
      }
      let Z = y;
      if (y === i.RED && (O === i.FLOAT && (Z = i.R32F), O === i.HALF_FLOAT && (Z = i.R16F), O === i.UNSIGNED_BYTE && (Z = i.R8)), y === i.RED_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.R8UI), O === i.UNSIGNED_SHORT && (Z = i.R16UI), O === i.UNSIGNED_INT && (Z = i.R32UI), O === i.BYTE && (Z = i.R8I), O === i.SHORT && (Z = i.R16I), O === i.INT && (Z = i.R32I)), y === i.RG && (O === i.FLOAT && (Z = i.RG32F), O === i.HALF_FLOAT && (Z = i.RG16F), O === i.UNSIGNED_BYTE && (Z = i.RG8)), y === i.RG_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.RG8UI), O === i.UNSIGNED_SHORT && (Z = i.RG16UI), O === i.UNSIGNED_INT && (Z = i.RG32UI), O === i.BYTE && (Z = i.RG8I), O === i.SHORT && (Z = i.RG16I), O === i.INT && (Z = i.RG32I)), y === i.RGB_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.RGB8UI), O === i.UNSIGNED_SHORT && (Z = i.RGB16UI), O === i.UNSIGNED_INT && (Z = i.RGB32UI), O === i.BYTE && (Z = i.RGB8I), O === i.SHORT && (Z = i.RGB16I), O === i.INT && (Z = i.RGB32I)), y === i.RGBA_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.RGBA8UI), O === i.UNSIGNED_SHORT && (Z = i.RGBA16UI), O === i.UNSIGNED_INT && (Z = i.RGBA32UI), O === i.BYTE && (Z = i.RGBA8I), O === i.SHORT && (Z = i.RGBA16I), O === i.INT && (Z = i.RGBA32I)), y === i.RGB && O === i.UNSIGNED_INT_5_9_9_9_REV && (Z = i.RGB9_E5), y === i.RGBA) {
        let Tt = j ? Ba : Qt.getTransfer(Y);
        O === i.FLOAT && (Z = i.RGBA32F), O === i.HALF_FLOAT && (Z = i.RGBA16F), O === i.UNSIGNED_BYTE && (Z = Tt === oe ? i.SRGB8_ALPHA8 : i.RGBA8), O === i.UNSIGNED_SHORT_4_4_4_4 && (Z = i.RGBA4), O === i.UNSIGNED_SHORT_5_5_5_1 && (Z = i.RGB5_A1);
      }
      return (Z === i.R16F || Z === i.R32F || Z === i.RG16F || Z === i.RG32F || Z === i.RGBA16F || Z === i.RGBA32F) && t.get("EXT_color_buffer_float"), Z;
    }
    function _(w, y) {
      let O;
      return w ? y === null || y === Ri || y === fs ? O = i.DEPTH24_STENCIL8 : y === bn ? O = i.DEPTH32F_STENCIL8 : y === Ks && (O = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : y === null || y === Ri || y === fs ? O = i.DEPTH_COMPONENT24 : y === bn ? O = i.DEPTH_COMPONENT32F : y === Ks && (O = i.DEPTH_COMPONENT16), O;
    }
    function D(w, y) {
      return m(w) === true || w.isFramebufferTexture && w.minFilter !== Qe && w.minFilter !== Sn ? Math.log2(Math.max(y.width, y.height)) + 1 : w.mipmaps !== void 0 && w.mipmaps.length > 0 ? w.mipmaps.length : w.isCompressedTexture && Array.isArray(w.image) ? y.mipmaps.length : 1;
    }
    function R(w) {
      let y = w.target;
      y.removeEventListener("dispose", R), L(y), y.isVideoTexture && h.delete(y);
    }
    function C(w) {
      let y = w.target;
      y.removeEventListener("dispose", C), M(y);
    }
    function L(w) {
      let y = n.get(w);
      if (y.__webglInit === void 0) return;
      let O = w.source, Y = u.get(O);
      if (Y) {
        let j = Y[y.__cacheKey];
        j.usedTimes--, j.usedTimes === 0 && b(w), Object.keys(Y).length === 0 && u.delete(O);
      }
      n.remove(w);
    }
    function b(w) {
      let y = n.get(w);
      i.deleteTexture(y.__webglTexture);
      let O = w.source, Y = u.get(O);
      delete Y[y.__cacheKey], a.memory.textures--;
    }
    function M(w) {
      let y = n.get(w);
      if (w.depthTexture && (w.depthTexture.dispose(), n.remove(w.depthTexture)), w.isWebGLCubeRenderTarget) for (let Y = 0; Y < 6; Y++) {
        if (Array.isArray(y.__webglFramebuffer[Y])) for (let j = 0; j < y.__webglFramebuffer[Y].length; j++) i.deleteFramebuffer(y.__webglFramebuffer[Y][j]);
        else i.deleteFramebuffer(y.__webglFramebuffer[Y]);
        y.__webglDepthbuffer && i.deleteRenderbuffer(y.__webglDepthbuffer[Y]);
      }
      else {
        if (Array.isArray(y.__webglFramebuffer)) for (let Y = 0; Y < y.__webglFramebuffer.length; Y++) i.deleteFramebuffer(y.__webglFramebuffer[Y]);
        else i.deleteFramebuffer(y.__webglFramebuffer);
        if (y.__webglDepthbuffer && i.deleteRenderbuffer(y.__webglDepthbuffer), y.__webglMultisampledFramebuffer && i.deleteFramebuffer(y.__webglMultisampledFramebuffer), y.__webglColorRenderbuffer) for (let Y = 0; Y < y.__webglColorRenderbuffer.length; Y++) y.__webglColorRenderbuffer[Y] && i.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);
        y.__webglDepthRenderbuffer && i.deleteRenderbuffer(y.__webglDepthRenderbuffer);
      }
      let O = w.textures;
      for (let Y = 0, j = O.length; Y < j; Y++) {
        let Z = n.get(O[Y]);
        Z.__webglTexture && (i.deleteTexture(Z.__webglTexture), a.memory.textures--), n.remove(O[Y]);
      }
      n.remove(w);
    }
    let I = 0;
    function H() {
      I = 0;
    }
    function B() {
      let w = I;
      return w >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + w + " texture units while this GPU supports only " + s.maxTextures), I += 1, w;
    }
    function G(w) {
      let y = [];
      return y.push(w.wrapS), y.push(w.wrapT), y.push(w.wrapR || 0), y.push(w.magFilter), y.push(w.minFilter), y.push(w.anisotropy), y.push(w.internalFormat), y.push(w.format), y.push(w.type), y.push(w.generateMipmaps), y.push(w.premultiplyAlpha), y.push(w.flipY), y.push(w.unpackAlignment), y.push(w.colorSpace), y.join();
    }
    function $(w, y) {
      let O = n.get(w);
      if (w.isVideoTexture && ct(w), w.isRenderTargetTexture === false && w.version > 0 && O.__version !== w.version) {
        let Y = w.image;
        if (Y === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
        else if (Y.complete === false) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
        else {
          J(O, w, y);
          return;
        }
      }
      e.bindTexture(i.TEXTURE_2D, O.__webglTexture, i.TEXTURE0 + y);
    }
    function W(w, y) {
      let O = n.get(w);
      if (w.version > 0 && O.__version !== w.version) {
        J(O, w, y);
        return;
      }
      e.bindTexture(i.TEXTURE_2D_ARRAY, O.__webglTexture, i.TEXTURE0 + y);
    }
    function nt(w, y) {
      let O = n.get(w);
      if (w.version > 0 && O.__version !== w.version) {
        J(O, w, y);
        return;
      }
      e.bindTexture(i.TEXTURE_3D, O.__webglTexture, i.TEXTURE0 + y);
    }
    function X(w, y) {
      let O = n.get(w);
      if (w.version > 0 && O.__version !== w.version) {
        st(O, w, y);
        return;
      }
      e.bindTexture(i.TEXTURE_CUBE_MAP, O.__webglTexture, i.TEXTURE0 + y);
    }
    let lt = { [tc]: i.REPEAT, [Ti]: i.CLAMP_TO_EDGE, [ec]: i.MIRRORED_REPEAT }, xt = { [Qe]: i.NEAREST, [af]: i.NEAREST_MIPMAP_NEAREST, [br]: i.NEAREST_MIPMAP_LINEAR, [Sn]: i.LINEAR, [oo]: i.LINEAR_MIPMAP_NEAREST, [Ai]: i.LINEAR_MIPMAP_LINEAR }, Et = { [hf]: i.NEVER, [gf]: i.ALWAYS, [uf]: i.LESS, [Lu]: i.LEQUAL, [df]: i.EQUAL, [mf]: i.GEQUAL, [ff]: i.GREATER, [pf]: i.NOTEQUAL };
    function Vt(w, y) {
      if (y.type === bn && t.has("OES_texture_float_linear") === false && (y.magFilter === Sn || y.magFilter === oo || y.magFilter === br || y.magFilter === Ai || y.minFilter === Sn || y.minFilter === oo || y.minFilter === br || y.minFilter === Ai) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(w, i.TEXTURE_WRAP_S, lt[y.wrapS]), i.texParameteri(w, i.TEXTURE_WRAP_T, lt[y.wrapT]), (w === i.TEXTURE_3D || w === i.TEXTURE_2D_ARRAY) && i.texParameteri(w, i.TEXTURE_WRAP_R, lt[y.wrapR]), i.texParameteri(w, i.TEXTURE_MAG_FILTER, xt[y.magFilter]), i.texParameteri(w, i.TEXTURE_MIN_FILTER, xt[y.minFilter]), y.compareFunction && (i.texParameteri(w, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(w, i.TEXTURE_COMPARE_FUNC, Et[y.compareFunction])), t.has("EXT_texture_filter_anisotropic") === true) {
        if (y.magFilter === Qe || y.minFilter !== br && y.minFilter !== Ai || y.type === bn && t.has("OES_texture_float_linear") === false) return;
        if (y.anisotropy > 1 || n.get(y).__currentAnisotropy) {
          let O = t.get("EXT_texture_filter_anisotropic");
          i.texParameterf(w, O.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(y.anisotropy, s.getMaxAnisotropy())), n.get(y).__currentAnisotropy = y.anisotropy;
        }
      }
    }
    function ne(w, y) {
      let O = false;
      w.__webglInit === void 0 && (w.__webglInit = true, y.addEventListener("dispose", R));
      let Y = y.source, j = u.get(Y);
      j === void 0 && (j = {}, u.set(Y, j));
      let Z = G(y);
      if (Z !== w.__cacheKey) {
        j[Z] === void 0 && (j[Z] = { texture: i.createTexture(), usedTimes: 0 }, a.memory.textures++, O = true), j[Z].usedTimes++;
        let Tt = j[w.__cacheKey];
        Tt !== void 0 && (j[w.__cacheKey].usedTimes--, Tt.usedTimes === 0 && b(y)), w.__cacheKey = Z, w.__webglTexture = j[Z].texture;
      }
      return O;
    }
    function J(w, y, O) {
      let Y = i.TEXTURE_2D;
      (y.isDataArrayTexture || y.isCompressedArrayTexture) && (Y = i.TEXTURE_2D_ARRAY), y.isData3DTexture && (Y = i.TEXTURE_3D);
      let j = ne(w, y), Z = y.source;
      e.bindTexture(Y, w.__webglTexture, i.TEXTURE0 + O);
      let Tt = n.get(Z);
      if (Z.version !== Tt.__version || j === true) {
        e.activeTexture(i.TEXTURE0 + O);
        let ft = Qt.getPrimaries(Qt.workingColorSpace), yt = y.colorSpace === ii ? null : Qt.getPrimaries(y.colorSpace), Zt = y.colorSpace === ii || ft === yt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, y.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, y.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, y.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Zt);
        let et = v(y.image, false, s.maxTextureSize);
        et = Nt(y, et);
        let St = r.convert(y.format, y.colorSpace), Ft = r.convert(y.type), Bt = x(y.internalFormat, St, Ft, y.colorSpace, y.isVideoTexture);
        Vt(Y, y);
        let bt, Jt = y.mipmaps, qt = y.isVideoTexture !== true, ce = Tt.__version === void 0 || j === true, U = Z.dataReady, pt = D(y, et);
        if (y.isDepthTexture) Bt = _(y.format === ps, y.type), ce && (qt ? e.texStorage2D(i.TEXTURE_2D, 1, Bt, et.width, et.height) : e.texImage2D(i.TEXTURE_2D, 0, Bt, et.width, et.height, 0, St, Ft, null));
        else if (y.isDataTexture) if (Jt.length > 0) {
          qt && ce && e.texStorage2D(i.TEXTURE_2D, pt, Bt, Jt[0].width, Jt[0].height);
          for (let q = 0, K = Jt.length; q < K; q++) bt = Jt[q], qt ? U && e.texSubImage2D(i.TEXTURE_2D, q, 0, 0, bt.width, bt.height, St, Ft, bt.data) : e.texImage2D(i.TEXTURE_2D, q, Bt, bt.width, bt.height, 0, St, Ft, bt.data);
          y.generateMipmaps = false;
        } else qt ? (ce && e.texStorage2D(i.TEXTURE_2D, pt, Bt, et.width, et.height), U && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, et.width, et.height, St, Ft, et.data)) : e.texImage2D(i.TEXTURE_2D, 0, Bt, et.width, et.height, 0, St, Ft, et.data);
        else if (y.isCompressedTexture) if (y.isCompressedArrayTexture) {
          qt && ce && e.texStorage3D(i.TEXTURE_2D_ARRAY, pt, Bt, Jt[0].width, Jt[0].height, et.depth);
          for (let q = 0, K = Jt.length; q < K; q++) if (bt = Jt[q], y.format !== dn) if (St !== null) if (qt) {
            if (U) if (y.layerUpdates.size > 0) {
              let _t = nu(bt.width, bt.height, y.format, y.type);
              for (let mt of y.layerUpdates) {
                let Gt = bt.data.subarray(mt * _t / bt.data.BYTES_PER_ELEMENT, (mt + 1) * _t / bt.data.BYTES_PER_ELEMENT);
                e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, q, 0, 0, mt, bt.width, bt.height, 1, St, Gt);
              }
              y.clearLayerUpdates();
            } else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, q, 0, 0, 0, bt.width, bt.height, et.depth, St, bt.data);
          } else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, q, Bt, bt.width, bt.height, et.depth, 0, bt.data, 0, 0);
          else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else qt ? U && e.texSubImage3D(i.TEXTURE_2D_ARRAY, q, 0, 0, 0, bt.width, bt.height, et.depth, St, Ft, bt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, q, Bt, bt.width, bt.height, et.depth, 0, St, Ft, bt.data);
        } else {
          qt && ce && e.texStorage2D(i.TEXTURE_2D, pt, Bt, Jt[0].width, Jt[0].height);
          for (let q = 0, K = Jt.length; q < K; q++) bt = Jt[q], y.format !== dn ? St !== null ? qt ? U && e.compressedTexSubImage2D(i.TEXTURE_2D, q, 0, 0, bt.width, bt.height, St, bt.data) : e.compressedTexImage2D(i.TEXTURE_2D, q, Bt, bt.width, bt.height, 0, bt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : qt ? U && e.texSubImage2D(i.TEXTURE_2D, q, 0, 0, bt.width, bt.height, St, Ft, bt.data) : e.texImage2D(i.TEXTURE_2D, q, Bt, bt.width, bt.height, 0, St, Ft, bt.data);
        }
        else if (y.isDataArrayTexture) if (qt) {
          if (ce && e.texStorage3D(i.TEXTURE_2D_ARRAY, pt, Bt, et.width, et.height, et.depth), U) if (y.layerUpdates.size > 0) {
            let q = nu(et.width, et.height, y.format, y.type);
            for (let K of y.layerUpdates) {
              let _t = et.data.subarray(K * q / et.data.BYTES_PER_ELEMENT, (K + 1) * q / et.data.BYTES_PER_ELEMENT);
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, K, et.width, et.height, 1, St, Ft, _t);
            }
            y.clearLayerUpdates();
          } else e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, et.width, et.height, et.depth, St, Ft, et.data);
        } else e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Bt, et.width, et.height, et.depth, 0, St, Ft, et.data);
        else if (y.isData3DTexture) qt ? (ce && e.texStorage3D(i.TEXTURE_3D, pt, Bt, et.width, et.height, et.depth), U && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, et.width, et.height, et.depth, St, Ft, et.data)) : e.texImage3D(i.TEXTURE_3D, 0, Bt, et.width, et.height, et.depth, 0, St, Ft, et.data);
        else if (y.isFramebufferTexture) {
          if (ce) if (qt) e.texStorage2D(i.TEXTURE_2D, pt, Bt, et.width, et.height);
          else {
            let q = et.width, K = et.height;
            for (let _t = 0; _t < pt; _t++) e.texImage2D(i.TEXTURE_2D, _t, Bt, q, K, 0, St, Ft, null), q >>= 1, K >>= 1;
          }
        } else if (Jt.length > 0) {
          if (qt && ce) {
            let q = vt(Jt[0]);
            e.texStorage2D(i.TEXTURE_2D, pt, Bt, q.width, q.height);
          }
          for (let q = 0, K = Jt.length; q < K; q++) bt = Jt[q], qt ? U && e.texSubImage2D(i.TEXTURE_2D, q, 0, 0, St, Ft, bt) : e.texImage2D(i.TEXTURE_2D, q, Bt, St, Ft, bt);
          y.generateMipmaps = false;
        } else if (qt) {
          if (ce) {
            let q = vt(et);
            e.texStorage2D(i.TEXTURE_2D, pt, Bt, q.width, q.height);
          }
          U && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, St, Ft, et);
        } else e.texImage2D(i.TEXTURE_2D, 0, Bt, St, Ft, et);
        m(y) && f(Y), Tt.__version = Z.version, y.onUpdate && y.onUpdate(y);
      }
      w.__version = y.version;
    }
    function st(w, y, O) {
      if (y.image.length !== 6) return;
      let Y = ne(w, y), j = y.source;
      e.bindTexture(i.TEXTURE_CUBE_MAP, w.__webglTexture, i.TEXTURE0 + O);
      let Z = n.get(j);
      if (j.version !== Z.__version || Y === true) {
        e.activeTexture(i.TEXTURE0 + O);
        let Tt = Qt.getPrimaries(Qt.workingColorSpace), ft = y.colorSpace === ii ? null : Qt.getPrimaries(y.colorSpace), yt = y.colorSpace === ii || Tt === ft ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, y.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, y.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, y.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, yt);
        let Zt = y.isCompressedTexture || y.image[0].isCompressedTexture, et = y.image[0] && y.image[0].isDataTexture, St = [];
        for (let K = 0; K < 6; K++) !Zt && !et ? St[K] = v(y.image[K], true, s.maxCubemapSize) : St[K] = et ? y.image[K].image : y.image[K], St[K] = Nt(y, St[K]);
        let Ft = St[0], Bt = r.convert(y.format, y.colorSpace), bt = r.convert(y.type), Jt = x(y.internalFormat, Bt, bt, y.colorSpace), qt = y.isVideoTexture !== true, ce = Z.__version === void 0 || Y === true, U = j.dataReady, pt = D(y, Ft);
        Vt(i.TEXTURE_CUBE_MAP, y);
        let q;
        if (Zt) {
          qt && ce && e.texStorage2D(i.TEXTURE_CUBE_MAP, pt, Jt, Ft.width, Ft.height);
          for (let K = 0; K < 6; K++) {
            q = St[K].mipmaps;
            for (let _t = 0; _t < q.length; _t++) {
              let mt = q[_t];
              y.format !== dn ? Bt !== null ? qt ? U && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, 0, 0, mt.width, mt.height, Bt, mt.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, Jt, mt.width, mt.height, 0, mt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : qt ? U && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, 0, 0, mt.width, mt.height, Bt, bt, mt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, Jt, mt.width, mt.height, 0, Bt, bt, mt.data);
            }
          }
        } else {
          if (q = y.mipmaps, qt && ce) {
            q.length > 0 && pt++;
            let K = vt(St[0]);
            e.texStorage2D(i.TEXTURE_CUBE_MAP, pt, Jt, K.width, K.height);
          }
          for (let K = 0; K < 6; K++) if (et) {
            qt ? U && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, St[K].width, St[K].height, Bt, bt, St[K].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Jt, St[K].width, St[K].height, 0, Bt, bt, St[K].data);
            for (let _t = 0; _t < q.length; _t++) {
              let Gt = q[_t].image[K].image;
              qt ? U && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, 0, 0, Gt.width, Gt.height, Bt, bt, Gt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, Jt, Gt.width, Gt.height, 0, Bt, bt, Gt.data);
            }
          } else {
            qt ? U && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Bt, bt, St[K]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Jt, Bt, bt, St[K]);
            for (let _t = 0; _t < q.length; _t++) {
              let mt = q[_t];
              qt ? U && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, 0, 0, Bt, bt, mt.image[K]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, Jt, Bt, bt, mt.image[K]);
            }
          }
        }
        m(y) && f(i.TEXTURE_CUBE_MAP), Z.__version = j.version, y.onUpdate && y.onUpdate(y);
      }
      w.__version = y.version;
    }
    function wt(w, y, O, Y, j, Z) {
      let Tt = r.convert(O.format, O.colorSpace), ft = r.convert(O.type), yt = x(O.internalFormat, Tt, ft, O.colorSpace), Zt = n.get(y), et = n.get(O);
      if (et.__renderTarget = y, !Zt.__hasExternalTextures) {
        let St = Math.max(1, y.width >> Z), Ft = Math.max(1, y.height >> Z);
        j === i.TEXTURE_3D || j === i.TEXTURE_2D_ARRAY ? e.texImage3D(j, Z, yt, St, Ft, y.depth, 0, Tt, ft, null) : e.texImage2D(j, Z, yt, St, Ft, 0, Tt, ft, null);
      }
      e.bindFramebuffer(i.FRAMEBUFFER, w), Mt(y) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, Y, j, et.__webglTexture, 0, tt(y)) : (j === i.TEXTURE_2D || j >= i.TEXTURE_CUBE_MAP_POSITIVE_X && j <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, Y, j, et.__webglTexture, Z), e.bindFramebuffer(i.FRAMEBUFFER, null);
    }
    function at(w, y, O) {
      if (i.bindRenderbuffer(i.RENDERBUFFER, w), y.depthBuffer) {
        let Y = y.depthTexture, j = Y && Y.isDepthTexture ? Y.type : null, Z = _(y.stencilBuffer, j), Tt = y.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ft = tt(y);
        Mt(y) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ft, Z, y.width, y.height) : O ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ft, Z, y.width, y.height) : i.renderbufferStorage(i.RENDERBUFFER, Z, y.width, y.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, Tt, i.RENDERBUFFER, w);
      } else {
        let Y = y.textures;
        for (let j = 0; j < Y.length; j++) {
          let Z = Y[j], Tt = r.convert(Z.format, Z.colorSpace), ft = r.convert(Z.type), yt = x(Z.internalFormat, Tt, ft, Z.colorSpace), Zt = tt(y);
          O && Mt(y) === false ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Zt, yt, y.width, y.height) : Mt(y) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Zt, yt, y.width, y.height) : i.renderbufferStorage(i.RENDERBUFFER, yt, y.width, y.height);
        }
      }
      i.bindRenderbuffer(i.RENDERBUFFER, null);
    }
    function Lt(w, y) {
      if (y && y.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
      if (e.bindFramebuffer(i.FRAMEBUFFER, w), !(y.depthTexture && y.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
      let Y = n.get(y.depthTexture);
      Y.__renderTarget = y, (!Y.__webglTexture || y.depthTexture.image.width !== y.width || y.depthTexture.image.height !== y.height) && (y.depthTexture.image.width = y.width, y.depthTexture.image.height = y.height, y.depthTexture.needsUpdate = true), $(y.depthTexture, 0);
      let j = Y.__webglTexture, Z = tt(y);
      if (y.depthTexture.format === os) Mt(y) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0);
      else if (y.depthTexture.format === ps) Mt(y) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0);
      else throw new Error("Unknown depthTexture format");
    }
    function zt(w) {
      let y = n.get(w), O = w.isWebGLCubeRenderTarget === true;
      if (y.__boundDepthTexture !== w.depthTexture) {
        let Y = w.depthTexture;
        if (y.__depthDisposeCallback && y.__depthDisposeCallback(), Y) {
          let j = () => {
            delete y.__boundDepthTexture, delete y.__depthDisposeCallback, Y.removeEventListener("dispose", j);
          };
          Y.addEventListener("dispose", j), y.__depthDisposeCallback = j;
        }
        y.__boundDepthTexture = Y;
      }
      if (w.depthTexture && !y.__autoAllocateDepthBuffer) {
        if (O) throw new Error("target.depthTexture not supported in Cube render targets");
        Lt(y.__webglFramebuffer, w);
      } else if (O) {
        y.__webglDepthbuffer = [];
        for (let Y = 0; Y < 6; Y++) if (e.bindFramebuffer(i.FRAMEBUFFER, y.__webglFramebuffer[Y]), y.__webglDepthbuffer[Y] === void 0) y.__webglDepthbuffer[Y] = i.createRenderbuffer(), at(y.__webglDepthbuffer[Y], w, false);
        else {
          let j = w.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = y.__webglDepthbuffer[Y];
          i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, j, i.RENDERBUFFER, Z);
        }
      } else if (e.bindFramebuffer(i.FRAMEBUFFER, y.__webglFramebuffer), y.__webglDepthbuffer === void 0) y.__webglDepthbuffer = i.createRenderbuffer(), at(y.__webglDepthbuffer, w, false);
      else {
        let Y = w.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, j = y.__webglDepthbuffer;
        i.bindRenderbuffer(i.RENDERBUFFER, j), i.framebufferRenderbuffer(i.FRAMEBUFFER, Y, i.RENDERBUFFER, j);
      }
      e.bindFramebuffer(i.FRAMEBUFFER, null);
    }
    function Ot(w, y, O) {
      let Y = n.get(w);
      y !== void 0 && wt(Y.__webglFramebuffer, w, w.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), O !== void 0 && zt(w);
    }
    function Kt(w) {
      let y = w.texture, O = n.get(w), Y = n.get(y);
      w.addEventListener("dispose", C);
      let j = w.textures, Z = w.isWebGLCubeRenderTarget === true, Tt = j.length > 1;
      if (Tt || (Y.__webglTexture === void 0 && (Y.__webglTexture = i.createTexture()), Y.__version = y.version, a.memory.textures++), Z) {
        O.__webglFramebuffer = [];
        for (let ft = 0; ft < 6; ft++) if (y.mipmaps && y.mipmaps.length > 0) {
          O.__webglFramebuffer[ft] = [];
          for (let yt = 0; yt < y.mipmaps.length; yt++) O.__webglFramebuffer[ft][yt] = i.createFramebuffer();
        } else O.__webglFramebuffer[ft] = i.createFramebuffer();
      } else {
        if (y.mipmaps && y.mipmaps.length > 0) {
          O.__webglFramebuffer = [];
          for (let ft = 0; ft < y.mipmaps.length; ft++) O.__webglFramebuffer[ft] = i.createFramebuffer();
        } else O.__webglFramebuffer = i.createFramebuffer();
        if (Tt) for (let ft = 0, yt = j.length; ft < yt; ft++) {
          let Zt = n.get(j[ft]);
          Zt.__webglTexture === void 0 && (Zt.__webglTexture = i.createTexture(), a.memory.textures++);
        }
        if (w.samples > 0 && Mt(w) === false) {
          O.__webglMultisampledFramebuffer = i.createFramebuffer(), O.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, O.__webglMultisampledFramebuffer);
          for (let ft = 0; ft < j.length; ft++) {
            let yt = j[ft];
            O.__webglColorRenderbuffer[ft] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, O.__webglColorRenderbuffer[ft]);
            let Zt = r.convert(yt.format, yt.colorSpace), et = r.convert(yt.type), St = x(yt.internalFormat, Zt, et, yt.colorSpace, w.isXRRenderTarget === true), Ft = tt(w);
            i.renderbufferStorageMultisample(i.RENDERBUFFER, Ft, St, w.width, w.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ft, i.RENDERBUFFER, O.__webglColorRenderbuffer[ft]);
          }
          i.bindRenderbuffer(i.RENDERBUFFER, null), w.depthBuffer && (O.__webglDepthRenderbuffer = i.createRenderbuffer(), at(O.__webglDepthRenderbuffer, w, true)), e.bindFramebuffer(i.FRAMEBUFFER, null);
        }
      }
      if (Z) {
        e.bindTexture(i.TEXTURE_CUBE_MAP, Y.__webglTexture), Vt(i.TEXTURE_CUBE_MAP, y);
        for (let ft = 0; ft < 6; ft++) if (y.mipmaps && y.mipmaps.length > 0) for (let yt = 0; yt < y.mipmaps.length; yt++) wt(O.__webglFramebuffer[ft][yt], w, y, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ft, yt);
        else wt(O.__webglFramebuffer[ft], w, y, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ft, 0);
        m(y) && f(i.TEXTURE_CUBE_MAP), e.unbindTexture();
      } else if (Tt) {
        for (let ft = 0, yt = j.length; ft < yt; ft++) {
          let Zt = j[ft], et = n.get(Zt);
          e.bindTexture(i.TEXTURE_2D, et.__webglTexture), Vt(i.TEXTURE_2D, Zt), wt(O.__webglFramebuffer, w, Zt, i.COLOR_ATTACHMENT0 + ft, i.TEXTURE_2D, 0), m(Zt) && f(i.TEXTURE_2D);
        }
        e.unbindTexture();
      } else {
        let ft = i.TEXTURE_2D;
        if ((w.isWebGL3DRenderTarget || w.isWebGLArrayRenderTarget) && (ft = w.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(ft, Y.__webglTexture), Vt(ft, y), y.mipmaps && y.mipmaps.length > 0) for (let yt = 0; yt < y.mipmaps.length; yt++) wt(O.__webglFramebuffer[yt], w, y, i.COLOR_ATTACHMENT0, ft, yt);
        else wt(O.__webglFramebuffer, w, y, i.COLOR_ATTACHMENT0, ft, 0);
        m(y) && f(ft), e.unbindTexture();
      }
      w.depthBuffer && zt(w);
    }
    function Q(w) {
      let y = w.textures;
      for (let O = 0, Y = y.length; O < Y; O++) {
        let j = y[O];
        if (m(j)) {
          let Z = E(w), Tt = n.get(j).__webglTexture;
          e.bindTexture(Z, Tt), f(Z), e.unbindTexture();
        }
      }
    }
    let it = [], A = [];
    function It(w) {
      if (w.samples > 0) {
        if (Mt(w) === false) {
          let y = w.textures, O = w.width, Y = w.height, j = i.COLOR_BUFFER_BIT, Z = w.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Tt = n.get(w), ft = y.length > 1;
          if (ft) for (let yt = 0; yt < y.length; yt++) e.bindFramebuffer(i.FRAMEBUFFER, Tt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + yt, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, Tt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + yt, i.TEXTURE_2D, null, 0);
          e.bindFramebuffer(i.READ_FRAMEBUFFER, Tt.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Tt.__webglFramebuffer);
          for (let yt = 0; yt < y.length; yt++) {
            if (w.resolveDepthBuffer && (w.depthBuffer && (j |= i.DEPTH_BUFFER_BIT), w.stencilBuffer && w.resolveStencilBuffer && (j |= i.STENCIL_BUFFER_BIT)), ft) {
              i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, Tt.__webglColorRenderbuffer[yt]);
              let Zt = n.get(y[yt]).__webglTexture;
              i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Zt, 0);
            }
            i.blitFramebuffer(0, 0, O, Y, 0, 0, O, Y, j, i.NEAREST), c === true && (it.length = 0, A.length = 0, it.push(i.COLOR_ATTACHMENT0 + yt), w.depthBuffer && w.resolveDepthBuffer === false && (it.push(Z), A.push(Z), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, A)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, it));
          }
          if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ft) for (let yt = 0; yt < y.length; yt++) {
            e.bindFramebuffer(i.FRAMEBUFFER, Tt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + yt, i.RENDERBUFFER, Tt.__webglColorRenderbuffer[yt]);
            let Zt = n.get(y[yt]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, Tt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + yt, i.TEXTURE_2D, Zt, 0);
          }
          e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Tt.__webglMultisampledFramebuffer);
        } else if (w.depthBuffer && w.resolveDepthBuffer === false && c) {
          let y = w.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
          i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [y]);
        }
      }
    }
    function tt(w) {
      return Math.min(s.maxSamples, w.samples);
    }
    function Mt(w) {
      let y = n.get(w);
      return w.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === true && y.__useRenderToTexture !== false;
    }
    function ct(w) {
      let y = a.render.frame;
      h.get(w) !== y && (h.set(w, y), w.update());
    }
    function Nt(w, y) {
      let O = w.colorSpace, Y = w.format, j = w.type;
      return w.isCompressedTexture === true || w.isVideoTexture === true || O !== Ms && O !== ii && (Qt.getTransfer(O) === oe ? (Y !== dn || j !== zn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", O)), y;
    }
    function vt(w) {
      return typeof HTMLImageElement < "u" && w instanceof HTMLImageElement ? (l.width = w.naturalWidth || w.width, l.height = w.naturalHeight || w.height) : typeof VideoFrame < "u" && w instanceof VideoFrame ? (l.width = w.displayWidth, l.height = w.displayHeight) : (l.width = w.width, l.height = w.height), l;
    }
    this.allocateTextureUnit = B, this.resetTextureUnits = H, this.setTexture2D = $, this.setTexture2DArray = W, this.setTexture3D = nt, this.setTextureCube = X, this.rebindTextures = Ot, this.setupRenderTarget = Kt, this.updateRenderTargetMipmap = Q, this.updateMultisampleRenderTarget = It, this.setupDepthRenderbuffer = zt, this.setupFrameBufferTexture = wt, this.useMultisampledRTT = Mt;
  }
  function c_(i, t) {
    function e(n, s = ii) {
      let r, a = Qt.getTransfer(s);
      if (n === zn) return i.UNSIGNED_BYTE;
      if (n === vl) return i.UNSIGNED_SHORT_4_4_4_4;
      if (n === yl) return i.UNSIGNED_SHORT_5_5_5_1;
      if (n === Eu) return i.UNSIGNED_INT_5_9_9_9_REV;
      if (n === Su) return i.BYTE;
      if (n === bu) return i.SHORT;
      if (n === Ks) return i.UNSIGNED_SHORT;
      if (n === xl) return i.INT;
      if (n === Ri) return i.UNSIGNED_INT;
      if (n === bn) return i.FLOAT;
      if (n === ur) return i.HALF_FLOAT;
      if (n === wu) return i.ALPHA;
      if (n === Tu) return i.RGB;
      if (n === dn) return i.RGBA;
      if (n === Au) return i.LUMINANCE;
      if (n === Ru) return i.LUMINANCE_ALPHA;
      if (n === os) return i.DEPTH_COMPONENT;
      if (n === ps) return i.DEPTH_STENCIL;
      if (n === Ml) return i.RED;
      if (n === Sl) return i.RED_INTEGER;
      if (n === Cu) return i.RG;
      if (n === bl) return i.RG_INTEGER;
      if (n === El) return i.RGBA_INTEGER;
      if (n === jr || n === ta || n === ea || n === na) if (a === oe) if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
        if (n === jr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (n === ta) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (n === ea) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (n === na) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
      else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (n === jr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === ta) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === ea) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === na) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
      if (n === nc || n === ic || n === sc || n === rc) if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === nc) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === ic) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === sc) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === rc) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
      if (n === ac || n === oc || n === cc) if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === ac || n === oc) return a === oe ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === cc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
      if (n === lc || n === hc || n === uc || n === dc || n === fc || n === pc || n === mc || n === gc || n === _c || n === xc || n === vc || n === yc || n === Mc || n === Sc) if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === lc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === hc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === uc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === dc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === fc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === pc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === mc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === gc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === _c) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === xc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === vc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === yc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Mc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === Sc) return a === oe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
      if (n === ia || n === bc || n === Ec) if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === ia) return a === oe ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === bc) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === Ec) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
      if (n === Iu || n === wc || n === Tc || n === Ac) if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === ia) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === wc) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Tc) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === Ac) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
      return n === fs ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
    }
    return { convert: e };
  }
  var Gc = class extends ke {
    constructor(t = []) {
      super(), this.isArrayCamera = true, this.cameras = t;
    }
  }, Me = class extends Pe {
    constructor() {
      super(), this.isGroup = true, this.type = "Group";
    }
  }, l_ = { type: "move" }, Ys = class {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }
    getHandSpace() {
      return this._hand === null && (this._hand = new Me(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
    }
    getTargetRaySpace() {
      return this._targetRay === null && (this._targetRay = new Me(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new T(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new T()), this._targetRay;
    }
    getGripSpace() {
      return this._grip === null && (this._grip = new Me(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new T(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new T()), this._grip;
    }
    dispatchEvent(t) {
      return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
    }
    connect(t) {
      if (t && t.hand) {
        let e = this._hand;
        if (e) for (let n of t.hand.values()) this._getHandJoint(e, n);
      }
      return this.dispatchEvent({ type: "connected", data: t }), this;
    }
    disconnect(t) {
      return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = false), this._grip !== null && (this._grip.visible = false), this._hand !== null && (this._hand.visible = false), this;
    }
    update(t, e, n) {
      let s = null, r = null, a = null, o = this._targetRay, c = this._grip, l = this._hand;
      if (t && e.session.visibilityState !== "visible-blurred") {
        if (l && t.hand) {
          a = true;
          for (let v of t.hand.values()) {
            let m = e.getJointPose(v, n), f = this._getHandJoint(l, v);
            m !== null && (f.matrix.fromArray(m.transform.matrix), f.matrix.decompose(f.position, f.rotation, f.scale), f.matrixWorldNeedsUpdate = true, f.jointRadius = m.radius), f.visible = m !== null;
          }
          let h = l.joints["index-finger-tip"], d = l.joints["thumb-tip"], u = h.position.distanceTo(d.position), p = 0.02, g = 5e-3;
          l.inputState.pinching && u > p + g ? (l.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this })) : !l.inputState.pinching && u <= p - g && (l.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
        } else c !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (c.matrix.fromArray(r.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = true, r.linearVelocity ? (c.hasLinearVelocity = true, c.linearVelocity.copy(r.linearVelocity)) : c.hasLinearVelocity = false, r.angularVelocity ? (c.hasAngularVelocity = true, c.angularVelocity.copy(r.angularVelocity)) : c.hasAngularVelocity = false));
        o !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = true, s.linearVelocity ? (o.hasLinearVelocity = true, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = false, s.angularVelocity ? (o.hasAngularVelocity = true, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = false, this.dispatchEvent(l_)));
      }
      return o !== null && (o.visible = s !== null), c !== null && (c.visible = r !== null), l !== null && (l.visible = a !== null), this;
    }
    _getHandJoint(t, e) {
      if (t.joints[e.jointName] === void 0) {
        let n = new Me();
        n.matrixAutoUpdate = false, n.visible = false, t.joints[e.jointName] = n, t.add(n);
      }
      return t.joints[e.jointName];
    }
  }, h_ = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, u_ = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`, Wc = class {
    constructor() {
      this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
    }
    init(t, e, n) {
      if (this.texture === null) {
        let s = new je(), r = t.properties.get(s);
        r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
      }
    }
    getMesh(t) {
      if (this.texture !== null && this.mesh === null) {
        let e = t.cameras[0].viewport, n = new nn({ vertexShader: h_, fragmentShader: u_, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: e.z }, depthHeight: { value: e.w } } });
        this.mesh = new Ce(new _s(20, 20), n);
      }
      return this.mesh;
    }
    reset() {
      this.texture = null, this.mesh = null;
    }
    getDepthTexture() {
      return this.texture;
    }
  }, Xc = class extends oi {
    constructor(t, e) {
      super();
      let n = this, s = null, r = 1, a = null, o = "local-floor", c = 1, l = null, h = null, d = null, u = null, p = null, g = null, v = new Wc(), m = e.getContextAttributes(), f = null, E = null, x = [], _ = [], D = new ht(), R = null, C = new ke();
      C.viewport = new ye();
      let L = new ke();
      L.viewport = new ye();
      let b = [C, L], M = new Gc(), I = null, H = null;
      this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(J) {
        let st = x[J];
        return st === void 0 && (st = new Ys(), x[J] = st), st.getTargetRaySpace();
      }, this.getControllerGrip = function(J) {
        let st = x[J];
        return st === void 0 && (st = new Ys(), x[J] = st), st.getGripSpace();
      }, this.getHand = function(J) {
        let st = x[J];
        return st === void 0 && (st = new Ys(), x[J] = st), st.getHandSpace();
      };
      function B(J) {
        let st = _.indexOf(J.inputSource);
        if (st === -1) return;
        let wt = x[st];
        wt !== void 0 && (wt.update(J.inputSource, J.frame, l || a), wt.dispatchEvent({ type: J.type, data: J.inputSource }));
      }
      function G() {
        s.removeEventListener("select", B), s.removeEventListener("selectstart", B), s.removeEventListener("selectend", B), s.removeEventListener("squeeze", B), s.removeEventListener("squeezestart", B), s.removeEventListener("squeezeend", B), s.removeEventListener("end", G), s.removeEventListener("inputsourceschange", $);
        for (let J = 0; J < x.length; J++) {
          let st = _[J];
          st !== null && (_[J] = null, x[J].disconnect(st));
        }
        I = null, H = null, v.reset(), t.setRenderTarget(f), p = null, u = null, d = null, s = null, E = null, ne.stop(), n.isPresenting = false, t.setPixelRatio(R), t.setSize(D.width, D.height, false), n.dispatchEvent({ type: "sessionend" });
      }
      this.setFramebufferScaleFactor = function(J) {
        r = J, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
      }, this.setReferenceSpaceType = function(J) {
        o = J, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }, this.getReferenceSpace = function() {
        return l || a;
      }, this.setReferenceSpace = function(J) {
        l = J;
      }, this.getBaseLayer = function() {
        return u !== null ? u : p;
      }, this.getBinding = function() {
        return d;
      }, this.getFrame = function() {
        return g;
      }, this.getSession = function() {
        return s;
      }, this.setSession = async function(J) {
        if (s = J, s !== null) {
          if (f = t.getRenderTarget(), s.addEventListener("select", B), s.addEventListener("selectstart", B), s.addEventListener("selectend", B), s.addEventListener("squeeze", B), s.addEventListener("squeezestart", B), s.addEventListener("squeezeend", B), s.addEventListener("end", G), s.addEventListener("inputsourceschange", $), m.xrCompatible !== true && await e.makeXRCompatible(), R = t.getPixelRatio(), t.getSize(D), s.renderState.layers === void 0) {
            let st = { antialias: m.antialias, alpha: true, depth: m.depth, stencil: m.stencil, framebufferScaleFactor: r };
            p = new XRWebGLLayer(s, e, st), s.updateRenderState({ baseLayer: p }), t.setPixelRatio(1), t.setSize(p.framebufferWidth, p.framebufferHeight, false), E = new kn(p.framebufferWidth, p.framebufferHeight, { format: dn, type: zn, colorSpace: t.outputColorSpace, stencilBuffer: m.stencil });
          } else {
            let st = null, wt = null, at = null;
            m.depth && (at = m.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, st = m.stencil ? ps : os, wt = m.stencil ? fs : Ri);
            let Lt = { colorFormat: e.RGBA8, depthFormat: at, scaleFactor: r };
            d = new XRWebGLBinding(s, e), u = d.createProjectionLayer(Lt), s.updateRenderState({ layers: [u] }), t.setPixelRatio(1), t.setSize(u.textureWidth, u.textureHeight, false), E = new kn(u.textureWidth, u.textureHeight, { format: dn, type: zn, depthTexture: new ga(u.textureWidth, u.textureHeight, wt, void 0, void 0, void 0, void 0, void 0, void 0, st), stencilBuffer: m.stencil, colorSpace: t.outputColorSpace, samples: m.antialias ? 4 : 0, resolveDepthBuffer: u.ignoreDepthValues === false });
          }
          E.isXRRenderTarget = true, this.setFoveation(c), l = null, a = await s.requestReferenceSpace(o), ne.setContext(s), ne.start(), n.isPresenting = true, n.dispatchEvent({ type: "sessionstart" });
        }
      }, this.getEnvironmentBlendMode = function() {
        if (s !== null) return s.environmentBlendMode;
      }, this.getDepthTexture = function() {
        return v.getDepthTexture();
      };
      function $(J) {
        for (let st = 0; st < J.removed.length; st++) {
          let wt = J.removed[st], at = _.indexOf(wt);
          at >= 0 && (_[at] = null, x[at].disconnect(wt));
        }
        for (let st = 0; st < J.added.length; st++) {
          let wt = J.added[st], at = _.indexOf(wt);
          if (at === -1) {
            for (let zt = 0; zt < x.length; zt++) if (zt >= _.length) {
              _.push(wt), at = zt;
              break;
            } else if (_[zt] === null) {
              _[zt] = wt, at = zt;
              break;
            }
            if (at === -1) break;
          }
          let Lt = x[at];
          Lt && Lt.connect(wt);
        }
      }
      let W = new T(), nt = new T();
      function X(J, st, wt) {
        W.setFromMatrixPosition(st.matrixWorld), nt.setFromMatrixPosition(wt.matrixWorld);
        let at = W.distanceTo(nt), Lt = st.projectionMatrix.elements, zt = wt.projectionMatrix.elements, Ot = Lt[14] / (Lt[10] - 1), Kt = Lt[14] / (Lt[10] + 1), Q = (Lt[9] + 1) / Lt[5], it = (Lt[9] - 1) / Lt[5], A = (Lt[8] - 1) / Lt[0], It = (zt[8] + 1) / zt[0], tt = Ot * A, Mt = Ot * It, ct = at / (-A + It), Nt = ct * -A;
        if (st.matrixWorld.decompose(J.position, J.quaternion, J.scale), J.translateX(Nt), J.translateZ(ct), J.matrixWorld.compose(J.position, J.quaternion, J.scale), J.matrixWorldInverse.copy(J.matrixWorld).invert(), Lt[10] === -1) J.projectionMatrix.copy(st.projectionMatrix), J.projectionMatrixInverse.copy(st.projectionMatrixInverse);
        else {
          let vt = Ot + ct, w = Kt + ct, y = tt - Nt, O = Mt + (at - Nt), Y = Q * Kt / w * vt, j = it * Kt / w * vt;
          J.projectionMatrix.makePerspective(y, O, Y, j, vt, w), J.projectionMatrixInverse.copy(J.projectionMatrix).invert();
        }
      }
      function lt(J, st) {
        st === null ? J.matrixWorld.copy(J.matrix) : J.matrixWorld.multiplyMatrices(st.matrixWorld, J.matrix), J.matrixWorldInverse.copy(J.matrixWorld).invert();
      }
      this.updateCamera = function(J) {
        if (s === null) return;
        let st = J.near, wt = J.far;
        v.texture !== null && (v.depthNear > 0 && (st = v.depthNear), v.depthFar > 0 && (wt = v.depthFar)), M.near = L.near = C.near = st, M.far = L.far = C.far = wt, (I !== M.near || H !== M.far) && (s.updateRenderState({ depthNear: M.near, depthFar: M.far }), I = M.near, H = M.far), C.layers.mask = J.layers.mask | 2, L.layers.mask = J.layers.mask | 4, M.layers.mask = C.layers.mask | L.layers.mask;
        let at = J.parent, Lt = M.cameras;
        lt(M, at);
        for (let zt = 0; zt < Lt.length; zt++) lt(Lt[zt], at);
        Lt.length === 2 ? X(M, C, L) : M.projectionMatrix.copy(C.projectionMatrix), xt(J, M, at);
      };
      function xt(J, st, wt) {
        wt === null ? J.matrix.copy(st.matrixWorld) : (J.matrix.copy(wt.matrixWorld), J.matrix.invert(), J.matrix.multiply(st.matrixWorld)), J.matrix.decompose(J.position, J.quaternion, J.scale), J.updateMatrixWorld(true), J.projectionMatrix.copy(st.projectionMatrix), J.projectionMatrixInverse.copy(st.projectionMatrixInverse), J.isPerspectiveCamera && (J.fov = Cc * 2 * Math.atan(1 / J.projectionMatrix.elements[5]), J.zoom = 1);
      }
      this.getCamera = function() {
        return M;
      }, this.getFoveation = function() {
        if (!(u === null && p === null)) return c;
      }, this.setFoveation = function(J) {
        c = J, u !== null && (u.fixedFoveation = J), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = J);
      }, this.hasDepthSensing = function() {
        return v.texture !== null;
      }, this.getDepthSensingMesh = function() {
        return v.getMesh(M);
      };
      let Et = null;
      function Vt(J, st) {
        if (h = st.getViewerPose(l || a), g = st, h !== null) {
          let wt = h.views;
          p !== null && (t.setRenderTargetFramebuffer(E, p.framebuffer), t.setRenderTarget(E));
          let at = false;
          wt.length !== M.cameras.length && (M.cameras.length = 0, at = true);
          for (let zt = 0; zt < wt.length; zt++) {
            let Ot = wt[zt], Kt = null;
            if (p !== null) Kt = p.getViewport(Ot);
            else {
              let it = d.getViewSubImage(u, Ot);
              Kt = it.viewport, zt === 0 && (t.setRenderTargetTextures(E, it.colorTexture, u.ignoreDepthValues ? void 0 : it.depthStencilTexture), t.setRenderTarget(E));
            }
            let Q = b[zt];
            Q === void 0 && (Q = new ke(), Q.layers.enable(zt), Q.viewport = new ye(), b[zt] = Q), Q.matrix.fromArray(Ot.transform.matrix), Q.matrix.decompose(Q.position, Q.quaternion, Q.scale), Q.projectionMatrix.fromArray(Ot.projectionMatrix), Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(), Q.viewport.set(Kt.x, Kt.y, Kt.width, Kt.height), zt === 0 && (M.matrix.copy(Q.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), at === true && M.cameras.push(Q);
          }
          let Lt = s.enabledFeatures;
          if (Lt && Lt.includes("depth-sensing")) {
            let zt = d.getDepthInformation(wt[0]);
            zt && zt.isValid && zt.texture && v.init(t, zt, s.renderState);
          }
        }
        for (let wt = 0; wt < x.length; wt++) {
          let at = _[wt], Lt = x[wt];
          at !== null && Lt !== void 0 && Lt.update(at, st, l || a);
        }
        Et && Et(J, st), st.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: st }), g = null;
      }
      let ne = new Fu();
      ne.setAnimationLoop(Vt), this.setAnimationLoop = function(J) {
        Et = J;
      }, this.dispose = function() {
      };
    }
  }, Mi = new En(), d_ = new ee();
  function f_(i, t) {
    function e(m, f) {
      m.matrixAutoUpdate === true && m.updateMatrix(), f.value.copy(m.matrix);
    }
    function n(m, f) {
      f.color.getRGB(m.fogColor.value, Nu(i)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
    }
    function s(m, f, E, x, _) {
      f.isMeshBasicMaterial || f.isMeshLambertMaterial ? r(m, f) : f.isMeshToonMaterial ? (r(m, f), d(m, f)) : f.isMeshPhongMaterial ? (r(m, f), h(m, f)) : f.isMeshStandardMaterial ? (r(m, f), u(m, f), f.isMeshPhysicalMaterial && p(m, f, _)) : f.isMeshMatcapMaterial ? (r(m, f), g(m, f)) : f.isMeshDepthMaterial ? r(m, f) : f.isMeshDistanceMaterial ? (r(m, f), v(m, f)) : f.isMeshNormalMaterial ? r(m, f) : f.isLineBasicMaterial ? (a(m, f), f.isLineDashedMaterial && o(m, f)) : f.isPointsMaterial ? c(m, f, E, x) : f.isSpriteMaterial ? l(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = false);
    }
    function r(m, f) {
      m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, e(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, e(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, e(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === Fe && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, e(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === Fe && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, e(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, e(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, e(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
      let E = t.get(f), x = E.envMap, _ = E.envMapRotation;
      x && (m.envMap.value = x, Mi.copy(_), Mi.x *= -1, Mi.y *= -1, Mi.z *= -1, x.isCubeTexture && x.isRenderTargetTexture === false && (Mi.y *= -1, Mi.z *= -1), m.envMapRotation.value.setFromMatrix4(d_.makeRotationFromEuler(Mi)), m.flipEnvMap.value = x.isCubeTexture && x.isRenderTargetTexture === false ? -1 : 1, m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, e(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, e(f.aoMap, m.aoMapTransform));
    }
    function a(m, f) {
      m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, e(f.map, m.mapTransform));
    }
    function o(m, f) {
      m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
    }
    function c(m, f, E, x) {
      m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * E, m.scale.value = x * 0.5, f.map && (m.map.value = f.map, e(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, e(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    }
    function l(m, f) {
      m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, e(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, e(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    }
    function h(m, f) {
      m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
    }
    function d(m, f) {
      f.gradientMap && (m.gradientMap.value = f.gradientMap);
    }
    function u(m, f) {
      m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, e(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, e(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
    }
    function p(m, f, E) {
      m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, e(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, e(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, e(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, e(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, e(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === Fe && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, e(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, e(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = E.texture, m.transmissionSamplerSize.value.set(E.width, E.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, e(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, e(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, e(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, e(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, e(f.specularIntensityMap, m.specularIntensityMapTransform));
    }
    function g(m, f) {
      f.matcap && (m.matcap.value = f.matcap);
    }
    function v(m, f) {
      let E = t.get(f).light;
      m.referencePosition.value.setFromMatrixPosition(E.matrixWorld), m.nearDistance.value = E.shadow.camera.near, m.farDistance.value = E.shadow.camera.far;
    }
    return { refreshFogUniforms: n, refreshMaterialUniforms: s };
  }
  function p_(i, t, e, n) {
    let s = {}, r = {}, a = [], o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
    function c(E, x) {
      let _ = x.program;
      n.uniformBlockBinding(E, _);
    }
    function l(E, x) {
      let _ = s[E.id];
      _ === void 0 && (g(E), _ = h(E), s[E.id] = _, E.addEventListener("dispose", m));
      let D = x.program;
      n.updateUBOMapping(E, D);
      let R = t.render.frame;
      r[E.id] !== R && (u(E), r[E.id] = R);
    }
    function h(E) {
      let x = d();
      E.__bindingPointIndex = x;
      let _ = i.createBuffer(), D = E.__size, R = E.usage;
      return i.bindBuffer(i.UNIFORM_BUFFER, _), i.bufferData(i.UNIFORM_BUFFER, D, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, x, _), _;
    }
    function d() {
      for (let E = 0; E < o; E++) if (a.indexOf(E) === -1) return a.push(E), E;
      return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
    }
    function u(E) {
      let x = s[E.id], _ = E.uniforms, D = E.__cache;
      i.bindBuffer(i.UNIFORM_BUFFER, x);
      for (let R = 0, C = _.length; R < C; R++) {
        let L = Array.isArray(_[R]) ? _[R] : [_[R]];
        for (let b = 0, M = L.length; b < M; b++) {
          let I = L[b];
          if (p(I, R, b, D) === true) {
            let H = I.__offset, B = Array.isArray(I.value) ? I.value : [I.value], G = 0;
            for (let $ = 0; $ < B.length; $++) {
              let W = B[$], nt = v(W);
              typeof W == "number" || typeof W == "boolean" ? (I.__data[0] = W, i.bufferSubData(i.UNIFORM_BUFFER, H + G, I.__data)) : W.isMatrix3 ? (I.__data[0] = W.elements[0], I.__data[1] = W.elements[1], I.__data[2] = W.elements[2], I.__data[3] = 0, I.__data[4] = W.elements[3], I.__data[5] = W.elements[4], I.__data[6] = W.elements[5], I.__data[7] = 0, I.__data[8] = W.elements[6], I.__data[9] = W.elements[7], I.__data[10] = W.elements[8], I.__data[11] = 0) : (W.toArray(I.__data, G), G += nt.storage / Float32Array.BYTES_PER_ELEMENT);
            }
            i.bufferSubData(i.UNIFORM_BUFFER, H, I.__data);
          }
        }
      }
      i.bindBuffer(i.UNIFORM_BUFFER, null);
    }
    function p(E, x, _, D) {
      let R = E.value, C = x + "_" + _;
      if (D[C] === void 0) return typeof R == "number" || typeof R == "boolean" ? D[C] = R : D[C] = R.clone(), true;
      {
        let L = D[C];
        if (typeof R == "number" || typeof R == "boolean") {
          if (L !== R) return D[C] = R, true;
        } else if (L.equals(R) === false) return L.copy(R), true;
      }
      return false;
    }
    function g(E) {
      let x = E.uniforms, _ = 0, D = 16;
      for (let C = 0, L = x.length; C < L; C++) {
        let b = Array.isArray(x[C]) ? x[C] : [x[C]];
        for (let M = 0, I = b.length; M < I; M++) {
          let H = b[M], B = Array.isArray(H.value) ? H.value : [H.value];
          for (let G = 0, $ = B.length; G < $; G++) {
            let W = B[G], nt = v(W), X = _ % D, lt = X % nt.boundary, xt = X + lt;
            _ += lt, xt !== 0 && D - xt < nt.storage && (_ += D - xt), H.__data = new Float32Array(nt.storage / Float32Array.BYTES_PER_ELEMENT), H.__offset = _, _ += nt.storage;
          }
        }
      }
      let R = _ % D;
      return R > 0 && (_ += D - R), E.__size = _, E.__cache = {}, this;
    }
    function v(E) {
      let x = { boundary: 0, storage: 0 };
      return typeof E == "number" || typeof E == "boolean" ? (x.boundary = 4, x.storage = 4) : E.isVector2 ? (x.boundary = 8, x.storage = 8) : E.isVector3 || E.isColor ? (x.boundary = 16, x.storage = 12) : E.isVector4 ? (x.boundary = 16, x.storage = 16) : E.isMatrix3 ? (x.boundary = 48, x.storage = 48) : E.isMatrix4 ? (x.boundary = 64, x.storage = 64) : E.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", E), x;
    }
    function m(E) {
      let x = E.target;
      x.removeEventListener("dispose", m);
      let _ = a.indexOf(x.__bindingPointIndex);
      a.splice(_, 1), i.deleteBuffer(s[x.id]), delete s[x.id], delete r[x.id];
    }
    function f() {
      for (let E in s) i.deleteBuffer(s[E]);
      a = [], s = {}, r = {};
    }
    return { bind: c, update: l, dispose: f };
  }
  var _a = class {
    constructor(t = {}) {
      let { canvas: e = xf(), context: n = null, depth: s = true, stencil: r = false, alpha: a = false, antialias: o = false, premultipliedAlpha: c = true, preserveDrawingBuffer: l = false, powerPreference: h = "default", failIfMajorPerformanceCaveat: d = false, reverseDepthBuffer: u = false } = t;
      this.isWebGLRenderer = true;
      let p;
      if (n !== null) {
        if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        p = n.getContextAttributes().alpha;
      } else p = a;
      let g = new Uint32Array(4), v = new Int32Array(4), m = null, f = null, E = [], x = [];
      this.domElement = e, this.debug = { checkShaderErrors: true, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this._outputColorSpace = Xe, this.toneMapping = ri, this.toneMappingExposure = 1;
      let _ = this, D = false, R = 0, C = 0, L = null, b = -1, M = null, I = new ye(), H = new ye(), B = null, G = new Ht(0), $ = 0, W = e.width, nt = e.height, X = 1, lt = null, xt = null, Et = new ye(0, 0, W, nt), Vt = new ye(0, 0, W, nt), ne = false, J = new js(), st = false, wt = false, at = new ee(), Lt = new ee(), zt = new T(), Ot = new ye(), Kt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true }, Q = false;
      function it() {
        return L === null ? X : 1;
      }
      let A = n;
      function It(S, N) {
        return e.getContext(S, N);
      }
      try {
        let S = { alpha: true, depth: s, stencil: r, antialias: o, premultipliedAlpha: c, preserveDrawingBuffer: l, powerPreference: h, failIfMajorPerformanceCaveat: d };
        if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${ml}`), e.addEventListener("webglcontextlost", K, false), e.addEventListener("webglcontextrestored", _t, false), e.addEventListener("webglcontextcreationerror", mt, false), A === null) {
          let N = "webgl2";
          if (A = It(N, S), A === null) throw It(N) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
        }
      } catch (S) {
        throw console.error("THREE.WebGLRenderer: " + S.message), S;
      }
      let tt, Mt, ct, Nt, vt, w, y, O, Y, j, Z, Tt, ft, yt, Zt, et, St, Ft, Bt, bt, Jt, qt, ce, U;
      function pt() {
        tt = new Ig(A), tt.init(), qt = new c_(A, tt), Mt = new Eg(A, tt, t, qt), ct = new r_(A, tt), Mt.reverseDepthBuffer && u && ct.buffers.depth.setReversed(true), Nt = new Dg(A), vt = new q0(), w = new o_(A, tt, ct, vt, Mt, qt, Nt), y = new Tg(_), O = new Cg(_), Y = new kf(A), ce = new Sg(A, Y), j = new Pg(A, Y, Nt, ce), Z = new Ng(A, j, Y, Nt), Bt = new Ug(A, Mt, w), et = new wg(vt), Tt = new X0(_, y, O, tt, Mt, ce, et), ft = new f_(_, vt), yt = new Z0(), Zt = new t_(tt), Ft = new Mg(_, y, O, ct, Z, p, c), St = new i_(_, Z, Mt), U = new p_(A, Nt, Mt, ct), bt = new bg(A, tt, Nt), Jt = new Lg(A, tt, Nt), Nt.programs = Tt.programs, _.capabilities = Mt, _.extensions = tt, _.properties = vt, _.renderLists = yt, _.shadowMap = St, _.state = ct, _.info = Nt;
      }
      pt();
      let q = new Xc(_, A);
      this.xr = q, this.getContext = function() {
        return A;
      }, this.getContextAttributes = function() {
        return A.getContextAttributes();
      }, this.forceContextLoss = function() {
        let S = tt.get("WEBGL_lose_context");
        S && S.loseContext();
      }, this.forceContextRestore = function() {
        let S = tt.get("WEBGL_lose_context");
        S && S.restoreContext();
      }, this.getPixelRatio = function() {
        return X;
      }, this.setPixelRatio = function(S) {
        S !== void 0 && (X = S, this.setSize(W, nt, false));
      }, this.getSize = function(S) {
        return S.set(W, nt);
      }, this.setSize = function(S, N, z = true) {
        if (q.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        W = S, nt = N, e.width = Math.floor(S * X), e.height = Math.floor(N * X), z === true && (e.style.width = S + "px", e.style.height = N + "px"), this.setViewport(0, 0, S, N);
      }, this.getDrawingBufferSize = function(S) {
        return S.set(W * X, nt * X).floor();
      }, this.setDrawingBufferSize = function(S, N, z) {
        W = S, nt = N, X = z, e.width = Math.floor(S * z), e.height = Math.floor(N * z), this.setViewport(0, 0, S, N);
      }, this.getCurrentViewport = function(S) {
        return S.copy(I);
      }, this.getViewport = function(S) {
        return S.copy(Et);
      }, this.setViewport = function(S, N, z, k) {
        S.isVector4 ? Et.set(S.x, S.y, S.z, S.w) : Et.set(S, N, z, k), ct.viewport(I.copy(Et).multiplyScalar(X).round());
      }, this.getScissor = function(S) {
        return S.copy(Vt);
      }, this.setScissor = function(S, N, z, k) {
        S.isVector4 ? Vt.set(S.x, S.y, S.z, S.w) : Vt.set(S, N, z, k), ct.scissor(H.copy(Vt).multiplyScalar(X).round());
      }, this.getScissorTest = function() {
        return ne;
      }, this.setScissorTest = function(S) {
        ct.setScissorTest(ne = S);
      }, this.setOpaqueSort = function(S) {
        lt = S;
      }, this.setTransparentSort = function(S) {
        xt = S;
      }, this.getClearColor = function(S) {
        return S.copy(Ft.getClearColor());
      }, this.setClearColor = function() {
        Ft.setClearColor.apply(Ft, arguments);
      }, this.getClearAlpha = function() {
        return Ft.getClearAlpha();
      }, this.setClearAlpha = function() {
        Ft.setClearAlpha.apply(Ft, arguments);
      }, this.clear = function(S = true, N = true, z = true) {
        let k = 0;
        if (S) {
          let F = false;
          if (L !== null) {
            let rt = L.texture.format;
            F = rt === El || rt === bl || rt === Sl;
          }
          if (F) {
            let rt = L.texture.type, gt = rt === zn || rt === Ri || rt === Ks || rt === fs || rt === vl || rt === yl, At = Ft.getClearColor(), Rt = Ft.getClearAlpha(), kt = At.r, Wt = At.g, Ct = At.b;
            gt ? (g[0] = kt, g[1] = Wt, g[2] = Ct, g[3] = Rt, A.clearBufferuiv(A.COLOR, 0, g)) : (v[0] = kt, v[1] = Wt, v[2] = Ct, v[3] = Rt, A.clearBufferiv(A.COLOR, 0, v));
          } else k |= A.COLOR_BUFFER_BIT;
        }
        N && (k |= A.DEPTH_BUFFER_BIT), z && (k |= A.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), A.clear(k);
      }, this.clearColor = function() {
        this.clear(true, false, false);
      }, this.clearDepth = function() {
        this.clear(false, true, false);
      }, this.clearStencil = function() {
        this.clear(false, false, true);
      }, this.dispose = function() {
        e.removeEventListener("webglcontextlost", K, false), e.removeEventListener("webglcontextrestored", _t, false), e.removeEventListener("webglcontextcreationerror", mt, false), yt.dispose(), Zt.dispose(), vt.dispose(), y.dispose(), O.dispose(), Z.dispose(), ce.dispose(), U.dispose(), Tt.dispose(), q.dispose(), q.removeEventListener("sessionstart", $l), q.removeEventListener("sessionend", Kl), mi.stop();
      };
      function K(S) {
        S.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), D = true;
      }
      function _t() {
        console.log("THREE.WebGLRenderer: Context Restored."), D = false;
        let S = Nt.autoReset, N = St.enabled, z = St.autoUpdate, k = St.needsUpdate, F = St.type;
        pt(), Nt.autoReset = S, St.enabled = N, St.autoUpdate = z, St.needsUpdate = k, St.type = F;
      }
      function mt(S) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage);
      }
      function Gt(S) {
        let N = S.target;
        N.removeEventListener("dispose", Gt), ve(N);
      }
      function ve(S) {
        Le(S), vt.remove(S);
      }
      function Le(S) {
        let N = vt.get(S).programs;
        N !== void 0 && (N.forEach(function(z) {
          Tt.releaseProgram(z);
        }), S.isShaderMaterial && Tt.releaseShaderCache(S));
      }
      this.renderBufferDirect = function(S, N, z, k, F, rt) {
        N === null && (N = Kt);
        let gt = F.isMesh && F.matrixWorld.determinant() < 0, At = Rd(S, N, z, k, F);
        ct.setMaterial(k, gt);
        let Rt = z.index, kt = 1;
        if (k.wireframe === true) {
          if (Rt = j.getWireframeAttribute(z), Rt === void 0) return;
          kt = 2;
        }
        let Wt = z.drawRange, Ct = z.attributes.position, jt = Wt.start * kt, le = (Wt.start + Wt.count) * kt;
        rt !== null && (jt = Math.max(jt, rt.start * kt), le = Math.min(le, (rt.start + rt.count) * kt)), Rt !== null ? (jt = Math.max(jt, 0), le = Math.min(le, Rt.count)) : Ct != null && (jt = Math.max(jt, 0), le = Math.min(le, Ct.count));
        let ue = le - jt;
        if (ue < 0 || ue === 1 / 0) return;
        ce.setup(F, k, At, z, Rt);
        let Ge, ie = bt;
        if (Rt !== null && (Ge = Y.get(Rt), ie = Jt, ie.setIndex(Ge)), F.isMesh) k.wireframe === true ? (ct.setLineWidth(k.wireframeLinewidth * it()), ie.setMode(A.LINES)) : ie.setMode(A.TRIANGLES);
        else if (F.isLine) {
          let Pt = k.linewidth;
          Pt === void 0 && (Pt = 1), ct.setLineWidth(Pt * it()), F.isLineSegments ? ie.setMode(A.LINES) : F.isLineLoop ? ie.setMode(A.LINE_LOOP) : ie.setMode(A.LINE_STRIP);
        } else F.isPoints ? ie.setMode(A.POINTS) : F.isSprite && ie.setMode(A.TRIANGLES);
        if (F.isBatchedMesh) if (F._multiDrawInstances !== null) ie.renderMultiDrawInstances(F._multiDrawStarts, F._multiDrawCounts, F._multiDrawCount, F._multiDrawInstances);
        else if (tt.get("WEBGL_multi_draw")) ie.renderMultiDraw(F._multiDrawStarts, F._multiDrawCounts, F._multiDrawCount);
        else {
          let Pt = F._multiDrawStarts, Cn = F._multiDrawCounts, se = F._multiDrawCount, on = Rt ? Y.get(Rt).bytesPerElement : 1, Hi = vt.get(k).currentProgram.getUniforms();
          for (let Je = 0; Je < se; Je++) Hi.setValue(A, "_gl_DrawID", Je), ie.render(Pt[Je] / on, Cn[Je]);
        }
        else if (F.isInstancedMesh) ie.renderInstances(jt, ue, F.count);
        else if (z.isInstancedBufferGeometry) {
          let Pt = z._maxInstanceCount !== void 0 ? z._maxInstanceCount : 1 / 0, Cn = Math.min(z.instanceCount, Pt);
          ie.renderInstances(jt, ue, Cn);
        } else ie.render(jt, ue);
      };
      function re(S, N, z) {
        S.transparent === true && S.side === un && S.forceSinglePass === false ? (S.side = Fe, S.needsUpdate = true, Sr(S, N, z), S.side = ai, S.needsUpdate = true, Sr(S, N, z), S.side = un) : Sr(S, N, z);
      }
      this.compile = function(S, N, z = null) {
        z === null && (z = S), f = Zt.get(z), f.init(N), x.push(f), z.traverseVisible(function(F) {
          F.isLight && F.layers.test(N.layers) && (f.pushLight(F), F.castShadow && f.pushShadow(F));
        }), S !== z && S.traverseVisible(function(F) {
          F.isLight && F.layers.test(N.layers) && (f.pushLight(F), F.castShadow && f.pushShadow(F));
        }), f.setupLights();
        let k = /* @__PURE__ */ new Set();
        return S.traverse(function(F) {
          if (!(F.isMesh || F.isPoints || F.isLine || F.isSprite)) return;
          let rt = F.material;
          if (rt) if (Array.isArray(rt)) for (let gt = 0; gt < rt.length; gt++) {
            let At = rt[gt];
            re(At, z, F), k.add(At);
          }
          else re(rt, z, F), k.add(rt);
        }), x.pop(), f = null, k;
      }, this.compileAsync = function(S, N, z = null) {
        let k = this.compile(S, N, z);
        return new Promise((F) => {
          function rt() {
            if (k.forEach(function(gt) {
              vt.get(gt).currentProgram.isReady() && k.delete(gt);
            }), k.size === 0) {
              F(S);
              return;
            }
            setTimeout(rt, 10);
          }
          tt.get("KHR_parallel_shader_compile") !== null ? rt() : setTimeout(rt, 10);
        });
      };
      let an = null;
      function Rn(S) {
        an && an(S);
      }
      function $l() {
        mi.stop();
      }
      function Kl() {
        mi.start();
      }
      let mi = new Fu();
      mi.setAnimationLoop(Rn), typeof self < "u" && mi.setContext(self), this.setAnimationLoop = function(S) {
        an = S, q.setAnimationLoop(S), S === null ? mi.stop() : mi.start();
      }, q.addEventListener("sessionstart", $l), q.addEventListener("sessionend", Kl), this.render = function(S, N) {
        if (N !== void 0 && N.isCamera !== true) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return;
        }
        if (D === true) return;
        if (S.matrixWorldAutoUpdate === true && S.updateMatrixWorld(), N.parent === null && N.matrixWorldAutoUpdate === true && N.updateMatrixWorld(), q.enabled === true && q.isPresenting === true && (q.cameraAutoUpdate === true && q.updateCamera(N), N = q.getCamera()), S.isScene === true && S.onBeforeRender(_, S, N, L), f = Zt.get(S, x.length), f.init(N), x.push(f), Lt.multiplyMatrices(N.projectionMatrix, N.matrixWorldInverse), J.setFromProjectionMatrix(Lt), wt = this.localClippingEnabled, st = et.init(this.clippingPlanes, wt), m = yt.get(S, E.length), m.init(), E.push(m), q.enabled === true && q.isPresenting === true) {
          let rt = _.xr.getDepthSensingMesh();
          rt !== null && ao(rt, N, -1 / 0, _.sortObjects);
        }
        ao(S, N, 0, _.sortObjects), m.finish(), _.sortObjects === true && m.sort(lt, xt), Q = q.enabled === false || q.isPresenting === false || q.hasDepthSensing() === false, Q && Ft.addToRenderList(m, S), this.info.render.frame++, st === true && et.beginShadows();
        let z = f.state.shadowsArray;
        St.render(z, S, N), st === true && et.endShadows(), this.info.autoReset === true && this.info.reset();
        let k = m.opaque, F = m.transmissive;
        if (f.setupLights(), N.isArrayCamera) {
          let rt = N.cameras;
          if (F.length > 0) for (let gt = 0, At = rt.length; gt < At; gt++) {
            let Rt = rt[gt];
            jl(k, F, S, Rt);
          }
          Q && Ft.render(S);
          for (let gt = 0, At = rt.length; gt < At; gt++) {
            let Rt = rt[gt];
            Ql(m, S, Rt, Rt.viewport);
          }
        } else F.length > 0 && jl(k, F, S, N), Q && Ft.render(S), Ql(m, S, N);
        L !== null && (w.updateMultisampleRenderTarget(L), w.updateRenderTargetMipmap(L)), S.isScene === true && S.onAfterRender(_, S, N), ce.resetDefaultState(), b = -1, M = null, x.pop(), x.length > 0 ? (f = x[x.length - 1], st === true && et.setGlobalState(_.clippingPlanes, f.state.camera)) : f = null, E.pop(), E.length > 0 ? m = E[E.length - 1] : m = null;
      };
      function ao(S, N, z, k) {
        if (S.visible === false) return;
        if (S.layers.test(N.layers)) {
          if (S.isGroup) z = S.renderOrder;
          else if (S.isLOD) S.autoUpdate === true && S.update(N);
          else if (S.isLight) f.pushLight(S), S.castShadow && f.pushShadow(S);
          else if (S.isSprite) {
            if (!S.frustumCulled || J.intersectsSprite(S)) {
              k && Ot.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Lt);
              let gt = Z.update(S), At = S.material;
              At.visible && m.push(S, gt, At, z, Ot.z, null);
            }
          } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || J.intersectsObject(S))) {
            let gt = Z.update(S), At = S.material;
            if (k && (S.boundingSphere !== void 0 ? (S.boundingSphere === null && S.computeBoundingSphere(), Ot.copy(S.boundingSphere.center)) : (gt.boundingSphere === null && gt.computeBoundingSphere(), Ot.copy(gt.boundingSphere.center)), Ot.applyMatrix4(S.matrixWorld).applyMatrix4(Lt)), Array.isArray(At)) {
              let Rt = gt.groups;
              for (let kt = 0, Wt = Rt.length; kt < Wt; kt++) {
                let Ct = Rt[kt], jt = At[Ct.materialIndex];
                jt && jt.visible && m.push(S, gt, jt, z, Ot.z, Ct);
              }
            } else At.visible && m.push(S, gt, At, z, Ot.z, null);
          }
        }
        let rt = S.children;
        for (let gt = 0, At = rt.length; gt < At; gt++) ao(rt[gt], N, z, k);
      }
      function Ql(S, N, z, k) {
        let F = S.opaque, rt = S.transmissive, gt = S.transparent;
        f.setupLightsView(z), st === true && et.setGlobalState(_.clippingPlanes, z), k && ct.viewport(I.copy(k)), F.length > 0 && Mr(F, N, z), rt.length > 0 && Mr(rt, N, z), gt.length > 0 && Mr(gt, N, z), ct.buffers.depth.setTest(true), ct.buffers.depth.setMask(true), ct.buffers.color.setMask(true), ct.setPolygonOffset(false);
      }
      function jl(S, N, z, k) {
        if ((z.isScene === true ? z.overrideMaterial : null) !== null) return;
        f.state.transmissionRenderTarget[k.id] === void 0 && (f.state.transmissionRenderTarget[k.id] = new kn(1, 1, { generateMipmaps: true, type: tt.has("EXT_color_buffer_half_float") || tt.has("EXT_color_buffer_float") ? ur : zn, minFilter: Ai, samples: 4, stencilBuffer: r, resolveDepthBuffer: false, resolveStencilBuffer: false, colorSpace: Qt.workingColorSpace }));
        let rt = f.state.transmissionRenderTarget[k.id], gt = k.viewport || I;
        rt.setSize(gt.z, gt.w);
        let At = _.getRenderTarget();
        _.setRenderTarget(rt), _.getClearColor(G), $ = _.getClearAlpha(), $ < 1 && _.setClearColor(16777215, 0.5), _.clear(), Q && Ft.render(z);
        let Rt = _.toneMapping;
        _.toneMapping = ri;
        let kt = k.viewport;
        if (k.viewport !== void 0 && (k.viewport = void 0), f.setupLightsView(k), st === true && et.setGlobalState(_.clippingPlanes, k), Mr(S, z, k), w.updateMultisampleRenderTarget(rt), w.updateRenderTargetMipmap(rt), tt.has("WEBGL_multisampled_render_to_texture") === false) {
          let Wt = false;
          for (let Ct = 0, jt = N.length; Ct < jt; Ct++) {
            let le = N[Ct], ue = le.object, Ge = le.geometry, ie = le.material, Pt = le.group;
            if (ie.side === un && ue.layers.test(k.layers)) {
              let Cn = ie.side;
              ie.side = Fe, ie.needsUpdate = true, th(ue, z, k, Ge, ie, Pt), ie.side = Cn, ie.needsUpdate = true, Wt = true;
            }
          }
          Wt === true && (w.updateMultisampleRenderTarget(rt), w.updateRenderTargetMipmap(rt));
        }
        _.setRenderTarget(At), _.setClearColor(G, $), kt !== void 0 && (k.viewport = kt), _.toneMapping = Rt;
      }
      function Mr(S, N, z) {
        let k = N.isScene === true ? N.overrideMaterial : null;
        for (let F = 0, rt = S.length; F < rt; F++) {
          let gt = S[F], At = gt.object, Rt = gt.geometry, kt = k === null ? gt.material : k, Wt = gt.group;
          At.layers.test(z.layers) && th(At, N, z, Rt, kt, Wt);
        }
      }
      function th(S, N, z, k, F, rt) {
        S.onBeforeRender(_, N, z, k, F, rt), S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), F.onBeforeRender(_, N, z, k, S, rt), F.transparent === true && F.side === un && F.forceSinglePass === false ? (F.side = Fe, F.needsUpdate = true, _.renderBufferDirect(z, N, k, F, S, rt), F.side = ai, F.needsUpdate = true, _.renderBufferDirect(z, N, k, F, S, rt), F.side = un) : _.renderBufferDirect(z, N, k, F, S, rt), S.onAfterRender(_, N, z, k, F, rt);
      }
      function Sr(S, N, z) {
        N.isScene !== true && (N = Kt);
        let k = vt.get(S), F = f.state.lights, rt = f.state.shadowsArray, gt = F.state.version, At = Tt.getParameters(S, F.state, rt, N, z), Rt = Tt.getProgramCacheKey(At), kt = k.programs;
        k.environment = S.isMeshStandardMaterial ? N.environment : null, k.fog = N.fog, k.envMap = (S.isMeshStandardMaterial ? O : y).get(S.envMap || k.environment), k.envMapRotation = k.environment !== null && S.envMap === null ? N.environmentRotation : S.envMapRotation, kt === void 0 && (S.addEventListener("dispose", Gt), kt = /* @__PURE__ */ new Map(), k.programs = kt);
        let Wt = kt.get(Rt);
        if (Wt !== void 0) {
          if (k.currentProgram === Wt && k.lightsStateVersion === gt) return nh(S, At), Wt;
        } else At.uniforms = Tt.getUniforms(S), S.onBeforeCompile(At, _), Wt = Tt.acquireProgram(At, Rt), kt.set(Rt, Wt), k.uniforms = At.uniforms;
        let Ct = k.uniforms;
        return (!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === true) && (Ct.clippingPlanes = et.uniform), nh(S, At), k.needsLights = Id(S), k.lightsStateVersion = gt, k.needsLights && (Ct.ambientLightColor.value = F.state.ambient, Ct.lightProbe.value = F.state.probe, Ct.directionalLights.value = F.state.directional, Ct.directionalLightShadows.value = F.state.directionalShadow, Ct.spotLights.value = F.state.spot, Ct.spotLightShadows.value = F.state.spotShadow, Ct.rectAreaLights.value = F.state.rectArea, Ct.ltc_1.value = F.state.rectAreaLTC1, Ct.ltc_2.value = F.state.rectAreaLTC2, Ct.pointLights.value = F.state.point, Ct.pointLightShadows.value = F.state.pointShadow, Ct.hemisphereLights.value = F.state.hemi, Ct.directionalShadowMap.value = F.state.directionalShadowMap, Ct.directionalShadowMatrix.value = F.state.directionalShadowMatrix, Ct.spotShadowMap.value = F.state.spotShadowMap, Ct.spotLightMatrix.value = F.state.spotLightMatrix, Ct.spotLightMap.value = F.state.spotLightMap, Ct.pointShadowMap.value = F.state.pointShadowMap, Ct.pointShadowMatrix.value = F.state.pointShadowMatrix), k.currentProgram = Wt, k.uniformsList = null, Wt;
      }
      function eh(S) {
        if (S.uniformsList === null) {
          let N = S.currentProgram.getUniforms();
          S.uniformsList = ls.seqWithValue(N.seq, S.uniforms);
        }
        return S.uniformsList;
      }
      function nh(S, N) {
        let z = vt.get(S);
        z.outputColorSpace = N.outputColorSpace, z.batching = N.batching, z.batchingColor = N.batchingColor, z.instancing = N.instancing, z.instancingColor = N.instancingColor, z.instancingMorph = N.instancingMorph, z.skinning = N.skinning, z.morphTargets = N.morphTargets, z.morphNormals = N.morphNormals, z.morphColors = N.morphColors, z.morphTargetsCount = N.morphTargetsCount, z.numClippingPlanes = N.numClippingPlanes, z.numIntersection = N.numClipIntersection, z.vertexAlphas = N.vertexAlphas, z.vertexTangents = N.vertexTangents, z.toneMapping = N.toneMapping;
      }
      function Rd(S, N, z, k, F) {
        N.isScene !== true && (N = Kt), w.resetTextureUnits();
        let rt = N.fog, gt = k.isMeshStandardMaterial ? N.environment : null, At = L === null ? _.outputColorSpace : L.isXRRenderTarget === true ? L.texture.colorSpace : Ms, Rt = (k.isMeshStandardMaterial ? O : y).get(k.envMap || gt), kt = k.vertexColors === true && !!z.attributes.color && z.attributes.color.itemSize === 4, Wt = !!z.attributes.tangent && (!!k.normalMap || k.anisotropy > 0), Ct = !!z.morphAttributes.position, jt = !!z.morphAttributes.normal, le = !!z.morphAttributes.color, ue = ri;
        k.toneMapped && (L === null || L.isXRRenderTarget === true) && (ue = _.toneMapping);
        let Ge = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, ie = Ge !== void 0 ? Ge.length : 0, Pt = vt.get(k), Cn = f.state.lights;
        if (st === true && (wt === true || S !== M)) {
          let tn = S === M && k.id === b;
          et.setState(k, S, tn);
        }
        let se = false;
        k.version === Pt.__version ? (Pt.needsLights && Pt.lightsStateVersion !== Cn.state.version || Pt.outputColorSpace !== At || F.isBatchedMesh && Pt.batching === false || !F.isBatchedMesh && Pt.batching === true || F.isBatchedMesh && Pt.batchingColor === true && F.colorTexture === null || F.isBatchedMesh && Pt.batchingColor === false && F.colorTexture !== null || F.isInstancedMesh && Pt.instancing === false || !F.isInstancedMesh && Pt.instancing === true || F.isSkinnedMesh && Pt.skinning === false || !F.isSkinnedMesh && Pt.skinning === true || F.isInstancedMesh && Pt.instancingColor === true && F.instanceColor === null || F.isInstancedMesh && Pt.instancingColor === false && F.instanceColor !== null || F.isInstancedMesh && Pt.instancingMorph === true && F.morphTexture === null || F.isInstancedMesh && Pt.instancingMorph === false && F.morphTexture !== null || Pt.envMap !== Rt || k.fog === true && Pt.fog !== rt || Pt.numClippingPlanes !== void 0 && (Pt.numClippingPlanes !== et.numPlanes || Pt.numIntersection !== et.numIntersection) || Pt.vertexAlphas !== kt || Pt.vertexTangents !== Wt || Pt.morphTargets !== Ct || Pt.morphNormals !== jt || Pt.morphColors !== le || Pt.toneMapping !== ue || Pt.morphTargetsCount !== ie) && (se = true) : (se = true, Pt.__version = k.version);
        let on = Pt.currentProgram;
        se === true && (on = Sr(k, N, F));
        let Hi = false, Je = false, Ns = false, de = on.getUniforms(), yn = Pt.uniforms;
        if (ct.useProgram(on.program) && (Hi = true, Je = true, Ns = true), k.id !== b && (b = k.id, Je = true), Hi || M !== S) {
          ct.buffers.depth.getReversed() ? (at.copy(S.projectionMatrix), yf(at), Mf(at), de.setValue(A, "projectionMatrix", at)) : de.setValue(A, "projectionMatrix", S.projectionMatrix), de.setValue(A, "viewMatrix", S.matrixWorldInverse);
          let Jn = de.map.cameraPosition;
          Jn !== void 0 && Jn.setValue(A, zt.setFromMatrixPosition(S.matrixWorld)), Mt.logarithmicDepthBuffer && de.setValue(A, "logDepthBufFC", 2 / (Math.log(S.far + 1) / Math.LN2)), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && de.setValue(A, "isOrthographic", S.isOrthographicCamera === true), M !== S && (M = S, Je = true, Ns = true);
        }
        if (F.isSkinnedMesh) {
          de.setOptional(A, F, "bindMatrix"), de.setOptional(A, F, "bindMatrixInverse");
          let tn = F.skeleton;
          tn && (tn.boneTexture === null && tn.computeBoneTexture(), de.setValue(A, "boneTexture", tn.boneTexture, w));
        }
        F.isBatchedMesh && (de.setOptional(A, F, "batchingTexture"), de.setValue(A, "batchingTexture", F._matricesTexture, w), de.setOptional(A, F, "batchingIdTexture"), de.setValue(A, "batchingIdTexture", F._indirectTexture, w), de.setOptional(A, F, "batchingColorTexture"), F._colorsTexture !== null && de.setValue(A, "batchingColorTexture", F._colorsTexture, w));
        let Fs = z.morphAttributes;
        if ((Fs.position !== void 0 || Fs.normal !== void 0 || Fs.color !== void 0) && Bt.update(F, z, on), (Je || Pt.receiveShadow !== F.receiveShadow) && (Pt.receiveShadow = F.receiveShadow, de.setValue(A, "receiveShadow", F.receiveShadow)), k.isMeshGouraudMaterial && k.envMap !== null && (yn.envMap.value = Rt, yn.flipEnvMap.value = Rt.isCubeTexture && Rt.isRenderTargetTexture === false ? -1 : 1), k.isMeshStandardMaterial && k.envMap === null && N.environment !== null && (yn.envMapIntensity.value = N.environmentIntensity), Je && (de.setValue(A, "toneMappingExposure", _.toneMappingExposure), Pt.needsLights && Cd(yn, Ns), rt && k.fog === true && ft.refreshFogUniforms(yn, rt), ft.refreshMaterialUniforms(yn, k, X, nt, f.state.transmissionRenderTarget[S.id]), ls.upload(A, eh(Pt), yn, w)), k.isShaderMaterial && k.uniformsNeedUpdate === true && (ls.upload(A, eh(Pt), yn, w), k.uniformsNeedUpdate = false), k.isSpriteMaterial && de.setValue(A, "center", F.center), de.setValue(A, "modelViewMatrix", F.modelViewMatrix), de.setValue(A, "normalMatrix", F.normalMatrix), de.setValue(A, "modelMatrix", F.matrixWorld), k.isShaderMaterial || k.isRawShaderMaterial) {
          let tn = k.uniformsGroups;
          for (let Jn = 0, $n = tn.length; Jn < $n; Jn++) {
            let ih = tn[Jn];
            U.update(ih, on), U.bind(ih, on);
          }
        }
        return on;
      }
      function Cd(S, N) {
        S.ambientLightColor.needsUpdate = N, S.lightProbe.needsUpdate = N, S.directionalLights.needsUpdate = N, S.directionalLightShadows.needsUpdate = N, S.pointLights.needsUpdate = N, S.pointLightShadows.needsUpdate = N, S.spotLights.needsUpdate = N, S.spotLightShadows.needsUpdate = N, S.rectAreaLights.needsUpdate = N, S.hemisphereLights.needsUpdate = N;
      }
      function Id(S) {
        return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === true;
      }
      this.getActiveCubeFace = function() {
        return R;
      }, this.getActiveMipmapLevel = function() {
        return C;
      }, this.getRenderTarget = function() {
        return L;
      }, this.setRenderTargetTextures = function(S, N, z) {
        vt.get(S.texture).__webglTexture = N, vt.get(S.depthTexture).__webglTexture = z;
        let k = vt.get(S);
        k.__hasExternalTextures = true, k.__autoAllocateDepthBuffer = z === void 0, k.__autoAllocateDepthBuffer || tt.has("WEBGL_multisampled_render_to_texture") === true && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), k.__useRenderToTexture = false);
      }, this.setRenderTargetFramebuffer = function(S, N) {
        let z = vt.get(S);
        z.__webglFramebuffer = N, z.__useDefaultFramebuffer = N === void 0;
      }, this.setRenderTarget = function(S, N = 0, z = 0) {
        L = S, R = N, C = z;
        let k = true, F = null, rt = false, gt = false;
        if (S) {
          let Rt = vt.get(S);
          if (Rt.__useDefaultFramebuffer !== void 0) ct.bindFramebuffer(A.FRAMEBUFFER, null), k = false;
          else if (Rt.__webglFramebuffer === void 0) w.setupRenderTarget(S);
          else if (Rt.__hasExternalTextures) w.rebindTextures(S, vt.get(S.texture).__webglTexture, vt.get(S.depthTexture).__webglTexture);
          else if (S.depthBuffer) {
            let Ct = S.depthTexture;
            if (Rt.__boundDepthTexture !== Ct) {
              if (Ct !== null && vt.has(Ct) && (S.width !== Ct.image.width || S.height !== Ct.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
              w.setupDepthRenderbuffer(S);
            }
          }
          let kt = S.texture;
          (kt.isData3DTexture || kt.isDataArrayTexture || kt.isCompressedArrayTexture) && (gt = true);
          let Wt = vt.get(S).__webglFramebuffer;
          S.isWebGLCubeRenderTarget ? (Array.isArray(Wt[N]) ? F = Wt[N][z] : F = Wt[N], rt = true) : S.samples > 0 && w.useMultisampledRTT(S) === false ? F = vt.get(S).__webglMultisampledFramebuffer : Array.isArray(Wt) ? F = Wt[z] : F = Wt, I.copy(S.viewport), H.copy(S.scissor), B = S.scissorTest;
        } else I.copy(Et).multiplyScalar(X).floor(), H.copy(Vt).multiplyScalar(X).floor(), B = ne;
        if (ct.bindFramebuffer(A.FRAMEBUFFER, F) && k && ct.drawBuffers(S, F), ct.viewport(I), ct.scissor(H), ct.setScissorTest(B), rt) {
          let Rt = vt.get(S.texture);
          A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_CUBE_MAP_POSITIVE_X + N, Rt.__webglTexture, z);
        } else if (gt) {
          let Rt = vt.get(S.texture), kt = N || 0;
          A.framebufferTextureLayer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, Rt.__webglTexture, z || 0, kt);
        }
        b = -1;
      }, this.readRenderTargetPixels = function(S, N, z, k, F, rt, gt) {
        if (!(S && S.isWebGLRenderTarget)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          return;
        }
        let At = vt.get(S).__webglFramebuffer;
        if (S.isWebGLCubeRenderTarget && gt !== void 0 && (At = At[gt]), At) {
          ct.bindFramebuffer(A.FRAMEBUFFER, At);
          try {
            let Rt = S.texture, kt = Rt.format, Wt = Rt.type;
            if (!Mt.textureFormatReadable(kt)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              return;
            }
            if (!Mt.textureTypeReadable(Wt)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
              return;
            }
            N >= 0 && N <= S.width - k && z >= 0 && z <= S.height - F && A.readPixels(N, z, k, F, qt.convert(kt), qt.convert(Wt), rt);
          } finally {
            let Rt = L !== null ? vt.get(L).__webglFramebuffer : null;
            ct.bindFramebuffer(A.FRAMEBUFFER, Rt);
          }
        }
      }, this.readRenderTargetPixelsAsync = async function(S, N, z, k, F, rt, gt) {
        if (!(S && S.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        let At = vt.get(S).__webglFramebuffer;
        if (S.isWebGLCubeRenderTarget && gt !== void 0 && (At = At[gt]), At) {
          let Rt = S.texture, kt = Rt.format, Wt = Rt.type;
          if (!Mt.textureFormatReadable(kt)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!Mt.textureTypeReadable(Wt)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          if (N >= 0 && N <= S.width - k && z >= 0 && z <= S.height - F) {
            ct.bindFramebuffer(A.FRAMEBUFFER, At);
            let Ct = A.createBuffer();
            A.bindBuffer(A.PIXEL_PACK_BUFFER, Ct), A.bufferData(A.PIXEL_PACK_BUFFER, rt.byteLength, A.STREAM_READ), A.readPixels(N, z, k, F, qt.convert(kt), qt.convert(Wt), 0);
            let jt = L !== null ? vt.get(L).__webglFramebuffer : null;
            ct.bindFramebuffer(A.FRAMEBUFFER, jt);
            let le = A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE, 0);
            return A.flush(), await vf(A, le, 4), A.bindBuffer(A.PIXEL_PACK_BUFFER, Ct), A.getBufferSubData(A.PIXEL_PACK_BUFFER, 0, rt), A.deleteBuffer(Ct), A.deleteSync(le), rt;
          } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
        }
      }, this.copyFramebufferToTexture = function(S, N = null, z = 0) {
        S.isTexture !== true && (Xs("WebGLRenderer: copyFramebufferToTexture function signature has changed."), N = arguments[0] || null, S = arguments[1]);
        let k = Math.pow(2, -z), F = Math.floor(S.image.width * k), rt = Math.floor(S.image.height * k), gt = N !== null ? N.x : 0, At = N !== null ? N.y : 0;
        w.setTexture2D(S, 0), A.copyTexSubImage2D(A.TEXTURE_2D, z, 0, 0, gt, At, F, rt), ct.unbindTexture();
      }, this.copyTextureToTexture = function(S, N, z = null, k = null, F = 0) {
        S.isTexture !== true && (Xs("WebGLRenderer: copyTextureToTexture function signature has changed."), k = arguments[0] || null, S = arguments[1], N = arguments[2], F = arguments[3] || 0, z = null);
        let rt, gt, At, Rt, kt, Wt, Ct, jt, le, ue = S.isCompressedTexture ? S.mipmaps[F] : S.image;
        z !== null ? (rt = z.max.x - z.min.x, gt = z.max.y - z.min.y, At = z.isBox3 ? z.max.z - z.min.z : 1, Rt = z.min.x, kt = z.min.y, Wt = z.isBox3 ? z.min.z : 0) : (rt = ue.width, gt = ue.height, At = ue.depth || 1, Rt = 0, kt = 0, Wt = 0), k !== null ? (Ct = k.x, jt = k.y, le = k.z) : (Ct = 0, jt = 0, le = 0);
        let Ge = qt.convert(N.format), ie = qt.convert(N.type), Pt;
        N.isData3DTexture ? (w.setTexture3D(N, 0), Pt = A.TEXTURE_3D) : N.isDataArrayTexture || N.isCompressedArrayTexture ? (w.setTexture2DArray(N, 0), Pt = A.TEXTURE_2D_ARRAY) : (w.setTexture2D(N, 0), Pt = A.TEXTURE_2D), A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, N.flipY), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, N.premultiplyAlpha), A.pixelStorei(A.UNPACK_ALIGNMENT, N.unpackAlignment);
        let Cn = A.getParameter(A.UNPACK_ROW_LENGTH), se = A.getParameter(A.UNPACK_IMAGE_HEIGHT), on = A.getParameter(A.UNPACK_SKIP_PIXELS), Hi = A.getParameter(A.UNPACK_SKIP_ROWS), Je = A.getParameter(A.UNPACK_SKIP_IMAGES);
        A.pixelStorei(A.UNPACK_ROW_LENGTH, ue.width), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, ue.height), A.pixelStorei(A.UNPACK_SKIP_PIXELS, Rt), A.pixelStorei(A.UNPACK_SKIP_ROWS, kt), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Wt);
        let Ns = S.isDataArrayTexture || S.isData3DTexture, de = N.isDataArrayTexture || N.isData3DTexture;
        if (S.isRenderTargetTexture || S.isDepthTexture) {
          let yn = vt.get(S), Fs = vt.get(N), tn = vt.get(yn.__renderTarget), Jn = vt.get(Fs.__renderTarget);
          ct.bindFramebuffer(A.READ_FRAMEBUFFER, tn.__webglFramebuffer), ct.bindFramebuffer(A.DRAW_FRAMEBUFFER, Jn.__webglFramebuffer);
          for (let $n = 0; $n < At; $n++) Ns && A.framebufferTextureLayer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, vt.get(S).__webglTexture, F, Wt + $n), S.isDepthTexture ? (de && A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, vt.get(N).__webglTexture, F, le + $n), A.blitFramebuffer(Rt, kt, rt, gt, Ct, jt, rt, gt, A.DEPTH_BUFFER_BIT, A.NEAREST)) : de ? A.copyTexSubImage3D(Pt, F, Ct, jt, le + $n, Rt, kt, rt, gt) : A.copyTexSubImage2D(Pt, F, Ct, jt, le + $n, Rt, kt, rt, gt);
          ct.bindFramebuffer(A.READ_FRAMEBUFFER, null), ct.bindFramebuffer(A.DRAW_FRAMEBUFFER, null);
        } else de ? S.isDataTexture || S.isData3DTexture ? A.texSubImage3D(Pt, F, Ct, jt, le, rt, gt, At, Ge, ie, ue.data) : N.isCompressedArrayTexture ? A.compressedTexSubImage3D(Pt, F, Ct, jt, le, rt, gt, At, Ge, ue.data) : A.texSubImage3D(Pt, F, Ct, jt, le, rt, gt, At, Ge, ie, ue) : S.isDataTexture ? A.texSubImage2D(A.TEXTURE_2D, F, Ct, jt, rt, gt, Ge, ie, ue.data) : S.isCompressedTexture ? A.compressedTexSubImage2D(A.TEXTURE_2D, F, Ct, jt, ue.width, ue.height, Ge, ue.data) : A.texSubImage2D(A.TEXTURE_2D, F, Ct, jt, rt, gt, Ge, ie, ue);
        A.pixelStorei(A.UNPACK_ROW_LENGTH, Cn), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, se), A.pixelStorei(A.UNPACK_SKIP_PIXELS, on), A.pixelStorei(A.UNPACK_SKIP_ROWS, Hi), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Je), F === 0 && N.generateMipmaps && A.generateMipmap(Pt), ct.unbindTexture();
      }, this.copyTextureToTexture3D = function(S, N, z = null, k = null, F = 0) {
        return S.isTexture !== true && (Xs("WebGLRenderer: copyTextureToTexture3D function signature has changed."), z = arguments[0] || null, k = arguments[1] || null, S = arguments[2], N = arguments[3], F = arguments[4] || 0), Xs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(S, N, z, k, F);
      }, this.initRenderTarget = function(S) {
        vt.get(S).__webglFramebuffer === void 0 && w.setupRenderTarget(S);
      }, this.initTexture = function(S) {
        S.isCubeTexture ? w.setTextureCube(S, 0) : S.isData3DTexture ? w.setTexture3D(S, 0) : S.isDataArrayTexture || S.isCompressedArrayTexture ? w.setTexture2DArray(S, 0) : w.setTexture2D(S, 0), ct.unbindTexture();
      }, this.resetState = function() {
        R = 0, C = 0, L = null, ct.reset(), ce.reset();
      }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    get coordinateSystem() {
      return On;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(t) {
      this._outputColorSpace = t;
      let e = this.getContext();
      e.drawingBufferColorspace = Qt._getDrawingBufferColorSpace(t), e.unpackColorSpace = Qt._getUnpackColorSpace();
    }
  }, xa = class i {
    constructor(t, e = 25e-5) {
      this.isFogExp2 = true, this.name = "", this.color = new Ht(t), this.density = e;
    }
    clone() {
      return new i(this.color, this.density);
    }
    toJSON() {
      return { type: "FogExp2", name: this.name, color: this.color.getHex(), density: this.density };
    }
  };
  var va = class extends Pe {
    constructor() {
      super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new En(), this.environmentIntensity = 1, this.environmentRotation = new En(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    copy(t, e) {
      return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
    }
  };
  var qc = class extends je {
    constructor(t = null, e = 1, n = 1, s, r, a, o, c, l = Qe, h = Qe, d, u) {
      super(null, a, o, c, l, h, s, r, d, u), this.isDataTexture = true, this.image = { data: t, width: e, height: n }, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  };
  var ya = class extends Ie {
    constructor(t, e, n, s = 1) {
      super(t, e, n), this.isInstancedBufferAttribute = true, this.meshPerAttribute = s;
    }
    copy(t) {
      return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = true, t;
    }
  }, is = new ee(), iu = new ee(), Wr = [], su = new Vn(), m_ = new ee(), Hs = new Ce(), Gs = new Hn(), li = class extends Ce {
    constructor(t, e, n) {
      super(t, e), this.isInstancedMesh = true, this.instanceMatrix = new ya(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
      for (let s = 0; s < n; s++) this.setMatrixAt(s, m_);
    }
    computeBoundingBox() {
      let t = this.geometry, e = this.count;
      this.boundingBox === null && (this.boundingBox = new Vn()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
      for (let n = 0; n < e; n++) this.getMatrixAt(n, is), su.copy(t.boundingBox).applyMatrix4(is), this.boundingBox.union(su);
    }
    computeBoundingSphere() {
      let t = this.geometry, e = this.count;
      this.boundingSphere === null && (this.boundingSphere = new Hn()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
      for (let n = 0; n < e; n++) this.getMatrixAt(n, is), Gs.copy(t.boundingSphere).applyMatrix4(is), this.boundingSphere.union(Gs);
    }
    copy(t, e) {
      return super.copy(t, e), this.instanceMatrix.copy(t.instanceMatrix), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
    }
    getColorAt(t, e) {
      e.fromArray(this.instanceColor.array, t * 3);
    }
    getMatrixAt(t, e) {
      e.fromArray(this.instanceMatrix.array, t * 16);
    }
    getMorphAt(t, e) {
      let n = e.morphTargetInfluences, s = this.morphTexture.source.data.data, r = n.length + 1, a = t * r + 1;
      for (let o = 0; o < n.length; o++) n[o] = s[a + o];
    }
    raycast(t, e) {
      let n = this.matrixWorld, s = this.count;
      if (Hs.geometry = this.geometry, Hs.material = this.material, Hs.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Gs.copy(this.boundingSphere), Gs.applyMatrix4(n), t.ray.intersectsSphere(Gs) !== false)) for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, is), iu.multiplyMatrices(n, is), Hs.matrixWorld = iu, Hs.raycast(t, Wr);
        for (let a = 0, o = Wr.length; a < o; a++) {
          let c = Wr[a];
          c.instanceId = r, c.object = this, e.push(c);
        }
        Wr.length = 0;
      }
    }
    setColorAt(t, e) {
      this.instanceColor === null && (this.instanceColor = new ya(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
    }
    setMatrixAt(t, e) {
      e.toArray(this.instanceMatrix.array, t * 16);
    }
    setMorphAt(t, e) {
      let n = e.morphTargetInfluences, s = n.length + 1;
      this.morphTexture === null && (this.morphTexture = new qc(new Float32Array(s * this.count), s, this.count, Ml, bn));
      let r = this.morphTexture.source.data.data, a = 0;
      for (let l = 0; l < n.length; l++) a += n[l];
      let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, c = s * t;
      r[c] = o, r.set(n, c + 1);
    }
    updateMorphTargets() {
    }
    dispose() {
      return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
    }
  };
  var Ii = class extends Gn {
    static get type() {
      return "LineBasicMaterial";
    }
    constructor(t) {
      super(), this.isLineBasicMaterial = true, this.color = new Ht(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
    }
  }, Ma = new T(), Sa = new T(), ru = new ee(), Ws = new ms(), Xr = new Hn(), Bo = new T(), au = new T(), xs = class extends Pe {
    constructor(t = new Se(), e = new Ii()) {
      super(), this.isLine = true, this.type = "Line", this.geometry = t, this.material = e, this.updateMorphTargets();
    }
    copy(t, e) {
      return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
    }
    computeLineDistances() {
      let t = this.geometry;
      if (t.index === null) {
        let e = t.attributes.position, n = [0];
        for (let s = 1, r = e.count; s < r; s++) Ma.fromBufferAttribute(e, s - 1), Sa.fromBufferAttribute(e, s), n[s] = n[s - 1], n[s] += Ma.distanceTo(Sa);
        t.setAttribute("lineDistance", new te(n, 1));
      } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this;
    }
    raycast(t, e) {
      let n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, a = n.drawRange;
      if (n.boundingSphere === null && n.computeBoundingSphere(), Xr.copy(n.boundingSphere), Xr.applyMatrix4(s), Xr.radius += r, t.ray.intersectsSphere(Xr) === false) return;
      ru.copy(s).invert(), Ws.copy(t.ray).applyMatrix4(ru);
      let o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = this.isLineSegments ? 2 : 1, h = n.index, u = n.attributes.position;
      if (h !== null) {
        let p = Math.max(0, a.start), g = Math.min(h.count, a.start + a.count);
        for (let v = p, m = g - 1; v < m; v += l) {
          let f = h.getX(v), E = h.getX(v + 1), x = qr(this, t, Ws, c, f, E);
          x && e.push(x);
        }
        if (this.isLineLoop) {
          let v = h.getX(g - 1), m = h.getX(p), f = qr(this, t, Ws, c, v, m);
          f && e.push(f);
        }
      } else {
        let p = Math.max(0, a.start), g = Math.min(u.count, a.start + a.count);
        for (let v = p, m = g - 1; v < m; v += l) {
          let f = qr(this, t, Ws, c, v, v + 1);
          f && e.push(f);
        }
        if (this.isLineLoop) {
          let v = qr(this, t, Ws, c, g - 1, p);
          v && e.push(v);
        }
      }
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes, n = Object.keys(e);
      if (n.length > 0) {
        let s = e[n[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let r = 0, a = s.length; r < a; r++) {
            let o = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
          }
        }
      }
    }
  };
  function qr(i, t, e, n, s, r) {
    let a = i.geometry.attributes.position;
    if (Ma.fromBufferAttribute(a, s), Sa.fromBufferAttribute(a, r), e.distanceSqToSegment(Ma, Sa, Bo, au) > n) return;
    Bo.applyMatrix4(i.matrixWorld);
    let c = t.ray.origin.distanceTo(Bo);
    if (!(c < t.near || c > t.far)) return { distance: c, point: au.clone().applyMatrix4(i.matrixWorld), index: s, face: null, faceIndex: null, barycoord: null, object: i };
  }
  var ou = new T(), cu = new T(), Yc = class extends xs {
    constructor(t, e) {
      super(t, e), this.isLineSegments = true, this.type = "LineSegments";
    }
    computeLineDistances() {
      let t = this.geometry;
      if (t.index === null) {
        let e = t.attributes.position, n = [];
        for (let s = 0, r = e.count; s < r; s += 2) ou.fromBufferAttribute(e, s), cu.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + ou.distanceTo(cu);
        t.setAttribute("lineDistance", new te(n, 1));
      } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this;
    }
  };
  var tr = class extends Gn {
    static get type() {
      return "PointsMaterial";
    }
    constructor(t) {
      super(), this.isPointsMaterial = true, this.color = new Ht(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = true, this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
    }
  }, lu = new ee(), Zc = new ms(), Yr = new Hn(), Zr = new T(), ba = class extends Pe {
    constructor(t = new Se(), e = new tr()) {
      super(), this.isPoints = true, this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets();
    }
    copy(t, e) {
      return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
    }
    raycast(t, e) {
      let n = this.geometry, s = this.matrixWorld, r = t.params.Points.threshold, a = n.drawRange;
      if (n.boundingSphere === null && n.computeBoundingSphere(), Yr.copy(n.boundingSphere), Yr.applyMatrix4(s), Yr.radius += r, t.ray.intersectsSphere(Yr) === false) return;
      lu.copy(s).invert(), Zc.copy(t.ray).applyMatrix4(lu);
      let o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = n.index, d = n.attributes.position;
      if (l !== null) {
        let u = Math.max(0, a.start), p = Math.min(l.count, a.start + a.count);
        for (let g = u, v = p; g < v; g++) {
          let m = l.getX(g);
          Zr.fromBufferAttribute(d, m), hu(Zr, m, c, s, t, e, this);
        }
      } else {
        let u = Math.max(0, a.start), p = Math.min(d.count, a.start + a.count);
        for (let g = u, v = p; g < v; g++) Zr.fromBufferAttribute(d, g), hu(Zr, g, c, s, t, e, this);
      }
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes, n = Object.keys(e);
      if (n.length > 0) {
        let s = e[n[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let r = 0, a = s.length; r < a; r++) {
            let o = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
          }
        }
      }
    }
  };
  function hu(i, t, e, n, s, r, a) {
    let o = Zc.distanceSqToPoint(i);
    if (o < e) {
      let c = new T();
      Zc.closestPointToPoint(i, c), c.applyMatrix4(n);
      let l = s.ray.origin.distanceTo(c);
      if (l < s.near || l > s.far) return;
      r.push({ distance: l, distanceToRay: Math.sqrt(o), point: c, index: t, face: null, faceIndex: null, barycoord: null, object: a });
    }
  }
  var sn = class {
    constructor() {
      this.type = "Curve", this.arcLengthDivisions = 200;
    }
    getPoint() {
      return console.warn("THREE.Curve: .getPoint() not implemented."), null;
    }
    getPointAt(t, e) {
      let n = this.getUtoTmapping(t);
      return this.getPoint(n, e);
    }
    getPoints(t = 5) {
      let e = [];
      for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
      return e;
    }
    getSpacedPoints(t = 5) {
      let e = [];
      for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
      return e;
    }
    getLength() {
      let t = this.getLengths();
      return t[t.length - 1];
    }
    getLengths(t = this.arcLengthDivisions) {
      if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
      this.needsUpdate = false;
      let e = [], n, s = this.getPoint(0), r = 0;
      e.push(0);
      for (let a = 1; a <= t; a++) n = this.getPoint(a / t), r += n.distanceTo(s), e.push(r), s = n;
      return this.cacheArcLengths = e, e;
    }
    updateArcLengths() {
      this.needsUpdate = true, this.getLengths();
    }
    getUtoTmapping(t, e) {
      let n = this.getLengths(), s = 0, r = n.length, a;
      e ? a = e : a = t * n[r - 1];
      let o = 0, c = r - 1, l;
      for (; o <= c; ) if (s = Math.floor(o + (c - o) / 2), l = n[s] - a, l < 0) o = s + 1;
      else if (l > 0) c = s - 1;
      else {
        c = s;
        break;
      }
      if (s = c, n[s] === a) return s / (r - 1);
      let h = n[s], u = n[s + 1] - h, p = (a - h) / u;
      return (s + p) / (r - 1);
    }
    getTangent(t, e) {
      let s = t - 1e-4, r = t + 1e-4;
      s < 0 && (s = 0), r > 1 && (r = 1);
      let a = this.getPoint(s), o = this.getPoint(r), c = e || (a.isVector2 ? new ht() : new T());
      return c.copy(o).sub(a).normalize(), c;
    }
    getTangentAt(t, e) {
      let n = this.getUtoTmapping(t);
      return this.getTangent(n, e);
    }
    computeFrenetFrames(t, e) {
      let n = new T(), s = [], r = [], a = [], o = new T(), c = new ee();
      for (let p = 0; p <= t; p++) {
        let g = p / t;
        s[p] = this.getTangentAt(g, new T());
      }
      r[0] = new T(), a[0] = new T();
      let l = Number.MAX_VALUE, h = Math.abs(s[0].x), d = Math.abs(s[0].y), u = Math.abs(s[0].z);
      h <= l && (l = h, n.set(1, 0, 0)), d <= l && (l = d, n.set(0, 1, 0)), u <= l && n.set(0, 0, 1), o.crossVectors(s[0], n).normalize(), r[0].crossVectors(s[0], o), a[0].crossVectors(s[0], r[0]);
      for (let p = 1; p <= t; p++) {
        if (r[p] = r[p - 1].clone(), a[p] = a[p - 1].clone(), o.crossVectors(s[p - 1], s[p]), o.length() > Number.EPSILON) {
          o.normalize();
          let g = Math.acos(Ne(s[p - 1].dot(s[p]), -1, 1));
          r[p].applyMatrix4(c.makeRotationAxis(o, g));
        }
        a[p].crossVectors(s[p], r[p]);
      }
      if (e === true) {
        let p = Math.acos(Ne(r[0].dot(r[t]), -1, 1));
        p /= t, s[0].dot(o.crossVectors(r[0], r[t])) > 0 && (p = -p);
        for (let g = 1; g <= t; g++) r[g].applyMatrix4(c.makeRotationAxis(s[g], p * g)), a[g].crossVectors(s[g], r[g]);
      }
      return { tangents: s, normals: r, binormals: a };
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.arcLengthDivisions = t.arcLengthDivisions, this;
    }
    toJSON() {
      let t = { metadata: { version: 4.6, type: "Curve", generator: "Curve.toJSON" } };
      return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
    }
    fromJSON(t) {
      return this.arcLengthDivisions = t.arcLengthDivisions, this;
    }
  }, er = class extends sn {
    constructor(t = 0, e = 0, n = 1, s = 1, r = 0, a = Math.PI * 2, o = false, c = 0) {
      super(), this.isEllipseCurve = true, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = a, this.aClockwise = o, this.aRotation = c;
    }
    getPoint(t, e = new ht()) {
      let n = e, s = Math.PI * 2, r = this.aEndAngle - this.aStartAngle, a = Math.abs(r) < Number.EPSILON;
      for (; r < 0; ) r += s;
      for (; r > s; ) r -= s;
      r < Number.EPSILON && (a ? r = 0 : r = s), this.aClockwise === true && !a && (r === s ? r = -s : r = r - s);
      let o = this.aStartAngle + t * r, c = this.aX + this.xRadius * Math.cos(o), l = this.aY + this.yRadius * Math.sin(o);
      if (this.aRotation !== 0) {
        let h = Math.cos(this.aRotation), d = Math.sin(this.aRotation), u = c - this.aX, p = l - this.aY;
        c = u * h - p * d + this.aX, l = u * d + p * h + this.aY;
      }
      return n.set(c, l);
    }
    copy(t) {
      return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
    }
  }, Jc = class extends er {
    constructor(t, e, n, s, r, a) {
      super(t, e, n, n, s, r, a), this.isArcCurve = true, this.type = "ArcCurve";
    }
  };
  function Tl() {
    let i = 0, t = 0, e = 0, n = 0;
    function s(r, a, o, c) {
      i = r, t = o, e = -3 * r + 3 * a - 2 * o - c, n = 2 * r - 2 * a + o + c;
    }
    return { initCatmullRom: function(r, a, o, c, l) {
      s(a, o, l * (o - r), l * (c - a));
    }, initNonuniformCatmullRom: function(r, a, o, c, l, h, d) {
      let u = (a - r) / l - (o - r) / (l + h) + (o - a) / h, p = (o - a) / h - (c - a) / (h + d) + (c - o) / d;
      u *= h, p *= h, s(a, o, u, p);
    }, calc: function(r) {
      let a = r * r, o = a * r;
      return i + t * r + e * a + n * o;
    } };
  }
  var Jr = new T(), zo = new Tl(), ko = new Tl(), Vo = new Tl(), nr = class extends sn {
    constructor(t = [], e = false, n = "centripetal", s = 0.5) {
      super(), this.isCatmullRomCurve3 = true, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = s;
    }
    getPoint(t, e = new T()) {
      let n = e, s = this.points, r = s.length, a = (r - (this.closed ? 0 : 1)) * t, o = Math.floor(a), c = a - o;
      this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / r) + 1) * r : c === 0 && o === r - 1 && (o = r - 2, c = 1);
      let l, h;
      this.closed || o > 0 ? l = s[(o - 1) % r] : (Jr.subVectors(s[0], s[1]).add(s[0]), l = Jr);
      let d = s[o % r], u = s[(o + 1) % r];
      if (this.closed || o + 2 < r ? h = s[(o + 2) % r] : (Jr.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = Jr), this.curveType === "centripetal" || this.curveType === "chordal") {
        let p = this.curveType === "chordal" ? 0.5 : 0.25, g = Math.pow(l.distanceToSquared(d), p), v = Math.pow(d.distanceToSquared(u), p), m = Math.pow(u.distanceToSquared(h), p);
        v < 1e-4 && (v = 1), g < 1e-4 && (g = v), m < 1e-4 && (m = v), zo.initNonuniformCatmullRom(l.x, d.x, u.x, h.x, g, v, m), ko.initNonuniformCatmullRom(l.y, d.y, u.y, h.y, g, v, m), Vo.initNonuniformCatmullRom(l.z, d.z, u.z, h.z, g, v, m);
      } else this.curveType === "catmullrom" && (zo.initCatmullRom(l.x, d.x, u.x, h.x, this.tension), ko.initCatmullRom(l.y, d.y, u.y, h.y, this.tension), Vo.initCatmullRom(l.z, d.z, u.z, h.z, this.tension));
      return n.set(zo.calc(c), ko.calc(c), Vo.calc(c)), n;
    }
    copy(t) {
      super.copy(t), this.points = [];
      for (let e = 0, n = t.points.length; e < n; e++) {
        let s = t.points[e];
        this.points.push(s.clone());
      }
      return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
    }
    toJSON() {
      let t = super.toJSON();
      t.points = [];
      for (let e = 0, n = this.points.length; e < n; e++) {
        let s = this.points[e];
        t.points.push(s.toArray());
      }
      return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.points = [];
      for (let e = 0, n = t.points.length; e < n; e++) {
        let s = t.points[e];
        this.points.push(new T().fromArray(s));
      }
      return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
    }
  };
  function uu(i, t, e, n, s) {
    let r = (n - t) * 0.5, a = (s - e) * 0.5, o = i * i, c = i * o;
    return (2 * e - 2 * n + r + a) * c + (-3 * e + 3 * n - 2 * r - a) * o + r * i + e;
  }
  function g_(i, t) {
    let e = 1 - i;
    return e * e * t;
  }
  function __(i, t) {
    return 2 * (1 - i) * i * t;
  }
  function x_(i, t) {
    return i * i * t;
  }
  function Zs(i, t, e, n) {
    return g_(i, t) + __(i, e) + x_(i, n);
  }
  function v_(i, t) {
    let e = 1 - i;
    return e * e * e * t;
  }
  function y_(i, t) {
    let e = 1 - i;
    return 3 * e * e * i * t;
  }
  function M_(i, t) {
    return 3 * (1 - i) * i * i * t;
  }
  function S_(i, t) {
    return i * i * i * t;
  }
  function Js(i, t, e, n, s) {
    return v_(i, t) + y_(i, e) + M_(i, n) + S_(i, s);
  }
  var Ea = class extends sn {
    constructor(t = new ht(), e = new ht(), n = new ht(), s = new ht()) {
      super(), this.isCubicBezierCurve = true, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
    }
    getPoint(t, e = new ht()) {
      let n = e, s = this.v0, r = this.v1, a = this.v2, o = this.v3;
      return n.set(Js(t, s.x, r.x, a.x, o.x), Js(t, s.y, r.y, a.y, o.y)), n;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
    }
  }, $c = class extends sn {
    constructor(t = new T(), e = new T(), n = new T(), s = new T()) {
      super(), this.isCubicBezierCurve3 = true, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
    }
    getPoint(t, e = new T()) {
      let n = e, s = this.v0, r = this.v1, a = this.v2, o = this.v3;
      return n.set(Js(t, s.x, r.x, a.x, o.x), Js(t, s.y, r.y, a.y, o.y), Js(t, s.z, r.z, a.z, o.z)), n;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
    }
  }, wa = class extends sn {
    constructor(t = new ht(), e = new ht()) {
      super(), this.isLineCurve = true, this.type = "LineCurve", this.v1 = t, this.v2 = e;
    }
    getPoint(t, e = new ht()) {
      let n = e;
      return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e = new ht()) {
      return e.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(t, e) {
      return this.getTangent(t, e);
    }
    copy(t) {
      return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  }, Kc = class extends sn {
    constructor(t = new T(), e = new T()) {
      super(), this.isLineCurve3 = true, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
    }
    getPoint(t, e = new T()) {
      let n = e;
      return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e = new T()) {
      return e.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(t, e) {
      return this.getTangent(t, e);
    }
    copy(t) {
      return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  }, Ta = class extends sn {
    constructor(t = new ht(), e = new ht(), n = new ht()) {
      super(), this.isQuadraticBezierCurve = true, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
    }
    getPoint(t, e = new ht()) {
      let n = e, s = this.v0, r = this.v1, a = this.v2;
      return n.set(Zs(t, s.x, r.x, a.x), Zs(t, s.y, r.y, a.y)), n;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  }, Aa = class extends sn {
    constructor(t = new T(), e = new T(), n = new T()) {
      super(), this.isQuadraticBezierCurve3 = true, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
    }
    getPoint(t, e = new T()) {
      let n = e, s = this.v0, r = this.v1, a = this.v2;
      return n.set(Zs(t, s.x, r.x, a.x), Zs(t, s.y, r.y, a.y), Zs(t, s.z, r.z, a.z)), n;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  }, Ra = class extends sn {
    constructor(t = []) {
      super(), this.isSplineCurve = true, this.type = "SplineCurve", this.points = t;
    }
    getPoint(t, e = new ht()) {
      let n = e, s = this.points, r = (s.length - 1) * t, a = Math.floor(r), o = r - a, c = s[a === 0 ? a : a - 1], l = s[a], h = s[a > s.length - 2 ? s.length - 1 : a + 1], d = s[a > s.length - 3 ? s.length - 1 : a + 2];
      return n.set(uu(o, c.x, l.x, h.x, d.x), uu(o, c.y, l.y, h.y, d.y)), n;
    }
    copy(t) {
      super.copy(t), this.points = [];
      for (let e = 0, n = t.points.length; e < n; e++) {
        let s = t.points[e];
        this.points.push(s.clone());
      }
      return this;
    }
    toJSON() {
      let t = super.toJSON();
      t.points = [];
      for (let e = 0, n = this.points.length; e < n; e++) {
        let s = this.points[e];
        t.points.push(s.toArray());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.points = [];
      for (let e = 0, n = t.points.length; e < n; e++) {
        let s = t.points[e];
        this.points.push(new ht().fromArray(s));
      }
      return this;
    }
  }, Ca = Object.freeze({ __proto__: null, ArcCurve: Jc, CatmullRomCurve3: nr, CubicBezierCurve: Ea, CubicBezierCurve3: $c, EllipseCurve: er, LineCurve: wa, LineCurve3: Kc, QuadraticBezierCurve: Ta, QuadraticBezierCurve3: Aa, SplineCurve: Ra }), Qc = class extends sn {
    constructor() {
      super(), this.type = "CurvePath", this.curves = [], this.autoClose = false;
    }
    add(t) {
      this.curves.push(t);
    }
    closePath() {
      let t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
      if (!t.equals(e)) {
        let n = t.isVector2 === true ? "LineCurve" : "LineCurve3";
        this.curves.push(new Ca[n](e, t));
      }
      return this;
    }
    getPoint(t, e) {
      let n = t * this.getLength(), s = this.getCurveLengths(), r = 0;
      for (; r < s.length; ) {
        if (s[r] >= n) {
          let a = s[r] - n, o = this.curves[r], c = o.getLength(), l = c === 0 ? 0 : 1 - a / c;
          return o.getPointAt(l, e);
        }
        r++;
      }
      return null;
    }
    getLength() {
      let t = this.getCurveLengths();
      return t[t.length - 1];
    }
    updateArcLengths() {
      this.needsUpdate = true, this.cacheLengths = null, this.getCurveLengths();
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
      let t = [], e = 0;
      for (let n = 0, s = this.curves.length; n < s; n++) e += this.curves[n].getLength(), t.push(e);
      return this.cacheLengths = t, t;
    }
    getSpacedPoints(t = 40) {
      let e = [];
      for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
      return this.autoClose && e.push(e[0]), e;
    }
    getPoints(t = 12) {
      let e = [], n;
      for (let s = 0, r = this.curves; s < r.length; s++) {
        let a = r[s], o = a.isEllipseCurve ? t * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? t * a.points.length : t, c = a.getPoints(o);
        for (let l = 0; l < c.length; l++) {
          let h = c[l];
          n && n.equals(h) || (e.push(h), n = h);
        }
      }
      return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
    }
    copy(t) {
      super.copy(t), this.curves = [];
      for (let e = 0, n = t.curves.length; e < n; e++) {
        let s = t.curves[e];
        this.curves.push(s.clone());
      }
      return this.autoClose = t.autoClose, this;
    }
    toJSON() {
      let t = super.toJSON();
      t.autoClose = this.autoClose, t.curves = [];
      for (let e = 0, n = this.curves.length; e < n; e++) {
        let s = this.curves[e];
        t.curves.push(s.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
      for (let e = 0, n = t.curves.length; e < n; e++) {
        let s = t.curves[e];
        this.curves.push(new Ca[s.type]().fromJSON(s));
      }
      return this;
    }
  }, Ia = class extends Qc {
    constructor(t) {
      super(), this.type = "Path", this.currentPoint = new ht(), t && this.setFromPoints(t);
    }
    setFromPoints(t) {
      this.moveTo(t[0].x, t[0].y);
      for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
      return this;
    }
    moveTo(t, e) {
      return this.currentPoint.set(t, e), this;
    }
    lineTo(t, e) {
      let n = new wa(this.currentPoint.clone(), new ht(t, e));
      return this.curves.push(n), this.currentPoint.set(t, e), this;
    }
    quadraticCurveTo(t, e, n, s) {
      let r = new Ta(this.currentPoint.clone(), new ht(t, e), new ht(n, s));
      return this.curves.push(r), this.currentPoint.set(n, s), this;
    }
    bezierCurveTo(t, e, n, s, r, a) {
      let o = new Ea(this.currentPoint.clone(), new ht(t, e), new ht(n, s), new ht(r, a));
      return this.curves.push(o), this.currentPoint.set(r, a), this;
    }
    splineThru(t) {
      let e = [this.currentPoint.clone()].concat(t), n = new Ra(e);
      return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
    }
    arc(t, e, n, s, r, a) {
      let o = this.currentPoint.x, c = this.currentPoint.y;
      return this.absarc(t + o, e + c, n, s, r, a), this;
    }
    absarc(t, e, n, s, r, a) {
      return this.absellipse(t, e, n, n, s, r, a), this;
    }
    ellipse(t, e, n, s, r, a, o, c) {
      let l = this.currentPoint.x, h = this.currentPoint.y;
      return this.absellipse(t + l, e + h, n, s, r, a, o, c), this;
    }
    absellipse(t, e, n, s, r, a, o, c) {
      let l = new er(t, e, n, s, r, a, o, c);
      if (this.curves.length > 0) {
        let d = l.getPoint(0);
        d.equals(this.currentPoint) || this.lineTo(d.x, d.y);
      }
      this.curves.push(l);
      let h = l.getPoint(1);
      return this.currentPoint.copy(h), this;
    }
    copy(t) {
      return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.currentPoint = this.currentPoint.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
    }
  };
  var Wn = class i extends Se {
    constructor(t = 1, e = 1, n = 1, s = 32, r = 1, a = false, o = 0, c = Math.PI * 2) {
      super(), this.type = "CylinderGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: n, radialSegments: s, heightSegments: r, openEnded: a, thetaStart: o, thetaLength: c };
      let l = this;
      s = Math.floor(s), r = Math.floor(r);
      let h = [], d = [], u = [], p = [], g = 0, v = [], m = n / 2, f = 0;
      E(), a === false && (t > 0 && x(true), e > 0 && x(false)), this.setIndex(h), this.setAttribute("position", new te(d, 3)), this.setAttribute("normal", new te(u, 3)), this.setAttribute("uv", new te(p, 2));
      function E() {
        let _ = new T(), D = new T(), R = 0, C = (e - t) / n;
        for (let L = 0; L <= r; L++) {
          let b = [], M = L / r, I = M * (e - t) + t;
          for (let H = 0; H <= s; H++) {
            let B = H / s, G = B * c + o, $ = Math.sin(G), W = Math.cos(G);
            D.x = I * $, D.y = -M * n + m, D.z = I * W, d.push(D.x, D.y, D.z), _.set($, C, W).normalize(), u.push(_.x, _.y, _.z), p.push(B, 1 - M), b.push(g++);
          }
          v.push(b);
        }
        for (let L = 0; L < s; L++) for (let b = 0; b < r; b++) {
          let M = v[b][L], I = v[b + 1][L], H = v[b + 1][L + 1], B = v[b][L + 1];
          (t > 0 || b !== 0) && (h.push(M, I, B), R += 3), (e > 0 || b !== r - 1) && (h.push(I, H, B), R += 3);
        }
        l.addGroup(f, R, 0), f += R;
      }
      function x(_) {
        let D = g, R = new ht(), C = new T(), L = 0, b = _ === true ? t : e, M = _ === true ? 1 : -1;
        for (let H = 1; H <= s; H++) d.push(0, m * M, 0), u.push(0, M, 0), p.push(0.5, 0.5), g++;
        let I = g;
        for (let H = 0; H <= s; H++) {
          let G = H / s * c + o, $ = Math.cos(G), W = Math.sin(G);
          C.x = b * W, C.y = m * M, C.z = b * $, d.push(C.x, C.y, C.z), u.push(0, M, 0), R.x = $ * 0.5 + 0.5, R.y = W * 0.5 * M + 0.5, p.push(R.x, R.y), g++;
        }
        for (let H = 0; H < s; H++) {
          let B = D + H, G = I + H;
          _ === true ? h.push(G, G + 1, B) : h.push(G + 1, G, B), L += 3;
        }
        l.addGroup(f, L, _ === true ? 1 : 2), f += L;
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  }, vs = class i extends Wn {
    constructor(t = 1, e = 1, n = 32, s = 1, r = false, a = 0, o = Math.PI * 2) {
      super(0, t, e, n, s, r, a, o), this.type = "ConeGeometry", this.parameters = { radius: t, height: e, radialSegments: n, heightSegments: s, openEnded: r, thetaStart: a, thetaLength: o };
    }
    static fromJSON(t) {
      return new i(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  }, jc = class i extends Se {
    constructor(t = [], e = [], n = 1, s = 0) {
      super(), this.type = "PolyhedronGeometry", this.parameters = { vertices: t, indices: e, radius: n, detail: s };
      let r = [], a = [];
      o(s), l(n), h(), this.setAttribute("position", new te(r, 3)), this.setAttribute("normal", new te(r.slice(), 3)), this.setAttribute("uv", new te(a, 2)), s === 0 ? this.computeVertexNormals() : this.normalizeNormals();
      function o(E) {
        let x = new T(), _ = new T(), D = new T();
        for (let R = 0; R < e.length; R += 3) p(e[R + 0], x), p(e[R + 1], _), p(e[R + 2], D), c(x, _, D, E);
      }
      function c(E, x, _, D) {
        let R = D + 1, C = [];
        for (let L = 0; L <= R; L++) {
          C[L] = [];
          let b = E.clone().lerp(_, L / R), M = x.clone().lerp(_, L / R), I = R - L;
          for (let H = 0; H <= I; H++) H === 0 && L === R ? C[L][H] = b : C[L][H] = b.clone().lerp(M, H / I);
        }
        for (let L = 0; L < R; L++) for (let b = 0; b < 2 * (R - L) - 1; b++) {
          let M = Math.floor(b / 2);
          b % 2 === 0 ? (u(C[L][M + 1]), u(C[L + 1][M]), u(C[L][M])) : (u(C[L][M + 1]), u(C[L + 1][M + 1]), u(C[L + 1][M]));
        }
      }
      function l(E) {
        let x = new T();
        for (let _ = 0; _ < r.length; _ += 3) x.x = r[_ + 0], x.y = r[_ + 1], x.z = r[_ + 2], x.normalize().multiplyScalar(E), r[_ + 0] = x.x, r[_ + 1] = x.y, r[_ + 2] = x.z;
      }
      function h() {
        let E = new T();
        for (let x = 0; x < r.length; x += 3) {
          E.x = r[x + 0], E.y = r[x + 1], E.z = r[x + 2];
          let _ = m(E) / 2 / Math.PI + 0.5, D = f(E) / Math.PI + 0.5;
          a.push(_, 1 - D);
        }
        g(), d();
      }
      function d() {
        for (let E = 0; E < a.length; E += 6) {
          let x = a[E + 0], _ = a[E + 2], D = a[E + 4], R = Math.max(x, _, D), C = Math.min(x, _, D);
          R > 0.9 && C < 0.1 && (x < 0.2 && (a[E + 0] += 1), _ < 0.2 && (a[E + 2] += 1), D < 0.2 && (a[E + 4] += 1));
        }
      }
      function u(E) {
        r.push(E.x, E.y, E.z);
      }
      function p(E, x) {
        let _ = E * 3;
        x.x = t[_ + 0], x.y = t[_ + 1], x.z = t[_ + 2];
      }
      function g() {
        let E = new T(), x = new T(), _ = new T(), D = new T(), R = new ht(), C = new ht(), L = new ht();
        for (let b = 0, M = 0; b < r.length; b += 9, M += 6) {
          E.set(r[b + 0], r[b + 1], r[b + 2]), x.set(r[b + 3], r[b + 4], r[b + 5]), _.set(r[b + 6], r[b + 7], r[b + 8]), R.set(a[M + 0], a[M + 1]), C.set(a[M + 2], a[M + 3]), L.set(a[M + 4], a[M + 5]), D.copy(E).add(x).add(_).divideScalar(3);
          let I = m(D);
          v(R, M + 0, E, I), v(C, M + 2, x, I), v(L, M + 4, _, I);
        }
      }
      function v(E, x, _, D) {
        D < 0 && E.x === 1 && (a[x] = E.x - 1), _.x === 0 && _.z === 0 && (a[x] = D / 2 / Math.PI + 0.5);
      }
      function m(E) {
        return Math.atan2(E.z, -E.x);
      }
      function f(E) {
        return Math.atan2(-E.y, Math.sqrt(E.x * E.x + E.z * E.z));
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.vertices, t.indices, t.radius, t.details);
    }
  };
  var ir = class extends Ia {
    constructor(t) {
      super(t), this.uuid = Ss(), this.type = "Shape", this.holes = [];
    }
    getPointsHoles(t) {
      let e = [];
      for (let n = 0, s = this.holes.length; n < s; n++) e[n] = this.holes[n].getPoints(t);
      return e;
    }
    extractPoints(t) {
      return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
    }
    copy(t) {
      super.copy(t), this.holes = [];
      for (let e = 0, n = t.holes.length; e < n; e++) {
        let s = t.holes[e];
        this.holes.push(s.clone());
      }
      return this;
    }
    toJSON() {
      let t = super.toJSON();
      t.uuid = this.uuid, t.holes = [];
      for (let e = 0, n = this.holes.length; e < n; e++) {
        let s = this.holes[e];
        t.holes.push(s.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
      for (let e = 0, n = t.holes.length; e < n; e++) {
        let s = t.holes[e];
        this.holes.push(new Ia().fromJSON(s));
      }
      return this;
    }
  }, b_ = { triangulate: function(i, t, e = 2) {
    let n = t && t.length, s = n ? t[0] * e : i.length, r = Vu(i, 0, s, e, true), a = [];
    if (!r || r.next === r.prev) return a;
    let o, c, l, h, d, u, p;
    if (n && (r = R_(i, t, r, e)), i.length > 80 * e) {
      o = l = i[0], c = h = i[1];
      for (let g = e; g < s; g += e) d = i[g], u = i[g + 1], d < o && (o = d), u < c && (c = u), d > l && (l = d), u > h && (h = u);
      p = Math.max(l - o, h - c), p = p !== 0 ? 32767 / p : 0;
    }
    return sr(r, a, e, o, c, p, 0), a;
  } };
  function Vu(i, t, e, n, s) {
    let r, a;
    if (s === z_(i, t, e, n) > 0) for (r = t; r < e; r += n) a = du(r, i[r], i[r + 1], a);
    else for (r = e - n; r >= t; r -= n) a = du(r, i[r], i[r + 1], a);
    return a && ka(a, a.next) && (ar(a), a = a.next), a;
  }
  function Pi(i, t) {
    if (!i) return i;
    t || (t = i);
    let e = i, n;
    do
      if (n = false, !e.steiner && (ka(e, e.next) || xe(e.prev, e, e.next) === 0)) {
        if (ar(e), e = t = e.prev, e === e.next) break;
        n = true;
      } else e = e.next;
    while (n || e !== t);
    return t;
  }
  function sr(i, t, e, n, s, r, a) {
    if (!i) return;
    !a && r && D_(i, n, s, r);
    let o = i, c, l;
    for (; i.prev !== i.next; ) {
      if (c = i.prev, l = i.next, r ? w_(i, n, s, r) : E_(i)) {
        t.push(c.i / e | 0), t.push(i.i / e | 0), t.push(l.i / e | 0), ar(i), i = l.next, o = l.next;
        continue;
      }
      if (i = l, i === o) {
        a ? a === 1 ? (i = T_(Pi(i), t, e), sr(i, t, e, n, s, r, 2)) : a === 2 && A_(i, t, e, n, s, r) : sr(Pi(i), t, e, n, s, r, 1);
        break;
      }
    }
  }
  function E_(i) {
    let t = i.prev, e = i, n = i.next;
    if (xe(t, e, n) >= 0) return false;
    let s = t.x, r = e.x, a = n.x, o = t.y, c = e.y, l = n.y, h = s < r ? s < a ? s : a : r < a ? r : a, d = o < c ? o < l ? o : l : c < l ? c : l, u = s > r ? s > a ? s : a : r > a ? r : a, p = o > c ? o > l ? o : l : c > l ? c : l, g = n.next;
    for (; g !== t; ) {
      if (g.x >= h && g.x <= u && g.y >= d && g.y <= p && rs(s, o, r, c, a, l, g.x, g.y) && xe(g.prev, g, g.next) >= 0) return false;
      g = g.next;
    }
    return true;
  }
  function w_(i, t, e, n) {
    let s = i.prev, r = i, a = i.next;
    if (xe(s, r, a) >= 0) return false;
    let o = s.x, c = r.x, l = a.x, h = s.y, d = r.y, u = a.y, p = o < c ? o < l ? o : l : c < l ? c : l, g = h < d ? h < u ? h : u : d < u ? d : u, v = o > c ? o > l ? o : l : c > l ? c : l, m = h > d ? h > u ? h : u : d > u ? d : u, f = tl(p, g, t, e, n), E = tl(v, m, t, e, n), x = i.prevZ, _ = i.nextZ;
    for (; x && x.z >= f && _ && _.z <= E; ) {
      if (x.x >= p && x.x <= v && x.y >= g && x.y <= m && x !== s && x !== a && rs(o, h, c, d, l, u, x.x, x.y) && xe(x.prev, x, x.next) >= 0 || (x = x.prevZ, _.x >= p && _.x <= v && _.y >= g && _.y <= m && _ !== s && _ !== a && rs(o, h, c, d, l, u, _.x, _.y) && xe(_.prev, _, _.next) >= 0)) return false;
      _ = _.nextZ;
    }
    for (; x && x.z >= f; ) {
      if (x.x >= p && x.x <= v && x.y >= g && x.y <= m && x !== s && x !== a && rs(o, h, c, d, l, u, x.x, x.y) && xe(x.prev, x, x.next) >= 0) return false;
      x = x.prevZ;
    }
    for (; _ && _.z <= E; ) {
      if (_.x >= p && _.x <= v && _.y >= g && _.y <= m && _ !== s && _ !== a && rs(o, h, c, d, l, u, _.x, _.y) && xe(_.prev, _, _.next) >= 0) return false;
      _ = _.nextZ;
    }
    return true;
  }
  function T_(i, t, e) {
    let n = i;
    do {
      let s = n.prev, r = n.next.next;
      !ka(s, r) && Hu(s, n, n.next, r) && rr(s, r) && rr(r, s) && (t.push(s.i / e | 0), t.push(n.i / e | 0), t.push(r.i / e | 0), ar(n), ar(n.next), n = i = r), n = n.next;
    } while (n !== i);
    return Pi(n);
  }
  function A_(i, t, e, n, s, r) {
    let a = i;
    do {
      let o = a.next.next;
      for (; o !== a.prev; ) {
        if (a.i !== o.i && F_(a, o)) {
          let c = Gu(a, o);
          a = Pi(a, a.next), c = Pi(c, c.next), sr(a, t, e, n, s, r, 0), sr(c, t, e, n, s, r, 0);
          return;
        }
        o = o.next;
      }
      a = a.next;
    } while (a !== i);
  }
  function R_(i, t, e, n) {
    let s = [], r, a, o, c, l;
    for (r = 0, a = t.length; r < a; r++) o = t[r] * n, c = r < a - 1 ? t[r + 1] * n : i.length, l = Vu(i, o, c, n, false), l === l.next && (l.steiner = true), s.push(N_(l));
    for (s.sort(C_), r = 0; r < s.length; r++) e = I_(s[r], e);
    return e;
  }
  function C_(i, t) {
    return i.x - t.x;
  }
  function I_(i, t) {
    let e = P_(i, t);
    if (!e) return t;
    let n = Gu(e, i);
    return Pi(n, n.next), Pi(e, e.next);
  }
  function P_(i, t) {
    let e = t, n = -1 / 0, s, r = i.x, a = i.y;
    do {
      if (a <= e.y && a >= e.next.y && e.next.y !== e.y) {
        let u = e.x + (a - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
        if (u <= r && u > n && (n = u, s = e.x < e.next.x ? e : e.next, u === r)) return s;
      }
      e = e.next;
    } while (e !== t);
    if (!s) return null;
    let o = s, c = s.x, l = s.y, h = 1 / 0, d;
    e = s;
    do
      r >= e.x && e.x >= c && r !== e.x && rs(a < l ? r : n, a, c, l, a < l ? n : r, a, e.x, e.y) && (d = Math.abs(a - e.y) / (r - e.x), rr(e, i) && (d < h || d === h && (e.x > s.x || e.x === s.x && L_(s, e))) && (s = e, h = d)), e = e.next;
    while (e !== o);
    return s;
  }
  function L_(i, t) {
    return xe(i.prev, i, t.prev) < 0 && xe(t.next, i, i.next) < 0;
  }
  function D_(i, t, e, n) {
    let s = i;
    do
      s.z === 0 && (s.z = tl(s.x, s.y, t, e, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
    while (s !== i);
    s.prevZ.nextZ = null, s.prevZ = null, U_(s);
  }
  function U_(i) {
    let t, e, n, s, r, a, o, c, l = 1;
    do {
      for (e = i, i = null, r = null, a = 0; e; ) {
        for (a++, n = e, o = 0, t = 0; t < l && (o++, n = n.nextZ, !!n); t++) ;
        for (c = l; o > 0 || c > 0 && n; ) o !== 0 && (c === 0 || !n || e.z <= n.z) ? (s = e, e = e.nextZ, o--) : (s = n, n = n.nextZ, c--), r ? r.nextZ = s : i = s, s.prevZ = r, r = s;
        e = n;
      }
      r.nextZ = null, l *= 2;
    } while (a > 1);
    return i;
  }
  function tl(i, t, e, n, s) {
    return i = (i - e) * s | 0, t = (t - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
  }
  function N_(i) {
    let t = i, e = i;
    do
      (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
    while (t !== i);
    return e;
  }
  function rs(i, t, e, n, s, r, a, o) {
    return (s - a) * (t - o) >= (i - a) * (r - o) && (i - a) * (n - o) >= (e - a) * (t - o) && (e - a) * (r - o) >= (s - a) * (n - o);
  }
  function F_(i, t) {
    return i.next.i !== t.i && i.prev.i !== t.i && !O_(i, t) && (rr(i, t) && rr(t, i) && B_(i, t) && (xe(i.prev, i, t.prev) || xe(i, t.prev, t)) || ka(i, t) && xe(i.prev, i, i.next) > 0 && xe(t.prev, t, t.next) > 0);
  }
  function xe(i, t, e) {
    return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
  }
  function ka(i, t) {
    return i.x === t.x && i.y === t.y;
  }
  function Hu(i, t, e, n) {
    let s = Kr(xe(i, t, e)), r = Kr(xe(i, t, n)), a = Kr(xe(e, n, i)), o = Kr(xe(e, n, t));
    return !!(s !== r && a !== o || s === 0 && $r(i, e, t) || r === 0 && $r(i, n, t) || a === 0 && $r(e, i, n) || o === 0 && $r(e, t, n));
  }
  function $r(i, t, e) {
    return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
  }
  function Kr(i) {
    return i > 0 ? 1 : i < 0 ? -1 : 0;
  }
  function O_(i, t) {
    let e = i;
    do {
      if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Hu(e, e.next, i, t)) return true;
      e = e.next;
    } while (e !== i);
    return false;
  }
  function rr(i, t) {
    return xe(i.prev, i, i.next) < 0 ? xe(i, t, i.next) >= 0 && xe(i, i.prev, t) >= 0 : xe(i, t, i.prev) < 0 || xe(i, i.next, t) < 0;
  }
  function B_(i, t) {
    let e = i, n = false, s = (i.x + t.x) / 2, r = (i.y + t.y) / 2;
    do
      e.y > r != e.next.y > r && e.next.y !== e.y && s < (e.next.x - e.x) * (r - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
    while (e !== i);
    return n;
  }
  function Gu(i, t) {
    let e = new el(i.i, i.x, i.y), n = new el(t.i, t.x, t.y), s = i.next, r = t.prev;
    return i.next = t, t.prev = i, e.next = s, s.prev = e, n.next = e, e.prev = n, r.next = n, n.prev = r, n;
  }
  function du(i, t, e, n) {
    let s = new el(i, t, e);
    return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
  }
  function ar(i) {
    i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
  }
  function el(i, t, e) {
    this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = false;
  }
  function z_(i, t, e, n) {
    let s = 0;
    for (let r = t, a = e - n; r < e; r += n) s += (i[a] - i[r]) * (i[r + 1] + i[a + 1]), a = r;
    return s;
  }
  var $s = class i {
    static area(t) {
      let e = t.length, n = 0;
      for (let s = e - 1, r = 0; r < e; s = r++) n += t[s].x * t[r].y - t[r].x * t[s].y;
      return n * 0.5;
    }
    static isClockWise(t) {
      return i.area(t) < 0;
    }
    static triangulateShape(t, e) {
      let n = [], s = [], r = [];
      fu(t), pu(n, t);
      let a = t.length;
      e.forEach(fu);
      for (let c = 0; c < e.length; c++) s.push(a), a += e[c].length, pu(n, e[c]);
      let o = b_.triangulate(n, s);
      for (let c = 0; c < o.length; c += 3) r.push(o.slice(c, c + 3));
      return r;
    }
  };
  function fu(i) {
    let t = i.length;
    t > 2 && i[t - 1].equals(i[0]) && i.pop();
  }
  function pu(i, t) {
    for (let e = 0; e < t.length; e++) i.push(t[e].x), i.push(t[e].y);
  }
  var Pa = class i extends Se {
    constructor(t = new ir([new ht(0.5, 0.5), new ht(-0.5, 0.5), new ht(-0.5, -0.5), new ht(0.5, -0.5)]), e = {}) {
      super(), this.type = "ExtrudeGeometry", this.parameters = { shapes: t, options: e }, t = Array.isArray(t) ? t : [t];
      let n = this, s = [], r = [];
      for (let o = 0, c = t.length; o < c; o++) {
        let l = t[o];
        a(l);
      }
      this.setAttribute("position", new te(s, 3)), this.setAttribute("uv", new te(r, 2)), this.computeVertexNormals();
      function a(o) {
        let c = [], l = e.curveSegments !== void 0 ? e.curveSegments : 12, h = e.steps !== void 0 ? e.steps : 1, d = e.depth !== void 0 ? e.depth : 1, u = e.bevelEnabled !== void 0 ? e.bevelEnabled : true, p = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2, g = e.bevelSize !== void 0 ? e.bevelSize : p - 0.1, v = e.bevelOffset !== void 0 ? e.bevelOffset : 0, m = e.bevelSegments !== void 0 ? e.bevelSegments : 3, f = e.extrudePath, E = e.UVGenerator !== void 0 ? e.UVGenerator : k_, x, _ = false, D, R, C, L;
        f && (x = f.getSpacedPoints(h), _ = true, u = false, D = f.computeFrenetFrames(h, false), R = new T(), C = new T(), L = new T()), u || (m = 0, p = 0, g = 0, v = 0);
        let b = o.extractPoints(l), M = b.shape, I = b.holes;
        if (!$s.isClockWise(M)) {
          M = M.reverse();
          for (let Q = 0, it = I.length; Q < it; Q++) {
            let A = I[Q];
            $s.isClockWise(A) && (I[Q] = A.reverse());
          }
        }
        let B = $s.triangulateShape(M, I), G = M;
        for (let Q = 0, it = I.length; Q < it; Q++) {
          let A = I[Q];
          M = M.concat(A);
        }
        function $(Q, it, A) {
          return it || console.error("THREE.ExtrudeGeometry: vec does not exist"), Q.clone().addScaledVector(it, A);
        }
        let W = M.length, nt = B.length;
        function X(Q, it, A) {
          let It, tt, Mt, ct = Q.x - it.x, Nt = Q.y - it.y, vt = A.x - Q.x, w = A.y - Q.y, y = ct * ct + Nt * Nt, O = ct * w - Nt * vt;
          if (Math.abs(O) > Number.EPSILON) {
            let Y = Math.sqrt(y), j = Math.sqrt(vt * vt + w * w), Z = it.x - Nt / Y, Tt = it.y + ct / Y, ft = A.x - w / j, yt = A.y + vt / j, Zt = ((ft - Z) * w - (yt - Tt) * vt) / (ct * w - Nt * vt);
            It = Z + ct * Zt - Q.x, tt = Tt + Nt * Zt - Q.y;
            let et = It * It + tt * tt;
            if (et <= 2) return new ht(It, tt);
            Mt = Math.sqrt(et / 2);
          } else {
            let Y = false;
            ct > Number.EPSILON ? vt > Number.EPSILON && (Y = true) : ct < -Number.EPSILON ? vt < -Number.EPSILON && (Y = true) : Math.sign(Nt) === Math.sign(w) && (Y = true), Y ? (It = -Nt, tt = ct, Mt = Math.sqrt(y)) : (It = ct, tt = Nt, Mt = Math.sqrt(y / 2));
          }
          return new ht(It / Mt, tt / Mt);
        }
        let lt = [];
        for (let Q = 0, it = G.length, A = it - 1, It = Q + 1; Q < it; Q++, A++, It++) A === it && (A = 0), It === it && (It = 0), lt[Q] = X(G[Q], G[A], G[It]);
        let xt = [], Et, Vt = lt.concat();
        for (let Q = 0, it = I.length; Q < it; Q++) {
          let A = I[Q];
          Et = [];
          for (let It = 0, tt = A.length, Mt = tt - 1, ct = It + 1; It < tt; It++, Mt++, ct++) Mt === tt && (Mt = 0), ct === tt && (ct = 0), Et[It] = X(A[It], A[Mt], A[ct]);
          xt.push(Et), Vt = Vt.concat(Et);
        }
        for (let Q = 0; Q < m; Q++) {
          let it = Q / m, A = p * Math.cos(it * Math.PI / 2), It = g * Math.sin(it * Math.PI / 2) + v;
          for (let tt = 0, Mt = G.length; tt < Mt; tt++) {
            let ct = $(G[tt], lt[tt], It);
            at(ct.x, ct.y, -A);
          }
          for (let tt = 0, Mt = I.length; tt < Mt; tt++) {
            let ct = I[tt];
            Et = xt[tt];
            for (let Nt = 0, vt = ct.length; Nt < vt; Nt++) {
              let w = $(ct[Nt], Et[Nt], It);
              at(w.x, w.y, -A);
            }
          }
        }
        let ne = g + v;
        for (let Q = 0; Q < W; Q++) {
          let it = u ? $(M[Q], Vt[Q], ne) : M[Q];
          _ ? (C.copy(D.normals[0]).multiplyScalar(it.x), R.copy(D.binormals[0]).multiplyScalar(it.y), L.copy(x[0]).add(C).add(R), at(L.x, L.y, L.z)) : at(it.x, it.y, 0);
        }
        for (let Q = 1; Q <= h; Q++) for (let it = 0; it < W; it++) {
          let A = u ? $(M[it], Vt[it], ne) : M[it];
          _ ? (C.copy(D.normals[Q]).multiplyScalar(A.x), R.copy(D.binormals[Q]).multiplyScalar(A.y), L.copy(x[Q]).add(C).add(R), at(L.x, L.y, L.z)) : at(A.x, A.y, d / h * Q);
        }
        for (let Q = m - 1; Q >= 0; Q--) {
          let it = Q / m, A = p * Math.cos(it * Math.PI / 2), It = g * Math.sin(it * Math.PI / 2) + v;
          for (let tt = 0, Mt = G.length; tt < Mt; tt++) {
            let ct = $(G[tt], lt[tt], It);
            at(ct.x, ct.y, d + A);
          }
          for (let tt = 0, Mt = I.length; tt < Mt; tt++) {
            let ct = I[tt];
            Et = xt[tt];
            for (let Nt = 0, vt = ct.length; Nt < vt; Nt++) {
              let w = $(ct[Nt], Et[Nt], It);
              _ ? at(w.x, w.y + x[h - 1].y, x[h - 1].x + A) : at(w.x, w.y, d + A);
            }
          }
        }
        J(), st();
        function J() {
          let Q = s.length / 3;
          if (u) {
            let it = 0, A = W * it;
            for (let It = 0; It < nt; It++) {
              let tt = B[It];
              Lt(tt[2] + A, tt[1] + A, tt[0] + A);
            }
            it = h + m * 2, A = W * it;
            for (let It = 0; It < nt; It++) {
              let tt = B[It];
              Lt(tt[0] + A, tt[1] + A, tt[2] + A);
            }
          } else {
            for (let it = 0; it < nt; it++) {
              let A = B[it];
              Lt(A[2], A[1], A[0]);
            }
            for (let it = 0; it < nt; it++) {
              let A = B[it];
              Lt(A[0] + W * h, A[1] + W * h, A[2] + W * h);
            }
          }
          n.addGroup(Q, s.length / 3 - Q, 0);
        }
        function st() {
          let Q = s.length / 3, it = 0;
          wt(G, it), it += G.length;
          for (let A = 0, It = I.length; A < It; A++) {
            let tt = I[A];
            wt(tt, it), it += tt.length;
          }
          n.addGroup(Q, s.length / 3 - Q, 1);
        }
        function wt(Q, it) {
          let A = Q.length;
          for (; --A >= 0; ) {
            let It = A, tt = A - 1;
            tt < 0 && (tt = Q.length - 1);
            for (let Mt = 0, ct = h + m * 2; Mt < ct; Mt++) {
              let Nt = W * Mt, vt = W * (Mt + 1), w = it + It + Nt, y = it + tt + Nt, O = it + tt + vt, Y = it + It + vt;
              zt(w, y, O, Y);
            }
          }
        }
        function at(Q, it, A) {
          c.push(Q), c.push(it), c.push(A);
        }
        function Lt(Q, it, A) {
          Ot(Q), Ot(it), Ot(A);
          let It = s.length / 3, tt = E.generateTopUV(n, s, It - 3, It - 2, It - 1);
          Kt(tt[0]), Kt(tt[1]), Kt(tt[2]);
        }
        function zt(Q, it, A, It) {
          Ot(Q), Ot(it), Ot(It), Ot(it), Ot(A), Ot(It);
          let tt = s.length / 3, Mt = E.generateSideWallUV(n, s, tt - 6, tt - 3, tt - 2, tt - 1);
          Kt(Mt[0]), Kt(Mt[1]), Kt(Mt[3]), Kt(Mt[1]), Kt(Mt[2]), Kt(Mt[3]);
        }
        function Ot(Q) {
          s.push(c[Q * 3 + 0]), s.push(c[Q * 3 + 1]), s.push(c[Q * 3 + 2]);
        }
        function Kt(Q) {
          r.push(Q.x), r.push(Q.y);
        }
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    toJSON() {
      let t = super.toJSON(), e = this.parameters.shapes, n = this.parameters.options;
      return V_(e, n, t);
    }
    static fromJSON(t, e) {
      let n = [];
      for (let r = 0, a = t.shapes.length; r < a; r++) {
        let o = e[t.shapes[r]];
        n.push(o);
      }
      let s = t.options.extrudePath;
      return s !== void 0 && (t.options.extrudePath = new Ca[s.type]().fromJSON(s)), new i(n, t.options);
    }
  }, k_ = { generateTopUV: function(i, t, e, n, s) {
    let r = t[e * 3], a = t[e * 3 + 1], o = t[n * 3], c = t[n * 3 + 1], l = t[s * 3], h = t[s * 3 + 1];
    return [new ht(r, a), new ht(o, c), new ht(l, h)];
  }, generateSideWallUV: function(i, t, e, n, s, r) {
    let a = t[e * 3], o = t[e * 3 + 1], c = t[e * 3 + 2], l = t[n * 3], h = t[n * 3 + 1], d = t[n * 3 + 2], u = t[s * 3], p = t[s * 3 + 1], g = t[s * 3 + 2], v = t[r * 3], m = t[r * 3 + 1], f = t[r * 3 + 2];
    return Math.abs(o - h) < Math.abs(a - l) ? [new ht(a, 1 - c), new ht(l, 1 - d), new ht(u, 1 - g), new ht(v, 1 - f)] : [new ht(o, 1 - c), new ht(h, 1 - d), new ht(p, 1 - g), new ht(m, 1 - f)];
  } };
  function V_(i, t, e) {
    if (e.shapes = [], Array.isArray(i)) for (let n = 0, s = i.length; n < s; n++) {
      let r = i[n];
      e.shapes.push(r.uuid);
    }
    else e.shapes.push(i.uuid);
    return e.options = Object.assign({}, t), t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()), e;
  }
  var or = class i extends jc {
    constructor(t = 1, e = 0) {
      let n = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], s = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
      super(n, s, t, e), this.type = "OctahedronGeometry", this.parameters = { radius: t, detail: e };
    }
    static fromJSON(t) {
      return new i(t.radius, t.detail);
    }
  };
  var pn = class i extends Se {
    constructor(t = 1, e = 32, n = 16, s = 0, r = Math.PI * 2, a = 0, o = Math.PI) {
      super(), this.type = "SphereGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: n, phiStart: s, phiLength: r, thetaStart: a, thetaLength: o }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
      let c = Math.min(a + o, Math.PI), l = 0, h = [], d = new T(), u = new T(), p = [], g = [], v = [], m = [];
      for (let f = 0; f <= n; f++) {
        let E = [], x = f / n, _ = 0;
        f === 0 && a === 0 ? _ = 0.5 / e : f === n && c === Math.PI && (_ = -0.5 / e);
        for (let D = 0; D <= e; D++) {
          let R = D / e;
          d.x = -t * Math.cos(s + R * r) * Math.sin(a + x * o), d.y = t * Math.cos(a + x * o), d.z = t * Math.sin(s + R * r) * Math.sin(a + x * o), g.push(d.x, d.y, d.z), u.copy(d).normalize(), v.push(u.x, u.y, u.z), m.push(R + _, 1 - x), E.push(l++);
        }
        h.push(E);
      }
      for (let f = 0; f < n; f++) for (let E = 0; E < e; E++) {
        let x = h[f][E + 1], _ = h[f][E], D = h[f + 1][E], R = h[f + 1][E + 1];
        (f !== 0 || a > 0) && p.push(x, _, R), (f !== n - 1 || c < Math.PI) && p.push(_, D, R);
      }
      this.setIndex(p), this.setAttribute("position", new te(g, 3)), this.setAttribute("normal", new te(v, 3)), this.setAttribute("uv", new te(m, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
    }
  };
  var hi = class i extends Se {
    constructor(t = 1, e = 0.4, n = 12, s = 48, r = Math.PI * 2) {
      super(), this.type = "TorusGeometry", this.parameters = { radius: t, tube: e, radialSegments: n, tubularSegments: s, arc: r }, n = Math.floor(n), s = Math.floor(s);
      let a = [], o = [], c = [], l = [], h = new T(), d = new T(), u = new T();
      for (let p = 0; p <= n; p++) for (let g = 0; g <= s; g++) {
        let v = g / s * r, m = p / n * Math.PI * 2;
        d.x = (t + e * Math.cos(m)) * Math.cos(v), d.y = (t + e * Math.cos(m)) * Math.sin(v), d.z = e * Math.sin(m), o.push(d.x, d.y, d.z), h.x = t * Math.cos(v), h.y = t * Math.sin(v), u.subVectors(d, h).normalize(), c.push(u.x, u.y, u.z), l.push(g / s), l.push(p / n);
      }
      for (let p = 1; p <= n; p++) for (let g = 1; g <= s; g++) {
        let v = (s + 1) * p + g - 1, m = (s + 1) * (p - 1) + g - 1, f = (s + 1) * (p - 1) + g, E = (s + 1) * p + g;
        a.push(v, m, E), a.push(m, f, E);
      }
      this.setIndex(a), this.setAttribute("position", new te(o, 3)), this.setAttribute("normal", new te(c, 3)), this.setAttribute("uv", new te(l, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
    }
  };
  var La = class i extends Se {
    constructor(t = new Aa(new T(-1, -1, 0), new T(-1, 1, 0), new T(1, 1, 0)), e = 64, n = 1, s = 8, r = false) {
      super(), this.type = "TubeGeometry", this.parameters = { path: t, tubularSegments: e, radius: n, radialSegments: s, closed: r };
      let a = t.computeFrenetFrames(e, r);
      this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
      let o = new T(), c = new T(), l = new ht(), h = new T(), d = [], u = [], p = [], g = [];
      v(), this.setIndex(g), this.setAttribute("position", new te(d, 3)), this.setAttribute("normal", new te(u, 3)), this.setAttribute("uv", new te(p, 2));
      function v() {
        for (let x = 0; x < e; x++) m(x);
        m(r === false ? e : 0), E(), f();
      }
      function m(x) {
        h = t.getPointAt(x / e, h);
        let _ = a.normals[x], D = a.binormals[x];
        for (let R = 0; R <= s; R++) {
          let C = R / s * Math.PI * 2, L = Math.sin(C), b = -Math.cos(C);
          c.x = b * _.x + L * D.x, c.y = b * _.y + L * D.y, c.z = b * _.z + L * D.z, c.normalize(), u.push(c.x, c.y, c.z), o.x = h.x + n * c.x, o.y = h.y + n * c.y, o.z = h.z + n * c.z, d.push(o.x, o.y, o.z);
        }
      }
      function f() {
        for (let x = 1; x <= e; x++) for (let _ = 1; _ <= s; _++) {
          let D = (s + 1) * (x - 1) + (_ - 1), R = (s + 1) * x + (_ - 1), C = (s + 1) * x + _, L = (s + 1) * (x - 1) + _;
          g.push(D, R, L), g.push(R, C, L);
        }
      }
      function E() {
        for (let x = 0; x <= e; x++) for (let _ = 0; _ <= s; _++) l.x = x / e, l.y = _ / s, p.push(l.x, l.y);
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.path = this.parameters.path.toJSON(), t;
    }
    static fromJSON(t) {
      return new i(new Ca[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
    }
  };
  var cr = class extends Gn {
    static get type() {
      return "MeshStandardMaterial";
    }
    constructor(t) {
      super(), this.isMeshStandardMaterial = true, this.defines = { STANDARD: "" }, this.color = new Ht(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ht(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Pu, this.normalScale = new ht(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new En(), this.envMapIntensity = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
    }
  };
  function Qr(i, t, e) {
    return !i || !e && i.constructor === t ? i : typeof t.BYTES_PER_ELEMENT == "number" ? new t(i) : Array.prototype.slice.call(i);
  }
  function H_(i) {
    return ArrayBuffer.isView(i) && !(i instanceof DataView);
  }
  var ys = class {
    constructor(t, e, n, s) {
      this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = s !== void 0 ? s : new e.constructor(n), this.sampleValues = e, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
    }
    evaluate(t) {
      let e = this.parameterPositions, n = this._cachedIndex, s = e[n], r = e[n - 1];
      n: {
        t: {
          let a;
          e: {
            i: if (!(t < s)) {
              for (let o = n + 2; ; ) {
                if (s === void 0) {
                  if (t < r) break i;
                  return n = e.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
                }
                if (n === o) break;
                if (r = s, s = e[++n], t < s) break t;
              }
              a = e.length;
              break e;
            }
            if (!(t >= r)) {
              let o = e[1];
              t < o && (n = 2, r = o);
              for (let c = n - 2; ; ) {
                if (r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
                if (n === c) break;
                if (s = r, r = e[--n - 1], t >= r) break t;
              }
              a = n, n = 0;
              break e;
            }
            break n;
          }
          for (; n < a; ) {
            let o = n + a >>> 1;
            t < e[o] ? a = o : n = o + 1;
          }
          if (s = e[n], r = e[n - 1], r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
          if (s === void 0) return n = e.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
        }
        this._cachedIndex = n, this.intervalChanged_(n, r, s);
      }
      return this.interpolate_(n, r, t, s);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(t) {
      let e = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = t * s;
      for (let a = 0; a !== s; ++a) e[a] = n[r + a];
      return e;
    }
    interpolate_() {
      throw new Error("call to abstract method");
    }
    intervalChanged_() {
    }
  }, nl = class extends ys {
    constructor(t, e, n, s) {
      super(t, e, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: oh, endingEnd: oh };
    }
    intervalChanged_(t, e, n) {
      let s = this.parameterPositions, r = t - 2, a = t + 1, o = s[r], c = s[a];
      if (o === void 0) switch (this.getSettings_().endingStart) {
        case ch:
          r = t, o = 2 * e - n;
          break;
        case lh:
          r = s.length - 2, o = e + s[r] - s[r + 1];
          break;
        default:
          r = t, o = n;
      }
      if (c === void 0) switch (this.getSettings_().endingEnd) {
        case ch:
          a = t, c = 2 * n - e;
          break;
        case lh:
          a = 1, c = n + s[1] - s[0];
          break;
        default:
          a = t - 1, c = e;
      }
      let l = (n - e) * 0.5, h = this.valueSize;
      this._weightPrev = l / (e - o), this._weightNext = l / (c - n), this._offsetPrev = r * h, this._offsetNext = a * h;
    }
    interpolate_(t, e, n, s) {
      let r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = t * o, l = c - o, h = this._offsetPrev, d = this._offsetNext, u = this._weightPrev, p = this._weightNext, g = (n - e) / (s - e), v = g * g, m = v * g, f = -u * m + 2 * u * v - u * g, E = (1 + u) * m + (-1.5 - 2 * u) * v + (-0.5 + u) * g + 1, x = (-1 - p) * m + (1.5 + p) * v + 0.5 * g, _ = p * m - p * v;
      for (let D = 0; D !== o; ++D) r[D] = f * a[h + D] + E * a[l + D] + x * a[c + D] + _ * a[d + D];
      return r;
    }
  }, il = class extends ys {
    constructor(t, e, n, s) {
      super(t, e, n, s);
    }
    interpolate_(t, e, n, s) {
      let r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = t * o, l = c - o, h = (n - e) / (s - e), d = 1 - h;
      for (let u = 0; u !== o; ++u) r[u] = a[l + u] * d + a[c + u] * h;
      return r;
    }
  }, sl = class extends ys {
    constructor(t, e, n, s) {
      super(t, e, n, s);
    }
    interpolate_(t) {
      return this.copySampleValue_(t - 1);
    }
  }, mn = class {
    constructor(t, e, n, s) {
      if (t === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (e === void 0 || e.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
      this.name = t, this.times = Qr(e, this.TimeBufferType), this.values = Qr(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
    }
    static toJSON(t) {
      let e = t.constructor, n;
      if (e.toJSON !== this.toJSON) n = e.toJSON(t);
      else {
        n = { name: t.name, times: Qr(t.times, Array), values: Qr(t.values, Array) };
        let s = t.getInterpolation();
        s !== t.DefaultInterpolation && (n.interpolation = s);
      }
      return n.type = t.ValueTypeName, n;
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new sl(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodLinear(t) {
      return new il(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodSmooth(t) {
      return new nl(this.times, this.values, this.getValueSize(), t);
    }
    setInterpolation(t) {
      let e;
      switch (t) {
        case ra:
          e = this.InterpolantFactoryMethodDiscrete;
          break;
        case Rc:
          e = this.InterpolantFactoryMethodLinear;
          break;
        case co:
          e = this.InterpolantFactoryMethodSmooth;
          break;
      }
      if (e === void 0) {
        let n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (this.createInterpolant === void 0) if (t !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
        else throw new Error(n);
        return console.warn("THREE.KeyframeTrack:", n), this;
      }
      return this.createInterpolant = e, this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return ra;
        case this.InterpolantFactoryMethodLinear:
          return Rc;
        case this.InterpolantFactoryMethodSmooth:
          return co;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(t) {
      if (t !== 0) {
        let e = this.times;
        for (let n = 0, s = e.length; n !== s; ++n) e[n] += t;
      }
      return this;
    }
    scale(t) {
      if (t !== 1) {
        let e = this.times;
        for (let n = 0, s = e.length; n !== s; ++n) e[n] *= t;
      }
      return this;
    }
    trim(t, e) {
      let n = this.times, s = n.length, r = 0, a = s - 1;
      for (; r !== s && n[r] < t; ) ++r;
      for (; a !== -1 && n[a] > e; ) --a;
      if (++a, r !== 0 || a !== s) {
        r >= a && (a = Math.max(a, 1), r = a - 1);
        let o = this.getValueSize();
        this.times = n.slice(r, a), this.values = this.values.slice(r * o, a * o);
      }
      return this;
    }
    validate() {
      let t = true, e = this.getValueSize();
      e - Math.floor(e) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), t = false);
      let n = this.times, s = this.values, r = n.length;
      r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), t = false);
      let a = null;
      for (let o = 0; o !== r; o++) {
        let c = n[o];
        if (typeof c == "number" && isNaN(c)) {
          console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, c), t = false;
          break;
        }
        if (a !== null && a > c) {
          console.error("THREE.KeyframeTrack: Out of order keys.", this, o, c, a), t = false;
          break;
        }
        a = c;
      }
      if (s !== void 0 && H_(s)) for (let o = 0, c = s.length; o !== c; ++o) {
        let l = s[o];
        if (isNaN(l)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, l), t = false;
          break;
        }
      }
      return t;
    }
    optimize() {
      let t = this.times.slice(), e = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === co, r = t.length - 1, a = 1;
      for (let o = 1; o < r; ++o) {
        let c = false, l = t[o], h = t[o + 1];
        if (l !== h && (o !== 1 || l !== t[0])) if (s) c = true;
        else {
          let d = o * n, u = d - n, p = d + n;
          for (let g = 0; g !== n; ++g) {
            let v = e[d + g];
            if (v !== e[u + g] || v !== e[p + g]) {
              c = true;
              break;
            }
          }
        }
        if (c) {
          if (o !== a) {
            t[a] = t[o];
            let d = o * n, u = a * n;
            for (let p = 0; p !== n; ++p) e[u + p] = e[d + p];
          }
          ++a;
        }
      }
      if (r > 0) {
        t[a] = t[r];
        for (let o = r * n, c = a * n, l = 0; l !== n; ++l) e[c + l] = e[o + l];
        ++a;
      }
      return a !== t.length ? (this.times = t.slice(0, a), this.values = e.slice(0, a * n)) : (this.times = t, this.values = e), this;
    }
    clone() {
      let t = this.times.slice(), e = this.values.slice(), n = this.constructor, s = new n(this.name, t, e);
      return s.createInterpolant = this.createInterpolant, s;
    }
  };
  mn.prototype.TimeBufferType = Float32Array;
  mn.prototype.ValueBufferType = Float32Array;
  mn.prototype.DefaultInterpolation = Rc;
  var Li = class extends mn {
    constructor(t, e, n) {
      super(t, e, n);
    }
  };
  Li.prototype.ValueTypeName = "bool";
  Li.prototype.ValueBufferType = Array;
  Li.prototype.DefaultInterpolation = ra;
  Li.prototype.InterpolantFactoryMethodLinear = void 0;
  Li.prototype.InterpolantFactoryMethodSmooth = void 0;
  var rl = class extends mn {
  };
  rl.prototype.ValueTypeName = "color";
  var al = class extends mn {
  };
  al.prototype.ValueTypeName = "number";
  var ol = class extends ys {
    constructor(t, e, n, s) {
      super(t, e, n, s);
    }
    interpolate_(t, e, n, s) {
      let r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = (n - e) / (s - e), l = t * o;
      for (let h = l + o; l !== h; l += 4) fn.slerpFlat(r, 0, a, l - o, a, l, c);
      return r;
    }
  }, Da = class extends mn {
    InterpolantFactoryMethodLinear(t) {
      return new ol(this.times, this.values, this.getValueSize(), t);
    }
  };
  Da.prototype.ValueTypeName = "quaternion";
  Da.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Di = class extends mn {
    constructor(t, e, n) {
      super(t, e, n);
    }
  };
  Di.prototype.ValueTypeName = "string";
  Di.prototype.ValueBufferType = Array;
  Di.prototype.DefaultInterpolation = ra;
  Di.prototype.InterpolantFactoryMethodLinear = void 0;
  Di.prototype.InterpolantFactoryMethodSmooth = void 0;
  var cl = class extends mn {
  };
  cl.prototype.ValueTypeName = "vector";
  var ll = class {
    constructor(t, e, n) {
      let s = this, r = false, a = 0, o = 0, c, l = [];
      this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function(h) {
        o++, r === false && s.onStart !== void 0 && s.onStart(h, a, o), r = true;
      }, this.itemEnd = function(h) {
        a++, s.onProgress !== void 0 && s.onProgress(h, a, o), a === o && (r = false, s.onLoad !== void 0 && s.onLoad());
      }, this.itemError = function(h) {
        s.onError !== void 0 && s.onError(h);
      }, this.resolveURL = function(h) {
        return c ? c(h) : h;
      }, this.setURLModifier = function(h) {
        return c = h, this;
      }, this.addHandler = function(h, d) {
        return l.push(h, d), this;
      }, this.removeHandler = function(h) {
        let d = l.indexOf(h);
        return d !== -1 && l.splice(d, 2), this;
      }, this.getHandler = function(h) {
        for (let d = 0, u = l.length; d < u; d += 2) {
          let p = l[d], g = l[d + 1];
          if (p.global && (p.lastIndex = 0), p.test(h)) return g;
        }
        return null;
      };
    }
  }, G_ = new ll(), hl = class {
    constructor(t) {
      this.manager = t !== void 0 ? t : G_, this.crossOrigin = "anonymous", this.withCredentials = false, this.path = "", this.resourcePath = "", this.requestHeader = {};
    }
    load() {
    }
    loadAsync(t, e) {
      let n = this;
      return new Promise(function(s, r) {
        n.load(t, s, e, r);
      });
    }
    parse() {
    }
    setCrossOrigin(t) {
      return this.crossOrigin = t, this;
    }
    setWithCredentials(t) {
      return this.withCredentials = t, this;
    }
    setPath(t) {
      return this.path = t, this;
    }
    setResourcePath(t) {
      return this.resourcePath = t, this;
    }
    setRequestHeader(t) {
      return this.requestHeader = t, this;
    }
  };
  hl.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  var Ua = class extends Pe {
    constructor(t, e = 1) {
      super(), this.isLight = true, this.type = "Light", this.color = new Ht(t), this.intensity = e;
    }
    dispose() {
    }
    copy(t, e) {
      return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
    }
  }, Na = class extends Ua {
    constructor(t, e, n) {
      super(t, n), this.isHemisphereLight = true, this.type = "HemisphereLight", this.position.copy(Pe.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Ht(e);
    }
    copy(t, e) {
      return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
    }
  }, Ho = new ee(), mu = new T(), gu = new T(), ul = class {
    constructor(t) {
      this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new ht(512, 512), this.map = null, this.mapPass = null, this.matrix = new ee(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new js(), this._frameExtents = new ht(1, 1), this._viewportCount = 1, this._viewports = [new ye(0, 0, 1, 1)];
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(t) {
      let e = this.camera, n = this.matrix;
      mu.setFromMatrixPosition(t.matrixWorld), e.position.copy(mu), gu.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(gu), e.updateMatrixWorld(), Ho.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ho), n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(Ho);
    }
    getViewport(t) {
      return this._viewports[t];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
    }
    copy(t) {
      return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      let t = {};
      return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(false).object, delete t.camera.matrix, t;
    }
  };
  var dl = class extends ul {
    constructor() {
      super(new pa(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = true;
    }
  }, lr = class extends Ua {
    constructor(t, e) {
      super(t, e), this.isDirectionalLight = true, this.type = "DirectionalLight", this.position.copy(Pe.DEFAULT_UP), this.updateMatrix(), this.target = new Pe(), this.shadow = new dl();
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(t) {
      return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
    }
  };
  var Al = "\\[\\]\\.:\\/", W_ = new RegExp("[" + Al + "]", "g"), Rl = "[^" + Al + "]", X_ = "[^" + Al.replace("\\.", "") + "]", q_ = /((?:WC+[\/:])*)/.source.replace("WC", Rl), Y_ = /(WCOD+)?/.source.replace("WCOD", X_), Z_ = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Rl), J_ = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Rl), $_ = new RegExp("^" + q_ + Y_ + Z_ + J_ + "$"), K_ = ["material", "materials", "bones", "map"], fl = class {
    constructor(t, e, n) {
      let s = n || me.parseTrackName(e);
      this._targetGroup = t, this._bindings = t.subscribe_(e, s);
    }
    getValue(t, e) {
      this.bind();
      let n = this._targetGroup.nCachedObjects_, s = this._bindings[n];
      s !== void 0 && s.getValue(t, e);
    }
    setValue(t, e) {
      let n = this._bindings;
      for (let s = this._targetGroup.nCachedObjects_, r = n.length; s !== r; ++s) n[s].setValue(t, e);
    }
    bind() {
      let t = this._bindings;
      for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].bind();
    }
    unbind() {
      let t = this._bindings;
      for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].unbind();
    }
  }, me = class i {
    constructor(t, e, n) {
      this.path = e, this.parsedPath = n || i.parseTrackName(e), this.node = i.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
    static create(t, e, n) {
      return t && t.isAnimationObjectGroup ? new i.Composite(t, e, n) : new i(t, e, n);
    }
    static sanitizeNodeName(t) {
      return t.replace(/\s/g, "_").replace(W_, "");
    }
    static parseTrackName(t) {
      let e = $_.exec(t);
      if (e === null) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
      let n = { nodeName: e[2], objectName: e[3], objectIndex: e[4], propertyName: e[5], propertyIndex: e[6] }, s = n.nodeName && n.nodeName.lastIndexOf(".");
      if (s !== void 0 && s !== -1) {
        let r = n.nodeName.substring(s + 1);
        K_.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
      }
      if (n.propertyName === null || n.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
      return n;
    }
    static findNode(t, e) {
      if (e === void 0 || e === "" || e === "." || e === -1 || e === t.name || e === t.uuid) return t;
      if (t.skeleton) {
        let n = t.skeleton.getBoneByName(e);
        if (n !== void 0) return n;
      }
      if (t.children) {
        let n = function(r) {
          for (let a = 0; a < r.length; a++) {
            let o = r[a];
            if (o.name === e || o.uuid === e) return o;
            let c = n(o.children);
            if (c) return c;
          }
          return null;
        }, s = n(t.children);
        if (s) return s;
      }
      return null;
    }
    _getValue_unavailable() {
    }
    _setValue_unavailable() {
    }
    _getValue_direct(t, e) {
      t[e] = this.targetObject[this.propertyName];
    }
    _getValue_array(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) t[e++] = n[s];
    }
    _getValue_arrayElement(t, e) {
      t[e] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(t, e) {
      this.resolvedProperty.toArray(t, e);
    }
    _setValue_direct(t, e) {
      this.targetObject[this.propertyName] = t[e];
    }
    _setValue_direct_setNeedsUpdate(t, e) {
      this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
      this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) n[s] = t[e++];
    }
    _setValue_array_setNeedsUpdate(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) n[s] = t[e++];
      this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) n[s] = t[e++];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e];
    }
    _setValue_arrayElement_setNeedsUpdate(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(t, e) {
      this.resolvedProperty.fromArray(t, e);
    }
    _setValue_fromArray_setNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(t, e) {
      this.bind(), this.getValue(t, e);
    }
    _setValue_unbound(t, e) {
      this.bind(), this.setValue(t, e);
    }
    bind() {
      let t = this.node, e = this.parsedPath, n = e.objectName, s = e.propertyName, r = e.propertyIndex;
      if (t || (t = i.findNode(this.rootNode, e.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
        console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
        return;
      }
      if (n) {
        let l = e.objectIndex;
        switch (n) {
          case "materials":
            if (!t.material) {
              console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
              return;
            }
            if (!t.material.materials) {
              console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
              return;
            }
            t = t.material.materials;
            break;
          case "bones":
            if (!t.skeleton) {
              console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
              return;
            }
            t = t.skeleton.bones;
            for (let h = 0; h < t.length; h++) if (t[h].name === l) {
              l = h;
              break;
            }
            break;
          case "map":
            if ("map" in t) {
              t = t.map;
              break;
            }
            if (!t.material) {
              console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
              return;
            }
            if (!t.material.map) {
              console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
              return;
            }
            t = t.material.map;
            break;
          default:
            if (t[n] === void 0) {
              console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
              return;
            }
            t = t[n];
        }
        if (l !== void 0) {
          if (t[l] === void 0) {
            console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
            return;
          }
          t = t[l];
        }
      }
      let a = t[s];
      if (a === void 0) {
        let l = e.nodeName;
        console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + s + " but it wasn't found.", t);
        return;
      }
      let o = this.Versioning.None;
      this.targetObject = t, t.needsUpdate !== void 0 ? o = this.Versioning.NeedsUpdate : t.matrixWorldNeedsUpdate !== void 0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
      let c = this.BindingType.Direct;
      if (r !== void 0) {
        if (s === "morphTargetInfluences") {
          if (!t.geometry) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
            return;
          }
          if (!t.geometry.morphAttributes) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
            return;
          }
          t.morphTargetDictionary[r] !== void 0 && (r = t.morphTargetDictionary[r]);
        }
        c = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = r;
      } else a.fromArray !== void 0 && a.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (c = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = s;
      this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][o];
    }
    unbind() {
      this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
  };
  me.Composite = fl;
  me.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 };
  me.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 };
  me.prototype.GetterByBindingType = [me.prototype._getValue_direct, me.prototype._getValue_array, me.prototype._getValue_arrayElement, me.prototype._getValue_toArray];
  me.prototype.SetterByBindingTypeAndVersioning = [[me.prototype._setValue_direct, me.prototype._setValue_direct_setNeedsUpdate, me.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [me.prototype._setValue_array, me.prototype._setValue_array_setNeedsUpdate, me.prototype._setValue_array_setMatrixWorldNeedsUpdate], [me.prototype._setValue_arrayElement, me.prototype._setValue_arrayElement_setNeedsUpdate, me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [me.prototype._setValue_fromArray, me.prototype._setValue_fromArray_setNeedsUpdate, me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
  var Nx = new Float32Array(1);
  var _u = new ee(), hr = class {
    constructor(t, e, n = 0, s = 1 / 0) {
      this.ray = new ms(t, e), this.near = n, this.far = s, this.camera = null, this.layers = new Qs(), this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} };
    }
    set(t, e) {
      this.ray.set(t, e);
    }
    setFromCamera(t, e) {
      e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(), this.camera = e) : e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld), this.camera = e) : console.error("THREE.Raycaster: Unsupported camera type: " + e.type);
    }
    setFromXRController(t) {
      return _u.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(_u), this;
    }
    intersectObject(t, e = true, n = []) {
      return pl(t, this, n, e), n.sort(xu), n;
    }
    intersectObjects(t, e = true, n = []) {
      for (let s = 0, r = t.length; s < r; s++) pl(t[s], this, n, e);
      return n.sort(xu), n;
    }
  };
  function xu(i, t) {
    return i.distance - t.distance;
  }
  function pl(i, t, e, n) {
    let s = true;
    if (i.layers.test(t.layers) && i.raycast(t, e) === false && (s = false), s === true && n === true) {
      let r = i.children;
      for (let a = 0, o = r.length; a < o; a++) pl(r[a], t, e, true);
    }
  }
  var Fa = class extends Yc {
    constructor(t = 10, e = 10, n = 4473924, s = 8947848) {
      n = new Ht(n), s = new Ht(s);
      let r = e / 2, a = t / e, o = t / 2, c = [], l = [];
      for (let u = 0, p = 0, g = -o; u <= e; u++, g += a) {
        c.push(-o, 0, g, o, 0, g), c.push(g, 0, -o, g, 0, o);
        let v = u === r ? n : s;
        v.toArray(l, p), p += 3, v.toArray(l, p), p += 3, v.toArray(l, p), p += 3, v.toArray(l, p), p += 3;
      }
      let h = new Se();
      h.setAttribute("position", new te(c, 3)), h.setAttribute("color", new te(l, 3));
      let d = new Ii({ vertexColors: true, toneMapped: false });
      super(h, d), this.type = "GridHelper";
    }
    dispose() {
      this.geometry.dispose(), this.material.dispose();
    }
  };
  typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: ml } }));
  typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ml);
  var ut = (i) => document.querySelector(i), Ze = matchMedia("(pointer:coarse)").matches || innerWidth < 760, Dt = new va();
  Dt.background = new Ht(9217712);
  Dt.fog = new xa(10269109, 17e-4);
  var Ee = new _a({ antialias: true, powerPreference: "high-performance" });
  Ee.setPixelRatio(Math.min(devicePixelRatio, Ze ? 0.9 : 1));
  Ee.setSize(innerWidth, innerHeight);
  Ee.outputColorSpace = Xe;
  Ee.toneMapping = _l;
  Ee.toneMappingExposure = 1.34;
  Ee.shadowMap.enabled = false;
  Ee.shadowMap.type = gl;
  document.body.prepend(Ee.domElement);
  var qe = new ke(Ze ? 80 : 76, innerWidth / innerHeight, 0.045, 1250);
  qe.rotation.order = "YXZ";
  Dt.add(qe);
  Dt.add(new Na(14478064, 6318942, 2.05));
  var An = new lr(16769713, 2.55);
  An.position.set(-130, 230, -175);
  An.castShadow = false;
  An.shadow.mapSize.set(1024, 1024);
  An.shadow.camera.left = -110;
  An.shadow.camera.right = 110;
  An.shadow.camera.top = 110;
  An.shadow.camera.bottom = -110;
  An.shadow.bias = -13e-5;
  Dt.add(An);
  var $u = new lr(9288129, 0.65);
  $u.position.set(-65, 90, 140);
  Dt.add($u);
  var $t = (i, t = 0, e = 0.8, n = 0, s = 0) => new cr({ color: i, metalness: t, roughness: e, emissive: n, emissiveIntensity: s }), ot = { dark: $t(1713454, 0.67, 0.36), black: $t(1120025, 0.72, 0.29), iron: $t(4609635, 0.8, 0.29), steel: $t(12638168, 0.91, 0.23), edge: $t(15333100, 0.76, 0.19), bronze: $t(9992026, 0.8, 0.31), brass: $t(13544319, 0.72, 0.35), leather: $t(4732974, 0.04, 0.93), strap: $t(2367261, 0.02, 0.96), cloth: $t(5465690, 0, 1), shirt: $t(13091494, 0, 0.95), skin: $t(12029299, 0, 0.87), hair: $t(2301470, 0.05, 0.84), blade: $t(12373455, 0.91, 0.2), neon: $t(8186348, 0.12, 0.2, 4316400, 1.8), orange: $t(15968353, 0.3, 0.31, 16750394, 1.9) }, j_ = new pn(800, 32, 16), tx = new nn({ side: Fe, depthWrite: false, vertexShader: "varying vec3 vPos; void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}", fragmentShader: "varying vec3 vPos; void main(){float h=normalize(vPos).y; vec3 night=vec3(.17,.28,.36); vec3 horizon=vec3(.78,.78,.69); vec3 zenith=vec3(.35,.58,.73); vec3 c=mix(horizon,zenith,smoothstep(-.12,.58,h)); float sun=pow(max(0.,dot(normalize(vPos),normalize(vec3(-.5,.65,-.6)))),150.); c+=vec3(1.,.66,.29)*sun*.72; gl_FragColor=vec4(c,1.);}" });
  Dt.add(new Ce(j_, tx));
  var Ds = new Ci(1, 1, 1), ex = new Wn(1, 1, 1, 12), Fx = new pn(1, 12, 8);
  function he(i, t, e, n, s, r) {
    let a = new Ce(t, e);
    return n && a.position.set(...n), s && a.scale.set(...s), r && a.rotation.set(...r), a.castShadow = false, a.receiveShadow = false, i.add(a), a;
  }
  function Ut(i, t, e, n, s) {
    return he(i, Ds, t, e, n, s);
  }
  function Oe(i, t, e, n, s, r = 0, a = 12) {
    let o = he(i, new Wn(n, n, s, a), t, e);
    return r === 1 && (o.rotation.z = Math.PI / 2), r === 2 && (o.rotation.x = Math.PI / 2), o;
  }
  var Cl = 384929, ge = () => (Cl = Math.imul(Cl, 1664525) + 1013904223 | 0, (Cl >>> 0) / 4294967296), Ku = [], ki = [], Dl = [[], []], Xa = [], Qu = [], Ul = [], nx = $t(6003373, 0.25, 0.3, 3234666, 0.11), As = [10263952, 10260867, 7831421, 11706765, 9213072, 11182740, 8358795].map((i) => $t(i, 0.12, 0.83)), ju = $t(4673107, 0.13, 0.91), td = $t(6578004, 0.22, 0.86), ix = $t(5860187, 0.04, 0.98), ed = he(Dt, new _s(2200, 2200), ix, [0, -0.06, 0]);
  ed.rotation.x = -Math.PI / 2;
  ed.receiveShadow = true;
  var $a = new Fa(1080, 72, 6517610, 5465948);
  $a.position.y = 0.015;
  $a.material.transparent = true;
  $a.material.opacity = 0.08;
  Dt.add($a);
  function sx(i, t, e, n, s, r, bottom = 0) {
    Ku.push({ x: t, z: e, hx: n / 2, hz: s / 2, h: r, top: r, bottom, mesh: i }); if(!ki.includes(i))ki.push(i);
  }
  function sxCylinder(mesh,x,z,radius,top,bottom=0,radiusTop=radius){
    sx(mesh,x,z,radius*2,radius*2,top,bottom);
    Ku[Ku.length-1].radius=radius;Ku[Ku.length-1].radiusTop=radiusTop;
  }
  function nd(i, t, e, n, s, r = false) {
    let a = r && s > 40, o = he(Dt, Ds, As[Math.floor(ge() * As.length)], [i, s / 2, t], [e, s, n]);
    if (o.receiveShadow = !Ze && Math.abs(i) < 84 && Math.abs(t) < 84, o.castShadow = !Ze && Math.abs(i) < 84 && Math.abs(t) < 84, sx(o, i, t, e, n, s), a) Ut(Dt, ju, [i, s + 0.23, t], [e + 0.4, 0.48, n + 0.4]);
    else {
      let h = 2.5 + e * 0.16;
      Ku[Ku.length - 1].roofHeight = h + 0.16;
      Xa.push([i, s, t, e + 1.2, h, n + 1.2, ge()]), ge() > 0.34 && Qu.push([i + (ge() - 0.5) * e * 0.5, s + h * 0.48, t + (ge() - 0.5) * n * 0.35]);
    }
    s > 16 && Ut(Dt, td, [i, s - 0.36, t], [e + 0.16, 0.19, n + 0.16]);
    for (let h = 3.4; h < s - 1; h += 5.3) Ul.push([i - e / 2 - 0.045, h, t, 0.13, 0.13, n + 0.14]), Ul.push([i + e / 2 + 0.045, h, t, 0.13, 0.13, n + 0.14]);
    let c = ge() > 0.39, l = Math.min(17, Math.floor(s / 4.7));
    for (let h = 0; h < 2; h++) for (let d = 0; d < l; d++) {
      let u = 2.7 + d * 4.7;
      if (u > s - 1.5) break;
      if (h === 0) for (let p = -1; p <= 1; p++) Dl[c ? 0 : 1].push([i + e / 4 * p, u, t + n / 2 + 0.027, e * 0.14, 1.25, 0.065]);
      else for (let p = -1; p <= 1; p++) Dl[c ? 0 : 1].push([i + e / 2 + 0.027, u, t + n / 4 * p, 0.065, 1.25, n * 0.15]);
    }
    if (r) {
      let h = he(Dt, new hi(e * 0.28, 0.12, 7, 32), ot.neon, [i, s + 0.65, t]);
      h.rotation.x = Math.PI / 2, h.userData.spin = true;
    }
    return o;
  }
  const legacyTownStart = new Set(Dt.children);
  for (let i = -8; i <= 8; i++) for (let t = -8; t <= 8; t++) {
    let e = i * 32 + (ge() - 0.5) * 3.2, n = t * 32 + (ge() - 0.5) * 3.2;
    if (Math.abs(e) < 92 && n > -110 && n < 180 || Math.abs(i) <= 2 && Math.abs(t) <= 3 || Math.hypot(e - 220, n + 180) < 50 || ge() < 0.65) continue;
    let s = 12 + Math.floor(ge() * 5) * 5 + ge() * 6, r = 11 + ge() * 5, a = 11 + ge() * 5;
    nd(e, n, r, a, s, ge() > 0.92);
  }
  let _citySeed = Cl;
  Cl = 14893721;
  for (let i = -16; i <= 16; i++) for (let t = -16; t <= 16; t++) {
    if (Math.abs(i) <= 8 && Math.abs(t) <= 8) continue;
    let e = i * 32 + (ge() - 0.5) * 3.2, n = t * 32 + (ge() - 0.5) * 3.2;
    if (Math.hypot(e - 220, n + 180) < 52 || ge() < 0.92) continue;
    let s = 12 + Math.floor(ge() * 5) * 5 + ge() * 6, r = 11 + ge() * 5, a = 11 + ge() * 5, cityBlock = nd(e, n, r, a, s, ge() > 0.98);
    cityBlock.userData.cityOnly = true;
  }
  Cl = _citySeed;
  var raidDistrict = [];
  for (let side of [-1, 1]) for (let row = 0; row < 9; row++) {
    let z = -82 + row * 26, x = side * (z >= 86 || z <= -56 ? 38 : 64), height = 14 + row % 4 * 2.1;
    let house = nd(x, z, 17, 19, height);
    house.name = "raid-district-house";
    house.userData.cityOnly = true;
    raidDistrict.push(house);
  }
  for (let x of [-40, -16, 16, 40]) {
    let house = nd(x, -108, 18, 19, 17 + Math.abs(x) % 3);
    house.name = "raid-district-house";
    house.userData.cityOnly = true;
    raidDistrict.push(house);
  }
  function raidMasonry(kind) {
    let canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = kind === "roof" ? "#514036" : "#635f53";
    ctx.fillRect(0, 0, 256, 256);
    let height = kind === "roof" ? 16 : 32, width = kind === "roof" ? 32 : 64;
    for (let row = 0; row < 256 / height; row++) for (let col = -1; col < 256 / width + 1; col++) {
      let shade = kind === "roof" ? 120 + (row * 17 + col * 13) % 24 : 153 + (row * 11 + col * 7) % 20;
      ctx.fillStyle = kind === "roof" ? `rgb(${shade},${Math.round(shade * 0.58)},${Math.round(shade * 0.4)})` : `rgb(${shade},${shade - 6},${shade - 18})`;
      ctx.fillRect(col * width + row % 2 * width / 2 + 1, row * height + 1, width - 2, height - 2);
    }
    let texture = new je(canvas);
    texture.needsUpdate = true;
    texture.colorSpace = Xe;
    texture.wrapS = texture.wrapT = 1e3;
    return texture;
  }
  var raidStoneTexture = raidMasonry("stone"), raidRoofTexture = raidMasonry("roof");
  var raidHouseMaterial = $t(14142390, 0.02, 0.96);
  raidHouseMaterial.map = raidStoneTexture;
  for (let house of raidDistrict) house.material = raidHouseMaterial;
  var raidPavingTexture = raidStoneTexture.clone();
  raidPavingTexture.repeat.set(8, 18);
  raidPavingTexture.needsUpdate = true;
  var raidPavingMaterial = $t(11971989, 0.01, 0.98);
  raidPavingMaterial.map = raidPavingTexture;
  var raidRoad = he(Dt, new _s(60, 250), raidPavingMaterial, [0, -0.018, 25]);
  raidRoad.rotation.x = -Math.PI / 2;
  raidRoad.name = "raid-stone-avenue";
  raidRoad.userData.cityOnly = true;
  var raidPlaza = he(Dt, new _s(106, 104), raidPavingMaterial, [0, -0.012, 18]);
  raidPlaza.rotation.x = -Math.PI / 2;
  raidPlaza.name = "raid-titan-plaza";
  raidPlaza.userData.cityOnly = true;
  function rx() {
    let i = [[-0.5, 0, -0.5], [0.5, 0, -0.5], [0, 1, -0.5], [-0.5, 0, 0.5], [0.5, 0, 0.5], [0, 1, 0.5]], t = [[0, 1, 2], [3, 5, 4], [0, 2, 5], [0, 5, 3], [1, 4, 5], [1, 5, 2], [0, 3, 4], [0, 4, 1]], e = [];
    for (let s of t) for (let r of s) e.push(...i[r]);
    let n = new Se();
    return n.setAttribute("position", new te(e, 3)), n.computeVertexNormals(), n;
  }
  var zi = new li(rx(), new cr({ color: 16777215, roughness: 0.93, side: un }), Xa.length), di = new ee(), qa = new fn(), Wu = [11760209, 9851451, 12548435, 10707270, 12419163, 9328963];
  for (let i = 0; i < Xa.length; i++) {
    let [t, e, n, s, r, a, o] = Xa[i];
    di.compose(new T(t, e + 0.16, n), qa, new T(s, r, a)), zi.setMatrixAt(i, di), zi.setColorAt(i, new Ht(Wu[Math.floor(o * Wu.length)]));
  }
  zi.material.map = raidRoofTexture;
  zi.instanceMatrix.needsUpdate = true;
  zi.instanceColor.needsUpdate = true;
  zi.frustumCulled = false;
  Dt.add(zi);
  ki.push(zi);
  function zl(i, t) {
    let e = new li(Ds, t, i.length);
    return i.forEach((n, s) => {
      di.compose(new T(n[0], n[1], n[2]), qa, new T(n[3], n[4], n[5])), e.setMatrixAt(s, di);
    }), e.instanceMatrix.needsUpdate = true, e.frustumCulled = false, Dt.add(e), e;
  }
  zl(Qu.map((i) => [i[0], i[1] + 0.85, i[2], 0.95, 2.1, 0.85]), $t(7301989, 0.08, 0.96));
  zl(Ul, $t(5788750, 0.08, 0.92));
  for (let [i, t] of [[-33, 23], [44, -42], [-88, 45], [84, 68]]) {
    const bridge=Ut(Dt, td, [i, 14, t], [13, 1.6, 3.2]);bridge.name="raid-roof-bridge";sx(bridge,i,t,13,3.2,14.8,13.2);
    for (let e of [-1, 1]) Ut(Dt, ot.leather, [i + e * 6, 15.4, t], [0.45, 1.9, 3.6]);
  }
  var legacyTownParts = Dt.children.filter(object=>!legacyTownStart.has(object));
  for(const object of legacyTownParts)object.userData.legacyTown=true;
  var shiganshinaCity = null;
  var fr = [];
  for (let i = 0; i < 125; i++) {
    let t = ge() * Math.PI * 2, e = 202 + ge() * 47, n = Math.cos(t) * e, s = Math.sin(t) * e, r = 21 + ge() * 42;
    fr.push({ x: n, z: s, height: r, r: 1.2 + ge() * 1.9 });
  }
  var ax = $t(5851704, 0.07, 0.94), ox = $t(3103311, 0.02, 0.95), _r = new li(new Wn(0.64, 0.83, 1, 8), ax, fr.length), xr = new li(new vs(1, 1, 8), ox, fr.length);
  for (let i = 0; i < fr.length; i++) {
    let t = fr[i];
    di.compose(new T(t.x, t.height * 0.48, t.z), qa, new T(t.r, t.height * 0.96, t.r)), _r.setMatrixAt(i, di), di.compose(new T(t.x, t.height * 0.83, t.z), qa, new T(t.r * 4.7, t.height * 0.72, t.r * 4.7)), xr.setMatrixAt(i, di);
  }
  _r.instanceMatrix.needsUpdate = true;
  xr.instanceMatrix.needsUpdate = true;
  _r.frustumCulled = false;
  xr.frustumCulled = false;
  Dt.add(_r, xr);
  _r.name="raid-tree-trunks";ki.push(_r, xr);for(const tree of fr)sxCylinder(_r,tree.x,tree.z,tree.r*.83,tree.height*.96,0,tree.r*.64);
  var cityLegacyWallParts = [], cityOuterWalls = [], cityTowerParts = [], Nl = [], battlefieldSupport = null;
  for (let i = -26; i <= 26; i++) for (let t of [-1, 1]) Nl.push([i * 10.35, 86, t * 270, 5, 7, 8]), Nl.push([t * 270, 86, i * 10.35, 8, 7, 5]);
  const wallCrenels=zl(Nl, $t(8949898, 0.07, 0.9));wallCrenels.userData.cityLegacyWall=true;cityLegacyWallParts.push(wallCrenels);for(const [x,y,z,w,h,d] of Nl)sx(wallCrenels,x,z,w,d,y+h/2,y-h/2);
  function addLegacyWall(i) {
    return i.userData.cityLegacyWall = true, cityLegacyWallParts.push(i), i;
  }
  for (let [i, t] of [[-264, -264], [264, -264], [-264, 264], [264, 264]]) {
    const shaft=addLegacyWall(Oe(Dt, As[1], [i, 48, t], 11, 95, 0, 12)),cap=addLegacyWall(Oe(Dt, ju, [i, 99, t], 12, 5, 0, 12));sxCylinder(shaft,i,t,11,95.5,.5);sxCylinder(cap,i,t,12,101.5,96.5);
    for (let e = 0; e < 10; e++) {
      let n = e * Math.PI * 2 / 10;
      addLegacyWall(Ut(Dt, As[0], [i + Math.cos(n) * 10, 103, t + Math.sin(n) * 10], [5, 6, 5]));
    }
  }
  var cx = [];
  for (let i = 0; i < 22; i++) {
    let t = he(Dt, new pn(1, 8, 5), new ci({ color: 16118235, transparent: true, opacity: 0.1, depthWrite: false }), [(ge() - 0.5) * 760, 145 + ge() * 90, (ge() - 0.5) * 760], [18 + ge() * 28, 3.5 + ge() * 4, 8 + ge() * 10]);
    cx.push(t);
  }
  for (let i = -5; i <= 5; i++) for (let t of [-1, 1]) {
    let e = i * 51.5, n = he(Dt, Ds, As[0], [e, 41, t * 270], [51.7, 82, 12]);
    addLegacyWall(n);sx(n,n.position.x,n.position.z,n.scale.x,n.scale.z,82);n.name="raid-legacy-wall";
  }
  for (let i = -5; i <= 5; i++) for (let t of [-1, 1]) {
    let e = i * 51.5, n = he(Dt, Ds, As[1], [t * 270, 41, e], [12, 82, 51.7]);
    addLegacyWall(n);sx(n,n.position.x,n.position.z,n.scale.x,n.scale.z,82);n.name="raid-legacy-wall";
  }
  for (let i = -10; i <= 10; i++) for (let t of [-1, 1]) {
    let e = i * 51.5, n = he(Dt, Ds, As[0], [e, 41, t * 550], [51.7, 82, 12]), r = he(Dt, Ds, As[1], [t * 550, 41, e], [12, 82, 51.7]);
    n.userData.cityOnly = true, r.userData.cityOnly = true; n.name=r.name="raid-city-wall"; sx(n,n.position.x,n.position.z,n.scale.x,n.scale.z,82);sx(r,r.position.x,r.position.z,r.scale.x,r.scale.z,82);cityOuterWalls.push(n,r);
  }
  const southGatePanelIndex=cityOuterWalls.findIndex(panel=>Math.abs(panel.position.x)<.01&&panel.position.z>0&&Math.abs(panel.position.z-550)<.01);
  if(southGatePanelIndex>=0){const southGatePanel=cityOuterWalls.splice(southGatePanelIndex,1)[0],colliderIndex=Ku.findIndex(box=>box.mesh===southGatePanel),anchorIndex=ki.indexOf(southGatePanel);if(colliderIndex>=0)Ku.splice(colliderIndex,1);if(anchorIndex>=0)ki.splice(anchorIndex,1);southGatePanel.visible=false;southGatePanel.removeFromParent();}
  for (let [i, t] of [[-540, -540], [540, -540], [-540, 540], [540, 540]]) {
    let e = Oe(Dt, As[1], [i, 49, t], 10, 98, 0, 12), n = Oe(Dt, ju, [i, 100, t], 11, 5, 0, 12);
    e.userData.cityOnly = true, n.userData.cityOnly = true;e.name=n.name="raid-city-corner-tower";sxCylinder(e,i,t,10,98);sxCylinder(n,i,t,11,102.5,97.5);cityOuterWalls.push(e,n);
  }
  function towerPiece(i, t, e, n, r) {
    let a = he(Dt, i, t, e, n, r);
    return a.userData.cityOnly = true, cityTowerParts.push(a), a;
  }
  var towerStone = $t(12173523, 0.08, 0.88), towerTrim = $t(14405596, 0.12, 0.8), towerRoof = $t(3025701, 0.49, 0.64), towerWindow = $t(1644825, 0.18, 0.36), towerFace = $t(15130343, 0.1, 0.82), towerGold = $t(13805782, 0.57, 0.4), towerX = 220, towerZ = -180, towerBase = towerPiece(Ds, towerStone, [towerX, 9, towerZ], [36, 18, 36]);
  sx(towerBase, towerX, towerZ, 36, 36, 18);
  let towerShaft = towerPiece(Ds, towerStone, [towerX, 79, towerZ], [22, 122, 22]);
  sx(towerShaft, towerX, towerZ, 22, 22, 140);
  let towerClockRoom = towerPiece(Ds, towerStone, [towerX, 151, towerZ], [30, 24, 30]);
  sx(towerClockRoom, towerX, towerZ, 30, 30, 163, 139);
  let towerBell = towerPiece(Ds, towerStone, [towerX, 172, towerZ], [24, 18, 24]);
  sx(towerBell, towerX, towerZ, 24, 24, 181, 163);
  towerPiece(Ds, towerTrim, [towerX, 19, towerZ], [39, 3, 39]), towerPiece(Ds, towerTrim, [towerX, 136, towerZ], [27, 3, 27]), towerPiece(Ds, towerTrim, [towerX, 164, towerZ], [34, 3, 34]);
  let towerRoofCap = towerPiece(Ds, towerRoof, [towerX, 183, towerZ], [29, 3, 29]);
  sx(towerRoofCap, towerX, towerZ, 29, 29, 184.5, 181.5);
  for (let i = 0; i < 4; i++) {
    let t = i * Math.PI / 2, e = new Me();
    e.position.set(towerX, 0, towerZ), e.rotation.y = t, Dt.add(e), cityTowerParts.push(e);
    for (let n of [-1, 1]) {
      let r = he(e, Ds, towerTrim, [n * 10, 76, 10.75], [1.8, 112, 1.1]);
      r.castShadow = false;
    }
    for (let n = 31; n <= 115; n += 14) {
      let r = he(e, Ds, towerWindow, [0, n, 11.18], [2.1, 4.9, 0.16]);
      he(e, new pn(1, 12, 8), towerTrim, [0, n + 2.28, 11.18], [1.05, 0.8, 0.11]);
    }
  }
  for (let i = 0; i < 4; i++) {
    let t = i * Math.PI / 2, e = new Me();
    e.position.set(towerX + Math.sin(t) * 15.25, 151, towerZ + Math.cos(t) * 15.25), e.rotation.y = t, Dt.add(e), cityTowerParts.push(e), he(e, new pn(1, 24, 16), towerFace, [0, 0, 0.05], [4.65, 4.65, 0.34]), he(e, new hi(4.55, 0.27, 12, 48), towerGold, [0, 0, 0.27]);
    for (let n = 0; n < 12; n++) {
      let r = n * Math.PI / 6, a = 3.56, o = he(e, Ds, towerGold, [Math.sin(r) * a, Math.cos(r) * a, 0.32], [0.18, n % 3 === 0 ? 0.72 : 0.42, 0.09]);
      o.rotation.z = -r;
    }
    he(e, Ds, towerGold, [0, 1.22, 0.38], [0.23, 2.35, 0.1]), he(e, Ds, towerGold, [0.57, 0.42, 0.4], [0.28, 1.55, 0.1], [0, 0, -0.82]), he(e, new pn(0.48, 12, 8), towerGold, [0, 0, 0.48], [1, 1, 0.46]);
  }
  let towerSpire = towerPiece(new Wn(0.25, 6, 44, 8), towerRoof, [towerX, 203, towerZ]);
  ki.push(towerSpire);
  for (let i = 0; i < 4; i++) {
    let t = i * Math.PI / 2, e = towerPiece(new Wn(0.15, 2.7, 18, 8), towerRoof, [towerX + Math.sin(t) * 9, 182, towerZ + Math.cos(t) * 9]);
    ki.push(e);
  }
  let towerFinial = towerPiece(new Wn(0.03, 0.8, 7, 8), towerGold, [towerX, 228.5, towerZ]);
  ki.push(towerFinial);
  const legacyWindowsStart = new Set(Dt.children);
  for (let i = 0; i < 2; i++) {
    let t = Dl[i], e = new li(Ds, i === 0 ? nx : ot.dark, t.length), n = new ee();
    for (let s = 0; s < t.length; s++) {
      let [r, a, o, c, l, h] = t[s];
      n.compose(new T(r, a, o), new fn(), new T(c, l, h)), e.setMatrixAt(s, n);
    }
    e.instanceMatrix.needsUpdate = true, e.frustumCulled = false, Dt.add(e);
  }
  for(const object of Dt.children)if(!legacyWindowsStart.has(object)){object.userData.legacyTown=true;legacyTownParts.push(object);}
  function hx(i) {
    let t = new Me();
    i.add(t), t.userData.rotors = [], t.userData.nozzles = [], Ut(t, ot.black, [0, 0.82, 0.32], [0.84, 0.53, 0.4]), Ut(t, ot.iron, [0, 0.86, 0.56], [0.53, 0.35, 0.12]), Ut(t, ot.steel, [0, 0.88, 0.63], [0.27, 0.18, 0.065]);
    for (let e = -1; e <= 1; e += 2) {
      Ut(t, ot.brass, [e * 0.31, 0.81, 0.62], [0.055, 0.18, 0.055]), Ut(t, ot.strap, [e * 0.31, 0.9, 0.1], [0.15, 0.13, 0.7]), Oe(t, ot.iron, [e * 0.42, 0.68, 0.5], 0.15, 0.74, 1, 18), Oe(t, ot.steel, [e * 0.79, 0.68, 0.5], 0.17, 0.095, 1, 18), Oe(t, ot.brass, [e * 0.13, 0.68, 0.5], 0.18, 0.12, 1, 18);
      for (let o = 0; o < 3; o++) Oe(t, ot.black, [e * (0.25 + o * 0.17), 0.68, 0.5], 0.167, 0.04, 1, 18);
      Oe(t, ot.black, [e * 0.54, 0.94, 0.33], 0.225, 0.13, 1, 22), Oe(t, ot.steel, [e * 0.62, 0.94, 0.33], 0.192, 0.075, 1, 22), Oe(t, ot.bronze, [e * 0.68, 0.94, 0.33], 0.117, 0.045, 1, 20);
      for (let o = 0; o < 6; o++) {
        let c = o * Math.PI / 3;
        Ut(t, ot.black, [e * 0.71, 0.94 + Math.cos(c) * 0.097, 0.33 + Math.sin(c) * 0.097], [0.03, 0.034, 0.034]);
      }
      let n = new Me();
      n.position.set(e * 0.73, 0.94, 0.33), t.add(n), Oe(n, ot.bronze, [0, 0, 0], 0.112, 0.033, 1, 18);
      for (let o = 0; o < 8; o++) {
        let c = o * Math.PI / 4;
        Ut(n, ot.steel, [0, Math.sin(c) * 0.1, Math.cos(c) * 0.1], [0.044, 0.025, 0.024]);
      }
      t.userData.rotors.push({ side: e, rotor: n });
      let s = new Me();
      t.add(s), s.position.set(e * 0.76, 0.62, 0.25), s.rotation.z = -e * 0.09, s.rotation.y = e * 0.035, Ut(s, ot.black, [0, 0, 0.34], [0.37, 0.43, 1.6]), Ut(s, ot.iron, [e * 0.1, 0.06, 0.34], [0.17, 0.39, 1.53]), Ut(s, ot.bronze, [-e * 0.03, 0.23, 0.29], [0.33, 0.065, 1.49]), Ut(s, ot.black, [0, -0.17, 0.34], [0.37, 0.09, 1.62]);
      for (let o = 0; o < 7; o++) {
        let c = -0.34 + o * 0.22;
        Ut(s, o % 2 ? ot.steel : ot.iron, [-e * 0.15, 0.03, c], [0.03, 0.28, 0.065]), Ut(s, ot.black, [e * 0.13, 0.09, c], [0.05, 0.12, 0.056]);
      }
      Ut(s, ot.brass, [0, 0.06, -0.42], [0.42, 0.38, 0.13]), Ut(s, ot.iron, [0, 0.04, 1.1], [0.4, 0.38, 0.16]);
      for (let o = 0; o < 4; o++) Ut(s, ot.steel, [e * 0.04, 0.255, -0.19 + o * 0.32], [0.22, 0.043, 0.045]);
      let r = new Me();
      s.add(r), r.position.set(0, -0.12, 1.09), t.userData.nozzles.push(r), Oe(r, ot.iron, [0, 0, 0.11], 0.12, 0.3, 2), Oe(r, ot.bronze, [0, 0, 0.31], 0.14, 0.07, 2), Oe(r, ot.black, [0, 0, 0.38], 0.08, 0.12, 2), Oe(r, ot.steel, [0, 0, 0.46], 0.065, 0.08, 2);
      let a = [new T(e * 0.43, 0.86, 0.41), new T(e * 0.65, 0.84, 0.7), new T(e * 0.76, 0.75, 0.77), new T(e * 0.78, 0.47, 0.67)];
      he(t, new La(new nr(a), 18, 0.045, 7, false), ot.black);
      for (let o = 0; o < 3; o++) Ut(t, ot.brass, [e * 0.75, 0.46 + o * 0.1, 0.66], [0.07, 0.03, 0.1]);
    }
    for (let e of [-1, 1]) Ut(t, ot.leather, [e * 0.34, 1.13, 0.24], [0.13, 0.78, 0.07], [0, 0, e * 0.35]), Ut(t, ot.brass, [e * 0.27, 0.83, 0.47], [0.13, 0.13, 0.065]);
    return t;
  }
  function ux() {
    const xs2 = [-0.46, -0.365, -0.265, -0.11, 0.13, 0.265, 0.365, 0.46];
    const heights = [8e-3, 0.042, 0.085, 0.101, 0.093, 0.084, 0.042, 8e-3];
    const length = 1.5, shoulder = 1.3;
    const rings = [0, 0.024, 0.06, 0.115, 0.18, 0.24];
    for (let y = 0.292; y < shoulder; y += 0.052) rings.push(y);
    rings.push(shoulder, 1.335, 1.37, 1.405, 1.44, 1.47, length);
    const positions = [], normals = [], uvs = [], groups = [];
    let triangleCount = 0;
    function smooth(a, b, x) {
      let t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }
    function widthAt(y) {
      if (y < 0.05) return 0.89 + 0.11 * smooth(0, 0.05, y);
      if (y <= shoulder) return 1;
      return Math.max(0.018, 1 - smooth(shoulder, length, y) * 0.99);
    }
    function section(k, j, sign) {
      let y = rings[k], w = widthAt(y), taper = y > shoulder ? 1 - 0.54 * smooth(shoulder, length, y) : 1;
      return [xs2[j] * 0.19 * w, y, sign * heights[j] * 0.3 * taper];
    }
    function triangle(a, b, c, materialIndex, uvA = [0, 0], uvB = [0, 0], uvC = [0, 0]) {
      let va2 = new T(...a), vb = new T(...b), vc2 = new T(...c), normal = vb.clone().sub(va2).cross(vc2.clone().sub(va2)).normalize();
      for (let [v, uv] of [[va2, uvA], [vb, uvB], [vc2, uvC]]) {
        positions.push(v.x, v.y, v.z);
        normals.push(normal.x, normal.y, normal.z);
        uvs.push(uv[0], uv[1]);
      }
      groups.push([triangleCount * 3, 3, materialIndex]);
      triangleCount++;
    }
    for (const sign of [-1, 1]) for (let k = 0; k < rings.length - 1; k++) for (let j = 0; j < xs2.length - 1; j++) {
      const a = section(k, j, sign), b = section(k, j + 1, sign), c = section(k + 1, j + 1, sign), d = section(k + 1, j, sign);
      const materialIndex = j === 0 || j === xs2.length - 2 ? 2 : j === 2 || j === 3 || j === 4 ? 0 : 1;
      const uvA = [j / 7, rings[k] / length], uvB = [(j + 1) / 7, rings[k] / length], uvC = [(j + 1) / 7, rings[k + 1] / length], uvD = [j / 7, rings[k + 1] / length];
      if (sign === 1) {
        triangle(a, b, d, materialIndex, uvA, uvB, uvD);
        triangle(b, c, d, materialIndex, uvB, uvC, uvD);
      } else {
        triangle(a, d, b, materialIndex, uvA, uvD, uvB);
        triangle(b, d, c, materialIndex, uvB, uvD, uvC);
      }
    }
    for (const j of [0, xs2.length - 1]) for (let k = 0; k < rings.length - 1; k++) {
      const a = section(k, j, 1), b = section(k + 1, j, 1), c = section(k + 1, j, -1), d = section(k, j, -1);
      if (j === 0) {
        triangle(a, b, d, 3);
        triangle(b, c, d, 3);
      } else {
        triangle(a, d, b, 3);
        triangle(b, d, c, 3);
      }
    }
    for (let j = 0; j < xs2.length - 1; j++) {
      const a = section(0, j, 1), b = section(0, j + 1, 1), c = section(0, j + 1, -1), d = section(0, j, -1);
      triangle(a, d, b, 1);
      triangle(b, d, c, 1);
    }
    const geometry = new Se();
    geometry.setAttribute("position", new Ie(new Float32Array(positions), 3));
    geometry.setAttribute("normal", new Ie(new Float32Array(normals), 3));
    geometry.setAttribute("uv", new Ie(new Float32Array(uvs), 2));
    for (let [start, count, materialIndex] of groups) geometry.addGroup(start, count, materialIndex);
    geometry.computeBoundingSphere();
    return geometry;
  }
  var id = ux();
  function sd(i, t = 1, e = false) {
    let n = new Me();
    i.add(n), Ut(n, ot.leather, [0, -0.28, 0], [0.145, 0.46, 0.13]);
    for (let a = 0; a < 5; a++) Ut(n, ot.black, [0, -0.45 + a * 0.08, 0.078], [0.15, 0.016, 0.027]);
    Ut(n, ot.iron, [0, -0.02, 0], [0.24, 0.18, 0.22]), Ut(n, ot.brass, [0, 0.02, 0.08], [0.14, 0.09, 0.085]), Ut(n, ot.iron, [-t * 0.16, -0.2, 0.02], [0.09, 0.28, 0.06], [0, 0, t * 0.11]), Ut(n, ot.iron, [t * 0.1, 0.12, 0], [0.2, 0.055, 0.17]);
    let r = [he(n, id, [ot.blade, ot.iron, ot.edge, ot.steel], [0, 0.18, -0.018])];
    r.push(Ut(n, ot.edge, [-0.045, 0.78, 0.031], [0.012, 0.85, 0.015], [0, 0, 0.012]));
    for (let a = 0; a < 7; a++) r.push(Ut(n, ot.iron, [t * 0.046, 0.26 + a * 0.145, 0.039], [0.035, 0.024, 8e-3]));
    return n.userData.bladeParts = r, Ut(n, ot.brass, [0, -0.55, 0], [0.18, 0.075, 0.18]), e && (n.userData.sword = true), n;
  }
  var Ka = [], raidHumanArms = [], Ya = new Me();
  Dt.add(Ya);
  var _e = new Me();
  Ya.add(_e);
  var Bx = Ut(_e, ot.shirt, [0, 1.2, 0], [0.66, 0.65, 0.34]), zx = Ut(_e, ot.cloth, [0, 1.18, 0.21], [0.69, 0.43, 0.14]), kx = Ut(_e, ot.strap, [0, 1.51, 0.01], [0.67, 0.13, 0.39]), Vx = he(_e, new pn(0.23, 14, 12), ot.skin, [0, 1.74, -0.018], [1, 1.18, 0.96]);
  he(_e, new pn(0.238, 14, 12), ot.hair, [0, 1.9, 0.045], [1, 0.47, 1.03]);
  for (let i of [-1, 1]) {
    const shoulder=new Me(),elbow=new Me();_e.add(shoulder);shoulder.name="raid-human-arm-"+i;shoulder.position.set(i*.4,1.42,0);Ut(shoulder,ot.cloth,[0,-.22,0],[.22,.44,.29]);shoulder.add(elbow);elbow.position.y=-.4;Ut(elbow,ot.leather,[0,-.16,-.02],[.19,.32,.22]);raidHumanArms.push({arm:shoulder,elbow,side:i});
    Ut(_e, ot.strap, [i * 0.22, 0.87, 0.02], [0.19, 0.18, 0.35]), Ut(_e, ot.leather, [i * 0.23, 0.45, 0], [0.23, 0.61, 0.26]), Ut(_e, ot.strap, [i * 0.22, 0.36, -0.05], [0.25, 0.23, 0.275]), Ut(_e, ot.black, [i * 0.23, 0.1, -0.08], [0.26, 0.29, 0.34]), Ut(_e, ot.strap, [i * 0.22, 0.74, 0.02], [0.08, 0.42, 0.29], [0, 0, i * 0.32]);
    let t = sd(elbow, i);
    t.position.set(0,-.32,-.08), t.rotation.set(-1.1,0,i*.19), t.scale.setScalar(.55), Ka.push({sword:t,side:i,arm:shoulder,elbow});
  }
  var Xu = hx(_e), Qa = new Me();
  _e.add(Qa);
  Qa.position.set(0, 1.33, 0.2);
  for (let i = -2; i <= 2; i++) {
    let t = Ut(Qa, i % 2 ? ot.cloth : ot.strap, [i * 0.115, -0.32, 0.18], [0.122, 0.71, 0.035]);
    t.rotation.x = -0.2;
  }
  var Hx = Ut(_e, ot.strap, [-0.26, 1.21, -0.19], [0.1, 0.93, 0.12], [0, 0, -0.4]), Gx = Ut(_e, ot.strap, [0.26, 1.21, -0.19], [0.1, 0.93, 0.12], [0, 0, 0.4]);
  Ut(_e, ot.leather, [0, 0.77, 0.06], [0.98, 0.13, 0.44]);
  var Es = new Me();
  qe.add(Es);
  var vr = [];
  for (let i of [-1, 1]) {
    let t = new Me();
    Es.add(t), t.position.set(i * 0.6, -0.67, -1), t.rotation.set(-0.89, i * 0.18, -i * 0.15), Ut(t, ot.cloth, [0, -0.25, 0.03], [0.22, 0.48, 0.24]), Ut(t, ot.leather, [0, -0.08, -0.01], [0.23, 0.2, 0.24]);
    let e = sd(t, i, true);
    e.position.set(0, 0.17, -0.1), vr.push({ arm: t, side: i, sword: e });
  }
  var wn = [], kl = [], rd = [], V = { root: new Me(), hp: 100, maxHp: 100, alive: true, armorL: true, armorR: true, armorCutsL: 0, armorCutsR: 0, napeOpen: false, attackState: "idle", attackCooldown: 8, attackTimer: 0, recovery: 0, invulnerable: 0, armL: null, armR: null, armorPlateL: null, armorPlateR: null, weak: null, slamRing: null };
  Dt.add(V.root);
  V.root.position.set(0, 0, 18);
  V.root.scale.setScalar(1.45);
  var Fi = $t(10315096, 0.04, 0.92), Rs = $t(12946291, 0.03, 0.88), ja = $t(5585721, 0.03, 0.95), Vl = $t(2632490, 0.02, 0.93), ad = $t(6707531, 0.58, 0.43), qu = $t(14791532, 0.66, 0.31, 11826488, 0.35), od = $t(15901780, 0.15, 0.22, 16740664, 2.2);
  function Hl(i, t = "body") {
    return i.userData.titanPart = t, rd.push(i), ki.push(i), i;
  }
  function Yn(i, t, e, n, s = "body", r) {
    return Hl(Ut(i, t, e, n, r), s);
  }
  function xn(i, t, e, n, s = "body") {
    return Hl(he(i, new pn(1, 12, 9), t, e, n), s);
  }
  function Ts(i, t, e, n, s, r = "body") {
    let a = new T(...t), o = new T(...e), c = o.clone().sub(a), l = he(i, new Wn(n * 0.76, n, c.length(), 10), s);
    return l.position.copy(a).add(o).multiplyScalar(0.5), l.quaternion.setFromUnitVectors(new T(0, 1, 0), c.normalize()), Hl(l, r);
  }
  xn(V.root, Fi, [0, 12.1, 0], [3, 4.4, 1.7]);
  Yn(V.root, ja, [0, 7.8, 0], [4.3, 1.8, 2.6]);
  xn(V.root, Rs, [0, 15.4, 0.05], [2.65, 1.35, 1.65]);
  Yn(V.root, Fi, [0, 13.25, 1.02], [2.15, 0.24, 0.16]);
  for (let i of [-1, 1]) {
    Ts(V.root, [i * 1, 8, 0], [i * 1.1, 4.2, 0.05], 1.07, Fi), xn(V.root, Rs, [i * 1.1, 4.15, 0.05], [1.05, 1, 1]), Ts(V.root, [i * 1.1, 4, 0.05], [i * 1.14, 0.55, 0.35], 0.78, Fi), Yn(V.root, ja, [i * 1.18, 0.34, 0.8], [1.55, 0.66, 2.25]);
    for (let t = 0; t < 3; t++) Ts(V.root, [i * 0.42, 14.5 - t * 0.72, 1.12], [i * 2.05, 14.2 - t * 0.72, 0.95], 0.095, Rs);
  }
  V.armL = new Me();
  V.armL.position.set(-2.25, 14, 0);
  V.root.add(V.armL);
  V.armR = new Me();
  V.armR.position.set(2.25, 14, 0);
  V.root.add(V.armR);
  for (let [i, t] of [[-1, V.armL], [1, V.armR]]) {
    xn(t, Fi, [i * 0.22, -0.45, 0], [1.36, 1.35, 1.35]), Ts(t, [i * 0.2, -0.6, 0], [i * 0.75, -3.35, 0.28], 0.94, Fi), xn(t, Rs, [i * 0.75, -3.35, 0.28], [0.98, 0.9, 0.95]), Ts(t, [i * 0.75, -3.5, 0.28], [i * 1, -6.2, 0.52], 0.75, Fi), xn(t, ja, [i * 1.04, -6.38, 0.9], [0.94, 0.82, 0.58]);
    for (let e = 0; e < 3; e++) Ts(t, [i * (0.65 + e * 0.34), -6.72, 0.95], [i * (0.7 + e * 0.37), -7.75, 0.98], 0.16, Rs);
  }
  xn(V.root, Rs, [0, 18.35, 0.08], [1.58, 1.78, 1.3]);
  xn(V.root, Vl, [0, 19.48, -0.02], [1.62, 0.75, 1.34]);
  Yn(V.root, Vl, [-0.68, 19.28, 0.85], [0.25, 0.82, 0.72], "body", [0, 0, -0.32]);
  Yn(V.root, Vl, [0.55, 19.35, 0.87], [0.27, 0.68, 0.66], "body", [0, 0, 0.24]);
  Yn(V.root, ja, [0, 17.72, 1], [0.88, 0.24, 0.38]);
  for (let i of [-1, 1]) xn(V.root, od, [i * 0.48, 18.48, 1.16], [0.22, 0.13, 0.08]);
  V.armorPlateL = Yn(V.root, ad, [-2.9, 14.15, 2.15], [2.12, 2.22, 1.72], "armorL", [0, 0, -0.16]);
  V.armorPlateR = Yn(V.root, ad, [2.9, 14.15, 2.15], [2.12, 2.22, 1.72], "armorR", [0, 0, 0.16]);
  for (let i of [-1, 1]) {
    let t = i < 0 ? "armorL" : "armorR";
    Yn(V.root, qu, [i * 2.9, 13.05, 2.85], [1.5, 0.18, 0.18], t), xn(V.root, qu, [i * 2.9, 14.15, 2.97], [0.25, 0.25, 0.14], t);
  }
  V.weak = xn(V.root, od, [0, 18.32, -1.13], [0.62, 0.5, 0.3], "nape");
  V.weak.visible = false;
  var to = he(V.root, new hi(0.88, 0.11, 8, 36), ot.orange, [0, 18.32, -1.29]);
  to.visible = false;
  V.slamRing = he(Dt, new hi(1, 0.13, 7, 72), new ci({ color: 16733514, transparent: true, opacity: 0.82, depthWrite: false }), [0, 0.14, 0]);
  V.slamRing.rotation.x = -Math.PI / 2;
  V.slamRing.visible = false;
  var Oi = [], Bi = [], assetSystem = null;
  function dx() {
    V.root.visible = true, V.root.position.set(0, 0, 18), V.root.scale.setScalar(1.45), V.root.rotation.set(0, 0, 0), V.hp = V.maxHp, V.alive = true, V.armorL = true, V.armorR = true, V.armorCutsL = 0, V.armorCutsR = 0, V.napeOpen = false, V.armorPlateL.visible = true, V.armorPlateR.visible = true, V.weak.visible = false, to.visible = false, V.attackState = "idle", V.attackCooldown = 8, V.attackTimer = 0, V.recovery = 0, V.invulnerable = 0, V.armL.rotation.set(0, 0, 0), V.armR.rotation.set(0, 0, 0), V.slamRing.visible = false;
    for (let i of Oi) Dt.remove(i.root);
    Oi.length = 0;
    for (let i of Bi) {Dt.remove(i.mesh);i.mesh.material.dispose();}
    Bi.length = 0; if(assetSystem) assetSystem.reset(); eo();
  }
  function eo() {
    let i = Math.max(0, V.hp);
    ut("#titanHpText").textContent = Math.ceil(i/V.maxHp*100) + "%", ut("#titanHpBar").style.width = i / V.maxHp * 100 + "%", ut("#armorRead").textContent = "SHOULDER ARMOR: " + (V.armorL ? "L " + V.armorCutsL + "/3" : "\u2014") + " / " + (V.armorR ? "R " + V.armorCutsR + "/3" : "\u2014"), ut("#napeRead").textContent = V.napeOpen ? "NAPE EXPOSED" : "NAPE SEALED", typeof P < "u" && (ut("#ammoRead").textContent = P.thunderAmmo + " / " + mr, ut("#ammoMode").textContent = P.thunderReload > 0 ? "RELOADING " + P.thunderReload.toFixed(1) + "s" : P.thunderAmmo <= 0 ? "OUT OF AMMO" : P.thunderMag + " IN MAG / AUTO-LOAD 2", ut("#lifeRead").textContent = P.health + " / 3", ut("#lifeBar").style.width = P.health / 3 * 100 + "%");
    if(assetSystem){ut("#armorRead").textContent=assetSystem.type()==="armored"?"肩装甲  左 "+(V.armorL?V.armorCutsL+"/3":"破壊")+" / 右 "+(V.armorR?V.armorCutsR+"/3":"破壊"):"装甲なし";ut("#napeRead").textContent=V.napeOpen?"うなじ露出":"肩装甲を破壊";}
    if(P.spearArmed&&P.thunderReload<=0)ut("#ammoMode").textContent="装備中 / Rで発射・Fで刃";
    else if(P.thunderAmmo>0&&P.thunderReload<=0)ut("#ammoMode").textContent="Rで装備 → Rで発射";
  }
  function cd(i) {
    pendingVictory=0;hitStopRemaining=0;punchCameraImpact=null;
    const result=!pi&&assetSystem?assetSystem.finish(i):null;
    pi || (pi = true, yr(), ut("#ui").classList.remove("danger"), ut("#endTag").textContent = i ? "MISSION COMPLETE" : "MISSION FAILED", ut("#endTitle").textContent = i&&assetSystem?.inspect().operation==="raid"?"市街地を奪還":i ? "\u5DE8\u4EBA\u3092\u8A0E\u4F10" : "\u4F5C\u6226\u5931\u6557", ut("#endCopy").textContent = i&&assetSystem?.inspect().operation==="raid"?"全12体の巨人を討伐した。":i && assetSystem && assetSystem.type()!=="armored" ? "背後へ回り、巨人のうなじを断った。" : i ? "\u80A9\u88C5\u7532\u3092\u7834\u58CA\u3057\u3001\u3046\u306A\u3058\u3092\u5207\u65AD\u3057\u305F\u3002" : "\u88C5\u5099\u3092\u6574\u3048\u3066\u3001\u3082\u3046\u4E00\u5EA6\u8A0E\u4F10\u306B\u6311\u3081\u3002", ut("#endOverlay").classList.add("show"), i && (V.alive = false, V.root.rotation.x = -0.48, V.root.position.y = -1.5, pe("TARGET ELIMINATED")));
    if(result)ut("#endCopy").textContent+="\n時間 "+result.time.toFixed(1)+"秒 / 最高速度 "+Math.round(result.maxSpeed*3.6)+" km/h\n被弾 "+result.damage+"回 / 雷槍 "+result.spears+"発"+(result.best!==null?"\n自己ベスト "+result.best.toFixed(1)+"秒":"");
  }
  var raidHitTime=0,hitStopRemaining=0,pendingVictory=0,bladeImpactCount=0,lastBladeImpact=null,punchImpactCount=0,lastPunchImpact=null,punchCameraImpact=null;
  const impactCanvas=ut("#impactLines"),impactLabel=ut("#impactLabel");impactCanvas.style.opacity="0";impactLabel.textContent="";
  function paintBladeImpact(enemy,part,point,cuts=0,lethal=false){
    const armor=part==="armorL"||part==="armorR";
    bladeImpactCount++;lastBladeImpact={enemy:enemy.id,part,cuts,lethal};hitStopRemaining=Math.max(hitStopRemaining,lethal?.09:.075);
    ut("#reticle").classList.add("hit");ut("#reticle").dataset.hit=armor?part:"nape";raidHitTime=.22;_n=Math.max(_n,lethal?.24:.18);assetSystem?.hitReact?.(enemy,part);be(armor?112:940,.1,armor?"square":"sawtooth",.032,armor?48:320);if(Ze&&window.navigator?.vibrate)window.navigator.vibrate(lethal?55:28);
  }
  function bladeImpact(enemy,part,point,cuts=0,lethal=false){paintBladeImpact(enemy,part,point,cuts,lethal);}
  function scheduleVictory(){pendingVictory=Math.max(pendingVictory,3.35);}
  function ld(i, source = "thunder", enemy = null) {
    if(enemy)V=enemy;
    if (!V.alive || pi) return;
    const target=i==="armorL"?V.armorPlateL:i==="armorR"?V.armorPlateR:V.weak,impactPoint=target.getWorldPosition(new T()),previousHp=V.hp;let damage=0;
    if(i==="armorL"&&V.armorL){V.armorL=false;V.armorPlateL.visible=false;damage=17;pe("LEFT SHOULDER / ARMOR BROKEN");be(180,.18,"square",.04,70);}
    else if(i==="armorR"&&V.armorR){V.armorR=false;V.armorPlateR.visible=false;damage=17;pe("RIGHT SHOULDER / ARMOR BROKEN");be(180,.18,"square",.04,70);}
    else if(i==="nape"&&V.napeOpen){damage=source==="odm"?68:source==="blade"?34:8;pe("NAPE HIT / "+Math.max(0,Math.ceil((V.hp-damage)/V.maxHp*100))+"%");be(720,.16,"sawtooth",.04,180);}
    else if(i==="body"){damage=7;pe("BODY HIT / AIM FOR THE ARMOR");be(240,.08,"triangle",.018,110);}
    else if(i==="nape"){pe("NAPE SEALED / BREAK BOTH SHOULDER PLATES");be(160,.08,"triangle",.02,80);}
    V.hp=Math.max((source==="blade"||source==="odm")?0:1,V.hp-damage);
    if((source==="blade"||source==="odm")&&damage>0)bladeImpact(V,i,impactPoint,i==="armorL"?V.armorCutsL:i==="armorR"?V.armorCutsR:0,V.hp<=0&&previousHp>0);
    let wasOpen=V.napeOpen;V.napeOpen=!V.armorL&&!V.armorR;V.weak.visible=V.napeOpen;to.visible=V.napeOpen;if(V.napeOpen&&!wasOpen)pe("NAPE EXPOSED / CUT IT FROM BEHIND");
    if(V.hp<=0){if(assetSystem?.enemyDown){if(assetSystem.enemyDown(V))scheduleVictory();}else cd(true);}eo();
  }
  function closeBladeArmor(){
    const direction=Zn(),melee=assetSystem?.findBladeTarget?.(P.pos,direction,true);if(melee){V=melee.enemy;return {object:melee.object,point:melee.point,distance:melee.distance};}if(!V.alive)return null;let best=null;
    for(const [mesh,active] of [[V.armorPlateL,V.armorL],[V.armorPlateR,V.armorR]]){
      if(!active)continue;const point=mesh.getWorldPosition(new T()),delta=point.clone().sub(P.pos),distance=delta.length();
      if(distance>5.2||distance<.01||delta.clone().normalize().dot(direction)<.7||best&&distance>=best.distance)continue;
      if(raidObstacle(P.pos,delta.clone().normalize(),Math.max(0,distance-.4)))continue;
      best={object:mesh,point,distance};
    }return best;
  }
  function fx() {
    let hit=Gl(),part=hit?.object.userData.titanPart;
    if(hit?.object.userData.enemy){V=hit.object.userData.enemy;assetSystem?.setTarget?.(V);}
    if(assetSystem){const armor=closeBladeArmor();if(armor){hit=armor;part=armor.object.userData.titanPart;}}
    if(part!=="armorL"&&part!=="armorR"&&assetSystem?.findSlashTarget){const enemy=assetSystem.findSlashTarget(P.pos,Zn());if(enemy)V=enemy;}
    if(!V.alive)return false;
    if (hit && hit.distance <= 8.2 && (part === "armorL" && V.armorL || part === "armorR" && V.armorR)) {
      let count = part === "armorL" ? ++V.armorCutsL : ++V.armorCutsR;
      if (count >= 3) {
        ld(part,"blade");
        return true;
      }
      bladeImpact(V,part,hit.point||V[part==="armorL"?"armorPlateL":"armorPlateR"].getWorldPosition(new T()),count,false);
      pe((part === "armorL" ? "LEFT" : "RIGHT") + " ARMOR / CUT " + count + " OF 3");
      be(220, 0.08, "triangle", 0.018, 80);
      eo();
      return true;
    }
    let behind = P.pos.clone().sub(V.weak.getWorldPosition(new T())).dot(new T(0,0,1).applyQuaternion(V.root.quaternion));
    if(behind > .4) return false;
    let i = new T();
    V.weak.getWorldPosition(i);
    let t = i.clone().sub(P.pos), e = t.length(), n = Zn();
    if(e>.01 && raidObstacle(P.pos,t.clone().normalize(),Math.max(0,e-.4)))return false;
    if(assetSystem&&-behind/e<.78)return false;
    return e > (assetSystem?8.5:8.2) || t.normalize().dot(n) < (assetSystem ? .75 : .28) ? false : V.napeOpen ? (ld("nape", "blade"), true) : (pe("ARMOR BLOCKS THE NAPE"), be(130, 0.08, "square", 0.02, 90), true);
  }
  var raidObstacles=[],raidObstacleKey="",raidVisibleTargets=[],raidAimRay=new hr(),raidWallRay=new hr();
  function raidObstacle(origin,direction,far){
    const key=vn+":"+ki.length;
    if(key!==raidObstacleKey){raidObstacleKey=key;raidObstacles=ki.filter(mesh=>mesh.visible&&!mesh.userData.titanPart&&!mesh.userData.enemy&&!(mesh.userData.cityOnly&&vn!=="city")&&!(mesh.userData.cityLegacyWall&&vn==="city"));}
    raidWallRay.set(origin,direction);raidWallRay.near=0;raidWallRay.far=far;return raidWallRay.intersectObjects(raidObstacles,false)[0]||null;
  }
  function Gl() {
    if (!V.alive&&!assetSystem?.enemyDown) return null;
    let direction=Zn(),ray=raidAimRay;ray.set(P.pos,direction);ray.near=0;ray.far=Math.min(fe.range,190);const candidates=assetSystem?.rayCandidates?.(P.pos,direction,ray.far);raidVisibleTargets.length=0;for(const n of rd)if(n.visible&&n.userData.titanPart&&(!n.userData.enemy||n.userData.enemy.alive)&&(!candidates||candidates.has(n.userData.enemy)))raidVisibleTargets.push(n);
    const hit=ray.intersectObjects(raidVisibleTargets,false)[0];
    if(!hit)return null;
    const wall=raidObstacle(P.pos,direction,hit.distance-.05);
    if(wall)return null;if(hit.object.userData.enemy){V=hit.object.userData.enemy;assetSystem?.setTarget?.(V);}return hit;
  }
  function useThunder(){
    if(!He||Ye||pi||assetSystem?.getAssistStatus?.()?.dashing)return;
    if(assetSystem?.isTitan?.()){assetSystem.activateHardening?.();return;}
    if(!P.spearArmed){if(P.thunderAmmo<=0){pe("雷槍なし / 刃で装甲を破壊できる");return;}P.spearArmed=true;assetSystem?.equipSpear?.();pe("雷槍を装備 / Rで発射・Fで刃に戻す");eo();return;}
    Wl();
  }
  function disarmSpear(){P.spearArmed=false;assetSystem?.disarm?.();}
  function transformPlayer(){if(!He||Ye||pi)return false;assetSystem?.setGuardHeld?.(false);titanCameraController?.reset();return assetSystem?.toggleTransformation?.()||false;}
  function Wl() {
    if(assetSystem?.isTitan?.())return;
    if (!He || Ye || pi) return;
    if (P.thunderReload > 0) {
      pe("THUNDER / RELOADING");
      return;
    }
    if (P.thunderAmmo <= 0) {
      disarmSpear();pe("雷槍なし / 肩装甲は刃で3回斬れば破壊できる");
      return;
    }
    if (P.thunderMag <= 0) {
      P.thunderReload = 1.45, pe("AUTO-LOADING / 2 ROUNDS");
      return;
    }
    let i = Gl();i=assetSystem?.getAssistedShot?.(Zn(),i)||i;let scenery = !i ? raidObstacle(P.pos,Zn(),95) : null, t = P.thunderSide++ % 2 ? 1 : -1, e = new T(Math.cos(P.yaw), 0, -Math.sin(P.yaw)), n = Zn(), s = P.pos.clone().addScaledVector(e, t * 0.46).add(new T(0, -0.35, 0)), r = i ? i.point.clone() : scenery ? scenery.point.clone() : s.clone().addScaledVector(n, 95), a = r.clone().sub(s).normalize(), o = new Me();
    Dt.add(o), o.position.copy(s);if(assetSystem)assetSystem.showSpear(t);
    if(!assetSystem || !assetSystem.attachProjectile(o)){    let c = he(o, ex, ot.dark, [0, 0, 0], [0.19, 0.68, 0.19]);
    he(o, new vs(0.16, 0.32, 8), ot.brass, [0, 0.48, 0]), he(o, new pn(0.095, 8, 6), ot.orange, [0, -0.34, 0]);}
    o.quaternion.setFromUnitVectors(md, a), Oi.push({ root: o, target: r, part: i ? i.object.userData.titanPart : null, velocity: a.clone().multiplyScalar(108), age: 0 }), Oi[Oi.length-1].enemy = i?.object.userData.enemy || null, Oi[Oi.length-1].followObject = i?.object || null, Oi[Oi.length-1].followPoint = i ? i.object.worldToLocal(i.point.clone()) : null, P.thunderAmmo--, P.thunderMag--, _n = 0.055, be(t < 0 ? 440 : 520, 0.16, "sawtooth", 0.033, 120), P.thunderMag === 0 && P.thunderAmmo > 0 ? (P.thunderReload = 1.45, pe("2 ROUNDS FIRED / AUTO-LOADING")) : pe(i ? "THUNDER / LOCKED" : "THUNDER / FIRED"), eo();
  }
  var raidBlastGeometry=new pn(1,12,9),raidRingGeometry=new hi(.7,.055,6,28);
  function px(i, t) {
    let e = new Ce(raidBlastGeometry, new ci({ color: t ? 16760176 : 8576224, transparent: true, opacity: 0.8, depthWrite: false }));
    e.position.copy(i), e.scale.setScalar(0.35), Dt.add(e), Bi.push({ mesh: e, age: 0 });
    let n = he(Dt, raidRingGeometry, new ci({color:16749885,transparent:true,opacity:.7,depthWrite:false}), [i.x, i.y, i.z]);
    n.userData.blastRing = true, Bi.push({ mesh: n, age: 0 });
  }
  function mx(i) {
    for (let t = Oi.length - 1; t >= 0; t--) {
      let e = Oi[t], n = e.target.clone().sub(e.root.position), s = n.length();
      if (e.age += i, s < 1.55 || e.age > 2.7) {
        let a = s < 2.4 && !!e.part;
        px(e.root.position.clone(), a), a && ld(e.part,"thunder",e.enemy), Dt.remove(e.root), Oi.splice(t, 1);
        continue;
      }
      let r = n.normalize();
      e.velocity.copy(r).multiplyScalar(108), e.root.position.addScaledVector(r, Math.min(s, 108 * i)), e.root.quaternion.setFromUnitVectors(md, r);
    }
    for (let t = Bi.length - 1; t >= 0; t--) {
      let e = Bi[t];
      e.age += i;
      let n = e.age / 0.38;
      if (n >= 1) {
        Dt.remove(e.mesh), e.mesh.material.dispose(), Bi.splice(t, 1);
        continue;
      }
      e.mesh.userData.blastRing ? (e.mesh.scale.setScalar(0.8 + n * 4), e.mesh.material.opacity = 0.7 * (1 - n)) : (e.mesh.scale.setScalar(0.35 + n * 2.1), e.mesh.material.opacity = 0.78 * (1 - n));
    }
    P.thunderReload > 0 && (P.thunderReload = Math.max(0, P.thunderReload - i), P.thunderReload === 0 && (P.thunderMag = Math.min(2, P.thunderAmmo), pe("THUNDER READY")));
  }
  function gx(i) {
    if (!V.alive || pi) return;
    if (V.invulnerable = Math.max(0, V.invulnerable - i), V.root.position.y = Math.sin(gn * 1.7) * 0.07, V.napeOpen) {
      let s = 0.85 + Math.sin(gn * 7) * 0.14;
      V.weak.userData.baseScale ? V.weak.scale.copy(V.weak.userData.baseScale).multiplyScalar(s) : V.weak.scale.set(0.62 * s, 0.5 * s, 0.3 * s), to.rotation.z += i * 1.8;
    }
    if(assetSystem){P.invulnerable<=0&&ut("#ui").classList.remove("danger");return;}
    let t = P.pos.x - V.root.position.x, e = P.pos.z - V.root.position.z, n = Math.hypot(t, e);
    if (V.attackState === "idle") V.attackCooldown -= i, n < 48 && V.attackCooldown <= 0 && (V.attackState = "windup", V.attackTimer = 2.15, V.slamRing.visible = true, V.slamRing.position.set(V.root.position.x, 0.14, V.root.position.z), V.armL.rotation.x = -0.9, V.armR.rotation.x = -0.9, pe("GROUND SLAM / GET AIRBORNE"));
    else if (V.attackState === "windup") {
      V.attackTimer -= i;
      let s = 0.12 + (1.2 - Math.max(0, V.attackTimer) / 2.15) * 1.12;
      if (V.slamRing.scale.setScalar(s), V.attackTimer <= 0) if (V.attackState = "recovery", V.recovery = 1.8, V.attackCooldown = 5.2, V.slamRing.visible = false, V.armL.rotation.x = 1, V.armR.rotation.x = 1, n < 18.5 && P.pos.y < 7 && P.invulnerable <= 0) {
        P.health = Math.max(0, P.health - 1), P.invulnerable = 2.3;
        let r = new T(t, 0, e).normalize();
        P.vel.addScaledVector(r, 20), P.vel.y += 9, _n = 0.23, ut("#ui").classList.add("danger"), pe("SLAM HIT / " + P.health + " VITALS LEFT"), be(90, 0.32, "sawtooth", 0.06, 38), P.health <= 0 && cd(false);
      } else pe("SLAM MISSED / COUNTERATTACK"), _n = 0.09, be(130, 0.25, "triangle", 0.028, 60);
    } else V.recovery -= i, V.armL.rotation.x += (0 - V.armL.rotation.x) * Math.min(1, i * 2.4), V.armR.rotation.x += (0 - V.armR.rotation.x) * Math.min(1, i * 2.4), V.recovery <= 0 && (V.attackState = "idle");
    P.invulnerable <= 0 && ut("#ui").classList.remove("danger");
  }
  var Cs = { city: { title: "TITAN RAID", start: [0, 2.3, 76], points: [[-24, 21, 15], [24, 24, -5], [0, 19, -34], [-43, 45, -16], [41, 37, 25], [0, 86, -54], [-60, 36, 57], [64, 90, -57], [41, 96, -100], [-30, 101, -95], [78, 94, 44], [-72, 93, 0]] }, forest: { title: "GIANT FOREST", start: [176, 17, 77], points: [[190, 24, 56], [216, 44, 70], [231, 64, 101], [226, 74, 131], [201, 55, 160], [182, 66, 187], [167, 45, 218], [190, 84, 222], [222, 95, 208], [235, 55, 174], [216, 37, 139], [188, 25, 90]] }, wall: { title: "WALL CLIMB", start: [-12, 4, -219], points: [[-13, 13, -246], [-23, 27, -255], [-7, 46, -253], [19, 64, -257], [37, 84, -260], [7, 90, -255], [-38, 99, -262], [-81, 91, -259], [-124, 98, -258], [-171, 89, -257], [-214, 96, -258], [-250, 101, -252]] } }, vn = "city", Is = false, Xn = 0, Ni = null, no = false;
  function ws(i) {
    if (!Number.isFinite(i)) return "--:--.--";
    let t = Math.floor(i / 60), e = i % 60;
    return `${String(t).padStart(2, "0")}:${e.toFixed(2).padStart(5, "0")}`;
  }
  function _x() {
    try {
      return parseFloat(localStorage.getItem("odm-reborn-best-" + vn)) || null;
    } catch {
      return null;
    }
  }
  function xx(i) {
    try {
      localStorage.setItem("odm-reborn-best-" + vn, i.toFixed(3));
    } catch {
    }
  }
  function Xl(i) {
    vn = Cs[i] ? i : "city", Ni = _x(), ut("#bestTime").textContent = ws(Ni), ut("#courseSelect").value = vn;
    for (let t of cityLegacyWallParts) t.visible = vn !== "city";
    for (let t of cityOuterWalls) t.visible = vn === "city";
    for (let t of cityTowerParts) t.visible = vn === "city";
    for (let t of raidDistrict) t.visible = vn === "city";
    raidRoad.visible = raidPlaza.visible = vn === "city";
    if(shiganshinaCity){shiganshinaCity.setVisible(vn==="city");for(const object of legacyTownParts)object.visible=vn!=="city"&&!object.userData.cityOnly;_r.visible=xr.visible=vn!=="city";}
    battlefieldSupport?.update(0,{enabled:vn==="city",running:false});
    Vi();
  }
  function hd() {
    let i = Cs[vn].points.length;
    ut("#nextRing").textContent = P.score < i ? String(P.score + 1).padStart(2, "0") : "CLEAR";
    for (let t = 0; t < wn.length; t++) {
      let e = t >= P.score && t < i;
      wn[t].active = e, wn[t].grp.visible = e, wn[t].grp.scale.setScalar(t === P.score ? 1 : t === P.score + 1 ? 0.64 : 0.42);
    }
  }
  function ud() {
    Vi(), Is = true, no = false, pe(Cs[vn].title + " / GO!");
  }
  function dd() {
    if(assetSystem && !assetSystem.ready()) return;
    mr = Number(ut("#missileCount").value) || 4, Vi(), He = true, Is = false, no = false, ut("#welcome").classList.add("hidden"), pe(assetSystem?.inspect().operation==="raid"?"シガンシナ市街地 / 巨人をすべて討伐":assetSystem ? window.RaidModels.types[assetSystem.type()].detail : "TITAN SIGNATURE / BREAK THE ARMOR"), Ze || requestRaidLock(), Ve && Ve.state === "suspended" && Ve.resume();
  }
  var P = { bladeSwing:null,bladeNextSide:1,spearArmed:false,titanForm:false,titanEntering:false,pos: new T(0, 2.3, 76), vel: new T(), grounded: false, gas: 100, airTime: 0, bestAirTime: 0, launchAssist: 0, launchCooldown: 0, gasDelay: 0, airDashCD: 0, vaultTime: 0, score: 0, yaw: 0, pitch: 0, third: false, slash: 0, slashCD: 0, step: 0, boost: false, spares: 5, swap: 0, swapPhase: 0, bank: 0, health: 3, invulnerable: 0, thunderAmmo: 4, thunderMag: 2, thunderReload: 0, thunderSide: 0 }, ae = { forward: 0, right: 0, jump: false, gas: false, left: false, rightHook: false, keys: /* @__PURE__ */ new Set() }, hookOrder = 0, Be = [0, 1].map((i) => ({ name: i ? "RIGHT" : "LEFT", active: false, state: "idle", anchor: new T(), normal: new T(0, 1, 0), reelSpeed: 0, len: 0, age: 0, lockedAge: 0, releaseRadius: 5, order: 0, from: new T(), head: new T(), travel: 0, flightDistance: 0, line: null, tip: null, markers: [] }));
  var cableSegmentCount = 20, cableMetal = $t(6845307, 0.95, 0.3), hookMetal = $t(11253960, 0.9, 0.26);
  for (let side of [0, 1]) {
    let geometry = new Se();
    geometry.setAttribute("position", new Ie(new Float32Array((cableSegmentCount + 1) * 3), 3));
    let edge = new xs(geometry, new Ii({ color: 13753567, transparent: true, opacity: 0.48, depthTest: true }));
    edge.frustumCulled = false;
    edge.visible = false;
    Dt.add(edge);
    Be[side].line = edge;
    let sheath = new li(new Wn(0.023, 0.023, 1, 6), cableMetal, cableSegmentCount);
    sheath.name = "odm-steel-cable-" + side;
    sheath.frustumCulled = false;
    sheath.visible = false;
    Dt.add(sheath);
    Be[side].sheath = sheath;
    let tip = new Me();
    Dt.add(tip);
    tip.visible = false;
    he(tip, new Wn(0.07, 0.07, 0.38, 8), hookMetal, [0, -0.12, 0]);
    he(tip, new vs(0.13, 0.32, 8), hookMetal, [0, 0.2, 0]);
    for (let j = 0; j < 3; j++) {
      let angle = j * Math.PI * 2 / 3;
      let barb = Ut(tip, ot.iron, [Math.sin(angle) * 0.1, -0.14, Math.cos(angle) * 0.1], [0.045, 0.25, 0.07]);
      barb.rotation.set(Math.cos(angle) * 0.45, angle, -Math.sin(angle) * 0.45);
    }
    Be[side].tip = tip;
  }
  var fe = { infinite: false, gravity: "normal", range: 210, maxSpeed: 80, quality: "auto" }, fi = [], vx = id, Fl = [], Za = 74, dr = new Float32Array(Za * 3);
  dr.fill(-2e3);
  var ql = new Se();
  if(window.RaidModels){try{Object.assign(fe,window.RaidModels.readPreferences(localStorage));}catch{}}
  ql.setAttribute("position", new Ie(dr, 3));
  var fd = new ba(ql, new tr({ color: 13169133, size: 0.65, sizeAttenuation: true, transparent: true, opacity: 0.54, depthWrite: false, blending: sa }));
  fd.frustumCulled = false;
  Dt.add(fd);
  for (let i = 0; i < Za; i++) Fl.push({ p: new T(0, -2e3, 0), v: new T(), life: 0 });
  var Il = 0, Pl = 0;
  var gn = 0, He = false, Yu = performance.now(), Ha = 0, _n = 0;
  var pi = false, mr = 4, Ve = null;
  function be(i = 300, t = 0.08, e = "triangle", n = 0.027, s = 120) {
    if(fe.volume===0)return;
    try {
      Ve || (Ve = new (window.AudioContext || window.webkitAudioContext)()), Ve.state === "suspended" && Ve.resume();
      let r = Ve.createOscillator(), a = Ve.createGain();
      r.type = e, r.frequency.setValueAtTime(i, Ve.currentTime), r.frequency.exponentialRampToValueAtTime(Math.max(35, s), Ve.currentTime + t), a.gain.setValueAtTime(n*(fe.volume??.65), Ve.currentTime), a.gain.exponentialRampToValueAtTime(1e-3, Ve.currentTime + t), r.connect(a), a.connect(Ve.destination), r.start(), r.stop(Ve.currentTime + t + 8e-3);
    } catch {
    }
  }
  var punchNoiseBuffer=null;
  function playPunchContact(guarded,hardened){
    be(guarded?155:hardened?76:92,guarded?.08:.19,"sine",guarded?.035:.08,guarded?85:38);
    if(fe.volume===0||!Ve)return;
    try{
      if(!punchNoiseBuffer){punchNoiseBuffer=Ve.createBuffer(1,Math.ceil(Ve.sampleRate*.085),Ve.sampleRate);const data=punchNoiseBuffer.getChannelData(0);for(let n=0;n<data.length;n++)data[n]=(Math.random()*2-1)*Math.pow(1-n/data.length,3);}
      const source=Ve.createBufferSource(),filter=Ve.createBiquadFilter(),gain=Ve.createGain();
      source.buffer=punchNoiseBuffer;filter.type="lowpass";filter.frequency.value=guarded?2900:hardened?2100:1050;
      gain.gain.setValueAtTime((guarded?.10:hardened?.20:.15)*(fe.volume??.65),Ve.currentTime);gain.gain.exponentialRampToValueAtTime(.001,Ve.currentTime+.085);
      source.connect(filter);filter.connect(gain);gain.connect(Ve.destination);source.start();source.stop(Ve.currentTime+.09);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
    }catch{}
  }
  function pe(i) {
    let t = ut("#notice");
    t.textContent = i, t.classList.add("show"), Ha = 1.5;
  }
  var Wx = new T(), Xx = new T(), qx = new T(), Yx = new T(), Zx = new T(), Zu = new T(), md = new T(0, 1, 0), Ga = new hr();
  Ga.far = 155;
  function Zn() {
    return new T(-Math.sin(P.yaw) * Math.cos(P.pitch), Math.sin(P.pitch), -Math.cos(P.yaw) * Math.cos(P.pitch));
  }
  function Yl(i) {
    let t = i === 0 ? -1 : 1, e = new T(Math.cos(P.yaw), 0, -Math.sin(P.yaw)), n = new T(-Math.sin(P.yaw), 0, -Math.cos(P.yaw));
    return P.pos.clone().addScaledVector(e, 0.77 * t).addScaledVector(n, -0.76).add(new T(0, -1.12, 0));
  }
  var odmAimPreview = null, odmAimChecked = -1;
  function gd(i = 0) {
    if (i === -1 && gn - odmAimChecked < 0.065) return odmAimPreview;
    let done = (hit) => {
      if (i === -1) {
        odmAimPreview = hit;
        odmAimChecked = gn;
      }
      return hit;
    };
    let targets = ki.filter((m) => m.visible&&(!m.userData.enemy||m.userData.enemy.alive)&&!(m.userData.cityOnly && vn !== "city") && !(m.userData.cityLegacyWall && vn === "city"));
    Ga.far = fe.range;
    Zu.copy(Zn());
    Ga.set(P.pos, Zu);
    let direct = Ga.intersectObjects(targets, false)[0];
    if (direct && direct.distance <= 2.8) return done(null);
    if (P.pos.y < 9 && (!direct ? P.pitch > -0.35 && P.pitch < 0.4 : direct.point.y < P.pos.y + 8)) {
      for (let lift of [0.2, 0.35, 0.5]) {
        let dir = new T(-Math.sin(P.yaw) * Math.cos(P.pitch + lift), Math.sin(P.pitch + lift), -Math.cos(P.yaw) * Math.cos(P.pitch + lift));
        Ga.set(P.pos, dir);
        let hit = Ga.intersectObjects(targets, false)[0];
        if (hit && hit.distance > 2.8 && hit.point.y > P.pos.y + 8 && (!direct ? hit.distance < Math.min(fe.range, 120) : Math.hypot(hit.point.x - direct.point.x, hit.point.z - direct.point.z) < Math.max(12, direct.distance * 0.28))) {
          hit.odmLiftAssist = true;
          return done(hit);
        }
      }
    }
    return done(direct || null);
  }
  function _d(i) {
    if(assetSystem?.isTitan?.())return;
    let t = Be[i];
    if (t.state !== "idle") return;
    const direct=gd(i);let e = assetSystem?.getAssistedAnchor?.(i,Zn(),direct)||direct;
    if (!e) {
      be(190, 0.11, "triangle", 0.014, 90);
      return;
    }
    t.combatAssist=!!e.combatAssist;t.combatCanRelease=false;t.combatGuide=e.combatGuide||null;t.combatPhase=e.combatPhase||null;
    t.followObject = e.object.userData.titanPart ? e.object : null; t.followPoint = t.followObject ? e.object.worldToLocal(e.point.clone()) : null;
    t.active = true, t.state = "firing", t.order = ++hookOrder, t.anchor.copy(e.point), t.normal.copy(e.face ? e.face.normal : new T(0, 1, 0)).transformDirection(e.object.matrixWorld), t.from.copy(Yl(i)), t.head.copy(t.from), t.age = 0, t.travel = 0, t.flightDistance = t.from.distanceTo(t.anchor), t.line.visible = true, t.sheath.visible = true, t.tip.visible = true, be(i === 0 ? 310 : 350, 0.09, "triangle", 0.022, 95), _n = 0.035;
  }
  function xd(i) {
    let t = Be[i];
    t.state !== "idle" && (t.combatAssist=false,t.combatCanRelease=false,t.combatGuide=null,t.combatPhase=null,t.active = false, t.state = "idle", t.line.visible = false, t.sheath.visible = false, t.tip.visible = false, t.reelSpeed = 0, be(210, 0.045, "triangle", 0.012, 65));
  }
  function Tn(i) {
    let t = Be[i];
    t.state === "idle" ? _d(i) : xd(i), i === 0 ? ae.left = t.state !== "idle" : ae.rightHook = t.state !== "idle";
  }
  var autoWireHeld = false;
  function pressAutoWire() {
    if(assetSystem?.isTitan?.())return;
    if (autoWireHeld) return;
    autoWireHeld = true, Be[0].state === "idle" && _d(0), Be[1].state === "idle" && _d(1), ae.left = Be[0].state !== "idle", ae.rightHook = Be[1].state !== "idle";
  }
  function releaseAutoWire() {
    autoWireHeld && (autoWireHeld = false, yr());
  }
  function yr() {
    autoWireHeld = false, xd(0), xd(1), hookOrder = 0, ae.left = false, ae.rightHook = false, ut("#leftTouch").classList.remove("pressed"), ut("#rightTouch").classList.remove("pressed");
  }
  function launchOdm(automatic = false) {
    if (P.launchCooldown > 0) return;
    const combatLaunch=automatic&&Be.some(w=>w.combatAssist&&w.state==="locked");
    P.vel.y = Math.max(P.vel.y, combatLaunch ? 6 : automatic ? 21 : 19);
    P.grounded = false;
    P.launchAssist = combatLaunch ? .14 : 0.65;
    P.launchCooldown = 0.8;
    P.gasDelay = 0.6;
    P.gas = Math.max(0, P.gas - (automatic ? 3 : 0));
    for (let wire of Be) if (wire.state === "locked") wire.len += 3;
    be(150, 0.17, "triangle", 0.025, 65);
  }
  function yx(dt2) {
    let justLocked = false;
    for (let wire of Be) if (wire.state !== "idle") {
      wire.age += dt2;
      if (wire.state === "locked") wire.lockedAge += dt2;
      if (wire.state === "firing") {
        wire.travel += dt2 * 240;
        let phase = Math.min(1, wire.travel / Math.max(1, wire.flightDistance));
        wire.head.lerpVectors(wire.from, wire.anchor, phase);
        if (phase >= 1) {
          wire.state = "locked";
          wire.lockedAge = 0;
          wire.releaseRadius = wire.followObject?.userData.titanPart ? 1 : Math.min(5, Math.max(1.2, P.pos.distanceTo(wire.anchor) * 0.45));
          wire.len = Math.max(3.5, P.pos.distanceTo(wire.anchor));
          wire.tip.position.copy(wire.anchor);
          justLocked = true;
          be(185, 0.075, "triangle", 0.025, 75);
        }
      }
    }
    if (justLocked && (P.grounded || P.pos.y < 5)) launchOdm(true);
  }
  var cableMatrix = new ee(), cableRotation = new fn(), cableScale = new T(), cableMid = new T(), cableUp = new T(0, 1, 0),cablePoint=new T(),cablePrevious=new T(),cableDelta=new T(),cableDirection=new T();
  function Mx(dt2) {
    for (let side = 0; side < 2; side++) {
      let wire = Be[side];
      if (wire.state === "idle") continue;
      let start = Yl(side), end = wire.state === "locked" ? wire.anchor : wire.head, dist = start.distanceTo(end), slack = wire.state === "locked" ? Math.max(0, wire.len - dist) : 0;
      let sag = Math.min(slack * 0.22, 1.8), positions = wire.line.geometry.attributes.position, previous = null;
      for (let j = 0; j <= cableSegmentCount; j++) {
        let phase = j / cableSegmentCount, point = cablePoint.lerpVectors(start, end, phase);
        point.y -= Math.sin(Math.PI * phase) * sag;
        let twang = wire.state === "locked" ? Math.exp(-wire.age * 5) * 0.025 * Math.sin(phase * 18 - gn * 28) * Math.sin(Math.PI * phase) : 0;
        point.x += twang;
        positions.setXYZ(j, point.x, point.y, point.z);
        if (previous) {
          let delta = cableDelta.subVectors(point,previous), len = delta.length();
          cableRotation.setFromUnitVectors(cableUp, delta.normalize());
          cableMid.copy(point).add(previous).multiplyScalar(0.5);
          cableScale.set(1, len, 1);
          cableMatrix.compose(cableMid, cableRotation, cableScale);
          wire.sheath.setMatrixAt(j - 1, cableMatrix);
        }
        cablePrevious.copy(point);previous = cablePrevious;
      }
      positions.needsUpdate = true;
      wire.sheath.instanceMatrix.needsUpdate = true;
      wire.tip.position.copy(end);
      let direction = cableDirection.subVectors(end,start);
      if (direction.lengthSq() > 1e-3) wire.tip.quaternion.setFromUnitVectors(cableUp, direction.normalize());
    }
  }
  function vd() {
    let i = (ae.keys.has("KeyW") ? 1 : 0) - (ae.keys.has("KeyS") ? 1 : 0), t = (ae.keys.has("KeyD") ? 1 : 0) - (ae.keys.has("KeyA") ? 1 : 0);
    i += -ae.forward, t += ae.right;
    let e = Math.hypot(i, t);
    return e > 1 && (i /= e, t /= e), { f: i, r: t };
  }
  function Vi() {
    disarmSpear();titanCameraController?.reset();
    battlefieldSupport?.reset();
    pendingVictory=0;hitStopRemaining=0;impactCanvas.style.opacity="0";impactLabel.className="";impactLabel.textContent="";lastBladeImpact=null;lastPunchImpact=null;punchImpactCount=0;punchCameraImpact=null;
    if(focusPaused){focusPaused=false;Ye=false;ut("#pauseHint").style.display="none";}
    yr();
    odmAimChecked = -1;
    let i = Cs[vn];
    V.attackState = "idle", V.attackTimer = 0, V.recovery = 0, V.attackCooldown = 14, V.slamRing.visible = false, hookOrder = 0, P.score = 0, Xn = 0, Is = false, no = false, pi = false, ut("#endOverlay").classList.remove("show"), dx();
    for (let t of kl) t.hp = 3, t.hit = 0, t.resetAt = 0, t.body.material = dummyWood, t.grp.rotation.set(0, 0, 0);
    for (let t of fi) Dt.remove(t.root);
    fi.length = 0;
    for (let t = 0; t < wn.length; t++) {
      let e = wn[t];
      e.base.set(...i.points[t]), e.grp.position.copy(e.base), e.active = true, e.grp.visible = true;
    }
    P.pos.set(...i.start), P.vel.set(0, 0, 0), P.gas = 100, P.airTime = 0, P.launchAssist = 0, P.launchCooldown = 0, P.airDashCD = 0, P.gasDelay = 0, P.vaultTime = 0, P.health = 3, P.invulnerable = 0, P.thunderAmmo = mr, P.thunderMag = Math.min(2, mr), P.thunderReload = 0, ut("#ui").classList.remove("danger"), P.spares = 5, P.swap = 0, P.swapPhase = 0, P.slash = 0, P.slashCD = 0;P.bladeSwing=null;P.bladeNextSide=1;
    for (let t of [...Ka, ...vr]) for (let e of t.sword.userData.bladeParts) e.visible = true;
    ut("#bladeCount").textContent = P.spares, ut("#bladeMode").textContent = "READY", P.pitch = 0.28, P.yaw = vn === "forest" ? -1.3 : 0, P.grounded = false, ut("#runTime").textContent = "00:00.00", ut("#bestTime").textContent = ws(Ni), hd(), ut("#notice").classList.remove("show"), Ha = 0; if(assetSystem)assetSystem.reset();
  }
  function so() {
    if(assetSystem?.isTitan?.())return;
    P.third = !P.third, ut("#viewBtn").textContent = P.third ? "FPS VIEW" : "3RD VIEW", ut("#viewMobile").textContent = P.third ? "VIEW : 3RD" : "VIEW : FPS", pe(P.third ? "GEAR MODEL / THIRD PERSON" : "FIRST PERSON VIEW");
  }
  function ro() {
    if(assetSystem?.isTitan?.()){if(He&&!Ye&&!pi)assetSystem.punch();return;}
    if(P.spearArmed){Wl();return;}
    if(!He||Ye||pi||P.slashCD>0||P.swap>0||assetSystem?.getAssistStatus?.()?.dashing)return;
    P.bladeSwing={time:0,side:P.bladeNextSide,assisted:false,connected:false};P.bladeNextSide*=-1;
    P.slash=1;P.slashCD=.28;_n=.025;be(320,.14,"triangle",.024,680);
    if(assetSystem?.beginAssistedSlash?.(Zn()))return;
    if(!assetSystem?.beginAssistedSlash){resolveFreeBladeSwing();return;}
    P.bladeSwing.freePending=true;
  }
  function resolveFreeBladeSwing(){
    if(fx()){if(P.bladeSwing)P.bladeSwing.connected=true;return;}
    let i = Zn();
    for (let t of kl) {
      if (t.hp <= 0) continue;
      let e = t.grp.position.clone().add(new T(0, 1.9, 0)).sub(P.pos);
      if (!(e.length() > 6.2 || e.normalize().dot(i) < 0.44)) {
        t.hp--, t.hit = 0.25, t.resetAt = gn + 3.8, t.body.material = t.hp ? dummyMetal : ot.orange, be(140, 0.13, "square", 0.033, 80), t.hp === 0 && (t.grp.rotation.z = (Math.random() - 0.5) * 0.7, pe("TARGET DISABLED / PRACTICE HIT"));
        break;
      }
    }
  }
  function yd() {
    if(assetSystem?.isTitan?.()||assetSystem?.getAssistStatus?.()?.dashing)return;
    disarmSpear();
    !He || Ye || pi || P.swap > 0 || P.spares <= 0 || (P.swap = 1.1, P.swapPhase = 0, P.spares--, ut("#bladeCount").textContent = P.spares, ut("#bladeMode").textContent = "EJECT / LOAD", be(460, 0.11, "triangle", 0.028, 180));
  }
  function Sx() {
    let i = Zn(), t = new T(Math.cos(P.yaw), 0, -Math.sin(P.yaw));
    for (let e of [-1, 1]) {
      let n = new Me();
      if (Dt.add(n), he(n, vx, ot.blade, [0, 0, 0]).scale.setScalar(0.88), n.position.copy(P.pos).addScaledVector(t, 0.56 * e).addScaledVector(i, -0.17), n.position.y -= 0.6, n.rotation.set(0, P.yaw, e * 0.25), fi.push({ root: n, v: P.vel.clone().multiplyScalar(0.35).addScaledVector(t, e * 5).add(new T(0, 3, 0)), w: new T((Math.random() - 0.5) * 6, e * 3, (Math.random() - 0.5) * 8), life: 0, rest: false }), fi.length > 34) {
        let r = fi.shift();
        Dt.remove(r.root);
      }
    }
    for (let e of [...Ka, ...vr]) for (let n of e.sword.userData.bladeParts) n.visible = false;
    be(225, 0.13, "triangle", 0.025, 80);
  }
  function bx(i) {
    if (P.swap > 0) {
      if (P.swap = Math.max(0, P.swap - i), P.swap < 0.82 && P.swapPhase === 0 && (P.swapPhase = 1, Sx()), P.swap < 0.34 && P.swapPhase === 1) {
        P.swapPhase = 2;
        for (let t of [...Ka, ...vr]) for (let e of t.sword.userData.bladeParts) e.visible = true;
        be(620, 0.09, "triangle", 0.019, 900);
      }
      P.swap === 0 && (ut("#bladeMode").textContent = "READY");
    }
    for (let t = fi.length - 1; t >= 0; t--) {
      let e = fi[t];
      e.life += i, e.rest || (e.v.y -= 18 * i, e.root.position.addScaledVector(e.v, i), e.root.rotation.x += e.w.x * i, e.root.rotation.y += e.w.y * i, e.root.rotation.z += e.w.z * i, e.root.position.y < 0.06 && (e.root.position.y = 0.06, e.root.rotation.set(Math.PI / 2, e.root.rotation.y, 0), e.v.set(0, 0, 0), e.rest = true)), e.life > 12 && (Dt.remove(e.root), fi.splice(t, 1));
    }
  }
  function rn(i, t, e) {
    return Math.max(t, Math.min(e, i));
  }
  var Ui = 1.78, ui = 0.43;
  function Ex(previous) {
    let pos = P.pos, feet = pos.y - Ui, oldFeet = previous.y - Ui;
    P.grounded = false;
    if (feet < 0) {
      pos.y = Ui;
      if (P.vel.y < 0) P.vel.y = 0;
      P.grounded = true;
      feet = 0;
    }
    for (let box of Ku) {
      if (!box.mesh.visible || box.mesh.userData.cityOnly && vn !== "city" || box.mesh.userData.cityLegacyWall && vn === "city" || pos.y + 0.25 < box.bottom) continue;
      let dx2 = pos.x - box.x, dz = pos.z - box.z;
      if (Math.abs(dx2) > box.hx + ui || Math.abs(dz) > box.hz + ui) continue;
      let radius=box.radius===undefined?null:box.radius+(box.radiusTop-box.radius)*rn((pos.y-box.bottom)/(box.h-box.bottom),0,1);
      if(radius!==null&&Math.hypot(dx2,dz)>radius+ui)continue;
      const roofSlope=box.roofShape==="hip"?Math.max(Math.abs(dx2)/box.hx,Math.abs(dz)/box.hz):box.roofAxis==="z"?Math.abs(dz)/box.hz:Math.abs(dx2)/(box.hx+.6);
      let top = box.h + (box.roofHeight || 0) * Math.max(0, 1-roofSlope);
      if (P.vel.y <= 0 && oldFeet >= top - 0.55 && feet <= top && feet >= top - 2.3) {
        pos.y = top + Ui;
        P.vel.y = 0;
        P.grounded = true;
        feet = top;
        continue;
      }
      if(box.bottom>0&&P.vel.y>0&&previous.y+.25<=box.bottom+.05&&pos.y+.25>=box.bottom){pos.y=box.bottom-.25;P.vel.y=0;continue;}
      if (feet >= top - 0.03) continue;
      if(radius!==null){let distance=Math.hypot(dx2,dz);let nx=distance>.0001?dx2/distance:1,nz=distance>.0001?dz/distance:0;pos.x=box.x+nx*(radius+ui);pos.z=box.z+nz*(radius+ui);let inward=P.vel.x*nx+P.vel.z*nz;if(inward<0){P.vel.x-=inward*nx;P.vel.z-=inward*nz;}continue;}
      let penX = box.hx + ui - Math.abs(dx2), penZ = box.hz + ui - Math.abs(dz);
      if (penX < penZ) {
        let sign = dx2 >= 0 ? 1 : -1;
        pos.x = box.x + sign * (box.hx + ui);
        if (P.vel.x * sign < 0) {
          if (P.vaultTime > 0) P.vel.y = Math.max(P.vel.y, Math.min(25, Math.abs(P.vel.x) * 0.7 + 10));
          P.vel.x = 0;
        }
      } else {
        let sign = dz >= 0 ? 1 : -1;
        pos.z = box.z + sign * (box.hz + ui);
        if (P.vel.z * sign < 0) {
          if (P.vaultTime > 0) P.vel.y = Math.max(P.vel.y, Math.min(25, Math.abs(P.vel.z) * 0.7 + 10));
          P.vel.z = 0;
        }
      }
    }
  }
  function wx(dt2) {
    if (!He) return;
    if(P.bladeSwing){if(P.titanForm||P.spearArmed||P.swap>0)P.bladeSwing=null;else {P.bladeSwing.time+=dt2;if(P.bladeSwing.freePending&&P.bladeSwing.time>=.185){P.bladeSwing.freePending=false;resolveFreeBladeSwing();}if(P.bladeSwing.time>=.46)P.bladeSwing=null;}}
    if(assetSystem?.stepPlayer?.(dt2,vd(),ae.gas))return;
    let pos = P.pos, vel = P.vel, previous = pos.clone(), control = vd(), forward = new T(-Math.sin(P.yaw), 0, -Math.cos(P.yaw)), right = new T(Math.cos(P.yaw), 0, -Math.sin(P.yaw));
    P.launchAssist = Math.max(0, P.launchAssist - dt2);
    P.launchCooldown = Math.max(0, P.launchCooldown - dt2);
    P.airDashCD = Math.max(0, P.airDashCD - dt2);
    P.gasDelay = Math.max(0, P.gasDelay - dt2);
    P.vaultTime = Math.max(0, P.vaultTime - dt2);P.combatGrace=Math.max(0,(P.combatGrace||0)-dt2);
    yx(dt2);
    let hooked = Be.some((w) => w.state === "locked"), input = new T().addScaledVector(forward, control.f).addScaledVector(right, control.r);
    if (input.lengthSq() > 1) input.normalize();
    input.multiplyScalar(P.grounded ? 43 : hooked ? 24 : 20);
    let horizontalSpeed = Math.hypot(vel.x, vel.z), glide = rn((horizontalSpeed - 18) / 45, 0, 1), baseGravity = fe.gravity === "low" ? 8 : fe.gravity === "high" ? 25 : 16;
    input.y = -baseGravity * (P.grounded ? 1 : 1 - glide * 0.52)*(P.combatGrace>0?.15:1);
    let boost = ae.gas && (fe.infinite || P.gas > 0.2);
    if (boost) {
      input.addScaledVector(Zn(), 32);
      input.y += 2;
      P.gasDelay = 0.8;
      if (!fe.infinite) P.gas = Math.max(0, P.gas - dt2 * 10.5);
    } else if (P.gasDelay === 0) P.gas = Math.min(100, P.gas + dt2 * (P.grounded ? 25 : 5.5));
    P.boost = boost || P.launchAssist > 0.25;
    let primaryWire = Be.filter((w) => w.state === "locked").reduce((a, b) => !a || b.order > a.order ? b : a, null);
    if (primaryWire) {
      let gap = primaryWire.anchor.distanceTo(pos), before = primaryWire.len, winch = rn(12 + gap * 0.18, 18, boost ? 46 : 32) * (fe.maxSpeed / 60);
      primaryWire.len = Math.max(3.5, Math.min(before - winch * dt2, gap + (P.launchAssist > 0 ? 2 : 0.5)));
      primaryWire.reelSpeed = Math.max(0, (before - primaryWire.len) / dt2);
    }
    for (let wire of Be) {
      if (wire.state !== "locked") {
        wire.reelSpeed = 0;
        continue;
      }
      let delta = wire.anchor.clone().sub(pos), gap = delta.length();
      if (gap < 0.5) continue;
      let dir = delta.divideScalar(gap), support = wire !== primaryWire;
      if (support) {
        let before = wire.len, feasible = wire.anchor.distanceTo(primaryWire.anchor) - primaryWire.len + 3.5;
        wire.len = Math.max(3.5, feasible, Math.min(before - 12 * dt2, gap + 0.5));
        wire.reelSpeed = Math.max(0, (before - wire.len) / dt2);
      }
      if(wire.combatAssist)continue;
      let extension = gap - wire.len, toward = vel.dot(dir);
      if (extension > -0.3) input.addScaledVector(dir, Math.min(support ? 24 : 80, (Math.max(0, extension) * 34 + Math.max(0, -toward) * 2.4) * (support ? 0.3 : 1)));
    }
    if (hooked && !boost && Math.hypot(control.f, control.r) < 0.1) {
      let wire = Be.filter((w) => w.state === "locked").reduce((a, b) => a.order > b.order ? a : b), delta = (wire.combatGuide||wire.anchor).clone().sub(pos), gap = delta.length();
      if (gap > 0.1) {
        let desired = delta.multiplyScalar(1 / gap).multiplyScalar(wire.combatAssist?rn(gap*1.8,9,42):rn(gap * 1.45, 16, Math.min(68, fe.maxSpeed * 0.85))), mix = 1 - Math.exp(-dt2 * (wire.combatAssist?8:3.2));
        vel.x += (desired.x - vel.x) * mix;
        vel.z += (desired.z - vel.z) * mix;
        if (P.launchAssist <= 0) {
          let vertical = Math.max(desired.y, -(pos.y < 12 ? 3 : 18));
          if (vertical > vel.y) vel.y += (vertical - vel.y) * mix;
          else vel.y += (vertical - vel.y) * mix * (wire.combatAssist?1:.32);
        }
      }
    }
    if (P.launchAssist > 0) input.y = Math.max(input.y, 5);
    vel.addScaledVector(input, dt2);
    let drag = Math.exp(-dt2 * (P.grounded ? 5.3 : boost ? 0.022 : 0.038));
    vel.x *= drag;
    vel.z *= drag;
    vel.y *= Math.exp(-dt2 * 0.012);
    if (P.launchAssist <= 0) for (let wire of Be) {
      if (wire.state !== "locked"||wire.combatAssist) continue;
      let offset = pos.clone().sub(wire.anchor), gap = offset.length();
      if (gap > wire.len + 0.2 && gap > 0.2) {
        offset.divideScalar(gap);
        let outward = vel.dot(offset);
        if (outward > 0) vel.addScaledVector(offset, -outward * 0.96);
      }
    }
    let limit = Math.max(20, fe.maxSpeed - (mr - 2) * 0.7);
    if (hooked) limit *= boost ? 0.92 : 0.78;
    if(Be.some(w=>w.state==="locked"&&w.combatAssist))limit=Math.min(limit,44);
    if (vel.lengthSq() > limit * limit) vel.setLength(limit);
    pos.addScaledVector(vel, dt2);
    let nearRelease = false;
    for (let side = 0; side < 2; side++) {
      let wire = Be[side];
      if (wire.state !== "locked") continue;
      if(wire.combatAssist&&((wire.combatPhase!=="strike"&&wire.combatPhase!=="staging")||!wire.combatCanRelease))continue;
      let path = pos.clone().sub(previous), den = path.lengthSq(), closest = previous.clone().addScaledVector(path, den ? rn(wire.anchor.clone().sub(previous).dot(path) / den, 0, 1) : 0),stagingArrival=wire.combatAssist&&wire.combatPhase==="staging"&&wire.combatGuide&&pos.distanceTo(wire.combatGuide)<=1;
      if (wire.lockedAge >= 0.22 && (stagingArrival||pos.distanceTo(wire.anchor) <= wire.releaseRadius || closest.distanceTo(wire.anchor) <= wire.releaseRadius)) {
        if(wire.combatAssist){P.vel.multiplyScalar(wire.combatPhase==="staging" ? .72 : .25);P.combatGrace=.8;}
        if (!nearRelease && !wire.combatAssist && wire.normal.y < 0.45) {
          let into = vel.dot(wire.normal);
          if (into < 0) vel.addScaledVector(wire.normal, -into * 0.72);
          vel.y = Math.max(vel.y, 14);
          P.vaultTime = 0.5;
        }
        xd(side);
        if (side === 0) ae.left = false;
        else ae.rightHook = false;
        nearRelease = true;
      }
    }
    Ex(previous);
    if(assetSystem)assetSystem.resolvePlayer(previous);
    let ceiling = vn === "city" ? 244 : 196, sideLimit = vn === "city" ? 560 : 282, southLimit = vn === "city" ? 620 : 282;
    if (pos.y > ceiling) {
      pos.y = ceiling;
      if (vel.y > 0) vel.y = 0;
    }
    if (Math.abs(pos.x) > sideLimit) {
      pos.x = rn(pos.x, -sideLimit, sideLimit);
      vel.x = 0;
    }
    if (pos.z > southLimit || pos.z < -sideLimit) {
      pos.z = rn(pos.z, -sideLimit, southLimit);
      vel.z = 0;
    }
    if (P.grounded) P.airTime = 0;
    else {
      P.airTime += dt2;
      P.bestAirTime = Math.max(P.bestAirTime, P.airTime);
    }
    if (pos.y < -30 || !Number.isFinite(pos.x)) Vi();
  }
  function Md() {
    if(assetSystem?.isTitan?.()){if(He&&!Ye&&!pi)assetSystem.jump();return;}
    if (!He||Ye||pi) return;
    if (P.grounded || P.pos.y < 2.5) {
      P.launchCooldown = 0;
      launchOdm(false);
      return;
    }
    if (P.airDashCD > 0 || !fe.infinite && P.gas < 9) return;
    P.airDashCD = 0.65;
    P.gasDelay = 0.8;
    if (!fe.infinite) P.gas -= 9;
    let forward = Zn();
    P.vel.addScaledVector(forward, 10);
    P.vel.y = Math.max(P.vel.y, 17);
    P.launchAssist = 0.32;
    be(190, 0.12, "triangle", 0.022, 75);
  }
  var Tx = ut("#speed"), Ax = ut("#alt"), Rx = ut("#gasReadout"), Cx = ut("#gasBar"), Px = ut("#reticle"), Ju = ut("#midPrompt");
  function Lx(i) {
    if (P.boost) for (Pl += i * (Ze ? 35 : 55); Pl >= 1; ) {
      Pl--;
      let t = Il % 2, e = Fl[Il % Za];
      Il++;
      let n = new T(Math.sin(P.yaw), 0, Math.cos(P.yaw));
      e.p.copy(Yl(t)).addScaledVector(n, 0.28), e.life = 0.13 + Math.random() * 0.15, e.v.copy(P.vel).multiplyScalar(0.15).addScaledVector(n, 4 + Math.random() * 3), e.v.y -= 4 + Math.random() * 3;
    }
    for (let t = 0; t < Za; t++) {
      let e = Fl[t];
      e.life > 0 ? (e.life -= i, e.p.addScaledVector(e.v, i), e.v.multiplyScalar(Math.exp(-i * 1.8))) : e.p.set(0, -2e3, 0), dr[t * 3] = e.p.x, dr[t * 3 + 1] = e.p.y, dr[t * 3 + 2] = e.p.z;
    }
    ql.attributes.position.needsUpdate = true;
  }
  var raidCameraRay = new hr(),titanCameraController=window.RaidModels?.createTitanCamera?.();
  function clipTitanCamera(from,to){const delta=to.clone().sub(from),length=delta.length();if(length<.05)return to;const blocked=raidObstacle(from,delta.divideScalar(length),length+.4);if(blocked)return from.clone().addScaledVector(delta,Math.max(.12,blocked.distance-.45));return to;}
  function updateRaidCamera(player, desired, dt2) {
    let blockers = ki.filter((mesh) => mesh.visible && !mesh.userData.titanPart && !(mesh.userData.cityOnly && vn !== "city") && !(mesh.userData.cityLegacyWall && vn === "city"));
    function clip(point) {
      let direction = point.clone().sub(player), distance = direction.length();
      if (distance < 0.05) return false;
      raidCameraRay.set(player, direction.divideScalar(distance));
      raidCameraRay.near = 0.05;
      raidCameraRay.far = distance + 0.4;
      let hit = raidCameraRay.intersectObjects(blockers, false)[0];
      if (hit) point.copy(player).addScaledVector(direction, Math.max(0.12, hit.distance - 0.4));
      return !!hit;
    }
    let blocked = clip(desired), candidate = blocked ? desired : qe.position.clone().lerp(desired, rn(dt2 * 8, 0, 1));
    clip(candidate);
    qe.position.copy(candidate);
    qe.position.y = Math.max(0.4, qe.position.y);
  }
  // Shoulder-led horizontal draw cut. The second hand follows 65ms later;
  // both blades use the same sweep direction instead of meeting in an X.
  function raidBladePose(side){
    const swing=P.bladeSwing,lead=!swing||side===swing.side,d=swing?.side||1,time=swing?Math.max(0,swing.time-(lead?0:.065)):.46;
    const idle=[side*.6,-.67,-1,-.89,side*.18,-side*.16];
    if(!swing)return idle;
    const frames=lead?[
      [0,...idle],[.065,d*.82,-.51,-.82,-1.08,-d*.5,-d*.65],
      [.185,-d*.10,-.48,-1.22,-.6,d*.75,d*1.1],
      [.3,-d*.6,-.78,-.72,-.35,d*1.2,d*1.65],[.46,...idle]
    ]:[
      [0,...idle],[.065,-d*.72,-.76,-.86,-1.02,-d*.25,d*.25],
      [.185,-d*.32,-.62,-1.12,-.7,d*.45,d*.85],
      [.29,d*.28,-.79,-.86,-.48,d*.8,d*1.15],[.395,...idle]
    ];
    let a=frames[0],b=frames[frames.length-1];for(let k=1;k<frames.length;k++)if(time<=frames[k][0]){a=frames[k-1];b=frames[k];break;}
    const u=rn((time-a[0])/Math.max(.001,b[0]-a[0]),0,1),ease=u*u*(3-2*u);return idle.map((_,k)=>a[k+1]+(b[k+1]-a[k+1])*ease);
  }
  function animateRaidBlades(){
    const swing=P.bladeSwing,R=P.swap>0?Math.sin((1.1-P.swap)/1.1*Math.PI):0,phase=swing?Math.sin(rn(swing.time/.46,0,1)*Math.PI):0,twist=(swing?.side||1)*phase;
    for(const {arm,side} of vr){const p=raidBladePose(side);arm.position.set(p[0],p[1]-R*.24,p[2]);arm.rotation.set(p[3]+R*.33,p[4],p[5]+side*R*.32);}
    // Keep the camera aim under mouse control; the body and weapon carry the turn.
    Es.rotation.y+=twist*.09;Es.rotation.z+=twist*.035;
    _e.rotation.y=twist*.58;_e.rotation.z+=twist*.18;Qa.rotation.y=-twist*.25;
    for(const {arm,elbow,side} of raidHumanArms){const p=raidBladePose(side);arm.rotation.set((p[3]+.89)*1.1-.2, p[4]*.65, p[5]*.8);elbow.rotation.x=-.3-phase*(side===(swing?.side)? .15:.3);}
  }
  function Ux(i) {
    let t = P.pos, e = vd(),titanFov=null,duelStatus=assetSystem?.isTitan?.()?assetSystem.getCombatStatus?.():null;
    if(punchCameraImpact){punchCameraImpact.age+=i;if(punchCameraImpact.age>.28)punchCameraImpact=null;}
    raidHitTime=Math.max(0,raidHitTime-i);if(raidHitTime===0)ut("#reticle").classList.remove("hit");
    P.slashCD = Math.max(0, P.slashCD - i), P.slash = Math.max(0, P.slash - i * 3.8), _n *= Math.exp(-i * 13), P.step += i, P.invulnerable = Math.max(0, P.invulnerable - i);
    let n = Zn(), s = new T(Math.cos(P.yaw), 0, -Math.sin(P.yaw)), r = P.vel.dot(s), a = P.vel.length(), o = rn(-r * 3e-3 - e.r * 0.04, -0.18, 0.18);
    P.bank += (o - P.bank) * Math.min(1, i * 4.2);
    let c = P.pitch + _n * Math.sin(gn * 98), l = P.yaw + _n * 0.3 * Math.cos(gn * 75);
    if(assetSystem?.isTitan?.()){
      const view=titanCameraController?.update({position:t,yaw:P.yaw,pitch:P.pitch,target:duelStatus?.opponent,dt:i,occlude:clipTitanCamera});if(view){qe.position.copy(view.position);if(punchCameraImpact){const kick=punchCameraImpact.power*Math.exp(-punchCameraImpact.age*18);qe.position.addScaledVector(punchCameraImpact.direction,-kick);qe.position.y+=kick*.22;}qe.position.x+=_n*Math.sin(gn*79);qe.position.y+=_n*Math.cos(gn*91);qe.position.copy(clipTitanCamera(t.clone().add(new T(0,-2,0)),qe.position));qe.up.set(0,1,0);qe.lookAt(view.lookAt);titanFov=view.fov;}Es.visible=false;_e.visible=false;
    }else if (P.third) {
      let x = t.clone().addScaledVector(n, 2), _ = t.clone().addScaledVector(n, -6.7).add(new T(0, 2.3, 0));
      updateRaidCamera(t, _, i), qe.up.set(Math.sin(P.bank * 0.65), Math.cos(P.bank * 0.65), 0), qe.lookAt(x), Es.visible = false, _e.visible = true;
    } else {
      qe.position.copy(t).addScaledVector(s, _n * Math.sin(gn * 85)), qe.rotation.set(c, l, P.bank, "YXZ");
      let x = Math.sin(P.step * 8) * (P.grounded ? 0.013 : 3e-3), _ = P.swap > 0 ? Math.sin((1.1 - P.swap) / 1.1 * Math.PI) : 0;
      Es.position.set(x + e.r * 0.02, Math.abs(x) * -0.7 + e.f * 0.025 - 0.22 * _, Math.sin(P.step * 4) * 0.013 + 0.22 * _), Es.rotation.set(P.vel.y * 8e-4, 0, -e.r * 0.018 + P.bank * 0.15), Es.visible = true, _e.visible = false;
    }
    _e.visible = P.third&&!assetSystem?.isTitan?.(), Ya.position.set(t.x, t.y - Ui, t.z), Ya.rotation.y = P.yaw;
    for (let x of Xu.userData.rotors) {
      let _ = Be[x.side < 0 ? 0 : 1];
      _.state === "locked" ? x.rotor.rotation.x += i * Math.min(110, _.reelSpeed * 2.4) * (x.side < 0 ? 1 : -1) : _.state === "firing" && (x.rotor.rotation.x += i * 27 * (x.side < 0 ? 1 : -1));
    }
    for (let x of Xu.userData.nozzles) {
      let _ = P.boost ? 0.28 : -0.07;
      x.rotation.x += (_ - x.rotation.x) * Math.min(1, i * 10);
    }
    _e.rotation.z = P.bank * 1.2, _e.rotation.x = rn(-P.vel.y * 6e-3, -0.42, 0.3), Qa.rotation.x = rn(0.16 + a * 6e-3, 0.1, 1);
    animateRaidBlades();
    for (let x of kl) x.hit > 0 && (x.hit = Math.max(0, x.hit - i), x.grp.rotation.y += i * 7), x.hp <= 0 && gn > x.resetAt && (x.hp = 3, x.body.material = dummyWood, x.grp.rotation.z = 0);
    for (let x = 0; x < wn.length; x++) {
      let _ = wn[x];
      _.active && (_.grp.position.y = _.base.y + Math.sin(gn * 1.15 + _.grp.userData.phase) * 0.35, _.grp.rotation.y += i * 0.5, _.grp.children[0].rotation.z += i * 0.36);
    }
    let h = wn[P.score];
    h && h.active && h.grp.position.distanceTo(t) < 3.3 && (h.active = false, h.grp.visible = false, P.score++, be(900, 0.25, "sine", 0.055, 460), _n = 0.06, P.score >= Cs[vn].points.length ? (Is = false, no = true, Xn > 0 && (!Ni || Xn < Ni) ? (Ni = Xn, xx(Xn), ut("#bestTime").textContent = ws(Ni), pe("NEW BEST / " + ws(Xn))) : pe("COURSE COMPLETE / " + ws(Xn))) : pe("CHECKPOINT " + P.score + " / " + Cs[vn].points.length), hd()), Is && (Xn += i, ut("#runTime").textContent = ws(Xn));
    let d = wn[P.score];
    if (d && d.active) {
      let x = d.base.clone().sub(t);
      ut("#navDistance").textContent = Math.round(x.length()) + " m";
      let D = Math.atan2(-x.x, -x.z) - P.yaw;
      D = Math.atan2(Math.sin(D), Math.cos(D)), ut("#navBearing").style.transform = `rotate(${-D}rad)`;
    } else ut("#navDistance").textContent = "CLEAR";
    Mx(i), bx(i), Lx(i), gx(i), mx(i), eo();
    for (let x of Dt.children) x.userData.beacon && (x.rotation.y += i * 1.2, x.position.y += Math.sin(gn * 1.8 + x.position.x) * i * 0.1);
    let u = gd(-1), p = Gl();if(assetSystem&&!P.spearArmed){const armor=closeBladeArmor();if(armor)p=armor;}
    Px.classList.toggle("ready", !!u), Ju.classList.toggle("show", !!p);
    let g = p ? { armorL: "LEFT ARMOR", armorR: "RIGHT ARMOR", nape: V.napeOpen ? "NAPE / CUT" : "NAPE SEALED", body: "BODY / LOW DAMAGE" }[p.object.userData.titanPart] || "TITAN" : `${Math.round(u?.distance || 0)} M / ANCHOR`;
    Ju.textContent = p ? "THUNDER LOCK / " + g : u ? u.odmLiftAssist ? "\u96E2\u9678\u30A2\u30F3\u30AB\u30FC / " + Math.round(u.distance) + " M" : g : "NO ANCHOR";
    if(assetSystem){const neck=V.weak.getWorldPosition(new T()),offset=neck.clone().sub(P.pos),back=P.pos.clone().sub(neck).dot(new T(0,0,1).applyQuaternion(V.root.quaternion))<.4;const canCut=V.napeOpen&&back&&offset.length()<=8.5&&offset.normalize().dot(Zn())>.28;
      Ju.classList.toggle("show",canCut||!!p);Ju.textContent=canCut?"うなじ / 斬撃可能":p?({armorL:"左肩装甲",armorR:"右肩装甲",nape:"うなじ",body:"胴体"}[p.object.userData.titanPart]+(p.distance<=(p.object.userData.titanPart==="nape"?8.5:8.2)?" / 斬撃圏内":" / 雷槍照準")):"";
    }

    const assist=assetSystem?.getAssistStatus?.(Zn());Px.classList.toggle("locked",!!assist);if(assist){Ju.classList.add("show");Ju.textContent=P.spearArmed?"R / 雷槍発射":assist.ready?(assist.part==="nape"?"クリック / うなじ斬り":"クリック / 装甲を斬る"):assist.atStage&&assist.part==="nape"?(assist.rearAlignment<.78?"さらに背後へ回る":assist.aimAlignment<.75?"うなじへ照準":"斬撃準備完了"):"巨人に接近";}
    if(assetSystem?.isTitan?.()){const duel=duelStatus,form=assetSystem.inspect().hero;Ju.classList.toggle("show",form.state==="titan");Ju.textContent=form.guardBroken>0?"ガードが崩れた / 距離を取れ":form.counterSeconds>0?(form.guarding?"反撃の隙 / ガードを離してクリック":"クリック / カウンター"):form.guarding?"ガード中":duel?.phase==="warning"?(duel.attack==="steam"||duel.attack==="stomp"?"範囲攻撃 / 距離を取れ":"振りかぶり / 右クリックでガード"):duel?.canPunch?(duel.phase==="recovery"?"攻撃後の隙 / 打ち返せ":"拳が届く / クリック"):duel?.opponent?"間合いを詰める":"";Px.classList.toggle("locked",!!duel?.canPunch);}
    let v = Math.round(a * 3.6);
    Tx.textContent = v, Ax.textContent = Math.max(0, Math.round(t.y - Ui)), Rx.textContent = fe.infinite ? "\u221E" : Math.round(P.gas) + "%", Cx.style.width = (fe.infinite ? 100 : P.gas) + "%";
    for (let x = 0; x < 2; x++) {
      let _ = Be[x], D = x === 0 ? "L" : "R";
      ut("#hook" + D).textContent = _.state === "locked" ? Math.round(t.distanceTo(_.anchor)) + " M" : _.state === "firing" ? "FIRING" : "STANDBY", ut("#length" + D).style.width = _.state === "idle" ? "0%" : _.state === "firing" ? "33%" : rn(100 - _.len / fe.range * 100, 5, 100) + "%";
    }
    ut("#velocityLines").style.opacity = 0, ut("#windOverlay").style.opacity = 0, ut("#flash").style.opacity = 0, void 0;
    let f = Ze ? 80 : 76, E = titanFov??(f + rn((a - 19) * 0.16, 0, 7)), nextFov = qe.fov + (E - qe.fov) * Math.min(1, i * 5);
    if (Math.abs(nextFov - qe.fov) > 0.01) {
      qe.fov = nextFov;
      qe.updateProjectionMatrix();
    }
    Ha > 0 && (Ha -= i, Ha <= 0 && ut("#notice").classList.remove("show"));
  }
  var Va = 0, Ye = false, focusPaused=false;
  function Sd(i) {
    requestAnimationFrame(Sd);
    let t = Math.min(0.06, Math.max(0, (i - Yu) / 1e3 || 0));
    if (Yu = i, He && !Ye && !pi) {
      const frozen=Math.min(t,hitStopRemaining);hitStopRemaining=Math.max(0,hitStopRemaining-frozen);t-=frozen;
      if(t>0){let finishVictory=false;if(pendingVictory>0){pendingVictory=Math.max(0,pendingVictory-t);finishVictory=pendingVictory===0;}
       gn += t, Va = Math.min(0.075, Va + t); if(assetSystem)assetSystem.update(t);if(battlefieldSupport)battlefieldSupport.update(t,{enabled:vn==="city",running:true});
       let e = 0;
       for (; Va >= 1 / 120 && e++ < 8; ) wx(1 / 120), Va -= 1 / 120;
       Ux(t);if(finishVictory&&!pi)cd(true);
      }
    }
    Ee.render(Dt, qe);
  }
  requestAnimationFrame(Sd);
  var Wa = /* @__PURE__ */ new Set();
  function bd(i, t) {
    let e = i.code;
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ShiftLeft", "ShiftRight", "KeyQ", "KeyE", "KeyV", "KeyR", "KeyB", "KeyF", "KeyG", "KeyT"].includes(e) && i.preventDefault(), !!He) {
      if (!t) {
        Wa.delete(e), (e === "ShiftLeft" || e === "ShiftRight") && (ae.gas = false), "KeyW KeyA KeyS KeyD".split(" ").includes(e) && ae.keys.delete(e);
        return;
      }
      if (!Wa.has(e)) {
        if (Wa.add(e), e === "KeyG" || e === "Escape") {
          Jl();
          return;
        }
        Ye || ("KeyW KeyA KeyS KeyD".split(" ").includes(e) && ae.keys.add(e), (e === "ShiftLeft" || e === "ShiftRight") && (ae.gas = true), e === "KeyQ" && Tn(0), e === "KeyE" && Tn(1), e === "Space" && Md(), e === "KeyV" && so(), e === "KeyR" && useThunder(), e === "KeyT" && transformPlayer(), e === "KeyF" && (disarmSpear(),ro()), e === "KeyB" && yd(), e === "KeyX" && yr());
      }
    }
  }
  addEventListener("keydown", (i) => bd(i, true));
  addEventListener("keyup", (i) => bd(i, false));
  function Zl() {
    Wa.clear(), ae.keys.clear(), ae.gas = false, releaseAutoWire();assetSystem?.setGuardHeld?.(false);
  }
  function requestRaidLock(){
    if(Ze||!He||Ye||pi)return;
    try{Promise.resolve(Ee.domElement.requestPointerLock()).catch(()=>pauseFocus());}catch{pauseFocus();}
  }
  function pauseFocus(){
    if(!He||pi||Ye)return;
    Zl();focusPaused=true;Ye=true;ut("#pauseHint").style.display="block";
  }
  function resumeFocus(){
    if(!focusPaused)return;
    focusPaused=false;Ye=false;Yu=performance.now();Va=0;ut("#pauseHint").style.display="none";
    if(!Ze)requestRaidLock();
  }
  ut("#pauseHint").addEventListener("click",resumeFocus);
  addEventListener("blur",pauseFocus);
  document.addEventListener("pointerlockchange",()=>{if(!Ze&&document.pointerLockElement!==Ee.domElement)pauseFocus();});
  document.addEventListener("visibilitychange", () => {
    document.hidden && pauseFocus();
  });
  Ee.domElement.addEventListener("click", () => {
    if(focusPaused){resumeFocus();return;}
    He && !Ye && !Ze && document.pointerLockElement !== Ee.domElement && requestRaidLock();
  });
  Ee.domElement.addEventListener("mousedown", (i) => {
    if (!He || Ye || Ze || pi) return;
    if (i.button === 2) {
      i.preventDefault();
      if (document.pointerLockElement === Ee.domElement){if(assetSystem?.isTitan?.())assetSystem.setGuardHeld?.(true);else pressAutoWire();}
      return;
    }
    i.button === 0 && document.pointerLockElement === Ee.domElement && ro();
  });
  addEventListener("mouseup", (i) => {
    if(i.button === 2){releaseAutoWire();assetSystem?.setGuardHeld?.(false);}
  });
  Ee.domElement.addEventListener("contextmenu", (i) => i.preventDefault());
  addEventListener("mousemove", (i) => {
    if(Math.abs(i.movementX)+Math.abs(i.movementY)>3)P.lookOverride=.25;
    He && !Ye && document.pointerLockElement === Ee.domElement && (P.yaw -= i.movementX * 21e-4, P.pitch = rn(P.pitch - i.movementY * 21e-4, -1.38, 1.38));
  });
  ut("#viewBtn").addEventListener("click", so);
  ut("#viewMobile").addEventListener("click", so);
  ut("#resetBtn").addEventListener("click", Vi);
  ut("#endAgain").addEventListener("click", () => {
    Vi(), ut("#endOverlay").classList.remove("show"), He = true, Ze || requestRaidLock();
  });
  ut("#start").addEventListener("click", dd);
  ut("#courseSelect").addEventListener("change", (i) => Xl(i.target.value));
  ut("#restartRace").addEventListener("click", ud);
  var Ps = ut("#joyBase"), Ed = ut("#joyKnob"), gr = ut("#lookZone"), Ja = null, Ls = null, Ol = 0, Bl = 0, wd = (i) => {
    let t = Ps.getBoundingClientRect(), e = t.left + t.width / 2, n = t.top + t.height / 2, s = i.clientX - e, r = i.clientY - n, a = Math.hypot(s, r), o = Math.min(t.width * 0.34, a), c = Math.atan2(r, s);
    s = Math.cos(c) * o, r = Math.sin(c) * o, Ed.style.transform = `translate(${s}px,${r}px)`, ae.forward = r / (t.width * 0.34), ae.right = s / (t.width * 0.34);
  };
  Ps.addEventListener("pointerdown", (i) => {
    i.preventDefault(), Ja = i.pointerId, wd(i);
    try {
      Ps.setPointerCapture(i.pointerId);
    } catch {
    }
  });
  addEventListener("pointermove", (i) => {
    i.pointerId === Ja && wd(i);
  });
  function resetJoy() {
    Ja = null, ae.forward = 0, ae.right = 0, Ed.style.transform = "translate(0,0)", Ps.classList.remove("active");
  }
  function Td(i) {
    i.pointerId === Ja && resetJoy();
  }
  addEventListener("pointerup", Td);
  addEventListener("pointercancel", Td);
  let joystickTouch = null;
  Ps.addEventListener("touchstart", (i) => {
    if (joystickTouch !== null) return;
    let t = i.changedTouches[0];
    joystickTouch = t.identifier, i.preventDefault(), Ps.classList.add("active"), wd(t);
  }, { passive: false });
  Ps.addEventListener("touchmove", (i) => {
    let t = [...i.changedTouches].find((t2) => t2.identifier === joystickTouch);
    t && (i.preventDefault(), wd(t));
  }, { passive: false });
  function endJoystickTouch(i) {
    [...i.changedTouches].some((t) => t.identifier === joystickTouch) && (joystickTouch = null, resetJoy());
  }
  Ps.addEventListener("touchend", endJoystickTouch, { passive: false });
  Ps.addEventListener("touchcancel", endJoystickTouch, { passive: false });
  gr.addEventListener("pointerdown", (i) => {
    if (!He || Ye) return;
    i.preventDefault(), Ls = i.pointerId, Ol = i.clientX, Bl = i.clientY;
    try {
      gr.setPointerCapture(i.pointerId);
    } catch {
    }
  });
  addEventListener("pointermove", (i) => {
    if (i.pointerId !== Ls || Ye) return;
    let t = i.clientX - Ol, e = i.clientY - Bl;
    Ol = i.clientX, Bl = i.clientY, P.yaw -= t * 42e-4, P.pitch = rn(P.pitch - e * 42e-4, -1.38, 1.38);
  });
  addEventListener("pointerup", (i) => {
    i.pointerId === Ls && (Ls = null);
  });
  addEventListener("pointercancel", (i) => {
    i.pointerId === Ls && (Ls = null);
  });
  function Us(i, t, e) {
    let n = ut(i), pressed = false, s = (r) => n.classList.toggle("pressed", r), down = (r) => {
      if (Ye || pressed) return;
      r.preventDefault && r.preventDefault(), r.stopPropagation && r.stopPropagation(), pressed = true, r.pointerId !== void 0 && (() => {
        try {
          n.setPointerCapture(r.pointerId);
        } catch {
        }
      })(), s(true), t();
    }, up2 = (r) => {
      if (!pressed) return;
      r.preventDefault && r.preventDefault(), pressed = false, s(false), e && e();
    };
    n.addEventListener("pointerdown", down);
    for (let r of ["pointerup", "pointercancel", "lostpointercapture"]) n.addEventListener(r, up2);
    n.addEventListener("touchstart", down, { passive: false });
    for (let r of ["touchend", "touchcancel"]) n.addEventListener(r, up2, { passive: false });
  }
  Us("#leftTouch", () => Tn(0), () => {
  });
  Us("#rightTouch", () => Tn(1), () => {
  });
  Us("#gasTouch", () => ae.gas = true, () => ae.gas = false);
  Us("#jumpTouch", Md, () => {
  });
  Us("#cutTouch", ro, () => {
  });
  Us("#releaseTouch", useThunder, () => {
  });
  function Ad() {
    let i = Ze ? 0.9 : 1;
    fe.quality === "low" && (i = 1), fe.quality === "high" && (i = Ze ? 1.65 : 2), fe.quality === "max" && (i = 3), Ee.setPixelRatio(Math.min(devicePixelRatio, i)), Ee.setSize(innerWidth, innerHeight), An.castShadow = false;
  }
  function Jl(i) {
    focusPaused=false;ut("#pauseHint").style.display="none";
    let t = ut("#settingOverlay");
    Ye = typeof i == "boolean" ? i : !Ye, t.classList.toggle("open", Ye), Ye ? (Zl(), document.pointerLockElement && document.exitPointerLock()) : He && !Ze && requestRaidLock();
  }
  ut("#settingBtn").addEventListener("click", () => Jl(true));
  ut("#settingClose").addEventListener("click", () => Jl(false));
  ut("#setInfinite").addEventListener("change", (i) => fe.infinite = i.target.checked);
  ut("#setGravity").addEventListener("change", (i) => fe.gravity = i.target.value);
  ut("#setRange").addEventListener("change", (i) => fe.range = Number(i.target.value));
  ut("#setSpeed").addEventListener("change", (i) => fe.maxSpeed = Number(i.target.value));
  ut("#setQuality").addEventListener("change", (i) => {
    fe.quality = i.target.value, Ad();
  });
  ut("#setRange").value = String(fe.range);
  ut("#setSpeed").value = String(fe.maxSpeed);
  ut("#setQuality").value=fe.quality;ut("#setGravity").value=fe.gravity;ut("#setInfinite").checked=fe.infinite;
  ut("#setVolume").value=String(fe.volume??.65);
  ut("#setVolume").addEventListener("change",event=>{fe.volume=Math.max(0,Math.min(1,Number(event.target.value)||0));});
  function saveRaidPreferences(){try{if(window.RaidModels)window.RaidModels.writePreferences(localStorage,fe);}catch{}}
  for(const id of ["#setInfinite","#setGravity","#setRange","#setSpeed","#setQuality","#setVolume"])ut(id).addEventListener("change",saveRaidPreferences);
  if(fe.missiles)ut("#missileCount").value=String(fe.missiles);
  ut("#missileCount").addEventListener("change",event=>{fe.missiles=Number(event.target.value);saveRaidPreferences();});
  addEventListener("resize", () => {
    qe.aspect = innerWidth / innerHeight, qe.updateProjectionMatrix(), Ad();
  });
  addEventListener("error", (i) => {
    console.warn("[ODM LAB REBORN]", i.message);
  });
  window.odmLab = { getState: () => ({ simTime: gn, hitStop:hitStopRemaining,pendingVictory,bladeImpactCount,lastBladeImpact,punchImpactCount,lastPunchImpact, bladeSwing:P.bladeSwing?{...P.bladeSwing}:null,spearArmed:!!P.spearArmed,titanForm:!!P.titanForm,yaw:P.yaw,pitch:P.pitch,pos: P.pos.toArray(), vel: P.vel.toArray(), gas: P.gas, grounded: P.grounded, airTime: P.airTime, bestAirTime: P.bestAirTime, launchAssist: P.launchAssist, health: P.health, ammo: P.thunderAmmo, mag: P.thunderMag, titanHp: V.hp, armor: [V.armorL, V.armorR], napeOpen: V.napeOpen, missiles: Oi.map((i) => ({ age: i.age, distance: i.root.position.distanceTo(i.target), part: i.part })), missionOver: pi, spares: P.spares, route: vn, raceOn: Is, hooks: Be.map((i) => i.state), hookReleaseRadii: Be.map((i) => i.releaseRadius), wireReelSpeeds: Be.map((i) => i.reelSpeed), hookAnchors: Be.map((i) => i.anchor.toArray()), mobile: Ze, running: He, paused: Ye, settings: { ...fe } }), bladePose:()=>({arms:vr.map(({arm,side})=>({side,position:arm.position.toArray(),rotation:arm.rotation.toArray().slice(0,3)})),body:_e.rotation.toArray().slice(0,3)}),camera:()=>({position:qe.position.toArray(),fov:qe.fov}),getCombatStatus:()=>assetSystem?.getCombatStatus?.(),getAimTarget: () => {
    let i = Gl();
    return i ? { part: i.object.userData.titanPart, point: i.point.toArray(), distance: i.distance } : null;
  }, setRoute: Xl, beginRace: ud, beginMission: dd, reset: Vi, fireHook: _d, releaseHook: xd, toggleHook: Tn, fireThunder: Wl,pressThunder:useThunder,transform:transformPlayer,sheathe:disarmSpear, replaceBlades: yd, toggleView: so, setAim: (i, t) => {
    P.yaw = i, P.pitch = t;
  }, setPlayer: (i) => {
    P.pos.set(...i), P.vel.set(0, 0, 0);
  }, setVelocity: velocity=>P.vel.set(...velocity),setResources:(gas,spares)=>{P.gas=gas;P.spares=spares;ut('#bladeCount').textContent=P.spares;},worldColliders:()=>Ku.filter(b=>b.mesh.visible).map(b=>({name:b.mesh.name,x:b.x,z:b.z,hx:b.hx,hz:b.hz,top:b.h+(b.roofHeight||0),eave:b.h,roofHeight:b.roofHeight,roofAxis:b.roofAxis,roofShape:b.roofShape,bottom:b.bottom,radius:b.radius,cityOnly:!!b.mesh.userData.cityOnly,legacy:!!b.mesh.userData.cityLegacyWall})),getCity:()=>shiganshinaCity?.inspect?.()||null,getBattlefield:()=>battlefieldSupport?.inspect?.()||null, slash: ro };

  function renderRaidHud(state){
    ut("#raidObjective").textContent="討伐 "+(state.total-state.remaining)+" / "+state.total+"体";
    const form=state.hero;const transformed=form.state!=="human";ut("#missileInfo").style.display=transformed?"none":"";ut("#bladeInfo").style.display=transformed?"none":"";ut("#leftHud").style.display=transformed?"none":"";ut("#viewBtn").disabled=transformed;ut("#transformRead").textContent=form.state==="human"?"巨人化 "+Math.floor(form.energy)+"%":form.state==="emerging"?"巨人化中…":"巨人体 "+Math.ceil(form.health)+" / 残り "+Math.ceil(form.seconds)+"秒";
    ut("#transformBar").style.width=form.energy+"%";ut("#transformBtn").disabled=form.state==="emerging"||form.state==="human"&&(form.energy<40||form.cooldown>0);ut("#transformBtn").textContent=form.state==="emerging"?"巨人化中…":form.state==="human"?(form.cooldown>0?"再巨人化まで "+Math.ceil(form.cooldown)+"秒":"T 巨人化"):"T 人に戻る";
    ut("#transformStatus").classList.toggle("active",form.state!=="human");
    ut("#combatPanel").style.display=form.state==="titan"?"block":"none";ut("#guardRead").textContent=form.guardBroken>0?"ガード崩れ":form.guarding?"ガード中 / "+Math.ceil(form.guardStamina)+"%":"ガード "+Math.ceil(form.guardStamina||0)+"%";ut("#guardBar").style.width=(form.guardStamina||0)+"%";ut("#combatPanel").classList.toggle("hardened",!!form.hardened);ut("#combatControls").textContent="左クリック：拳 / 右長押し：ガード\n"+(form.hardened?"硬質化 "+Math.ceil(form.hardeningRemaining)+"秒":form.hardeningCooldown>0?"R 硬質化まで "+Math.ceil(form.hardeningCooldown)+"秒":"R：硬質化")+" / T：離脱";const kinds={attack:"通常巨人 / 拳で打ち崩す",armored:"鎧 / 側面・攻撃後の隙を狙う",jaw:"顎 / 飛び込みを避けて反撃",colossal:"超大型 / 蒸気から離れ、うなじへ",warhammer:"戦鎚 / 振り下ろしを避けて背後へ"};ut("#combatTactic").textContent=kinds[state.combat?.opponent?.kind]||"左クリック：拳 / 右長押し：ガード";
    const canvas=ut("#raidRadar"),draw=canvas.getContext("2d"),cx=80,cy=80,scale=.35;draw.clearRect(0,0,160,160);draw.fillStyle="#07151bcc";draw.beginPath();draw.arc(cx,cy,77,0,Math.PI*2);draw.fill();draw.strokeStyle="#7b9e9b66";draw.stroke();
    for(const entry of state.entries){if(!entry.V.alive)continue;let x=(entry.V.root.position.x-P.pos.x)*scale,z=(entry.V.root.position.z-P.pos.z)*scale;const dist=Math.hypot(x,z);if(dist>70){x*=70/dist;z*=70/dist;}draw.fillStyle=entry.kind==="colossal"?"#ff6850":entry.kind==="warhammer"?"#c6e6ed":entry.kind==="armored"?"#e5c78e":"#f4a167";draw.beginPath();draw.arc(cx+x,cy+z,entry.kind==="colossal"?5:3,0,Math.PI*2);draw.fill();}
    for(const station of battlefieldSupport?.inspect?.().supply.stations||[]){const x=(station.x-P.pos.x)*scale,z=(station.z-P.pos.z)*scale;if(Math.hypot(x,z)>70)continue;draw.fillStyle="#8ec5a9";draw.fillRect(cx+x-2.5,cy+z-2.5,5,5);}
    draw.fillStyle="#baffed";draw.beginPath();draw.moveTo(cx-Math.sin(P.yaw)*9,cy-Math.cos(P.yaw)*9);draw.lineTo(cx+Math.cos(P.yaw)*4,cy-Math.sin(P.yaw)*4);draw.lineTo(cx-Math.cos(P.yaw)*4,cy+Math.sin(P.yaw)*4);draw.fill();
  }
  if(window.RaidModels){
    shiganshinaCity=window.RaidModels.createShiganshinaCity?.({scene:Dt,targets:ki,colliders:Ku});
    if(shiganshinaCity){for(const object of legacyTownParts)object.visible=false;_r.visible=xr.visible=false;}
    const select=document.querySelector('#titanSelect'),start=document.querySelector('#start'),description=document.querySelector('#targetDescription');
    const title=document.querySelector('#bossHud .bossHead span');select.value=window.RaidModels.createRoster?(fe.battle||'raid'):(fe.target||'armored');
    const navigator=window.RaidModels.createNavigator?.(height=>Ku.filter(box=>box.mesh.visible&&!(box.mesh.userData.cityOnly&&vn!=='city')&&!(box.mesh.userData.cityLegacyWall&&vn==='city')&&box.bottom<height),()=>vn);
    assetSystem=(window.RaidModels.createRoster||window.RaidModels.create)({scene:Dt,V,P,targets:rd,anchors:ki,hooks:Be,player:_e,arms:vr,thirdSwords:Ka,oldGear:Xu,camera:qe,missiles:Oi,
      hud:eo,notice:pe,humanVisual:Ya,releaseWires:yr,disarm:disarmSpear,maxAmmo:()=>mr,sound:(hz,duration)=>be(hz,duration,"sawtooth",.035,45),
      shake:amount=>{_n=Math.max(_n,amount);},thud:power=>{be(70+power*20,.16+power*.14,'sine',.05+power*.06,30);be(150,.05,'triangle',.012+power*.012,60);},punchImpact:(enemy,point,side,info={})=>{
        const guarded=!!info.guarded,hardened=!!info.hardened,counter=!!info.counter;
        punchImpactCount++;lastPunchImpact={enemy:enemy.id,point:point.toArray(),side,hardened,counter,guarded};
        hitStopRemaining=Math.max(hitStopRemaining,guarded?.028:counter?.085:hardened?.075:.055);
        punchCameraImpact={age:0,power:guarded?.07:hardened?.28:.18,direction:new T(-Math.sin(P.yaw),0,-Math.cos(P.yaw))};
        raidHitTime=.16;ut("#reticle").classList.add("hit");_n=Math.max(_n,guarded?.035:.07);
        playPunchContact(guarded,hardened);

      },
      guardImpact:({perfect,broken})=>{
        if(perfect)hitStopRemaining=Math.max(hitStopRemaining,.045);
        _n=Math.max(_n,broken?.2:perfect?.08:.055);be(perfect?330:160,.09,"triangle",.035,65);

      },
      setTarget:enemy=>{V=enemy;},
      displaceEnemy:(position,proposal,radius,height)=>{if(Math.abs(proposal.x)>543-radius||Math.abs(proposal.z)>543-radius)return false;for(const box of Ku){if(!box.mesh.visible||box.mesh.userData.cityOnly&&vn!=="city"||box.mesh.userData.cityLegacyWall&&vn==="city"||box.bottom>proposal.y+height||box.h<proposal.y)continue;const x=rn(proposal.x,box.x-box.hx,box.x+box.hx),z=rn(proposal.z,box.z-box.hz,box.z+box.hz);if(Math.hypot(proposal.x-x,proposal.z-z)<radius)return false;}position.copy(proposal);return true;},
      resolveAvatar:(previous,height,radius)=>{const oldHeight=Ui,oldRadius=ui;try{Ui=height;ui=radius;Ex(previous);}finally{Ui=oldHeight;ui=oldRadius;}},
      breakArmor:(enemy,part)=>{if(enemy.alive){V=enemy;ld(part,"punch",enemy);}},
      damage:(enemy,amount,source)=>{
        if(!enemy.alive||pi)return;V=enemy;
        const protectedPart=(V.armorL||V.armorR)||enemy.kind==="colossal";V.hp=Math.max(protectedPart?1:0,V.hp-amount);
        if(V.hp===0){const won=assetSystem.enemyDown(V);if(won)scheduleVictory();}eo();
      },
      findSpawn:(position,kind)=>{const radius=kind==="colossal"?10:kind==="jaw"?2:3,offsets=[[0,0]];for(let ring=1;ring<=12;ring++)for(let side=0;side<16;side++){const angle=side*Math.PI/8;offsets.push([Math.cos(angle)*ring*8,Math.sin(angle)*ring*8]);}for(const [dx,dz] of offsets){const x=position[0]+dx,z=position[2]+dz;let free=true;for(const box of Ku){if(!box.mesh.visible||box.bottom>20||box.mesh.userData.cityOnly&&vn!=="city"||box.mesh.userData.cityLegacyWall&&vn==="city")continue;if(Math.abs(x-box.x)<box.hx+radius&&Math.abs(z-box.z)<box.hz+radius){free=false;break;}}if(free)return[x,0,z];}return position;},
      renderHud:renderRaidHud,
      assistedSlash:(enemy,part,charged,sweep=null)=>{if(!enemy.alive||pi)return false;V=enemy;const mesh=part==="armorL"?V.armorPlateL:part==="armorR"?V.armorPlateR:V.weak,point=sweep?.impactPoint?.clone()||mesh.getWorldPosition(new T());const offset=point.clone().sub(P.pos),distance=offset.length(),sweepDistance=sweep?.contactDistance??Infinity;if(sweep?sweepDistance>3:distance>8.5)return false;if(distance>.1&&raidObstacle(P.pos,offset.clone().normalize(),Math.max(0,distance-.25))&&!sweep)return false;
        if(part==="nape"){if(!V.napeOpen)return false;ld("nape",charged?"odm":"blade",enemy);return true;}
        const count=part==="armorL"?++V.armorCutsL:++V.armorCutsR;if(count>=3)ld(part,"blade",enemy);else {bladeImpact(enemy,part,point,count,false);pe("装甲に斬撃 / "+count+" / 3");eo();}return true;
      },missFeedback:()=>{impactLabel.textContent="空振り";impactLabel.className="show miss";be(255,.09,"triangle",.015,620);},
      canReach:(from,to)=>{const offset=to.clone().sub(from),distance=offset.length();return distance<.1||!raidObstacle(from,offset.divideScalar(distance),Math.max(0,distance-.25));},
      moveEnemy:(position,proposal,radius,height,yaw)=>{if(navigator)return navigator.advance(position,P.pos,Math.hypot(proposal.x-position.x,proposal.z-position.z),radius,height,yaw,gn);for(const box of Ku){if(!box.mesh.visible||box.mesh.userData.cityOnly&&vn!=="city"||box.mesh.userData.cityLegacyWall&&vn==="city"||box.bottom>height)continue;const x=rn(proposal.x,box.x-box.hx,box.x+box.hx),z=rn(proposal.z,box.z-box.hz,box.z+box.hz);if(Math.hypot(proposal.x-x,proposal.z-z)<radius)return false;}position.copy(proposal);return true;},
      loading:(busy,error)=>{ut('#retryAssets').hidden=busy||!error;ut('#retryAssets').disabled=busy;if(error)description.textContent='読み込みを再試行するか、標的を選び直してください。';start.disabled=busy||!!error;start.textContent=error?'読み込み失敗 — 標的を選び直してください':busy?'装備・巨人を準備中…':'出撃';},
      targetChanged:(type,cfg)=>{title.textContent=cfg.name+' / '+cfg.height+' M';description.textContent=cfg.detail;},
      hurt:(label,pos,amount,kind='melee')=>{if(pi||P.invulnerable>0)return;const before=assetSystem?.inspect?.().hero;if(assetSystem?.absorbDamage?.(amount,{source:pos,kind})){const after=assetSystem.inspect().hero,damage=after.health<before.health;P.invulnerable=damage?.65:.2;if(damage){ut('#ui').classList.add('danger');be(85,.18,'sawtooth',.035,45);if(!after.guardResult)pe(label+' / 巨人体に被弾');}return;}ut('#ui').classList.add('danger');be(85,.18,'sawtooth',.035,45);P.health=Math.max(0,P.health-amount);P.invulnerable=2.3;P.vel.addScaledVector(P.pos.clone().sub(pos).normalize(),15);pe(label+' / 残り耐久 '+P.health);_n=.16;eo();if(P.health<=0)cd(false);},
      steam:(pos,dt)=>{if(Math.random()<dt*7)px(pos.clone().add(new T((Math.random()-.5)*15,22+Math.random()*23,(Math.random()-.5)*15)),false);}
    });
    battlefieldSupport=window.RaidModels.createBattlefieldSupport?.({scene:Dt,P,colliders:Ku,anchors:ki,maxAmmo:()=>mr,supplyStations:shiganshinaCity?[{x:-270,z:-160,radius:5.8},{x:260,z:150,radius:5.8}]:[],
      enemies:()=>assetSystem?.supportTargets?.()||[],
      canReach:(from,to)=>{const offset=to.clone().sub(from),distance=offset.length();return distance<.1||!raidObstacle(from,offset.divideScalar(distance),Math.max(0,distance-.25));},
      assistEnemy:(id,options={})=>assetSystem?.supportEnemy?.(id,options.duration)??false,
      onResupply:()=>{P.swap=0;P.swapPhase=0;for(const sword of [...Ka,...vr])for(const part of sword.sword.userData.bladeParts)part.visible=true;ut('#bladeCount').textContent=P.spares;ut('#bladeMode').textContent='READY';eo();},
      sound:(kind)=>{if(kind==='cannon-ready')be(250,.12,'triangle',.025,70);else if(kind==='cannon'){be(82,.22,'sawtooth',.052,40);_n=Math.max(_n,.1);}else if(kind==='cannon-hit'){be(68,.22,'sawtooth',.055,30);be(150,.06,'triangle',.018,70);_n=Math.max(_n,.14);}else if(kind==='resupply'){be(520,.12,'triangle',.025,180);be(780,.09,'sine',.015,280);}
      }});
    battlefieldSupport?.update(0,{enabled:vn==='city',running:false});
    select.addEventListener('change',()=>{fe.battle=select.value;if(select.value!=='raid')fe.target=select.value;saveRaidPreferences();assetSystem.select(select.value).catch(()=>{});});
    ut('#retryAssets').onclick=()=>{ut('#retryAssets').disabled=true;assetSystem.retry(select.value).catch(()=>{ut('#retryAssets').disabled=false;ut('#retryAssets').hidden=false;});};
    assetSystem.equipmentReady.then(()=>assetSystem.select(select.value)).catch(e=>{start.disabled=true;start.textContent='装備の読み込みに失敗';ut('#retryAssets').hidden=false;console.error(e);});
    window.odmLab.getModels=assetSystem.inspect;
    ut("#transformBtn").addEventListener("click",transformPlayer);
    window.odmLab.selectTitan=type=>{if(!He){select.value=type;return assetSystem.select(type);}};
    document.querySelector('#changeLoadout').onclick=()=>{yr();He=false;pi=false;document.exitPointerLock?.();document.querySelector('#endOverlay').classList.remove('show');document.querySelector('#welcome').classList.remove('hidden');};
  }
  Xl("city");
})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
