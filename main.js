// Модальное окно
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementsByClassName('close')[0];

// Описания шифров
const cipherDescriptions = {
    caesar: 'Шифр Цезаря - это метод шифрования, где каждая буква в тексте заменяется буквой, находящейся на определённое количество позиций правее в алфавите. Этот метод был использован Юлием Цезарем для секретной переписки.',
    atbash: 'Шифр Атбаш - это метод шифрования, где первая буква алфавита заменяется на последнюю, вторая на предпоследнюю и так далее. Этот шифр использовался в древней письменности иврита.',
    morse: 'Азбука Морзе - это способ кодирования букв и цифр последовательностями точек и тире. Широко использовалась для передачи сообщений по телеграфу.',
    vigenere: 'Шифр Виженера - это метод полиалфавитного шифрования буквенного текста с использованием ключевого слова. Считался нераскрываемым на протяжении трех столетий.',
    binary: 'Двоичный код - это представление текста в виде последовательности нулей и единиц. Это базовый метод кодирования информации в компьютерных системах.'
};

// Функции для работы с паролями
function checkPassword() {
    const password = document.getElementById('password-input').value;
    const strengthDiv = document.getElementById('password-strength');
    
    // Критерии оценки
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    let strength = 0;
    let message = '';
    
    // Подсчёт силы пароля
    if (hasLower) strength++;
    if (hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;
    if (isLongEnough) strength++;
    
    // Определение сообщения
    switch(strength) {
        case 0:
        case 1:
            message = '<span style="color: var(--danger-color)">Очень слабый пароль</span>';
            break;
        case 2:
            message = '<span style="color: var(--warning-color)">Слабый пароль</span>';
            break;
        case 3:
            message = '<span style="color: var(--warning-color)">Средний пароль</span>';
            break;
        case 4:
            message = '<span style="color: var(--success-color)">Хороший пароль</span>';
            break;
        case 5:
            message = '<span style="color: var(--success-color)">Отличный пароль!</span>';
            break;
    }
    
    // Добавление рекомендаций
    let recommendations = [];
    if (!hasLower) recommendations.push('строчные буквы');
    if (!hasUpper) recommendations.push('заглавные буквы');
    if (!hasNumber) recommendations.push('цифры');
    if (!hasSpecial) recommendations.push('специальные символы');
    if (!isLongEnough) recommendations.push('минимум 8 символов');
    
    if (recommendations.length > 0) {
        message += '<br>Добавьте: ' + recommendations.join(', ');
    }
    
    strengthDiv.innerHTML = message;
}

function generatePassword() {
    const length = 16;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Убеждаемся, что пароль содержит как минимум одну букву каждого регистра
    if (!/[a-z]/.test(password)) {
        const pos = Math.floor(Math.random() * length);
        password = password.substring(0, pos) + 
                  'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26)) +
                  password.substring(pos + 1);
    }
    if (!/[A-Z]/.test(password)) {
        const pos = Math.floor(Math.random() * length);
        password = password.substring(0, pos) + 
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26)) +
                  password.substring(pos + 1);
    }
    
    // Если выбраны цифры, убеждаемся что хотя бы одна присутствует
    if (includeNumbers && !/\d/.test(password)) {
        const pos = Math.floor(Math.random() * length);
        password = password.substring(0, pos) + 
                  numbers.charAt(Math.floor(Math.random() * numbers.length)) +
                  password.substring(pos + 1);
    }
    
    // Если выбраны символы, убеждаемся что хотя бы один присутствует
    if (includeSymbols && !/[!@#$%^&*()_+-=[\]{}|;:,.<>?]/.test(password)) {
        const pos = Math.floor(Math.random() * length);
        password = password.substring(0, pos) + 
                  symbols.charAt(Math.floor(Math.random() * symbols.length)) +
                  password.substring(pos + 1);
    }
    
    document.getElementById('generated-password').innerHTML = 
        `<div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; font-family: monospace;">
            ${password}
        </div>`;
}

// Азбука Морзе
const morseCode = {
    'а': '.-', 'б': '-...', 'в': '.--', 'г': '--.', 'д': '-..', 'е': '.', 'ё': '.', 
    'ж': '...-', 'з': '--..', 'и': '..', 'й': '.---', 'к': '-.-', 'л': '.-..', 
    'м': '--', 'н': '-.', 'о': '---', 'п': '.--.', 'р': '.-.', 'с': '...', 
    'т': '-', 'у': '..-', 'ф': '..-.', 'х': '....', 'ц': '-.-.', 'ч': '---.', 
    'ш': '----', 'щ': '--.-', 'ъ': '--.--', 'ы': '-.--', 'ь': '-..-', 'э': '...-...',
    'ю': '..--', 'я': '.-.-', ' ': ' '
};

// Функции шифрования
function encodeCipher() {
    const text = document.getElementById('input-text').value.toLowerCase();
    const cipherType = document.getElementById('cipher-type').value;
    const shift = parseInt(document.getElementById('shift').value) || 3;
    const key = document.getElementById('vigenere-key')?.value?.toLowerCase() || 'ключ';
    let result = '';

    switch(cipherType) {
        case 'caesar':
            result = caesarCipher(text, shift);
            break;
        case 'atbash':
            result = atbashCipher(text);
            break;
        case 'morse':
            result = morseEncode(text);
            break;
        case 'vigenere':
            result = vigenereCipher(text, key, true);
            break;
        case 'binary':
            result = textToBinary(text);
            break;
    }

    document.getElementById('output-text').value = result;
    document.getElementById('cipher-description').textContent = cipherDescriptions[cipherType];
}

