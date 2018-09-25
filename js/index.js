var weightedQuizApp = angular.module("weightedQuizApp", [
  "ngRoute",
  "ngAnimate"
]);

weightedQuizApp.factory("quizProgress", function() {
  return {};
});

weightedQuizApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "intro.html",
      resolve: {
        affirm: function(quizProgress) {
          quizProgress.visitedIntro = true;
        }
      }
    })

    .when("/question/:index", {
      templateUrl: "question.html",
      resolve: {
        check: function($location, quizProgress, $route) {
          if (
            $route.current.params.index > quizProgress.lastQuestion ||
            !quizProgress.visitedIntro
          ) {
            $location.path("/");
          } else {
            window.onbeforeunload = function() {
              return "You haven't completed the quiz. Are you sure you want to leave this page?";
            };
          }
        }
      }
    })

    .when("/results", {
      templateUrl: "results.html",
      resolve: {
        check: function($location, quizProgress) {
          if (quizProgress.currentQuestion !== quizProgress.lastQuestion) {
            $location.path("/");
          }
        },
        affirm: function(quizProgress) {
          window.onbeforeunload = null;
        }
      }
    })

    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(false);
});

weightedQuizApp.service("quizData", function() {
  this.potentialResults = [
    {
      resultName: "SE",
      resultTitle: "Software Engineering",
      description:
        "Your results indicate Software Engineering will be a good choice! " +
        "You’ll be exposed to the foundations and developing of cool coding, be part of an agile team, working towards evolving the culture of innovation. All of this in the space of 6 rotations!"
    },
    {
      resultName: "DE",
      resultTitle: "Data Engineering",
      description:
        "Your results indicate Data Engineering will be a good choice!. " +
        "In this pillar, as a Data Engineer you’ll develop and deliver creative and innovative data solutions to enable our business to make well informed decisions, all while getting some great exposure to big data platforms and working with a variety of exciting technologies. This pillar consists of 5 rotations."
    },
    {
      resultName: "BA",
      resultTitle: "Business Analyst",
      description:
        "Your results indicate Business Analyst will be a good choice!. " +
        "You’ll have the opportunity to build on your analytical thinking, providing insights and problem solving using analysis tools and software, to potentially become a Product Owner after the 5 rotations throughout the business."
    },
    {
      resultName: "DA",
      resultTitle: "Data Analyst",
      description:
        "Data Anaylst will be a good choice! " +
        "Here you’ll build your knowledge of SQL, get to know our data and use programming languages, such as Python, to develop data storytelling and work on projects that have real business impact. This pillar consists of 5 rotations."
    }
  ];

  this.quizQuestions = [
    {
      question: "Which of the following appeals to you the most?",
      options: [
        {
          name:
            "Working on front-end and back-end user and technical stories for a specific product",
          targets: [
            {
              target: "SE",
              weight: 1
            },
            {
              target: "BE",
              weight: 0
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        },
        {
          name:
            "Working on gathering data from different sources. Extracting, transforming and loading that into a data warehouse",
          targets: [
            {
              target: "DE",
              weight: 1
            },
            {
              target: "DA",
              weight: 0
            },
            {
              target: "BA",
              weight: 0
            },
            {
              target: "SE",
              weight: 0
            }
          ]
        },
        {
          name:
            "Analysing & interpreting the data from the data warehouse & reporting this to senior management by visualising the data",
          targets: [
            {
              target: "DA",
              weight: 1
            },
            {
              target: "BA",
              weight: -1
            },
            {
              target: "SE",
              weight: 0
            },
            {
              target: "DE",
              weight: 0
            }
          ]
        },
        {
          name:
            "Working with different business units to gather business requirements",
          targets: [
            {
              target: "BA",
              weight: 3
            },
            {
              target: "DE",
              weight: -1
            },
            {
              target: "SE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        }
      ]
    },
    {
      question: "Which languages and technologies are you interested in?",
      options: [
        {
          name: "C#, Nodejs or React",
          targets: [
            {
              target: "SE",
              weight: 2
            },
            {
              target: "BA",
              weight: -1
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        },
        {
          name: "Scala, Spark, Python or Sql",
          targets: [
            {
              target: "DE",
              weight: 2
            },
            {
              target: "DA",
              weight: -1
            },
            {
              target: "BE",
              weight: 0
            },
            {
              target: "SE",
              weight: 0
            }
          ]
        },
        {
          name: "SQL, PowerBI, Tableau or Excel",
          targets: [
            {
              target: "DA",
              weight: 2
            },
            {
              target: "DE",
              weight: -1
            },
            {
              target: "SE",
              weight: 0
            },
            {
              target: "BA",
              weight: 0
            }
          ]
        },
        {
          name: "Business process mappings, Business Models or Flow Charts",
          targets: [
            {
              target: "BA",
              weight: 3
            },
            {
              target: "SE",
              weight: -1
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        }
      ]
    },
    {
      question: "Which one do you see youreself doing...",
      options: [
        {
          name: "Building solutions for end users",
          targets: [
            {
              target: "SE",
              weight: 1
            },
            {
              target: "BA",
              weight: -1
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        },
        {
          name: "Capturing & tracking the usage of a given product",
          targets: [
            {
              target: "DE",
              weight: 1
            },
            {
              target: "DA",
              weight: 2
            },
            {
              target: "BA",
              weight: 1
            },
            {
              target: "SE",
              weight: 0
            }
          ]
        },
        {
          name: "Gathering insights on the usage of the product",
          targets: [
            {
              target: "DA",
              weight: 1
            },
            {
              target: "SE",
              weight: -1
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "BA",
              weight: 0
            }
          ]
        },
        {
          name:
            "Facilitating and conducting meetings with different business departments to work on a problem",
          targets: [
            {
              target: "BA",
              weight: 3
            },
            {
              target: "SE",
              weight: -1
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        }
      ]
    },
    {
      question:
        "You are working on the next rewards project for our customers. Would you?",
      options: [
        {
          name:
            "Organise sessions with marketing, finance and tech teams to work on project goals and objectives",
          targets: [
            {
              target: "BA",
              weight: 3
            },
            {
              target: "DE",
              weight: 2
            },
            {
              target: "SE",
              weight: -1
            },
            {
              target: "BA",
              weight: -1
            }
          ]
        },
        {
          name: "Implement the solution",
          targets: [
            {
              target: "SE",
              weight: 1
            },
            {
              target: "DA",
              weight: -2
            },
            {
              target: "SE",
              weight: 1
            },
            {
              target: "BA",
              weight: -1
            }
          ]
        },
        {
          name:
            "Come up with a system which will capture how many users have used this reward",
          targets: [
            {
              target: "DE",
              weight: 1
            },
            {
              target: "BE",
              weight: 0
            },
            {
              target: "SE",
              weight: 0
            },
            {
              target: "DA",
              weight: 0
            }
          ]
        },
        {
          name:
            "Analyse where and when the users use these rewards and develop personas to know about different types of users",
          targets: [
            {
              target: "DA",
              weight: 1
            },
            {
              target: "SE",
              weight: 0
            },
            {
              target: "DE",
              weight: 0
            },
            {
              target: "BA",
              weight: 0
            }
          ]
        }
      ]
    }
  ];
});

weightedQuizApp.service("scoreKeeper", function(quizData) {
  this.calculateScore = function(data) {
    angular.forEach(quizData.potentialResults, function(obj, key) {
      angular.forEach(data.targets, function(subObj, subKey) {
        if (subObj.target === obj.resultName) {
          var ref = quizData.potentialResults[key];

          if (angular.isUndefined(ref.score)) {
            ref.score = subObj.weight;
          } else {
            ref.score = ref.score + subObj.weight;
          }
        }
      });
    });
  };

  this.getResults = function() {
    return quizData.potentialResults.sort(function(obj1, obj2) {
      return obj2.score - obj1.score;
    });
  };
});

weightedQuizApp.directive("progressBar", function(quizProgress) {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      element.css(
        "width",
        (quizProgress.currentQuestion / quizProgress.lastQuestion) * 100 + "%"
      );
    }
  };
});

weightedQuizApp.controller("weightedQuizAppController", function(
  $rootScope,
  $scope,
  $location,
  $timeout,
  $routeParams,
  quizData,
  scoreKeeper,
  quizProgress
) {
  $scope.$location = $location;
  $scope.calculatingScore = false;

  $rootScope.$on("$routeChangeSuccess", function() {
    if (angular.isDefined($routeParams.index)) {
      $scope.inProgress = true;
      quizProgress.currentQuestion = parseInt($routeParams.index);
      $scope.currentQuestion = parseInt($routeParams.index);
    } else {
      $scope.inProgress = false;
    }
  });

  $scope.quizQuestions = quizData.quizQuestions;

  if (angular.isUndefined(quizProgress.lastQuestion)) {
    quizProgress.lastQuestion = $scope.quizQuestions.length;
    $scope.lastQuestion = $scope.quizQuestions.length;
  }

  $scope.nextQuestion = function(data) {
    scoreKeeper.calculateScore(data);

    if (quizProgress.currentQuestion < quizProgress.lastQuestion) {
      $location.path("/question/" + (quizProgress.currentQuestion + 1));
    } else {
      $scope.inProgress = false;
    }
  };

  $scope.calculateScore = function() {
    $scope.calculatingScore = true;
    //$scope.results = 0;
    $scope.results = scoreKeeper.getResults();
    //window.alert(JSON.stringify($scope.results));
    //alert($scope.results);
    $scope.results.limit = 1;

    $timeout(function() {
      $scope.quizComplete = true;
      $scope.calculatingScore = false;
      $location.path("/results");
    }, 1500);
  };

  $scope.startOver = function() {
    $location.path("/");
    quizData.potentialResults = [
      {
        resultName: "SE",
        resultTitle: "Software Engineering",
        description:
          "Your results indicate Software Engineering will be a good choice! " +
          "You’ll be exposed to the foundations and developing of cool coding, be part of an agile team, working towards evolving the culture of innovation. All of this in the space of 6 rotations!"
      },
      {
        resultName: "DE",
        resultTitle: "Data Engineering",
        description:
          "Your results indicate Data Engineering will be a good choice!. " +
          "In this pillar, as a Data Engineer you’ll develop and deliver creative and innovative data solutions to enable our business to make well informed decisions, all while getting some great exposure to big data platforms and working with a variety of exciting technologies. This pillar consists of 5 rotations."
      },
      {
        resultName: "BA",
        resultTitle: "Business Analyst",
        description:
          "Your results indicate Business Analyst will be a good choice!. " +
          "You’ll have the opportunity to build on your analytical thinking, providing insights and problem solving using analysis tools and software, to potentially become a Product Owner after the 5 rotations throughout the business."
      },
      {
        resultName: "DA",
        resultTitle: "Data Analyst",
        description:
          "Data Anaylst will be a good choice! " +
          "Here you’ll build your knowledge of SQL, get to know our data and use programming languages, such as Python, to develop data storytelling and work on projects that have real business impact. This pillar consists of 5 rotations."
      }
    ];
  };
});
