document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
        } else {
            document.getElementById('results').innerHTML = `<p>Nenhum resultado encontrado.</p>`;
        }
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.forEach(entry => {
        const word = entry.word;
        const phonetic = entry.phonetic || 'Não disponível';
        const meanings = entry.meanings.map(meaning => `<li>${meaning.partOfSpeech}: ${meaning.definitions.map(def => def.definition).join(', ')}</li>`).join('');
        
        resultsDiv.innerHTML += `
            <div class="result-item" onclick="viewDetails('${word}')">
                <h3>${word}</h3>
                <p><em>${phonetic}</em></p>
                <ul>${meanings}</ul>
            </div>
        `;
    });
}

function viewDetails(word) {
    window.location.href = `details.html?word=${word}`;
}
