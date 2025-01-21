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
const quizQuestions = [
    {
        question: 'Какой из следующих паролей самый надежный?',
        options: [
            'password123',
            'P@ssw0rd!2024',
            'имядень_рождения',
            'qwerty'
        ],
        correct: 1
    },
    {
        question: 'Что из перечисленного является признаком фишингового письма?',
        options: [
            'Письмо от известной компании',
            'Срочная просьба о предоставлении данных',
            'Наличие логотипа компании',
            'Обращение по имени'
        ],
        correct: 1
    },
    {
        question: 'Как часто следует менять пароли?',
        options: [
            'Никогда',
            'Раз в год',
            'Каждые 3-6 месяцев',
            'Каждый день'
        ],
        correct: 2
    }
];
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementsByClassName('close')[0];
function showContent(contentId) {
    const content = educationalContent[contentId];
    if (content) {
        modalContent.innerHTML = content.content;
        modal.style.display = 'block';
    }
}
closeBtn.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
let currentQuestion = 0;
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit-quiz');
const resultElement = document.getElementById('result');

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
}
function selectOption(index) {
    const buttons = optionsElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove('selected');
    }
    buttons[index].classList.add('selected');
}
submitButton.onclick = function() {
    const selectedButton = optionsElement.querySelector('.selected');
    if (!selectedButton) {
        alert('Пожалуйста, выберите ответ');
        return;
    }
    const selectedAnswer = Array.from(optionsElement.children).indexOf(selectedButton);
    const correct = selectedAnswer === quizQuestions[currentQuestion].correct;

    resultElement.style.display = 'block';
    resultElement.textContent = correct ? 'Правильно!' : 'Неправильно. Попробуйте еще раз.';
    resultElement.className = correct ? 'correct' : 'incorrect';

    setTimeout(() => {
        resultElement.style.display = 'none';
        if (correct) {
            currentQuestion = (currentQuestion + 1) % quizQuestions.length;
            loadQuestion();
        }
    }, 2000);
}
loadQuestion();