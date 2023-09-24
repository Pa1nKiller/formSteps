class FormSteps {
    constructor(answers, root = document) {
        this.root = root;
        this.formElement = this.root.getElementById("answers");
        this.titleElement = this.root.getElementById("qestion-title");
        this.answers = answers;
        this.indexAnswer = 0;
        this.countAnswer = 0;
        this.result = {};

        this.paintAnswerNext();
        this.initNavigations();
    }

    get currentAnswer() {
        return this.answers[this.indexAnswer - 1];
    }

    paintSelectedOption() {
        const answer = this.root.querySelectorAll('[data-answer]');

        for (let index = 0; index < answer.length; index++) {
            const element = answer[index];
            const value = element.getAttribute('data-answer');
            const isSelected = this.result[this.indexAnswer - 1].includes(value);

            if (isSelected) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        }
    }

    _paintAnswer() {
        const currentStep = document.querySelector("#current-step");
        const section = document.querySelectorAll(".progress-bar__section");
        const answer = this.currentAnswer;
        this.countAnswer = 0;
        currentStep.innerText = this.indexAnswer;

        this.formElement.innerHTML = answer.html;
        this.titleElement.innerText = answer.title;

        for (let index = 0; index < section.length; index++) {
            if (this.indexAnswer > index) {
                section[index].classList.add("active-section");
            } else {
                section[index].classList.remove("active-section");
            }
        }

        this.addActionAnswer();
        this.paintSelectedOption();
    }

    validateStep() {
        if (!this.currentAnswer) {
            return true;
        }
        const answer = this.currentAnswer;
        const result = this.result[this.indexAnswer - 1];
        console.log(result);
        console.log(answer.validate(result));
        if (!answer.validate(result)) {
            this.toggleErrors(true);
            return false;
        }

        this.toggleErrors(false);
        return true;
    }

    toggleErrors(show) {
        const error = document.querySelector("#error");
        error.style.display = show ? "block" : "none";
    }

    paintAnswerNext() {
        if (this.indexAnswer >= this.answers.length) {
            return;
        }
        if (!this.validateStep()) {
            return;
        }

        this.indexAnswer++;
        this._paintAnswer();
    }

    paintAnswerPrev() {
        if (this.indexAnswer <= 1) {
            return;
        }

        this.toggleErrors(false);

        this.indexAnswer--;
        this._paintAnswer();
    }

    addActionAnswer() {
        const answer = this.root.querySelectorAll('[data-answer]');
        if (!this.result[this.indexAnswer - 1]) {
            this.result[this.indexAnswer - 1] = [];
        }

        for (let index = 0; index < answer.length; index++) {
            const element = answer[index];
            const value = element.getAttribute('data-answer');

            element.onclick = () => {
                this.toggleErrors(false);
                const isSelected = this.result[this.indexAnswer - 1].includes(value);
                if (isSelected) {
                    this.result[this.indexAnswer - 1] = this.result[this.indexAnswer - 1].filter(x => x != value);
                }
                else {
                    this.result[this.indexAnswer - 1].push(value);
                }
                this.paintSelectedOption();
            };
        }

        if (this.indexAnswer === 6) {
            this.initialRange();
        }
    }

    initialRange() {
        let range = this.root.querySelector("#range");

        let init = (value) => {
            this.root.documentElement.style.setProperty("--range", value * 2 + "%");
        };

        let updateVar = (value) => {
            this.root.documentElement.style.setProperty("--range", value * 2 + "%");
            this.root.querySelector("#block-value-from-range").innerHTML = value / 2;
        };

        init(range.value * 2);
        range.addEventListener("input", () => {
            updateVar(range.value * 2);
        });
    }

    initNavigations() {
        const btnNext = this.root.querySelector("#btn-next");
        const btnBack = this.root.querySelector("#btn-back");

        btnNext.addEventListener("click", () => {
            this.paintAnswerNext();
        });

        btnBack.addEventListener("click", () => {
            this.paintAnswerPrev();
        });
    }
}

export default FormSteps;