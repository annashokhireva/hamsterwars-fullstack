export const newGame = async (winner, loser) => {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'contestants': [
               { 'contestant1': winner.id },
               { 'contestant2': loser.id }
            ],
            'winnerId': winner.id
        })
    }

    try{
        const response = await fetch('/api/matches', requestOptions);
        const data = await response.json();
        console.log('match', data);
        return data;
    
    } catch (e) {

        console.log('Upload failed, ', e);
        return null;

    }
}
