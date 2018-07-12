var keys = document.querySelectorAll('#calculator span.calc-btn');
//var screen = document.querySelector('.screen'); //Инпут основного экрана
var operand1 = 0, operand2 = 0; //Первый и второй операнды
var newOperand = true;          //Флаг того что сейчас пойде новый операнд
var operation = '';             //Операция

function calculator () {
  return {
    screen: ''
    ,
    //Добавление числа
    addNumber: function (pNum) {
      //Если новый операнд то чистим экран
      if (newOperand) {
        window.z1 = this;
        this.screen[0].innerHTML = '';
        newOperand = false;
      }
      console.log('test2');
      this.screen[0].innerHTML += pNum;
    }
    ,
    //Добавление дробной части
    addDot: function () {
      if (this.screen[0].innerHTML.indexOf('.') == -1)
        this.screen[0].innerHTML += '.';
    }
    ,
    //backspace
    backspace: function () {
      this.screen[0].innerHTML = this.screen[0].innerHTML.substr(0, this.screen[0].innerHTML.length - 1);
    }
    ,
    //Очищение экрана
    clearSreen: function () {
      this.screen[0].innerHTML = '';
      operation = ''
    }
    ,
    //Считаем процент
    procentEval: function () {
      this.screen[0].innerHTML = operand1 / 100 * parseFloat(this.screen[0].innerHTML);
    }
    ,
    //Считаем
    mathEval: function () {
      //При первом нажатие "=" сохраняем 2й операнд
      if (!newOperand) {
        operand2 = parseFloat(this.screen[0].innerHTML);
        newOperand = true;
      }
      //Список операция для подсчета
      if (operation != '') {
        switch (operation) {
          case 'plus':
            operand1 += operand2;
            break;
          case 'minus':
            operand1 -= operand2;
            break;
          case 'mult':
            operand1 *= operand2;
            break;
          case 'division':
            operand1 /= operand2;
            break;
          case 'sqrt':
            operand1 = Math.sqrt(operand1);
            break;
          case 'invert2':
            operand1 = 1 / operand1;
            break;
          case 'invert':
            operand1 *= -1;
            break;
        }
        this.screen[0].innerHTML = operand1;
      }
    }
    ,
    //Сохраняем имя операции и 1й операнд
    mathOperation: function (pOper) {
      newOperand = true;
      operation = pOper;
      operand1 = parseFloat(this.screen[0].innerHTML);
    }
    ,
    //Парсим нажатую клавишу
    parseKey: function (pOper) {
      switch (true) {
        //Числа
        case /^[0-9]{1}$/.test(pOper):
          this.addNumber(pOper);
          break;
        //backspace
        case pOper == 'backspace':
          this.backspace();
          break;
        //Точка
        case pOper == 'dot':
          this.addDot();
          break;
        //Очищение экрана
        case pOper == 'clear':
          this.clearSreen();
          break;
        //Операции которые считаются не сразу
        case ['plus', 'minus', 'mult', 'division'].indexOf(pOper) > -1:
          this.mathOperation(pOper);
          break;
        //Равно
        case pOper == 'eval':
          this.mathEval();
          break;
        //Процент
        case pOper == 'procent':
          this.procentEval();
          break;
        //Здесь операции которые считаются сразу же: корень, 1/x, +-
        case ['sqrt', 'invert2', 'invert'].indexOf(pOper) > -1:
          this.mathOperation(pOper);
          this.mathEval();
          break;
      }
    }
    ,
    init: function () {
      for (var i = 0; i < keys.length; i++) {
        $(keys[i]).on('click', function (e) {
          var oper = $(e.target).data('oper');
          parseKey(oper);
        });
      }

      $('.calculator').each(function (num, cElem) {
        //В каждый элемент с классом calculator добавляем объект калькулятор в виде атрибута
        cElem.calculator = calculator();
        //Ищем экран
        cElem.calculator.screen = $(cElem).find('.screen:first');
        //Цикл, вешаем функцию на клик кнопок
        $(cElem).find('.calc-btn').each(function (num, bElem) {
          //На каждую кнопку вешаем ссылку на наш объект калькулятора
          bElem.calculator = cElem.calculator;
          $(bElem).on('click', function (e) {
            var oper = $(e.target).data('oper');
            //По клику запускаем parseKey соответствующего калькулятора
            this.calculator.parseKey(oper);
          });
        })
      })
    }
  }
}

$(document).on('keydown', function (e) {
  //console.log(e.keyCode);
})

$(document).on('keyup', function (e) {
  console.log(e.keyCode);
  $('.calcKey-' + e.keyCode).click().addClass('span-active');
  setTimeout(function () { $('.calcKey-' + e.keyCode).removeClass('span-active') }, 300)
})
