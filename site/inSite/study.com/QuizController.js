define(['notification/remilonNotification'], function (notifications) {
    'use strict';

    /**
     * Definition of the quiz question option bean that is returned from the server
     * @typedef {Object} Multimedia
     * @property {string} imageUri
     * @property {number} height
     * @property {number} width
     */

    /**
     * Definition of the quiz question option bean that is returned from the server
     * @typedef {Object} QuizQuestionOption
     * @property {number} quizQuestionOptionId - quiz question option id.
     * @property {string} text - Option text.
     * @property {boolean} isCorrect - Whether the option is the correct answer for its question.
     * @property {Multimedia} multimedia - Object containing information about the image corresponding with this option
     */

    /**
     * Definition of the quiz question bean that is returned from the server
     * @typedef {Object} QuizQuestion
     * @property {number} quizQuestionId - quiz question id.
     * @property {string} prompt - Question prompt text.
     * @property {Multimedia} multimedia - Object containing information about the image corresponding with this question
     * @property {Array<QuizQuestionOption>} options - List of question options
     * @property {QuizQuestionOption} correctAnswer - The option which is the correct answer
     * @property {string} explanation - Explanation of the answer to this question
     * @property {string} marker - Time in the video that explains the question's answer
     * @property {string} answerSourceUri - Uri of the lesson which explains the answer
     */

    /**
     * Object representing the current state of the quiz
     * @typedef {Object} QuizState
     * @property {number} currentQuestionIndex - Index of the question currently shown to the user.
     * @property {QuizQuestionOption} selectedOptionForCurrentQuestion - The currently selected (highlighted) option.
     * @property {Object.<number, QuizQuestionOption>} questionIdToSubmittedAnswer - Map of question id to the option that the user selected for the given question
     * @property {number} correctAnswerCount - Number of correctly answered questions.
     * @property {boolean} isScoreSaved - Whether the score has been saved to the server.
     */

    /**
     * Definition of the quiz bean that is returned from the server
     * @typedef {Object} Quiz
     * @property {Array<QuizQuestion>} questions - List of quiz questions.
     * @property {QuizState} quizState - State of the quiz from the user's last attempt
     */

    /**
     * Angular controller for driving the quiz;
     * @param {$scope} $scope - angular scope
     * @param {$http} $http - ng Http impl
     * @param {$sce} $sce - ng sce impl
     * @param {QuizTracking} tracking
     * @param {CourseProgressService} courseProgressService
     * @param {string} LESSON_QUIZ_PASSING_SCORE_PERCENT
     * @constructor
     */
    function QuizController($scope, $http, $sce, tracking, courseProgressService, LESSON_QUIZ_PASSING_SCORE_PERCENT) {
        this.$scope = $scope;
        this.$http = $http;
        this.$sce = $sce;
        this.tracking = tracking;
        this.courseProgressService = courseProgressService;
        this.LESSON_QUIZ_PASSING_SCORE_PERCENT = LESSON_QUIZ_PASSING_SCORE_PERCENT;

        /**
         * @type {string}
         */
        this.scoreShareEmail = '';
        
        /**
         * @type {string}
         */
        this.nextLessonUrl = $scope.nextLessonUrl;

        /**
         * @type {boolean}
         */
        this.teacherShared = $scope.teacherShared;

        /**
         * @type {boolean}
         */
        this.premiumTrial = $scope.premiumTrial;

        /**
         * @type {boolean}
         */
        this.enableAnimations = $scope.enableAnimations;

        /**
         * @type {boolean}
         */
        this.showLevelPoints = $scope.showLevelPoints;

        /**
         * @type {boolean}
         */
        this.isStudyTrainerVariation = $scope.isStudyTrainerVariation;

        /**
         * @type {boolean}
         */
        this.showStudyTrainerCta = $scope.showStudyTrainerCta;

        /**
         * @type {boolean}
         */
        this.socialProofThumbsUp = $scope.socialProofThumbsUp;

        /**
         * @type {string}
         */
        this.socialFacebookShareLink = $scope.socialFacebookShareLink;

        /**
         * @type {string}
         */
        this.imageHost = $scope.imageHost;

	    /**
	     * 
        */
       this.knowledgeCheckLink = $scope.knowledgeCheckLink;

        /**
         * @type {Lesson}
         */
        this.lesson = {
            type: $scope.academyAssetType,
            academyAssetId: $scope.academyAssetId,
            courseAcademyAssetId: $scope.courseAcademyAssetId
        };

        /**
         * @type {Array<QuizQuestion>}
         */
        this.questions = null;

        /**
         * @type {QuizState}
         */
        this.state = null;
        this.resetQuizState();
        this.loadQuiz();
    }

    QuizController.prototype.loadQuiz = function() {
        
        this.$http.get('/academy/practice/quiz-content.ajax', {
            params: {
                academyAssetId: this.lesson.academyAssetId
            }
        }).then(function(response) {

            var quiz = response.data;

            this.questions = quiz.questions;
            if (quiz.quizState) {
                this.state = quiz.quizState;
            }
        }.bind(this));
    };

    QuizController.prototype.resetQuizState = function () {
        this.state = {
            currentQuestionIndex: 0,
            selectedOptionForCurrentQuestion: null,
            questionIdToSubmittedAnswer: {},
            correctAnswerCount: 0,
            isScoreSaved: false
        };

        this.tracking.resetQuiz();
    };

    /**
     * @returns {QuizQuestion|*}
     */
    QuizController.prototype.currentQuestion = function() {
        return this.questions[this.state.currentQuestionIndex];
    };

    QuizController.prototype.selectOption = function(option) {
        this.state.selectedOptionForCurrentQuestion = option;
    };

    /**
     * @param {QuizQuestion} question
     * @returns {Array<QuizQuestionOption>}
     */
    QuizController.prototype.getFirstHalfOfOptionsList = function(question) {

        var midpointIndex = Math.ceil(question.options.length / 2);
        return question.options.slice(0, midpointIndex);
    };

    /**
     * @param {QuizQuestion} question
     * @returns {Array<QuizQuestionOption>}
     */
    QuizController.prototype.getSecondHalfOfOptionsList = function(question) {

        var midpointIndex = Math.ceil(question.options.length / 2);
        return question.options.slice(midpointIndex, question.options.length);
    };

    /**
     * @returns {boolean}
     */
    QuizController.prototype.isOptionSelected = function(option) {
        return this.state.selectedOptionForCurrentQuestion === option;
    };

    /**
     * @returns {boolean}
     */
    QuizController.prototype.isLastQuestion = function() {
        return (this.state.currentQuestionIndex) == this.questions.length;
    };

    QuizController.prototype.submitAnswer = function() {

        // increment score if correct answer
        var selectedOption = this.state.selectedOptionForCurrentQuestion;
        if (selectedOption.isCorrect) {
            this.state.correctAnswerCount++;
        }

        // save answer for given question
        var question = this.currentQuestion();
        this.state.questionIdToSubmittedAnswer[question.quizQuestionId] = selectedOption;
        var selectedOptionId = selectedOption.quizQuestionOptionId;

        // clear current option selection
        this.selectOption(null);

        var isLastQuestion = this.isLastQuestion();

        // increment question index
        this.state.currentQuestionIndex++;

        // animate question transition
        var scrollToElement;
        if (!this.isLastQuestion()) {
            scrollToElement = $("*[data-next-question-scroll-target]");
        }
        else {
            scrollToElement = $("*[data-quiz-results-scroll-target]");

            /*trigger here for popup to listen to*/
            $('body').trigger('lastQuestionInQuiz');
        }

        // animation
        if (window.matchMedia('(max-width: 768px)').matches) {
            // scroll to top of question/results
            $('html, body').animate({
                scrollTop: scrollToElement.offset().top
            }, 750);
        }

        // track answer
        this.tracking.answerQuestion({
            questionId: question.quizQuestionId,
            correctOption: question.correctAnswer.quizQuestionOptionId,
            answerId: selectedOptionId
        })
        .then(function() {

            // reset tracking timer if not last question
            if (!this.isLastQuestion()) {

                this.tracking.resetQuestion();
            }
            // quiz is complete, save score
            else {
                this.tracking.completeQuiz({
                    assetId: this.lesson.academyAssetId,
                    courseId: this.lesson.courseAcademyAssetId,
                    questionCount: this.questions.length,
                    score: this.state.correctAnswerCount
                }).then(function () {

                    this.state.isScoreSaved = true;

                    // trigger reload for course progress
                    this.courseProgressService.triggerReloadForCourse(this.lesson.courseAcademyAssetId);

                }.bind(this))
                .catch(function () {
                    notifications.error("Unable to save you quiz score.");
                });
            }
        }.bind(this));
    };

    /**
     * @param {number} questionId
     * @returns {QuizQuestionOption}
     */
    QuizController.prototype.submittedAnswerForQuestion = function(questionId) {
        return this.state.questionIdToSubmittedAnswer[questionId];
    };

    /**
     * @returns {boolean}
     */
    QuizController.prototype.isQuizCompleted = function() {
        return this.state.currentQuestionIndex >= this.questions.length;
    };

    /**
     * @returns {boolean}
     */
    QuizController.prototype.isScorePassed = function() {
        return this.getCorrectAnswerPercentage() >= this.LESSON_QUIZ_PASSING_SCORE_PERCENT;
    };

    /**
     * @returns {number}
     */
    QuizController.prototype.getCorrectAnswerPercentage = function() {
        if (this.questions.length === 0) {
            return 0;
        }
        
        return Math.floor(100 * this.state.correctAnswerCount / this.questions.length);
    };

    /**
     *
     */
    QuizController.prototype.shareScore = function () {
        if(typeof this.scoreShareEmail === 'undefined' || this.scoreShareEmail === ''){
            //for users without HTML5 browsers -- causing exceptions in the service
            return;
        }
        var email = this.scoreShareEmail;
        this.scoreShareEmail = "";

        this.tracking.shareScore(email)
         .then(function () {
             notifications.success("Your score has been successfully sent to " + email);
         })
         .catch(function () {
             notifications.error("An error occurred sending your score to " + email + ". :(");
         });
    };

    /**
     * @returns {boolean}
     */
    QuizController.prototype.isVideoLessonType = function() {
        return this.lesson.type === 'LESSON';
    };

    /**
     * @param {string} html
     * @returns {*}
     */
    QuizController.prototype.trustAsHtml = function(html) {
        return this.$sce.trustAsHtml(html);
    };

    QuizController['$inject'] = ['$scope', '$http', '$sce', 'QuizTracking', 'CourseProgressService', 'LESSON_QUIZ_PASSING_SCORE_PERCENT'];
    return QuizController;
});