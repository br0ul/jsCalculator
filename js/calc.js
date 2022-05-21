window.onload = function() {
    const calc = document.querySelector('.calc');
    const result = document.querySelector('#result');
    buffer = 0;

    calc.addEventListener('click', function(event) {
        if (!event.target.classList.contains('calc__btn')) return;

        let value = event.target.innerText;

        switch (value) {
            case 'Rvt':
                result.innerText = last;
                break;
            case '+/-':
                result.style.fontSize = '22px';
                result.innerText = 'Some unknown function';
                setTimeout(() => {
                    result.style.fontSize = '56px';
                    result.innerText = '';
                }, 600)
                break;
            case '<-':
                result.innerText = result.innerText.substring(0, result.innerText.length - 1);
                break;
            case 'MS':
                if (checkEval()) {
                    buffer = result.innerText;
                }
                break;
            case 'M+':
                if (checkEval()) {
                    buffer.length > 0 ? (buffer = buffer + '+' + result.innerText) : (buffer = result.innerText);
                }
                break;
            case 'M-':
                if (checkEval()) {
                    buffer.length > 0 ? (buffer = buffer + '-' + result.innerText) : (buffer = '0-' + result.innerText);
                }
                break;
            case 'MR':
                buffer.length > 0 ? (result.innerText = eval(buffer)) : (result.innerText = '');
                break;
            case 'AC':
                result.innerText = '';
                buffer = '';
                break;
            case 'MC':
                buffer = '';
                break;
            case 'C':
                result.innerText = '';
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if (['+', '-', '*', '/'].indexOf(result.innerText[result.innerText.length - 1]) != -1) {
                    result.innerText = result.innerText.substring(0, result.innerText.length - 1) + value;
                } else { result.innerText += value; }

            case '=':
                answer = butEqual();
                if (answer) {
                    result.innerText = answer;
                }
                break;

            default:
                result.innerText += value;
        }

        function checkNumber() {
            // Проверка выражения
            if (result.innerText.search(/[^0-9]/mi) != -1) {
                result.innerText = "Что-то не то...!";
                setTimeout(() => {
                    result.innerText = '';
                }, 500)
                return 0;
            } else return 1;
        }

        function checkEval() {
            // Проверка выражения
            if (result.innerText.search(/[^0-9*/+-\/(\/)]/mi) != -1) {
                result.innerText = "Что-то не то...!";
                setTimeout(() => {
                    result.innerText = '';
                }, 500)
                return 0;
            } else return 1;
        }


        function butEqual() {
            if (checkEval()) {
                // Исполнение выражения
                var answer = eval(result.innerText).toFixed(8);
                if (answer.split(".")[0].length > 12 || answer.indexOf('e') > -1) {
                    result.innerText = "Большое число!";
                    setTimeout(() => {
                        result.innerText = '';
                    }, 500)
                    return;
                }
                return Number(answer);
            }
        }
    });
};