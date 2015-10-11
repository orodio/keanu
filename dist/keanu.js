"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = spawn;
exports.send = send;
exports.test_pid = test_pid;
exports.assert_receive = assert_receive;
exports.kill = kill;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashLangIsEqual = require("lodash/lang/isEqual");

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

var _process = require("./process");

var _process2 = _interopRequireDefault(_process);

var xs = {};

function spawn(module, func, init) {
  var x = new _process2["default"](module, func, init);
  xs[x.pid] = x;
  return x.pid;
}

function send(pid, message) {
  if (xs[pid] == null) throw new Error("Tried to send " + JSON.stringify(message) + " to a process that doesnt exist");
  return xs[pid].send(message);
}

function test_pid() {
  return spawn({ receive: function receive(e, _es) {
      return e;
    } });
}

function s(v) {
  return JSON.stringify(v);
}

function assert_receive(pid, message) {
  var v1 = message;
  var v2 = xs[pid].state;
  if (!(0, _lodashLangIsEqual2["default"])(v1, v2)) throw new Error("assert_receive: expected: " + s(v1) + ", got: " + s(v2));
  return true;
}

function kill() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _len = arguments.length, pids = Array(_len), _key = 0; _key < _len; _key++) {
      pids[_key] = arguments[_key];
    }

    for (var _iterator = pids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pid = _step.value;
      delete xs[pid];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PS = (function () {
  function PS(module) {
    var receiver = arguments.length <= 1 || arguments[1] === undefined ? "receive" : arguments[1];
    var initial_state = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    _classCallCheck(this, PS);

    this.pid = Symbol();
    this.receiver = module[receiver].bind(module);
    this.state = initial_state;
  }

  _createClass(PS, [{
    key: "send",
    value: function send(message) {
      this.state = this.receiver(message, this.state, this.pid);
    }
  }]);

  return PS;
})();

exports["default"] = PS;
module.exports = exports["default"];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyIsIi4uL3NyYy9wcm9jZXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7aUNBQW9CLHFCQUFxQjs7Ozt1QkFDMUIsV0FBVzs7OztBQUUxQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7O0FBRUosU0FBUyxLQUFLLENBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDekMsTUFBTSxDQUFDLEdBQUcseUJBQU8sTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNwQyxJQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNiLFNBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQTtDQUNiOztBQUVNLFNBQVMsSUFBSSxDQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDbEMsTUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sSUFBSSxLQUFLLG9CQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxxQ0FBbUMsQ0FBQTtBQUNqSCxTQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Q0FDN0I7O0FBRU0sU0FBUyxRQUFRLEdBQUk7QUFDMUIsU0FBTyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUFFLGFBQU8sQ0FBQyxDQUFBO0tBQUUsRUFBQyxDQUFDLENBQUE7Q0FDOUM7O0FBRUQsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQUUsU0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0NBQUU7O0FBRW5DLFNBQVMsY0FBYyxDQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDNUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFBO0FBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUE7QUFDeEIsTUFBSSxDQUFDLG9DQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLElBQUksS0FBSyxnQ0FBK0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBSSxDQUFBO0FBQzlGLFNBQU8sSUFBSSxDQUFBO0NBQ1o7O0FBRU0sU0FBUyxJQUFJLEdBQVc7Ozs7OztzQ0FBTixJQUFJO0FBQUosVUFBSTs7O0FBQzNCLHlCQUFnQixJQUFJO1VBQVgsR0FBRztBQUFVLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQUE7Ozs7Ozs7Ozs7Ozs7OztDQUNyQzs7Ozs7Ozs7Ozs7O0lDL0JvQixFQUFFO0FBQ1QsV0FETyxFQUFFLENBQ1IsTUFBTSxFQUF3QztRQUF0QyxRQUFRLHlEQUFDLFNBQVM7UUFBRSxhQUFhLHlEQUFDLEVBQUU7OzBCQUR0QyxFQUFFOztBQUVuQixRQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFBO0FBQ25CLFFBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM3QyxRQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQTtHQUMzQjs7ZUFMa0IsRUFBRTs7V0FPaEIsY0FBQyxPQUFPLEVBQUU7QUFDYixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNEOzs7U0FUa0IsRUFBRTs7O3FCQUFGLEVBQUUiLCJmaWxlIjoia2VhbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNFcXVhbCBmcm9tIFwibG9kYXNoL2xhbmcvaXNFcXVhbFwiXG5pbXBvcnQgUFMgZnJvbSBcIi4vcHJvY2Vzc1wiXG5cbmxldCB4cyA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGF3biAobW9kdWxlLCBmdW5jLCBpbml0KSB7XG4gIGNvbnN0IHggPSBuZXcgUFMobW9kdWxlLCBmdW5jLCBpbml0KVxuICB4c1t4LnBpZF0gPSB4XG4gIHJldHVybiB4LnBpZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VuZCAocGlkLCBtZXNzYWdlKSB7XG4gIGlmICh4c1twaWRdID09IG51bGwpIHRocm93IG5ldyBFcnJvcihgVHJpZWQgdG8gc2VuZCAkeyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSB9IHRvIGEgcHJvY2VzcyB0aGF0IGRvZXNudCBleGlzdGApXG4gIHJldHVybiB4c1twaWRdLnNlbmQobWVzc2FnZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RfcGlkICgpIHtcbiAgcmV0dXJuIHNwYXduKHtyZWNlaXZlIChlLCBfZXMpIHsgcmV0dXJuIGUgfX0pXG59XG5cbmZ1bmN0aW9uIHModikgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkodikgfVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0X3JlY2VpdmUgKHBpZCwgbWVzc2FnZSkge1xuICBjb25zdCB2MSA9IG1lc3NhZ2VcbiAgY29uc3QgdjIgPSB4c1twaWRdLnN0YXRlXG4gIGlmICghaXNFcXVhbCh2MSwgdjIpKSB0aHJvdyBuZXcgRXJyb3IoYGFzc2VydF9yZWNlaXZlOiBleHBlY3RlZDogJHsgcyh2MSkgfSwgZ290OiAkeyBzKHYyKSB9YClcbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtpbGwgKC4uLnBpZHMpIHtcbiAgZm9yIChsZXQgcGlkIG9mIHBpZHMpIGRlbGV0ZSB4c1twaWRdXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQUyB7XG4gIGNvbnN0cnVjdG9yIChtb2R1bGUsIHJlY2VpdmVyPVwicmVjZWl2ZVwiLCBpbml0aWFsX3N0YXRlPVtdKSB7XG4gICAgdGhpcy5waWQgPSBTeW1ib2woKVxuICAgIHRoaXMucmVjZWl2ZXIgPSBtb2R1bGVbcmVjZWl2ZXJdLmJpbmQobW9kdWxlKVxuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsX3N0YXRlXG4gIH1cblxuICBzZW5kIChtZXNzYWdlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMucmVjZWl2ZXIobWVzc2FnZSwgdGhpcy5zdGF0ZSwgdGhpcy5waWQpO1xuICB9XG59XG4iXX0=