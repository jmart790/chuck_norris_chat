let messageCount = 0
const input = document.querySelector('.userInput')       // saving the class of userInput into a variable named input
const luckyButton = document.querySelector('button')     // saving the button tag to facts    
let textMessage                                          // declaring textMessage
let messages = []                                        // creating an array of message components, which includes the html text                                          
const chatbox = document.getElementById('chatbox')       // saves the html id: chatbox to 'this' instance of a person
console.log(chatbox)

let time = () => {
    let date = new Date
    let hours = date.getHours()                         // gets the hour of day, 24 hour period
    let minutes = date.getMinutes()                     // gets the minute of day
    let ampm = hours >= 12 ? 'pm' : 'am'                // saves pm if hour is at least 12, if not saves am
    hours = hours % 12                                  // saves the hours on a 12 hour period
    hours = hours ? hours : 12                          // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes      // adds 0 to single digit minutes
    let strTime = `${hours}:${minutes} ${ampm}`         // saves the time into a string format
    return strTime
}
// renderMessage creates a message component and adds to an array of messages
renderMessage = (sender, text) => {
    const messageComponent = 
        `<div class="message" id="${messageCount}">\n`+
            `<span class="time">${time()}</span>\n`+
            `<span class="${sender}">${sender}:</span>\n`+
            `<span>${text}</span>\n`+
            `<span class="delete" onclick="deleteMessage(${messageCount})">❌</span>\n`+
        `</div>`
    messages.push(messageComponent)                     // adds this message to the beginning of the array
    messageCount++                                      // increments message count 
    chatbox.innerHTML = messages.join('')               // joins the entire array of messages into the dom
    scrollStatus()                                      // auto scrolls down if needed 
}

// listens to when the user enters a message and renders
input.addEventListener("keypress", enter => {
    textMessage = input.value                           // saves this user text to textMessage
    if (enter.key === 'Enter') {                        // if the key press is "Enter" do the below
        renderMessage('Me', textMessage)                // adds this user text message to the messages array
        event.preventDefault()                          // prevents form from being submitted which clears the screen
        event.currentTarget.value = ""                  // deletes input text from screen on enter
    }
})
// deletes the message by id and updates the messages array
deleteMessage = (messageId) => {
    delete messages[messageId]                          // removes the message
    chatbox.innerHTML = messages.join('')               // updates the dom
    return messages
}
// retrieves chuck norris joke upon clicking lonely
luckyButton.addEventListener("click", () => {
    fetch('http://api.icndb.com/jokes/random')                  // calls api by url
        .then(response => response.json())                      // then grabs the json object from the response
        .then(data => renderMessage('Fact', data.value.joke))   // then grabs the joke from within the object   
})
// scrollStatus auto scrolls down while the message box equals the chat size
let scrollStatus = () => {
    shouldScroll = chatbox.scrollTop + chatbox.clientHeight === chatbox.scrollHeight  
    if (!shouldScroll) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
}
