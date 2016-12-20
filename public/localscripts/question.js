$(function() {

    var clients = {}; // Store one client per question-container div, indexed by the id of these divs.

    var initialize = function(questionContainer, callback) {
        var questionData = null;
        questionContainer.find(".question-data").each(function(i, x) {questionData = JSON.parse(x.innerHTML);});
        var client = new document.questionClients[questionData.question.type];
        clients[questionContainer.attr('id')] = client;
        client.initialize(questionData, callback);
    };

    var render = function(questionContainer) {
        var client = clients[questionContainer.attr('id')];

        var questionData = null;
        questionContainer.find(".question-data").each(function(i, x) {questionData = JSON.parse(x.innerHTML);});

        questionContainer.find(".question-body").each(function(i, x) {client.renderQuestion(x, questionData);});
        questionContainer.find(".submission-body").each(function(i, x) {client.renderSubmission(x, questionData, i);});
        questionContainer.find(".answer-body").each(function(i, x) {client.renderAnswer(x, questionData);});
    };

    var submit = function(event) {
        var questionContainer = $(event.target).parents(".question-container");
        var client = clients[questionContainer.attr('id')];

        var questionData = null;
        questionContainer.find(".question-data").each(function(i, x) {questionData = JSON.parse(x.innerHTML);});

        var clientContainer = questionContainer.find(".question-body");
        var submittedAnswer = client.getSubmittedAnswer(clientContainer, questionData);

        var postData = {
            submittedAnswer: submittedAnswer,
            variant: questionData.variant,
            type: 'score',
        };
        questionContainer.find('form.question-form input.postData').val(JSON.stringify(postData));
        questionContainer.find('form.question-form').submit();
    };

    $(".question-container").each(function(i, questionContainer) {
        initialize($(questionContainer), function(err) {
            if (err) return console.log(err);
            render($(questionContainer));
            $(questionContainer).find(".question-submit").click(submit);
        });
    });
});