
// Information about all planets

const planets = {

    Sun: "The Sun is the star at the centre of our Solar System. It provides light and heat.",

    Mercury: "Mercury is the closest planet to the Sun. It is the smallest planet.",

    Venus: "Venus is the second planet from the Sun. It has a very hot atmosphere.",

    Earth: "Earth is our home planet. It has liquid water and supports life.",

    Mars: "Mars is known as the Red Planet because of its reddish appearance.",

    Jupiter: "Jupiter is the largest planet in our Solar System.",

    Saturn: "Saturn is famous for its beautiful rings.",

    Uranus: "Uranus is an ice giant that rotates on its side.",

    Neptune: "Neptune is the farthest planet from the Sun."
};


// Display selected planet information

function showPlanet(name) {

    const information = document.getElementById("information");

    information.innerHTML = `
        <h2>${name}</h2>
        <p>${planets[name]}</p>
    `;

}


// Reset planet information and animation

function resetSystem() {

    const information = document.getElementById("information");

    information.innerHTML = `
        <h2>Welcome Explorer!</h2>
        <p>Scan the marker and select a planet to learn about it.</p>
    `;

    const orbitIds = [
        "mercuryOrbit",
        "venusOrbit",
        "earthOrbit",
        "marsOrbit",
        "jupiterOrbit",
        "saturnOrbit",
        "uranusOrbit",
        "neptuneOrbit"
    ];

    orbitIds.forEach(function(id) {

        const orbit = document.getElementById(id);

        if (orbit) {
            orbit.setAttribute("rotation", "0 0 0");
        }

    });

}


// Update status when image is detected

document.addEventListener("DOMContentLoaded", function() {

    const target = document.querySelector(
        '[mindar-image-target="targetIndex: 0"]'
    );

    target.addEventListener("targetFound", function() {

        document.getElementById("status").innerText =
            "Solar System detected! Explore the planets.";

    });

    target.addEventListener("targetLost", function() {

        document.getElementById("status").innerText =
            "Image lost. Scan the Solar System image again.";

    });

});
