<template>
    <div class="hello">
        <div v-if="showPlayButton">
            <h1>{{ msg }}</h1>
            <h2>Click Button and Register to play Quiz Game</h2>
            <button type="button" @click="toggleQuizForm">PlayQuiz</button>
        </div>
        <el-form v-if="showQuizForm" ref="form" :model="form" label-width="120px">
            <el-form-item label="Your Name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Your Age">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Register</el-button>
                <el-button type="primary" @click="onCancel">Cancel</el-button>
            </el-form-item>
        </el-form>
        <el-card v-if="showQuizInfo" class="box-card">
            <div slot="header" class="clearfix">
                <span>Quiz</span>
            </div>
            <div>
                Question- 10
                <br>
                Time - {{time}} second
            </div>
            <button type="button" @click="showQuestion=true; showQuizInfo=false; showTime=true;">Ready</button>
        </el-card>
        <div v-if="showQuestion">
            <!--Correct: {{}}/Total: {{}}-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{currentQuestion.question}}</span>
                </div>
                <div v-for="(answer, index) in answers" :key="index">
                    <el-radio-group v-model="radio">
                        <el-radio :label="index+1" @change="selectAnswer(index)">{{answer}}</el-radio>
                    </el-radio-group>
                </div>
                {{correctAnswer}}
                <button type="button" @click="retryAnswer" :disabled="index==0">Previous</button>
                <button type="button" @click="checkAnswer" :disabled="selectedIndex===null || answered">OK</button>
                <button type="button" @click="valueReset" :disabled="index===9">Next</button>
                <button type="button" @click="finish">Finish</button>
            </el-card>
        </div>
        <div v-if="showFinalResult">
            <el-tabs type="bordered-card">
                Name: {{form.name}}
                <br>
                Question Attempt: {{}}
                <br>
                Total Question: 10
                <br>
                Total Correct: {{numCorrect}}
                <br>
                Correct Percentage: {{(numCorrect/10)*100}}%
                <br>
                <br>
                <u>All Questions and Answers</u>
                <div v-for="(question, index) in questions" :key="index">
                    {{index+1}}.{{question.question}}
                    <ul>
                        <li v-for="(ans, qIndex) in question.incorrect_answers" :key="qIndex">
                            {{ans}}
                        </li>

                        <li>{{question.correct_answer}}</li>
                    </ul>
                </div>
            </el-tabs>
        </div>
        <circular-count-down-timer
                :initial-value="time"
                :show-hour="false"
                :steps="200"
                :size="100"
                @finish="finish"
                v-if="showTime"
        ></circular-count-down-timer>
        <br>
        <div v-if="showResult">
            {{timeoutMessage}}
            <button type="button" @click="submitResult()">Show Result</button>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'Register',
        props: {
            currentQuestion: {},
            next: Function,
            previous: Function,
            increment: Function,
            index: Number,
            questions: Array
        },
        data() {
            return {
                msg: "Welcome to Quiz App",
                form: {
                    name: '',
                    age: 0
                },
                time: 30,
                shuffledAnswer: [],
                showQuizForm: false,
                showQuestion: false,
                showPlayButton: true,
                showQuizInfo: false,
                radio: '',
                selectedIndex: null,
                correctIndex: 0,
                timeoutMessage: '',
                showTime: false,
                numCorrect: 0,
                numTotal: 0,
                correctAnswer: [],
                answered: false,
                showFinalResult: false,
                showResult: false,
                // answeredList : [],
                question: ''
            }
        },
        computed: {
            answers() {
                var answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
                // answers.push(this.currentQuestion.correct_answer)
                return answers
            }
        },
        watch: {
            currentQuestion: {
                immediate: true,
                handler() {
                    this.selectedIndex = null;
                    this.shuffleAnswer();
                    this.answered = false
                }
            }
        },
        methods:
            {
                onSubmit() {
                    let key = 'Item 1'
                    localStorage.setItem(key, JSON.stringify(this.form));
                    this.showQuizForm = false;
                    this.showPlayButton = false;
                    this.showQuizInfo = true;
                },
                toggleQuizForm() {
                    this.showQuizForm = !this.showQuizForm;
                },
                onCancel() {
                    this.showQuestion = false;
                    this.showQuizForm = true;
                },
                checkAnswer() {
                    if (this.selectedIndex === this.correctIndex) {
                        this.numCorrect++;
                        this.correctAnswer.push(this.currentQuestion.correct_answer)
                    }
                    this.answered = true
                },
                selectAnswer(index) {
                    this.selectedIndex = index;
                },
                valueReset() {
                    this.radio = ''
                    this.next()
                    if (this.index === 9) {
                        this.showResult = true;
                    }
                    // this.question = 'question' + this.index
                    this.numTotal++
                },
                shuffleAnswer() {
                    var answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
                    this.shuffledAnswer = _.shuffle(answers);
                    this.correctIndex = this.shuffledAnswer.indexOf(this.currentQuestion.correct_answer)
                },
                finish() {
                    this.timeoutMessage = 'You reached out of time Click Submit to show result.'
                    this.showQuestion = false;
                    this.showResult = true;
                },
                submitResult() {
                    this.showFinalResult = true;
                    this.showTime = false;
                    this.showResult = false;
                },
                retryAnswer() {
                    this.radio = 4
                    console.log(this.radio);
                    this.previous();
                }
            }
    }
</script>

