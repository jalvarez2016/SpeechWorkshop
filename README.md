# Speech Recognition and Speech Synthesis Workshop

Welcome to the speech recognition and speach synthesis workshop!

Today We''ll be learning how to make a website that'll be able to understand what we're saying and program responses based on what it hears.

Google Chrome, Edge and Safari have a too built into them taht allows for websites to recognize our voices and parse it out into words. They also 
have the capacity to create a voice that speaks whatever you tell it to. We'll be combining these two tools to make our website today.

Also if you get stuck at any point, the end result of the app.js file can be found in final.js.

## First things first, setup
1. open up you app.js file
2. You'll notice that there are already some lines of code in that file. Lines 2 and 5 are references to our button and a currently empty block in our html file. If you look at the index.html file you will notice that on lines 12 and 13 are two elements with classes (one for each line). The class names (found in the quotation marks) match those in our app.js file and thats how our code knows what to grab. So the element with a class of talk is stored in our btn variable and can be manipulated here on through that variable. The same goes with our conent variable on line 5. The rest of the content in the index.html file is mostly just defualt stuff we can ignore (there are also links to our other files in there).
3. The rest of the content in your app.js file is just stuff we will get to later on. Though there is a function in there prewritten out that already does what is intended since it's a bit more complicated but I'll try to explain it after we've gotten the base implementation down and we can try to incorporate it afterwards.

## We'll start with Speech recognition

Speech recognition first needs to be set up with 

```javascript

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

```

though you'll notice that's already part of the file so you don't need to add anything just yet.

Next let me explain the following lines 11-17. Those hold the onresult of the recognition variable. It's basically what will happen when the computer is done converting what you said into text. The computer will also capture alot of other information so we need to fish out the text from a bunch of other data we don't really need. Lines 12-13 do that for us, but if you want to see what the whole event captured looks like you can add the line 

```javascript
console.log(event);
```

after line 11 but before 17 and check your console to see the whole event.

Next we probably want to see the text display on the computer to see how the computer interpreted our voices. We also want th computer to respond so we should also include a call to another function to handle that seperately.

We also have to tell the computer to do all that on the button click so if you look at the bottom of you app.js file you'll see we add an event listener of event click that starts the recognition process.

With that it should run our code but not do much since we haven't yet told it to respond or add what we've said to the webpage.

## Adding our dialog to the page

We currently tell the computer to run our addDialogToPage function on line 15, after it's interpeted our voice. From there it'll jump to our definition of that function which is on line 20. We want to add as follows

```javascript
    function addDialogToPage(message) {
        content.innerHTML += `
            <p>
            ${message}
            </p>
        `;
    }
```

This will all a new element of p for every new message. The reason we wrap it in a p tag (that's what we call html elements -> tags) is because it'll give us some extra spacing. 

## Computer Speaking

You'll notice that we have some code in our readOutLoud function (lines 33-40). What it is doing is setting up the computer's default settings for speech, ie. volume=1, rate=1. The limits to those numbers can be found in the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance). As it stands, the computer will not speak. This is because speech.text on line 35 is an empty string. Strings are how computers know text is text and not some sort of command. It's most common use is the text we see on websites. Anyway, the computer will speak whatever we place in the quotation marks. We can check for certain words in a users voice by looking through message on line 33.

We can do that by changing up some of these lines to the following
```javascript
    function readOutLoud(message) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = '';
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        if(message.includes('hi')) {
            const randomGreeting = computerResponses.greetings[Math.floor(Math.random() * computerResponses.greetings.length)];
            speech.text = randomGreeting;

            addDialogToPage(`Computer: ${speech.text}`);
            window.speechSynthesis.speak(speech);
        }
    }
```
what we've done is check if the message the user said includes the letters h and i in that order. If it does, the speech will change to a random message stored in a variable I've provided storing some greetings. That does it for the main implementation, congrats!

## Extra steps

The getWeather function in your file gets you the weather for today so with that we can get the computer to tell us what the weather is when prompted.

To do that, we can add an else if in our readOutLoud function

```javascript
function readOutLoud(message) {
    console.log(message);
    const speech = new SpeechSynthesisUtterance();
    speech.text = '';
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;


    if(message.includes('hi')) {
        const randomGreeting = computerResponses.greetings[Math.floor(Math.random() * computerResponses.greetings.length)];
        speech.text = randomGreeting;

        addDialogToPage(`Computer: ${speech.text}`);
        window.speechSynthesis.speak(speech);
    }
    else if(message.includes('weather')) {
        getWeather().then((weatherInfo) => {
            speech.text = weatherInfo;
            addDialogToPage(`Computer: ${speech.text}`);
            window.speechSynthesis.speak(speech);
        });
    } else {
        speech.text = 'I do not have anything to say to that'
        addDialogToPage(`Computer: ${speech.text}`);
        window.speechSynthesis.speak(speech);
    }
}
```

With that I've also added an else so that our computer doesn't stay strangley quiet. If you want to add some more commands, you can add more else if statements to checkif our message includes certain keywords and change speech text accordingly.

Weather API
https://www.weatherapi.com/api-explorer.aspx

MDN Documentation for Web Speech API
https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

MDN Documentation for SpeechRecognition
https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

MDN Documentation for Speech Utterance
https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
