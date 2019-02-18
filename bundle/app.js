'use strict'

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework')
const { Alexa } = require('jovo-platform-alexa')
const { GoogleAssistant, BasicCard } = require('jovo-platform-googleassistant')
const { JovoDebugger } = require('jovo-plugin-debugger')
const { MongoDb } = require('jovo-db-mongodb')

const app = new App()

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new MongoDb()
)

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

const handlers = {
  StopIntent () {
    this.tell('Ok, see you later.')
  },
  HelpIntent() {
    const helpText = 'Here is how it works: I will tell you an incomplete sequence with 3 words. You have to tell me the 4th one. ';
    const speechText = 'Sure. ' + helpText + '. '
    const prompt = 'So, are you ready?'
    this.ask(speechText + prompt, speechText + prompt)
  }
}

const alexaHandlers = require('./alexa_handlers.js')
const googleAssistantHandlers = require('./google_handlers.js')

app.setHandler(
  handlers
)
app.setAlexaHandler(alexaHandlers)
app.setGoogleAssistantHandler(googleAssistantHandlers)

module.exports.app = app
