//string must match the class on the button in index.html
const btn = document.querySelector('.talk');

// string must match the class on the div in html
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// onresult runs when the computer is done processing the users voice 
recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    addDialogToPage(`User: ${transcript}`);
    readOutLoud(transcript);
};

//   Add dialog to page
function addDialogToPage(message) {
}

//   Computer responses
const computerResponses = {
    greetings: [
        'Hello world',
        'Hi',
        'Thank you for letting me use your microphone'
    ]
}

// Computer reads out words
function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = '';
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Computer gets todays weather
async function getWeather(){
    let data = await fetch('http://api.weatherapi.com/v1/current.json?key=41a0005e88c8423dbe5221451220705&q=NYC&aqi=no');
    let json = await data.json();
    console.log(json);
    return json.current.condition.text;
}

btn.addEventListener('click', () => {
    recognition.start();
});