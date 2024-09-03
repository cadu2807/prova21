window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const word = urlParams.get('word');
    
    if (word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (response.ok) {
            displayDetails(data);
        } else {
            document.getElementById('details').innerHTML = `<p>Nenhum detalhe encontrado.</p>`;
        }
    }
};

function displayDetails(data) {
    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = '';

    data.forEach(entry => {
        const word = entry.word;
        const phonetic = entry.phonetic || 'Não disponível';
        const meanings = entry.meanings.map(meaning => `<li>${meaning.partOfSpeech}: ${meaning.definitions.map(def => def.definition).join(', ')}</li>`).join('');
        
        detailsDiv.innerHTML = `
            <h1>${word}</h1>
            <p><em>${phonetic}</em></p>
            <ul>${meanings}</ul>
        `;
    });
}

function goBack() {
    window.history.back();
}
