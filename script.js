// Asynchronous function to fetch data from the API
async function fetchData() {
    try {
        // Fetch data from the Quiz API with a limit of 1 question
        const response = await fetch('https://quizapi.io/api/v1/questions?apiKey=W5KmQE4tGNZnBiXPoyWMsg0e0nLkt265vjH7ISed&limit=1')
        //token:W5KmQE4tGNZnBiXPoyWMsg0e0nLkt265vjH7ISed

        // Parse the JSON response
        const data = await response.json()
        
        // Log the data to the console
        console.log(data)
        
        // Display the first question from the fetched data
        displayQuestion(data[0])
    } catch (error) {
        // Handle any errors that occur
        console.error('An unexpected error occurred:', error)
    }
}

// Function to display the question and its answers
function displayQuestion(data) {
    // Set the question text
    document.getElementById('quiz').textContent = data.question;
    
    // Get the answers from the data
    const answers = data.answers;

    // Get the container for the options
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear any existing options

    // Iterate over the answers and create dynamic options
    Object.keys(answers).forEach((key) => {
        if (answers[key]) { // Only include non-null answers
            const option = document.createElement('div');
            option.classList.add('option');

            // Create checkbox button
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'answer';
            checkbox.value = key; // Use the key as the value 
            checkbox.id = key;

            // Create a label for the checkbox button
            const label = document.createElement('label');
            label.htmlFor = key;
            label.textContent = answers[key]; // Use the answer text

            // Append the checkbox button and label to the options div
            option.appendChild(checkbox);
            option.appendChild(label);

            // Append the option to the container
            optionsContainer.appendChild(option);
        }
    });
}

document.getElementById('submit').addEventListener('click', () => {
    const selectedAnswers = document.querySelectorAll('input[name="answer"]:checked');
    const userAnswers = Array.from(selectedAnswers).map(input => input.value);

    // For now, log the selected answers
    console.log('Selected answers:', userAnswers);
});


// Call the fetchData function s
fetchData()
