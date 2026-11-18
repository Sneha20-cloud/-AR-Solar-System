
/* ==========================================
   AR SOLAR SYSTEM EXPLORER 3D
   Main JavaScript File
========================================== */


/* 1. PLANET INFORMATION DATABASE */

const planets = {

    Sun: {
        description:
            "The Sun is the star at the centre of our Solar System. It provides light and heat to all planets.",

        diameter: "1,392,700 km",
        distance: "Centre of Solar System",
        period: "Approximately 25–35 days rotation",
        fact: "The Sun contains most of the Solar System's mass."
    },

    Mercury: {
        description:
            "Mercury is the smallest planet and the closest planet to the Sun.",

        diameter: "4,879 km",
        distance: "57.9 million km",
        period: "88 Earth days",
        fact: "Mercury has extreme temperature variations."
    },

    Venus: {
        description:
            "Venus is the second planet from the Sun. It has a very hot atmosphere.",

        diameter: "12,104 km",
        distance: "108.2 million km",
        period: "225 Earth days",
        fact: "Venus is the hottest planet in our Solar System."
    },

    Earth: {
        description:
            "Earth is our home planet. It has liquid water and supports life.",

        diameter: "12,742 km",
        distance: "149.6 million km",
        period: "365.25 days",
        fact: "Earth is the only planet currently known to support life."
    },

    Mars: {
        description:
            "Mars is known as the Red Planet because of its reddish appearance.",

        diameter: "6,779 km",
        distance: "227.9 million km",
        period: "687 Earth days",
        fact: "Mars has the largest volcano in the Solar System."
    },

    Jupiter: {
        description:
            "Jupiter is the largest planet in our Solar System. It is a gas giant.",

        diameter: "139,820 km",
        distance: "778.6 million km",
        period: "About 11.86 Earth years",
        fact: "Jupiter has a famous storm called the Great Red Spot."
    },

    Saturn: {
        description:
            "Saturn is a gas giant famous for its spectacular ring system.",

        diameter: "116,460 km",
        distance: "1.43 billion km",
        period: "About 29.45 Earth years",
        fact: "Saturn's rings are made mainly of ice and rocky particles."
    },

    Uranus: {
        description:
            "Uranus is an ice giant that rotates on its side.",

        diameter: "50,724 km",
        distance: "2.87 billion km",
        period: "About 84 Earth years",
        fact: "Uranus has an extreme axial tilt."
    },

    Neptune: {
        description:
            "Neptune is the farthest recognized planet from the Sun.",

        diameter: "49,244 km",
        distance: "4.50 billion km",
        period: "About 165 Earth years",
        fact: "Neptune has extremely strong winds."
    }

};


/* 2. DISPLAY PLANET INFORMATION */

function showPlanet(name) {

    const data = planets[name];

    if (!data) return;

    document.getElementById("planetName").innerText =
        "🌍 " + name;

    document.getElementById("planetDescription").innerText =
        data.description;

    document.getElementById("planetFacts").innerHTML = `
        <hr>
        <b>Diameter:</b> ${data.diameter}<br>
        <b>Distance from Sun:</b> ${data.distance}<br>
        <b>Orbital period:</b> ${data.period}<br>
        <b>Interesting fact:</b> ${data.fact}
    `;

    // Highlight selected planet

    const names = [
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        "uranus",
        "neptune"
    ];

    names.forEach(function(id) {

        const planet = document.getElementById(id);

        if (planet) {
            planet.object3D.scale.set(1, 1, 1);
        }

    });

    if (name !== "Sun") {

        const selected = document.getElementById(
            name.toLowerCase()
        );

        if (selected) {
            selected.object3D.scale.set(1.5, 1.5, 1.5);
        }

    }

}


/* 3. ZOOM CONTROLS */

let zoomLevel = 1;

function updateZoom() {

    const system = document.getElementById("solarSystem");

    if (system) {
        system.object3D.scale.setScalar(zoomLevel);
    }

}

function zoomIn() {

    zoomLevel = Math.min(zoomLevel + 0.1, 1.8);

    updateZoom();

}

function zoomOut() {

    zoomLevel = Math.max(zoomLevel - 0.1, 0.7);

    updateZoom();

}


/* 4. PLANET ORBIT ANIMATION */

const orbitSpeeds = {

    mercuryOrbit: 0.9,
    venusOrbit: 0.7,
    earthOrbit: 0.55,
    marsOrbit: 0.45,
    jupiterOrbit: 0.3,
    saturnOrbit: 0.24,
    uranusOrbit: 0.18,
    neptuneOrbit: 0.14

};

let animationPaused = false;

let previousTime = 0;

function animatePlanets(currentTime) {

    if (!previousTime) {
        previousTime = currentTime;
    }

    const delta = Math.min(
        (currentTime - previousTime) / 1000,
        0.05
    );

    previousTime = currentTime;

    if (!animationPaused) {

        Object.keys(orbitSpeeds).forEach(function(id) {

            const orbit = document.getElementById(id);

            if (orbit && orbit.object3D) {

                orbit.object3D.rotation.z +=
                    orbitSpeeds[id] * delta;

            }

        });

    }

    requestAnimationFrame(animatePlanets);

}

