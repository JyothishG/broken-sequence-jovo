var stringSimilarity = require('string-similarity')
var questionData = require('./question_data/data.json')
var services = require('./services/createData.js')

var questionPrompts = [
  'What will come next?',
  'What will be the next in the sequence?',
  'What will come next in the list?',
  'What would be the next item?'
]

const speechConsCorrect = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 
        'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 
        'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew','Righto', 
        'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa']

const speechConsWrong = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 
        'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 
        'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes']

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getSpeechCon (type) {
  if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length - 1)] + "! </say-as><break strength='strong'/>"
  else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length - 1)] + " </say-as><break strength='strong'/>"
}

module.exports = {

  LAUNCH() {
    if (this.$user.$data.newUser === undefined) {
      this.$user.$data.newUser = true
      this.$user.$data.counter = 1
      this.$user.$data.coins = 0
      this.$user.$data.consecutiveCorrect = 0
      var text1 = 'Welcome to Broken Sequence. The game is to find the 4th item in a sequence. '
      var text2 = 'Try to find out the hidden pattern or relation in the sequence of words and yell out the next word to earn your coins. '
      var speechText = text1 + text2
      var prompt = 'Are you ready to take your first sequence?'
      let template = this.$inputs.template
      
      this.$alexaSkill.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require(`./apl/welcome.json`),
        datasources: require(`./apl/welcome_data.json`)
      })
      this.ask(speechText + prompt, prompt)
    }
    else {
      var speechText = 'Hello there, welcome back to Broken Sequence. '
      var prompt = 'Are you ready to continue the game?'
      this.$alexaSkill.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require(`./apl/welcome.json`),
        datasources: require(`./apl/welcome_data.json`)
      })
      this.ask(speechText + prompt, prompt)
    }
  },

	AskIntent () {
		var questionIndex = this.$user.$data.counter - 1
		if (questionIndex < questionData.length) {

      var questionItem = questionData[questionIndex];
      var title = 'QUESTION ' + this.$user.$data.counter
      var questionPrompt = questionPrompts.sort(function () { return 0.5 - Math.random() })

      if (questionIndex === 0) {
        var optionPrompt = 'Great! Here is your first one... '
      }
      else {
        var optionPrompt = 'Here is the ' + this.$user.$data.counter + 'th one... '
      }
      var questionAplData = services.createQuestionApl(title, questionPrompt[0], questionItem.options)

      this.$user.$data.questionItem = questionItem
      this.$user.$data.questionMode = true
      var options = questionItem.options
      
      this.$alexaSkill.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require(`./apl/question.json`),
        datasources: questionAplData
      })
      var response = '<speak>' + optionPrompt + options[0] + '<break time="0.50s"/>' + ' : ' + options[1] + ' :: ' + '<break time="0.50s"/>' + options[2] + "<break time='1s'/>" + ' : *** ' + questionPrompt[0] + '</speak>'
      this.ask(response, response)
		}
    else {
      var replyMessage = 'You have completed the level 1. We will let you know when we add more levels. Please stay tuned.'
      this.ask(replyMessage, replyMessage)
    }
	},
  ON_ELEMENT_SELECTED() {
    return this.toIntent('AskPattern')
	},

  AnswerIntent() {
    var answer = this.$inputs.Answer.value
    var userAnswer = answer.toString().toLowerCase()

    if (this.$user.$data.questionMode) {
      var questionItem = this.$user.$data.questionItem
      var correctAnswer = questionItem.answer.toString().toLowerCase();
      var similarity = stringSimilarity.compareTwoStrings(correctAnswer, userAnswer)

      if (similarity >= 0.6) {
        this.$user.$data.consecutiveCorrect = this.$user.$data.consecutiveCorrect + 1
        // check if it is 5 consecutive correct case
        if (this.$user.$data.consecutiveCorrect === 5) {
          var totalCoins = this.$user.$data.coins + 6
          this.$user.$data.coins = this.$user.$data.coins + 6
          this.$user.$data.consecutiveCorrect = 0
          this.$user.$data.counter = this.$user.$data.counter + 1;
          this.$user.$data.questionMode = false

          var replyPrefix = getSpeechCon(true)
          var replyMessage = ' That was awesome. 5 right answers in a row. You have earned 5 coins. '
          var aplData = services.bonusApl(totalCoins)
          var reprompt = 'Shall we go to the next one?'

          this.$alexaSkill.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: require(`./apl/bonus.json`),
            datasources: aplData
          })
          var response = replyPrefix + replyMessage + reprompt
          this.ask(response, response)
        }
        else {
          var totalCoins = this.$user.$data.coins + 1
          this.$user.$data.coins = this.$user.$data.coins + 1
          this.$user.$data.counter = this.$user.$data.counter + 1;
          this.$user.$data.questionMode = false

          var replyPrefix = getSpeechCon(true)
          var replyMessage = ' You have earned a coin. '
          var aplData = services.rightAnswerApl(totalCoins)
          var reprompt = 'Shall we go to the next one?'

          this.$alexaSkill.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: require(`./apl/answer_right.json`),
            datasources: aplData
          })
          var response = replyPrefix + replyMessage + reprompt
          this.ask(response, response)
        }
      }
      else {
        var totalCoins = this.$user.$data.coins
        this.$user.$data.consecutiveCorrect = 0
        this.$user.$data.counter = this.$user.$data.counter + 1;
        this.$user.$data.questionMode = false

        var replyPrefix = getSpeechCon(false)
        var replyMessage = ' You missed that coin. The answer was ' + questionItem.answer + '. '
        var aplData = services.wrongAnswerApl(questionItem.answer, totalCoins)
        var reprompt = 'Shall we go to the next one?'

        this.$alexaSkill.addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: require(`./apl/answer_wrong.json`),
          datasources: aplData
        })
        var response = replyPrefix + replyMessage + reprompt
        this.ask(response, response)
      }
    }
    else {
      var replyMessage = 'Sorry, I don\'t get it. Do you want to continue with the game?'
      this.ask(replyMessage, replyMessage)
    }
  },

  UserScore() {
    var totalCoins = this.$user.$data.coins
    var aplData = services.showScore(totalCoins)
    var replyMessage = 'Total you have earned ' + totalCoins + ' coins. '
    var reprompt = 'Would you like to play more?'

    this.$alexaSkill.addDirective({
      type: 'Alexa.Presentation.APL.RenderDocument',
      version: '1.0',
      document: require(`./apl/user_score.json`),
      datasources: aplData
    })
    var response = replyMessage + reprompt
    this.ask(response, response)
  }
}
