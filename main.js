// Модальное окно
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementsByClassName('close')[0];

function showModal(content) {
    modal.style.display = 'block';
    modalContent.innerHTML = content;
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
const educationalContent = {
    'cyber-basics': {
        title: 'Основы кибербезопасности',
        content: `
            <h2>Основы кибербезопасности</h2>
            <p>Кибербезопасность - это защита компьютеров, серверов, мобильных устройств, электронных систем, сетей и данных от вредоносных атак.</p>
            <h3>Основные правила:</h3>
            <ul>
                <li>Регулярно обновляйте программное обеспечение</li>
                <li>Используйте антивирусное ПО</li>
                <li>Создавайте резервные копии важных данных</li>
                <li>Не открывайте подозрительные ссылки и вложения</li>
                <li>Используйте надежные пароли</li>
            </ul>
        `
    },
    'password-security': {
        title: 'Создание надежного пароля',
        content: `
            <h2>Как создать надежный пароль</h2>
            <p>Надежный пароль - ваша первая линия защиты в интернете.</p>
            <h3>Правила создания надежного пароля:</h3>
            <ul>
                <li>Минимум 12 символов</li>
                <li>Комбинация букв, цифр и специальных символов</li>
                <li>Использование верхнего и нижнего регистра</li>
                <li>Избегайте личной информации</li>
                <li>Уникальный пароль для каждого сервиса</li>
            </ul>
        `
    },
    'phishing': {
        title: 'Защита от фишинга',
        content: `
            <h2>Как распознать фишинг</h2>
            <p>Фишинг - это вид мошенничества с целью получения доступа к конфиденциальным данным пользователей.</p>
            <h3>Признаки фишинга:</h3>
            <ul>
                <li>Срочные просьбы о предоставлении данных</li>
                <li>Странные или неточные адреса отправителей</li>
                <li>Грамматические ошибки в сообщениях</li>
                <li>Просьбы о переводе денег</li>
                <li>Подозрительные вложения</li>
            </ul>
        `
    },
    'social-media': {
        title: 'Безопасность в социальных сетях',
        content: `
            <h2>Безопасное использование социальных сетей</h2>
            <p>Социальные сети могут быть опасны при неправильном использовании.</p>
            <h3>Правила безопасности:</h3>
            <ul>
                <li>Настройте приватность профиля</li>
                <li>Не принимайте заявки от незнакомцев</li>
                <li>Не публикуйте личную информацию</li>
                <li>Будьте осторожны с геолокацией</li>
                <li>Проверяйте источники информации</li>
            </ul>
        `
    }
};
// Функции шифрования
const cipherDescriptions = {
    caesar: 'Шифр Цезаря - это метод шифрования, где каждая буква в тексте заменяется буквой, находящейся на определённое количество позиций правее в алфавите.',
    atbash: 'Шифр Атбаш - это метод шифрования, где первая буква алфавита заменяется на последнюю, вторая на предпоследнюю и так далее.',
    morse: 'Азбука Морзе - это способ кодирования букв и цифр последовательностями точек и тире.'
};

const morseCode = {
    'а': '.-', 'б': '-...', 'в': '.--', 'г': '--.', 'д': '-..', 'е': '.', 'ё': '.', 
    'ж': '...-', 'з': '--..', 'и': '..', 'й': '.---', 'к': '-.-', 'л': '.-..', 
    'м': '--', 'н': '-.', 'о': '---', 'п': '.--.', 'р': '.-.', 'с': '...', 
    'т': '-', 'у': '..-', 'ф': '..-.', 'х': '....', 'ц': '-.-.', 'ч': '---.', 
    'ш': '----', 'щ': '--.-', 'ъ': '--.--', 'ы': '-.--', 'ь': '-..-', 'э': '...-...',
    'ю': '..--', 'я': '.-.-', ' ': ' '
};
function showContent(contentId) {
    const content = educationalContent[contentId];
    if (content) {
        modalContent.innerHTML = content.content;
        modal.style.display = 'block';
    }
}
function encodeCipher() {
    const text = document.getElementById('input-text').value.toLowerCase();
    const cipherType = document.getElementById('cipher-type').value;
    const shift = parseInt(document.getElementById('shift').value) || 3;
    let result = '';

    switch(cipherType) {
        case 'caesar':
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                if (char >= 'а' && char <= 'я') {
                    let code = ((char.charCodeAt(0) - 1072 + shift) % 32) + 1072;
                    result += String.fromCharCode(code);
                } else {
                    result += char;
                }
            }
            break;
        case 'atbash':
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                if (char >= 'а' && char <= 'я') {
                    let code = 1071 - (char.charCodeAt(0) - 1072);
                    result += String.fromCharCode(code);
                } else {
                    result += char;
                }
            }
            break;
        case 'morse':
            result = text.split('').map(char => morseCode[char] || char).join(' ');
            break;
    }

    document.getElementById('output-text').value = result;
    document.getElementById('cipher-description').textContent = cipherDescriptions[cipherType];
}

