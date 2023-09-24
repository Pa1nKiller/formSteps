import '../styles/index.scss';
import { template } from 'lodash';
import FormSteps from './form';
import step1 from '!!raw-loader!../assets/step-1.html';
import step2 from '!!raw-loader!../assets/step-2.html';
import step3 from '!!raw-loader!../assets/step-3.html';
import step4 from '!!raw-loader!../assets/step-other.html';
import step5 from '!!raw-loader!../assets/step-other.html';
import step6 from '!!raw-loader!../assets/step-6.html';
import step7 from '!!raw-loader!../assets/step-other.html';

console.log('webpack starterkit');

const answers = [
    {
        html: template(step1)({
            options: [
                { title: 'частный дом', img: "./public/images/Questions/1/фото-1.jpg", value: 'частный дом' },
                { title: 'панельный дом', img: "./public/images/Questions/1/фото-2.jpg", value: 'панельный дом1' },
                { title: 'панельный дом', img: "./public/images/Questions/1/фото-3.jpg", value: 'панельный дом2' }
            ]
        }),
        title: `1. Укажите, пожалуйста, куда планируете ставить Окна?`,
        validate(data) {
            return !!data.length;
        }
    },
    {
        html: step2,
        title: `2. Какой тип остекления интересует?`,
        validate(data) {
            return !!data.length;
        }
    },
    {
        html: step3,
        title: `3. Выберите дополнительную фурнитуру`,
        validate(data) {
            return !!data.length;
        }
    },
    {
        html: step4,
        title: `4.`,
        validate() {
            return true;
        }
    },
    {
        html: step5,
        title: `5.`,
        validate() {
            return true;
        }
    },
    {
        html: step6,
        title: `6. Укажите, пожалуйста, количество окон, которое необходимо просчитать`,
        validate() {
            return true;
        }
    },
    {
        html: step7,
        title: `Выполняем подсчёт... Ожидайте.`,
        validate() {
            return true;
        }
    }
];


//paintAnswer(answers[indexAnswer]);
/*let indexAnswer = 0; //текущий активный вопрос
let countAnswer = 0; //количество выбранных ответов
function initForm(formElement, titleElement, answers) {
    const btnNext = document.querySelector("#btn-next");
    const btnBack = document.querySelector("#btn-back");
    const error = document.querySelector("#error");

    const currentStep = document.querySelector("#current-step");
    const section = document.querySelectorAll(".progress-bar__section");

    currentStep.innerText = indexAnswer + 1;
    section[indexAnswer].classList.add("active-section");

    formElement.result = { step1: null, step2: null, step3: null, step4: null, step5: null, step6: null };


    const paintAnswer = (answers) => {
        //const qestionTitle = document.querySelector("#qestion-title");
        //const containerAnswers = document.querySelector("#answers");


        formElement.innerHTML = answers.html;
        titleElement.innerText = answers.title;

        addActionAnswer();
    };

    const addActionAnswer = () => {
        const answer = document.querySelectorAll(".answer");
        for (let index = 0; index < answer.length; index++) {
            const element = answer[index];
            element.onclick = function () {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                    countAnswer--;
                }
                else {
                    element.classList.add("active");
                    countAnswer++;
                }
            };
        }

        if (indexAnswer === 5) {
            let range = document.querySelector("#range");

            let init = (value) => {

                document.documentElement.style.setProperty("--range", value * 2 + "%");
            };

            let updateVar = (value) => {
                document.documentElement.style.setProperty("--range", value * 2 + "%");
                document.querySelector("#block-value-from-range").innerHTML = value / 2;
            };

            init(range.value * 2);
            range.addEventListener("input", () => {
                updateVar(range.value * 2);
            });
        }
    };

    btnNext.addEventListener("click", function () {
        if (indexAnswer === 6)
            return;
        if (countAnswer === 0)
            if (indexAnswer !== 3 && indexAnswer !== 4 && indexAnswer !== 5) {
                error.style.display = "block";
                return;
            }

        error.style.display = "none";
        countAnswer = 0;
        indexAnswer++;
        currentStep.innerText = indexAnswer + 1;
        section[indexAnswer].classList.add("active-section");
        paintAnswer(answers[indexAnswer]);
    });
    paintAnswer(answers[indexAnswer]);
    btnBack.addEventListener("click", function () {
        if (indexAnswer === 0)
            return;

        error.style.display = "none";
        countAnswer = 0;
        section[indexAnswer].classList.remove("active-section");
        indexAnswer--;
        currentStep.innerText = indexAnswer + 1;
        paintAnswer(answers[indexAnswer]);
    });
}*/


document.addEventListener("DOMContentLoaded", function () {
    //initForm(document.getElementById("answers"), document.getElementById("qestion-title"), answers);
    window.testForm = new FormSteps(answers);
});