function decodeCipher() {
    const text = document.getElementById('input-text').value.toLowerCase();
    const cipherType = document.getElementById('cipher-type').value;
    const shift = parseInt(document.getElementById('shift').value) || 3;
    const key = document.getElementById('vigenere-key')?.value?.toLowerCase() || 'ключ';
    let result = '';

    switch(cipherType) {
        case 'caesar':
            result = caesarCipher(text, -shift);
            break;
        case 'atbash':
            result = atbashCipher(text);
            break;
        case 'morse':
            result = morseDecode(text);
            break;
        case 'vigenere':
            result = vigenereCipher(text, key, false);
            break;
        case 'binary':
            result = binaryToText(text);
            break;
    }

    document.getElementById('output-text').value = result;
}

// Шифр Цезаря
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char >= 'а' && char <= 'я') {
            let code = ((char.charCodeAt(0) - 1072 + shift + 32) % 32) + 1072;
            return String.fromCharCode(code);
        }
        return char;
    }).join('');
}

// Шифр Атбаш
function atbashCipher(text) {
    return text.split('').map(char => {
        if (char >= 'а' && char <= 'я') {
            return String.fromCharCode(1071 - (char.charCodeAt(0) - 1072));
        }
        return char;
    }).join('');
}

// Азбука Морзе
function morseEncode(text) {
    return text.split('').map(char => morseCode[char] || char).join(' ');
}

function morseDecode(text) {
    const reverseMorse = Object.fromEntries(
        Object.entries(morseCode).map(([key, value]) => [value, key])
    );
    return text.split(' ').map(char => reverseMorse[char] || char).join('');
}

// Шифр Виженера
function vigenereCipher(text, key, encode) {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] >= 'а' && text[i] <= 'я') {
            const shift = key[keyIndex % key.length].charCodeAt(0) - 1072;
            result += caesarCipher(text[i], encode ? shift : -shift);
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    return result;
}

// Двоичный код
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

function binaryToText(binary) {
    return binary.split(' ').map(bin => {
        return String.fromCharCode(parseInt(bin, 2));
    }).join('');
}

// Тесты
const quizQuestions = [
    {
        question: 'Какой из этих паролей самый надежный?',
        options: [
            'password123',
            'Tr0ub4dor&3',
            'qwerty',
            'admin1234'
        ],
        correct: 1
    },
    {
        question: 'Что такое фишинг?',
        options: [
            'Вид спорта',
            'Вредоносная программа',
            'Мошенничество с целью кражи данных',
            'Метод шифрования'
        ],
        correct: 2
    },
    {
        question: 'Как защитить свои данные в интернете?',
        options: [
            'Использовать одинаковые пароли везде',
            'Не использовать антивирус',
            'Открывать все вложения в письмах',
            'Использовать двухфакторную аутентификацию'
        ],
        correct: 3
    },
    {
        question: 'Какой метод шифрования использовал Юлий Цезарь?',
        options: [
            'Шифр Виженера',
            'Шифр Цезаря',
            'Азбука Морзе',
            'Двоичный код'
        ],
        correct: 1
    },
    {
        question: 'Зачем нужно шифрование данных?',
        options: [
            'Для украшения текста',
            'Для экономии места',
            'Для защиты конфиденциальной информации',
            'Для увеличения скорости передачи'
        ],
        correct: 2
    },
    {
        question: 'Какой из этих методов защиты самый важный?',
        options: [
            'Регулярное обновление программ',
            'Использование сложных паролей',
            'Двухфакторная аутентификация',
            'Все вышеперечисленное'
        ],
        correct: 3
    }
];

let currentQuestion = 0;

document.addEventListener('DOMContentLoaded', function() {
    showQuestion();
    
    const cipherType = document.getElementById('cipher-type');
    if (cipherType) {
        cipherType.addEventListener('change', function() {
            const shiftControl = document.getElementById('caesar-shift');
            const vigenereKey = document.getElementById('vigenere-key-container');
            
            if (shiftControl) {
                shiftControl.style.display = this.value === 'caesar' ? 'block' : 'none';
            }
            if (vigenereKey) {
                vigenereKey.style.display = this.value === 'vigenere' ? 'block' : 'none';
            }
            
            const description = document.getElementById('cipher-description');
            if (description) {
                description.textContent = cipherDescriptions[this.value];
            }
        });
    }
});

function showQuestion() {
    const questionData = quizQuestions[currentQuestion];
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    
    if (questionElement && optionsElement) {
        questionElement.innerHTML = `<h3>${questionData.question}</h3>`;
        optionsElement.innerHTML = questionData.options
            .map((option, index) => `
                <label>
                    <input type="radio" name="quiz" value="${index}">
                    ${option}
                </label>
            `).join('');
    }
}

function checkAnswer() {
    const selected = document.querySelector('input[name="quiz"]:checked');
    if (!selected) {
        alert('Пожалуйста, выберите ответ!');
        return;
    }

    const answer = parseInt(selected.value);
    const correct = quizQuestions[currentQuestion].correct;
    const resultElement = document.getElementById('quiz-result');
    
    if (resultElement) {
        resultElement.style.display = 'block';
        if (answer === correct) {
            resultElement.innerHTML = 'Правильно! 🎉';
            resultElement.className = 'correct';
        } else {
            resultElement.innerHTML = `Неправильно. Правильный ответ: ${quizQuestions[currentQuestion].options[correct]}`;
            resultElement.className = 'incorrect';
        }
        
        currentQuestion = (currentQuestion + 1) % quizQuestions.length;
        setTimeout(() => {
            resultElement.style.display = 'none';
            showQuestion();
        }, 2000);
    }
}