function decodeCipher() {
    const text = document.getElementById('input-text').value.toLowerCase();
    const cipherType = document.getElementById('cipher-type').value;
    const shift = parseInt(document.getElementById('shift').value) || 3;
    let result = '';

    switch(cipherType) {
        case 'caesar':
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                if (char >= 'а' && char <= 'я') {
                    let code = ((char.charCodeAt(0) - 1072 - shift + 32) % 32) + 1072;
                    result += String.fromCharCode(code);
                } else {
                    result += char;
                }
            }
            break;
        case 'atbash':
            // Атбаш работает одинаково в обе стороны
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                if (char >= 'а' && char <= 'я') {
                    let code = 1071 - (char.charCodeAt(0) - 1072);
                    result += String.fromCharCode(code);
                } else {
                    result += char;
                }
            }
            break;
        case 'morse':
            const reverseMorse = Object.fromEntries(
                Object.entries(morseCode).map(([key, value]) => [value, key])
            );
            result = text.split(' ').map(char => reverseMorse[char] || char).join('');
            break;
    }

    document.getElementById('output-text').value = result;
    document.getElementById('cipher-description').textContent = cipherDescriptions[cipherType];
}

// Проверка пароля
function checkPassword() {
    const password = document.getElementById('password-input').value;
    const strength = document.getElementById('password-strength');
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/\d/.test(password)) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    let result = '';
    switch(score) {
        case 0: result = '<span style="color: red">Очень слабый пароль</span>'; break;
        case 1: result = '<span style="color: orange">Слабый пароль</span>'; break;
        case 2: result = '<span style="color: yellow">Средний пароль</span>'; break;
        case 3: result = '<span style="color: lightgreen">Хороший пароль</span>'; break;
        case 4: result = '<span style="color: green">Отличный пароль!</span>'; break;
    }
    
    strength.innerHTML = result;
}

// Генерация пароля
function generatePassword() {
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*';
    
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    
    let chars = lowercase + uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    document.getElementById('generated-password').innerHTML = 
        `<div class="generated-password-display">${password}</div>
         <button onclick="copyToClipboard('${password}')">Копировать</button>`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Пароль скопирован в буфер обмена!');
    });
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
    }
];

let currentQuestion = 0;

// Ждем загрузки DOM перед инициализацией
document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    if (questionElement) {
        showQuestion();
    }

    // Обработчик изменения типа шифра
    const cipherType = document.getElementById('cipher-type');
    if (cipherType) {
        cipherType.addEventListener('change', function() {
            const shiftControl = document.getElementById('caesar-shift');
            if (shiftControl) {
                shiftControl.style.display = this.value === 'caesar' ? 'block' : 'none';
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
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    
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
    const result = document.getElementById('result');
    
    if (result) {
        result.style.display = 'block';
        if (answer === correct) {
            result.innerHTML = 'Правильно! 🎉';
            result.className = 'correct';
        } else {
            result.innerHTML = `Неправильно. Правильный ответ: ${quizQuestions[currentQuestion].options[correct]}`;
            result.className = 'incorrect';
        }
        
        currentQuestion = (currentQuestion + 1) % quizQuestions.length;
        setTimeout(() => {
            result.style.display = 'none';
            showQuestion();
        }, 2000);
    }
}