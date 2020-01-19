<template>
    <div id="app">
        <el-row>
            <el-col :span="12" :offset="6">
                <Register
                        :currentQuestion="shuffleQuestion[index]"
                        :next="next"

                        :increment="increment"
                        :index="index"
                        :questions="shuffleQuestion"
                >
                </Register>
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Register from './components/Register.vue'
    import questions from './data/questions.js'
    import _ from 'lodash'

    export default {
        name: 'app',
        components: {
            Register
        },
        data() {
            return {
                questions,
                index: 0,
                shuffleQuestion:[]
            }
        },
        created() {
            this.shuffleQuestion = _.shuffle(this.questions);
        },
        methods: {
            next() {
                this.index++
            },
            // previous(){
            //     this.index--
            // },
            increment(){

            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
