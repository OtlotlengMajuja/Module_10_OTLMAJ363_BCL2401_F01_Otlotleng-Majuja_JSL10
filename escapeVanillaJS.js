document.addEventListener("DOMContentLoaded", () => {
    // Corrected the ID used in the event listener for room 1
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json')
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // Corrected the element ID when displaying results for room 1
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        // Added the missing 'async' keyword to the 'jsConcepts' set
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // Corrected the function call for room 2
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // Inserted asynchronous operations 'async/await' and 'try/catch' blocks
    document.getElementById("solveRoom3").addEventListener("click", async () => {
        try {
            const response = await fetch('directions.json');
            if (!response.ok) {
                throw new Error('Unable to fetch data');
            }
            const directions = await response.json();
            const message = await navigateLabyrinth(directions);
            document.getElementById("room3Result").textContent = message;
        } catch (err) {
            console.error('Unable to fetch or process data:', err) // Displays a message to the user or takes appropriate action
        };

    });
});

function findMostRecentBook(books) {
    // Compare the dates and return the most recently published book
    return books.reduce((mostRecent, book) => {
        const mostRecentDate = new Date(mostRecent.published);
        const bookDate = new Date(book.published);
        return mostRecentDate < bookDate ? book : mostRecent;
    });
};



function findIntersection(setA, setB) {
    // Create a new set containing only the elements that are common both to 'setA' and 'setB'
    const intersection = new Set([...setA].filter(item => setB.has(item)));
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // Added the 'await' keyword to ensure the simulation of asynchronous operations works as intended
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

