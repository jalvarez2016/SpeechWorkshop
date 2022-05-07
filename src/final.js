//string must match the class on the button in index.html
const btn = document.querySelector('.talk');

// string must match the class on the div in html
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// onresult can be changed with result
recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    // console.log(event);

    addDialogToPage(`User: ${transcript}`);
    readOutLoud(transcript);
};

//   Add dialog to page
function addDialogToPage(message) {
    content.innerHTML += `
        <p>
        ${message}
        </p>
    `;
}

//   Computer responses
const computerResponses = {
    greetings: [
        'Hello world',
        'Hi',
        'Thank you for letting me use your microphone'
    ]
}

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

async function getWeather(){
    let data = await fetch('http://api.weatherapi.com/v1/current.json?key=41a0005e88c8423dbe5221451220705&q=NYC&aqi=no');
    let json = await data.json();
    console.log(json);
    return json.current.condition.text;
}

btn.addEventListener('click', () => {
    recognition.start();
});