requestAnimationFrame(animatePlanets);


/* 5. PAUSE AND RESUME */

function toggleAnimation() {

    animationPaused = !animationPaused;

    const button = document.getElementById("pauseButton");

    if (animationPaused) {

        button.innerText = "▶ Resume";

    } else {

        button.innerText = "⏸ Pause";

    }

}


/* 6. RESET SOLAR SYSTEM */

function resetSystem() {

    zoomLevel = 1;

    updateZoom();

    animationPaused = false;

    document.getElementById("pauseButton").innerText =
        "⏸ Pause";

    Object.keys(orbitSpeeds).forEach(function(id) {

        const orbit = document.getElementById(id);

        if (orbit) {
            orbit.object3D.rotation.set(0, 0, 0);
        }

    });

    showPlanet("Sun");

}


/* 7. QUIZ QUESTIONS */

const quizQuestions = [

    {
        question: "Which is the largest planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter"
    },

    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Mercury", "Neptune"],
        answer: "Mars"
    },

    {
        question: "Which planet has beautiful rings?",
        options: ["Earth", "Saturn", "Mars", "Mercury"],
        answer: "Saturn"
    },

    {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Venus", "Mercury", "Jupiter"],
        answer: "Mercury"
    },

    {
        question: "Which planet is our home?",
        options: ["Earth", "Mars", "Uranus", "Saturn"],
        answer: "Earth"
    }

];

let currentQuestion = 0;

let quizScore = 0;

let answered = false;


/* 8. START QUIZ */

function openQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    answered = false;

    document.getElementById("quizOverlay").style.display =
        "flex";

    document.getElementById("quizResult").innerHTML = "";

    document.getElementById("closeQuizButton").style.display =
        "none";

    displayQuestion();

}


/* 9. DISPLAY QUESTION */

function displayQuestion() {

    const q = quizQuestions[currentQuestion];

    answered = false;

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) + " of 5";

    document.getElementById("questionText").innerText =
        q.question;

    document.getElementById("quizFeedback").innerText = "";

    document.getElementById("nextButton").style.display =
        "none";

    document.getElementById("answerOptions").innerHTML = "";

    q.options.forEach(function(option) {

        const button = document.createElement("button");

        button.innerText = option;

        button.onclick = function() {

            checkAnswer(option, button);

        };

        document.getElementById("answerOptions")
            .appendChild(button);

    });

}


/* 10. CHECK ANSWER */

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const correctAnswer =
        quizQuestions[currentQuestion].answer;

    const buttons = document.querySelectorAll(
        "#answerOptions button"
    );

    buttons.forEach(function(button) {

        button.disabled = true;

        if (button.innerText === correctAnswer) {
            button.classList.add("selected");
        }

    });

    if (selected === correctAnswer) {

        quizScore++;

        document.getElementById("quizFeedback").innerText =
            "Correct answer! Well done!";

        document.getElementById("quizFeedback").style.color =
            "#4DE0A0";

    } else {

        document.getElementById("quizFeedback").innerText =
            "Incorrect. Correct answer: " + correctAnswer;

        document.getElementById("quizFeedback").style.color =
            "#FF8A8A";

    }

    document.getElementById("nextButton").style.display =
        "inline-block";

    if (currentQuestion === quizQuestions.length - 1) {

        document.getElementById("nextButton").innerText =
            "View Scorecard";

    }

}


/* 11. NEXT QUESTION AND SCORECARD */

function nextQuestion() {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        displayQuestion();

    } else {

        showScorecard();

    }

}


/* 12. DISPLAY FINAL SCORE */

function showScorecard() {

    document.getElementById("questionNumber").innerText =
        "QUIZ COMPLETED";

    document.getElementById("questionText").innerText =
        "Your Solar System Quiz Results";

    document.getElementById("answerOptions").innerHTML = "";

    document.getElementById("quizFeedback").innerText = "";

    document.getElementById("nextButton").style.display =
        "none";

    let message = "";

    if (quizScore === 5) {

        message = "Excellent! Perfect score!";

    } else if (quizScore >= 3) {

        message = "Great work! Keep exploring!";

    } else {

        message = "Good attempt! Keep learning!";

    }

    document.getElementById("quizResult").innerHTML = `
        <hr>
        🏆 YOUR SCORECARD<br><br>
        Correct Answers: ${quizScore} / 5<br>
        Percentage: ${quizScore * 20}%<br><br>
        ${message}
    `;

    document.getElementById("closeQuizButton").style.display =
        "inline-block";

}


/* 13. CLOSE QUIZ */

function closeQuiz() {

    document.getElementById("quizOverlay").style.display =
        "none";

}


/* 14. IMAGE TARGET DETECTION */

const target = document.getElementById("arTarget");

target.addEventListener("targetFound", function() {

    document.getElementById("status").innerText =
        "🟢 Solar System Detected! Explore the planets.";

});

target.addEventListener("targetLost", function() {

    document.getElementById("status").innerText =
        "📷 Marker lost. Scan your image again.";

});


/* 15. INITIAL INFORMATION */

showPlanet("Sun");

console.log("AR Solar System Explorer loaded successfully!");


