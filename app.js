const questionContainer = document.querySelector('.quiz')
const questionTitle = document.querySelector('.question-title')
const questionOptionsContainer = document.querySelector('.question-options')
const questionCurrent = document.querySelector('.current-question')
const questionRemainingSeconds = document.querySelector('.question-remaining span')

const scoreContainer = document.querySelector('.score')
const scoreText = document.querySelector('.score-main span')
const scoreBigText = document.querySelector('.score-main')
const scoreCongrats = document.querySelector('.score-congrats')

let questions = [
    {
        title: 'Qual time Kobe Bryant se aposentou?',
        options: [
            'Los Angeles Lakers',
            'Orlando Magics',
            'Chicago Bulls',
            'Phoenix Suns'
        ],
        answer: 0
    },
    {
        title: 'Qual time Stephen Curry foi draftado?',
        options: [
            'New Orleans Pelicans',
            'Phoenix Suns',
            'Golden State Warriors',
            'Chicago Bulls'
        ],
        answer: 2
    },
    {
        title: 'Quantos títulos Michael Jordan possui?',
        options: [
            '5 títulos',
            '6 títulos',
            '7 títulos',
            '8 títulos'
        ],
        answer: 1
    },
    {
        title: 'Qual dos jogadores abaixo foi MVP das finais da NBA em 2021?',
        options: [
            'Stephen Curry',
            'Kevin Durant',
            'Giannis Antetokounmpo',
            'Kawhi Leonard',
        ],
        answer: 2
    }
]

let currentQuestion = 0
let currentScore = 0

const showScore = score => { 
    let counter = 0
    let timer = setInterval(() => {
        counter++
        if (counter === score) {
            clearInterval(timer)
            return
        }

        scoreText.textContent = `${counter + 1}%`
    }, 10);
}

const endQuiz = () => {
    questionContainer.style.display = 'none'
    scoreContainer.style.display = 'flex'

    if (currentScore === 0) {
        scoreCongrats.textContent = 'Valeu pela tentativa!'
        scoreBigText.textContent = `Você não acertou nenhuma questão. Tente denovo =)`
        return
    }

    showScore(currentScore)
}

const getOptionsTemplate = options => {
    let optionsTemplate = ''
    options.forEach((option, index) => {
        optionsTemplate += `<div data-answer="${index}" class="option">${option}</div>`
    })

    return optionsTemplate
}

const setUserScore = (answer, userAnswer) => {
    if (answer === userAnswer) {
        currentScore += 25
    }
}

const showQuestion = () => {
    if (questions[currentQuestion]) {
        const question = questions[currentQuestion]
        const { title, options, answer } = question

        scoreContainer.style.display = 'none'
        
        questionCurrent.textContent = `Questão ${currentQuestion + 1} de ${questions.length}`
        questionTitle.innerHTML = title
        questionOptionsContainer.innerHTML = getOptionsTemplate(options)

        let counter = 30
        let timer = setInterval(() => {
            counter--
            questionRemainingSeconds.textContent = `Faltam ${counter} segundos para o tempo acabar`
    
            if (counter === 0) {
                clearInterval(timer)
                currentQuestion++
                showQuestion()
            }
        }, 1000);

        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', event => {
                const userAnswer = Number(event.target.dataset.answer)

                setUserScore(answer, userAnswer)
                currentQuestion++
                showQuestion()
                clearInterval(timer)
            })
        })
    } else {
        endQuiz()
    }
}

showQuestion()

