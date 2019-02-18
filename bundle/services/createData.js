module.exports = {

	createQuestionApl: function (title, question, options) {
		
		var json = {
      "bodyTemplate1Data": {
          "type": "object",
          "backgroundImage": {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
                      "size": "small",
                      "widthPixels": 0,
                      "heightPixels": 0
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
                      "size": "large",
                      "widthPixels": 0,
                      "heightPixels": 0
                  }
              ]
          },
          "question": {
              "title": title,
              "text" : question,
              "options": [
                  {
                      "title" : options[0]
                  },
                  {
                      "title" : options[1]
                  },
                  {
                      "title" : options[2]
                  }
              ]
          }
      }
    }
		return json
	},

  rightAnswerApl: function (coins) {
    var json = {
      "bodyTemplate1Data": {
          "type": "object",
          "backgroundImage": {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/539e2b40.png",
                      "size": "small",
                      "widthPixels": 0,
                      "heightPixels": 0
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
                      "size": "large",
                      "widthPixels": 0,
                      "heightPixels": 0
                  }
              ]
          },
          "textContent": {
              "primaryText": {
                  "type": "PlainText",
                  "text": "YOU GOT IT!"
              },
              "secondaryText": {
                  "type": "PlainText",
                  "text": "Try next question.</b>"
              }
          },
          "coinImageUrl" : {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
                      "size": "small"
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
                      "size": "large"
                  }
              ]
          },
          "score": coins
      }
    }
    return json
  },

  wrongAnswerApl: function (answer, coins) {
    var answerResponse = "The answer was " + answer + ". "
    var json = {
      "bodyTemplate1Data": {
          "type": "object",
          "backgroundImage": {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/79d84399.png",
                      "size": "small",
                      "widthPixels": 0,
                      "heightPixels": 0
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
                      "size": "large",
                      "widthPixels": 0,
                      "heightPixels": 0
                  }
              ]
          },
          "textContent": {
              "primaryText": {
                  "type": "PlainText",
                  "text": "YOU MISSED IT!"
              },
              "secondaryText": {
                  "type": "PlainText",
                  "text": answerResponse
              }
          },
          "coinImageUrl" : {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
                      "size": "small"
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
                      "size": "large"
                  }
              ]
          },
          "score": coins
      }
    }
    return json
  },

  bonusApl: function (coins) {
    var json = {
      "bodyTemplate1Data": {
          "type": "object",
          "backgroundImage": {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/539e2b40.png",
                      "size": "small",
                      "widthPixels": 0,
                      "heightPixels": 0
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
                      "size": "large",
                      "widthPixels": 0,
                      "heightPixels": 0
                  }
              ]
          },
          "textContent": {
              "primaryText": {
                  "type": "PlainText",
                  "text": "Congratulations!"
              },
              "secondaryText": {
                  "type": "PlainText",
                  "text": "You have earned <b>5 extra coins</b>"
              },
              "helpTextLarge": {
                  "type": "PlainText",
                  "text": "You have got 5 right answers in a row."
              },
              "helpTextSmall": {
                  "type": "PlainText",
                  "text": "5 right answers in a row."
              }
          },
          "coinImageUrl" : {
              "sources": [
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
                      "size": "small"
                  },
                  {
                      "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
                      "size": "large"
                  }
              ]
          },
          "score": coins
      }
    }
    return json
  },

  showScore: function (coins) {
    var json = {
      "bodyTemplate1Data": {
        "type": "object",
        "backgroundImage": {
          "sources": [
            {
              "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
              "size": "small",
              "widthPixels": 0,
              "heightPixels": 0
            },
            {
              "url": "https://s3.amazonaws.com/broken-sequence-skill/276773-P5-OK1-X-262-min.jpg",
              "size": "large",
              "widthPixels": 0,
              "heightPixels": 0
            }
          ]
        },
        "textContent": {
          "primaryText": {
            "type": "PlainText",
            "text": "TOTAL COINS"
          },
          "secondaryText": {
            "type": "PlainText",
            "text": "Try next question</b>"
          }
        },
        "coinImageUrl" : {
          "sources": [
            {
              "url": "https://s3.amazonaws.com/broken-sequence-skill/dollar-1.png",
              "size": "small"
            },
            {
              "url": "https://s3.amazonaws.com/broken-sequence-skill/score-coins.png",
              "size": "large"
            }
          ]
        },
        "score": coins
      }
    }
    return json
  }
}
