// Set event date (YYYY, MM-1, DD, HH, MM, SS)
let eventDate = new Date(2026, 3, 10, 23, 59, 59).getTime();

let countdownElement = document.getElementById("countdown");

let timer = setInterval(function () {

    let now = new Date().getTime();
    let timeLeft = eventDate - now;

    if (timeLeft <= 0) {
        clearInterval(timer);
        countdownElement.innerHTML = "Registration Closed";
        return;
    }

    // Time calculations
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display
    countdownElement.innerHTML =
        days + "d " +
        hours + "h " +
        minutes + "m " +
        seconds + "s ";

}, 1000);
