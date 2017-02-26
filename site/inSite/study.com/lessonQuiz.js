(function () {
    'use strict';

    /**
     * @param {function(...) : jQuery} $
     * @param {function(Element|jQuery,new:CourseNavigator)} CourseNavigator
     * @param angular
     * @param {MilestoneService} MilestoneService
     * @param {AcademyPageRegFormController} AcademyPageRegFormController
     * @param {remspect} remspect
     */
    function init($, angular, CourseNavigator, MilestoneService, AcademyPageRegFormController, remspect) {
        var courseNavigator = new CourseNavigator($('[data-coursenavigator]'));

        $(document).ready(function () {
            
            // show paywall
            $("*[data-quiz-paywall-trigger]").click(function (){
                $("*[data-quiz-hide-on-paywall]").hide();
                $("*[data-quiz-paywall]").show();
            });

            $("*[data-update-next-lesson]").on("click", function () {
                MilestoneService.updateProgressForCountMilestone("FIRST_NEXT_LESSON", "1", false);
            });

            var lessonQuizModule = angular.module("LessonQuizApp", ['quiz', 'courseProgress', 'globalModules']);
            if (remspect.isControl("academyRegForm")) {
                lessonQuizModule.controller('AcademyPageRegFormController', AcademyPageRegFormController);
            }

            angular.bootstrap(document,['LessonQuizApp']);
        });
    }


    require(['util/remspect'], function(remspect) {
        var deps = [
            'jquery', 'lib/angular', 'redesign/courseNavigator', 'milestone/MilestoneService',
            'redesign/lesson/controllers/AcademyPageRegFormController', 'util/remspect',
            'courseProgress/courseProgressModule', 'redesign/lesson/quiz/quiz', 'redesign/globalModules', 'util/virtualOnClick'
        ];
        deps.push("redesign/favoriting");
        require(deps, init);
    });
}());