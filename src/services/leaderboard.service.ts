import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Game, LeaderBoard, Quiz } from '@/models';
import { Service } from 'typedi';

@Service()
class LeaderBoardService {
  public async getHistory(): Promise<any> {
    try {
      const leaderBoards = await LeaderBoard.find();

      const leaderBoardWithGame = await Promise.all(
        leaderBoards.map(async (leaderBoard: any) => {
          const game = await LeaderBoard.find({
            _id: leaderBoard.gameId,
          });
          return {
            ...leaderBoard._doc,
            game,
          };
        }),
      );

      const leaderBoardWithGameQuiz = await Promise.all(
        leaderBoardWithGame.map(async leaderBoard => {
          const quiz = await Quiz.find({
            _id: leaderBoard.game[0].quizId,
          });
          return {
            ...leaderBoard,
            quiz,
          };
        }),
      );
      return leaderBoardWithGameQuiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getLeaderBoards(): Promise<any> {
    try {
      const leaderBoards = await LeaderBoard.find().populate('game').populate('quiz');
      return leaderBoards;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createLeaderBoard(data: any): Promise<any> {
    try {
      const { game, quiz, pin, playerResultList, currentLeaderBoard } = data;

      if (!game) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'game invalid');
      }

      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'quiz invalid');
      }

      if (!pin) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'pin invalid');
      }

      const leaderBoard = new LeaderBoard({
        game: game._id,
        quiz: quiz._id,
        playerResultList,
        pin,
        currentLeaderBoard,
      });
      const newLeaderBoard = await leaderBoard.save();
      return newLeaderBoard;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteLeaderBoard(id: string): Promise<any> {
    try {
      const leaderboard = await LeaderBoard.findById(id);

      if (!leaderboard) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'leaderboad not found');
      }

      await LeaderBoard.findByIdAndRemove(id);
      return 'LeaderBoard deleted successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getLeaderBoard(id: string): Promise<any> {
    try {
      const leaderBoard = await LeaderBoard.findById(id)
        .populate({
          path: 'currentLeaderBoard.leaderBoardList',
          populate: {
            path: 'player',
            model: 'User',
          },
        })
        .exec();
      if (!leaderBoard) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'leaderboad not found');
      }
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateLeaderBoard(id: string, data: any): Promise<any> {
    try {
      const { game, quiz, playerResultList, pin, currentLeaderBoard } = data;

      const leaderBoard = new LeaderBoard({
        game,
        quiz,
        playerResultList,
        pin,
        currentLeaderBoard,
      });

      const newLeaderBoard = await Game.findByIdAndUpdate(id, leaderBoard, {
        new: true,
      });
      return newLeaderBoard;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addPlayerResult(leaderBoardId: string, data: any): Promise<any> {
    try {
      const { playerResultId } = data;
      const leaderBoard = await LeaderBoard.findById(leaderBoardId);
      leaderBoard.playerResultList.push(playerResultId);

      const newLeaderBoard = await leaderBoard.save();
      return newLeaderBoard;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateCurrentLeaderBoard(leaderBoardId: string, data: any): Promise<any> {
    try {
      const { questionIndex, formUpdate } = data;

      const leaderBoardCurrent = { questionIndex, leaderBoardList: formUpdate };
      const leaderBoard = await LeaderBoard.findById(leaderBoardId);
      leaderBoard.currentLeaderBoard.push(leaderBoardCurrent);

      const newLeaderBoard = await leaderBoard.save();
      return newLeaderBoard;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default LeaderBoardService;
