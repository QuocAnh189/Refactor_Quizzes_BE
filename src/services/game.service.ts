import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Game, PlayerResult } from '@/models';
import { Service } from 'typedi';

@Service()
class GameService {
  public async createGame(data: any): Promise<any> {
    try {
      const { host, quiz, pin, isLive, playerList, playerResultList } = data;
      if (host === null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Host is missing');
      }

      if (quiz === null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Quiz is missing');
      }

      if (pin === null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Pin is missing');
      }

      const game = await Game.create({
        host: host._id,
        quiz: quiz._id,
        pin,
        isLive,
        playerList,
        playerResultList,
      });

      return game;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getGames(): Promise<any> {
    try {
      const games = await Game.find().populate('host').populate('quiz');
      return games;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getGame(id: string): Promise<any> {
    try {
      const game = await Game.findById(id)
        .populate('host')
        .populate({
          path: 'quiz',
          populate: {
            path: 'questionList',
            model: 'Question',
          },
        })
        .populate('playerList')
        .exec();
      if (!game) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Game not found');
      }
      return game;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteGame(id: string): Promise<any> {
    try {
      const game = await Game.findById(id);
      if (!game) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'gam not found');
      }
      await Game.findByIdAndRemove(id);
      return 'Game deleted successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateGame(id: string, data: any): Promise<any> {
    try {
      const game = await Game.findById(id);
      if (!game) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'gam not found');
      }

      const { hostId, quizId, pin, isLive, playerList } = data;

      const playerResultList = await PlayerResult.find({ gameId: id });
      const newGame = new Game({
        _id: id,
        host: hostId,
        quiz: quizId,
        pin,
        isLive,
        playerList,
        playerResultList,
      });
      const updatedGame = await Game.findByIdAndUpdate(id, newGame, {
        new: true,
      });
      return updatedGame;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addPlayer(gameId: string, data: any): Promise<any> {
    try {
      const { playerId } = data;
      const game = await Game.findById(gameId);
      game.playerList.push(playerId);
      const updatedGame = await game.save();
      return updatedGame;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async removePlayer(gameId: string, data: any): Promise<any> {
    try {
      const { playerId } = data;
      const game = await Game.findById(gameId);
      game.playerList.push(playerId);
      const updatedGame = await game.save();
      return updatedGame;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addPlayerResult(gameId: string, data: any): Promise<any> {
    try {
      const { playerResultId } = data;
      const game = await Game.findById(gameId);
      game.playerResultList.push(playerResultId);
      const updatedGame = await game.save();
      return updatedGame;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default GameService;
