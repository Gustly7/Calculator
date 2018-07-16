/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/ant.js":
/*!***********************!*\
  !*** ./src/js/ant.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nwindow.ant = function () {\n  return {\n    x: 0,\n    y: 0,\n    angle: 0,\n    init: function init() {\n      $('body').append('<div id=\"ant\">🐜</div>');\n      window.ant = this;\n    },\n    nextStep: function nextStep() {\n      console.log('nextStep');\n      var newX = Math.round(Math.random() * (window.innerWidth - 50));\n      var newY = Math.round(Math.random() * (window.innerHeight - 50));\n      this.angle = (Math.atan2(newY - this.y, newX - this.x) + Math.PI / 2) / Math.PI * 180;\n      $('#ant').animate({\n        border: this.angle\n      }, {\n        step: function step(now, fx) {\n          //$(this).css('-webkit-transform','rotate('+now+'deg)');\n          $('#ant').css('transform', 'rotate(' + now + 'deg)');\n        },\n        duration: 1000\n      }, 'linear'); //$('#ant').css('transform','rotate('+this.angle+'deg)');\n      //$('#ant').animate({transform: 'rotate(' + this.angle + 'deg)'}, 500);\n\n      this.x = newX;\n      this.y = newY;\n      var thisAnt = this;\n      $('#ant').animate({\n        top: newY + \"px\",\n        left: newX + 'px'\n      }, {\n        duration: 2000,\n        specialEasing: {\n          width: \"easeOutBounce\",\n          height: \"easeOutBounce\"\n        },\n        complete: function complete() {\n          thisAnt.nextStep();\n        }\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/js/ant.js?");

/***/ }),

/***/ "./src/js/calculator.js":
/*!******************************!*\
  !*** ./src/js/calculator.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar keys = document.querySelectorAll('#calculator span.calc-btn'); //var screen = document.querySelector('.screen'); //Инпут основного экрана\n\nvar operand1 = 0,\n    operand2 = 0; //Первый и второй операнды\n\nvar newOperand = true; //Флаг того что сейчас пойде новый операнд\n\nvar operation = ''; //Операция\n\nconsole.log('test');\n\nwindow.calculator = function () {\n  return {\n    screen: '',\n    //Добавление числа\n    addNumber: function addNumber(pNum) {\n      //Если новый операнд то чистим экран\n      if (newOperand) {\n        window.z1 = this;\n        this.screen[0].innerHTML = '';\n        newOperand = false;\n      }\n\n      console.log('test2');\n      this.screen[0].innerHTML += pNum;\n    },\n    //Добавление дробной части\n    addDot: function addDot() {\n      if (this.screen[0].innerHTML.indexOf('.') == -1) this.screen[0].innerHTML += '.';\n    },\n    //backspace\n    backspace: function backspace() {\n      this.screen[0].innerHTML = this.screen[0].innerHTML.substr(0, this.screen[0].innerHTML.length - 1);\n    },\n    //Очищение экрана\n    clearSreen: function clearSreen() {\n      this.screen[0].innerHTML = '';\n      operation = '';\n    },\n    //Считаем процент\n    procentEval: function procentEval() {\n      this.screen[0].innerHTML = operand1 / 100 * parseFloat(this.screen[0].innerHTML);\n    },\n    //Считаем\n    mathEval: function mathEval() {\n      //При первом нажатие \"=\" сохраняем 2й операнд\n      if (!newOperand) {\n        operand2 = parseFloat(this.screen[0].innerHTML);\n        newOperand = true;\n      } //Список операция для подсчета\n\n\n      if (operation != '') {\n        switch (operation) {\n          case 'plus':\n            operand1 += operand2;\n            break;\n\n          case 'minus':\n            operand1 -= operand2;\n            break;\n\n          case 'mult':\n            operand1 *= operand2;\n            break;\n\n          case 'division':\n            operand1 /= operand2;\n            break;\n\n          case 'sqrt':\n            operand1 = Math.sqrt(operand1);\n            break;\n\n          case 'invert2':\n            operand1 = 1 / operand1;\n            break;\n\n          case 'invert':\n            operand1 *= -1;\n            break;\n        }\n\n        this.screen[0].innerHTML = operand1;\n      }\n    },\n    //Сохраняем имя операции и 1й операнд\n    mathOperation: function mathOperation(pOper) {\n      newOperand = true;\n      operation = pOper;\n      operand1 = parseFloat(this.screen[0].innerHTML);\n    },\n    //Парсим нажатую клавишу\n    parseKey: function parseKey(pOper) {\n      switch (true) {\n        //Числа\n        case /^[0-9]{1}$/.test(pOper):\n          this.addNumber(pOper);\n          break;\n        //backspace\n\n        case pOper == 'backspace':\n          this.backspace();\n          break;\n        //Точка\n\n        case pOper == 'dot':\n          this.addDot();\n          break;\n        //Очищение экрана\n\n        case pOper == 'clear':\n          this.clearSreen();\n          break;\n        //Операции которые считаются не сразу\n\n        case ['plus', 'minus', 'mult', 'division'].indexOf(pOper) > -1:\n          this.mathOperation(pOper);\n          break;\n        //Равно\n\n        case pOper == 'eval':\n          this.mathEval();\n          break;\n        //Процент\n\n        case pOper == 'procent':\n          this.procentEval();\n          break;\n        //Здесь операции которые считаются сразу же: корень, 1/x, +-\n\n        case ['sqrt', 'invert2', 'invert'].indexOf(pOper) > -1:\n          this.mathOperation(pOper);\n          this.mathEval();\n          break;\n      }\n    },\n    init: function init() {\n      for (var i = 0; i < keys.length; i++) {\n        $(keys[i]).on('click', function (e) {\n          var oper = $(e.target).data('oper');\n          parseKey(oper);\n        });\n      }\n\n      $('.calculator').each(function (num, cElem) {\n        //В каждый элемент с классом calculator добавляем объект калькулятор в виде атрибута\n        cElem.calculator = calculator(); //Ищем экран\n\n        cElem.calculator.screen = $(cElem).find('.screen:first'); //Цикл, вешаем функцию на клик кнопок\n\n        $(cElem).find('.calc-btn').each(function (num, bElem) {\n          //На каждую кнопку вешаем ссылку на наш объект калькулятора\n          bElem.calculator = cElem.calculator;\n          $(bElem).on('click', function (e) {\n            var oper = $(e.target).data('oper'); //По клику запускаем parseKey соответствующего калькулятора\n\n            this.calculator.parseKey(oper);\n          });\n        });\n      });\n    }\n  };\n};\n\n$(document).on('keydown', function (e) {//console.log(e.keyCode);\n});\n$(document).on('keyup', function (e) {\n  console.log(e.keyCode);\n  $('.calcKey-' + e.keyCode).click().addClass('span-active');\n  setTimeout(function () {\n    $('.calcKey-' + e.keyCode).removeClass('span-active');\n  }, 300);\n});\n\n//# sourceURL=webpack:///./src/js/calculator.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar calculator = _interopRequireWildcard(__webpack_require__(/*! ./calculator.js */ \"./src/js/calculator.js\"));\n\nvar ant = _interopRequireWildcard(__webpack_require__(/*! ./ant.js */ \"./src/js/ant.js\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nvar abc = 'abc';\n\nvar qwe = function qwe() {\n  return abc;\n};\n\nconsole.log(qwe());\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });