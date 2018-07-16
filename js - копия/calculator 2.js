var keys = document.querySelectorAll('#calculator span.calc-btn');
var screen = document.querySelector('.screen'); //Инпут основного экрана
var operand1 = 0, operand2 = 0; //Первый и второй операнды
var newOperand = true;          //Флаг того что сейчас пойде новый операнд
var operation = '';             //Операция

//Добавление числа
function addNumber (pNum) {
  //Если новый операнд то чистим экран
  window.q=this;
  if (newOperand) {
    screen.innerHTML = '';
    newOperand = false;
  }
  screen.innerHTML += pNum;
}

//Добавление дробной части
function addDot () {
  if (screen.innerHTML.indexOf('.') == - 1)
    screen.innerHTML += '.';
}

//backspace
function backspace () {
  screen.innerHTML = screen.innerHTML.substr(0,screen.innerHTML.length-1);
}

//Очищение экрана
function clearSreen () {
  screen.innerHTML = '';
  operation = ''
}

//Считаем процент
function procentEval(){
  screen.innerHTML = operand1/100*parseFloat(screen.innerHTML);
}

//Считаем
function mathEval () {
  //При первом нажатие "=" сохраняем 2й операнд
  if (!newOperand) {
    operand2 = parseFloat(screen.innerHTML);
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
        operand1 = 1/operand1;
        break;
      case 'invert':
        operand1 *= -1;
        break;
    }
    screen.innerHTML = operand1;
  }
}

//Сохраняем имя операции и 1й операнд
function mathOperation (pOper) {
  newOperand = true;
  operation = pOper;
  operand1 = parseFloat(screen.innerHTML);
}

//Парсим нажатую клавишу
function parseKey (pOper) {
  switch (true) {
    //Числа
    case /^[0-9]{1}$/.test(pOper):
      addNumber(pOper);
      break;
    //backspace
    case pOper == 'backspace':
      backspace();
      break;
    //Точка
    case pOper == 'dot':
      addDot();
      break;
    //Очищение экрана
    case pOper == 'clear':
      clearSreen();
      break;
    //Операции которые считаются не сразу
    case ['plus', 'minus', 'mult', 'division'].indexOf(pOper) > -1:
      mathOperation(pOper);
      break;
    //Равно
    case pOper == 'eval':
      mathEval();
      break;
    //Процент
    case pOper == 'procent':
      procentEval();
      break;
    //Здесь операции которые считаются сразу же: корень, 1/x, +-
    case ['sqrt','invert2','invert'].indexOf(pOper) > -1:
      mathOperation(pOper);
      mathEval();
      break;
  }
}

function init() {
  for (var i = 0; i < keys.length; i++) {
    $(keys[i]).on('click', function (e) {
      var oper = $(e.target).data('oper');
      parseKey(oper);
    });
  }

  $(document).on('keydown', function (e) {
    //console.log(e.keyCode);
  })

  $(document).on('keyup', function (e) {
    console.log(e.keyCode);
    $('.calcKey-' + e.keyCode).click().addClass('span-active');
    setTimeout(function () { $('.calcKey-' + e.keyCode).removeClass('span-active') }, 300)
  })
}