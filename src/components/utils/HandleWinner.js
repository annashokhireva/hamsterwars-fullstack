import { updateWinsDefeats } from './UpdateWinsDefeats';
import { newGame } from './NewGame';

export const handleWinner = async (winner, loser) => {
	console.log('winner: ' + winner.name, 'loser: ' + loser.name);

	updateWinsDefeats(winner, loser);
    newGame(winner, loser);
}