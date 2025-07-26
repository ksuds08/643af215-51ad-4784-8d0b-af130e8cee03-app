document.getElementById('resume-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const jobTitle = document.getElementById('job-title').value;
    const industry = document.getElementById('industry').value;

    try {
        const response = await fetch('/functions/api/handler.ts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobTitle, industry })
        });

        const data = await response.json();

        const suggestionsContainer = document.getElementById('suggestions');
        const suggestionList = document.getElementById('suggestion-list');
        suggestionList.innerHTML = '';

        data.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionList.appendChild(li);
        });

        suggestionsContainer.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching template suggestions:', error);
    }
});