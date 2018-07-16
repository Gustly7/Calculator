var keys = document.querySelectorAll('#calculator span.calc-btn');
//var screen = document.querySelector('.screen'); //Инпут основного экрана
//var operand1 = 0, operand2 = 0; //Первый и второй операнды
var newOperand = true;          //Флаг того что сейчас пойде новый операнд
var operation = '';             //Операция

window.calculator = () => {
  return {
    operand1: null, //Первый операнд
    operand2: null, //Второй операнд
    buff: '',
    screen: '', //Ссылка на DOM элемент экрана
    actions: '', //Ссылка на DOM элемент строки действий
    operMap: {
      'plus': '+'
      , 'minus': '-'
      , 'mult': '*'
      , 'division': '/'
      , 'minus': '-'
      , 'minus': '-'
      , 'minus': '-'
      , 'minus': '-'
      , 'minus': '-'
    },
    //Добавление числа
    addNumber: function (pNum) {
      //Если новый операнд то чистим экран
      this.buff = this.actions;
      if (newOperand) {
        window.z1 = this;
        this.screen[0].innerHTML = '';
        newOperand = false;
      }
      console.log('test2');
      this.screen[0].innerHTML += pNum;
    },
    //Добавление дробной части
    addDot: function () {
      if (this.screen[0].innerHTML.indexOf('.') == -1)
        this.screen[0].innerHTML += '.';
    },
    //backspace
    backspace: function () {
      this.screen[0].innerHTML = this.screen[0].innerHTML.substr(0, this.screen[0].innerHTML.length - 1);
    },
    //Очищение экрана
    clearSreen: function () {
      this.screen[0].innerHTML = '';
      operation = '';
      this.operand1 = null;
      this.operand2 = null;
    },
    //Считаем процент
    procentEval: function () {
      this.screen[0].innerHTML = this.operand1 / 100 * parseFloat(this.screen[0].innerHTML);
    },
    //Считаем
    mathEval: function () {
      //При первом нажатие "=" сохраняем 2й операнд
      if (!newOperand) {
        this.operand2 = parseFloat(this.screen[0].innerHTML);
        newOperand = true;
      }
      //Список операция для подсчета
      if (operation != '') {
        switch (operation) {
          case 'plus':
            this.operand1 += this.operand2;
            break;
          case 'minus':
            this.operand1 -= this.operand2;
            break;
          case 'mult':
            this.operand1 *= this.operand2;
            break;
          case 'division':
            this.operand1 /= this.operand2;
            break;
          case 'sqrt':
            this.operand1 = Math.sqrt(this.operand1);
            break;
          case 'invert2':
            this.operand1 = 1 / this.operand1;
            break;
          case 'invert':
            this.operand1 *= -1;
            break;
        }
        this.screen[0].innerHTML = this.operand1;
      }
    }
    ,
    //Сохраняем имя операции и 1й операнд
    mathOperation: function (pOper) {
      if (this.operand1 != 0)
        this.mathEval();
      newOperand = true;
      operation = pOper;
      this.operand1 = parseFloat(this.screen[0].innerHTML);
      //console.log('this.operand1=' + this.operand1);
      //console.log('this.operand2=' + this.operand2);
      //this.actions[0].innerHTML += ' ' + (this.operand2 == null ? this.operand1 : this.operand2) + ' ' + this.operMap[pOper];
      this.actions[0].innerHTML += ' ' + (this.operand2 == null ? this.operand1 : this.operand2) + ' ' + this.operMap[pOper];
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
          this.actions[0].innerHTML = '';
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
        cElem.calculator.actions = $(cElem).find('.actions:first');
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
