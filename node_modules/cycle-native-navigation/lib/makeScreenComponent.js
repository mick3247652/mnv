"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
function makeScreenComponent(screenID, latestVNodes, vdom$, command$, navEvent$) {
    return function () {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(props) {
                var _this = _super.call(this, props) || this;
                if (_this.props.navigator) {
                    _this.props.navigator.setOnNavigatorEvent(_this.onNavigatorEvent.bind(_this));
                }
                _this.vdomListener = {
                    next: function (x) {
                        if (x.screen === screenID) {
                            _this.setState(function () { return ({ vdom: x.vdom }); });
                        }
                    }
                };
                _this.commandListener = {
                    next: function (command) {
                        if (_this.props.navigator) {
                            _this.props.navigator[command.type](command);
                        }
                    }
                };
                if (latestVNodes.has(screenID)) {
                    _this.state = {
                        vdom: latestVNodes.get(screenID)
                    };
                }
                else {
                    _this.state = {
                        vdom: react_1.createElement(react_native_1.View, {}, react_1.createElement(react_native_1.Text, {}, screenID))
                    };
                }
                return _this;
            }
            class_1.prototype.componentWillMount = function () {
                vdom$.addListener(this.vdomListener);
            };
            class_1.prototype.componentWillUnmount = function () {
                vdom$.removeListener(this.vdomListener);
            };
            class_1.prototype.onNavigatorEvent = function (event) {
                switch (event.id) {
                    case "willAppear":
                        command$.addListener(this.commandListener);
                        break;
                    case "didAppear":
                        break;
                    case "willDisappear":
                        command$.removeListener(this.commandListener);
                        break;
                    case "didDisappear":
                        break;
                }
                navEvent$.shamefullySendNext(event);
            };
            class_1.prototype.render = function () {
                return this.state.vdom;
            };
            return class_1;
        }(react_1.Component));
    };
}
exports.default = makeScreenComponent;
//# sourceMappingURL=makeScreenComponent.js.map