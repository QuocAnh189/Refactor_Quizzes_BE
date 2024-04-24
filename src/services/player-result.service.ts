import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Game, PlayerResult, Quiz, User } from '@/models';
import { Service } from 'typedi';

const calculatePoints = (quiz = null, time = null, pointType = null, answerTime = null) => {
  let pointsPerQuestion = quiz.pointsPerQuestion;
  if (pointType === 'Double') {
    return pointsPerQuestion * 2;
  } else if (pointType === 'BasedOnTime') {
    return (pointsPerQuestion / answerTime) * (answerTime - time);
  } else {
    return pointsPerQuestion;
  }
};

@Service()
class PlayerResultService {
  public async createPlayerResult(data: any): Promise<any> {
    try {
      const { player, game, score, answers } = data;
      const playerResult = new PlayerResult({
        player: player._id,
        game,
        score,
        answers,
      });

      const playerGameExist = await PlayerResult.findOne({ player, game });
      if (playerGameExist) {
        throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'PlayerResults already exists');
      }

      const newPlayerResult = await playerResult.save();
      return newPlayerResult;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getPlayerResults(): Promise<any> {
    try {
      const playerResults = await PlayerResult.find().populate('player').populate('game');
      return playerResults;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getPlayerResult(id: string): Promise<any> {
    try {
      const playerResult = await PlayerResult.findById(id);
      if (playerResult == null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Player Result not found');
      }
      return playerResult;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deletePlayerResult(id: string): Promise<any> {
    try {
      const playerResult = await PlayerResult.findById(id);
      if (playerResult == null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Player Result not found');
      }

      await PlayerResult.findOneAndRemove({ player: id });
      return 'Player Result deleted successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updatePlayerResult(id: string, data: any): Promise<any> {
    try {
      const { answers, score } = data;
      const playerResult = new PlayerResult({
        _id: id,
        answers,
        score,
      });

      const result = await PlayerResult.findById(id);
      const user = await User.findById(String(result.playerId));
      user.point += score;
      await user.save();
      const updatedPlayerResult = await PlayerResult.findByIdAndUpdate(id, playerResult, { new: true });
      return updatedPlayerResult;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addAnswer(playerResultId: string, data: any): Promise<any> {
    try {
      const {
        questionIndex,
        // answered,
        answers,
        time,
      } = data.newAnswer;

      let playerResult;
      let game;
      let quiz;
      let correctAnswers;
      let pointType;
      let answerTime;
      let points = 0;
      playerResult = await PlayerResult.findById(playerResultId);
      game = await Game.findById(playerResult.gameId);
      quiz = await Quiz.findById(game.quizId);
      correctAnswers = quiz.questionList[questionIndex - 1].answerList
        .filter(answer => answer.isCorrect === true)
        .map(answer => answer.name);
      pointType = quiz.questionList[questionIndex - 1].pointType;
      answerTime = quiz.questionList[questionIndex - 1].answerTime;
      //posortować answers zeby indeksy szły w tej samej kolejności
      let sortedAnswers = answers.sort();

      if (answers.length > 0) {
        let a = 0;
        for (let i = 0; i < correctAnswers.length; i++) {
          if (correctAnswers[i] === sortedAnswers[i]) {
            a++;
          }
        }
        if (a === correctAnswers.length) {
          points = calculatePoints(quiz, time, pointType, answerTime);
        }
      }

      playerResult.score += points;
      playerResult.answers.push({
        questionIndex,
        // answered,
        answers,
        time,
        correctAnswers,
        points,
      });
      const updatedPlayerResult = await playerResult.save();
      return updatedPlayerResult;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getAnswers(playerResultId: string): Promise<any> {
    try {
      const playerResult = await PlayerResult.findById(playerResultId);
      if (!playerResult) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Player Result not found');
      }

      return playerResult.answers;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getAnswer(playerResultId: string, answerId: string): Promise<any> {
    try {
      const playerResult = await PlayerResult.findById(playerResultId);
      if (playerResult == null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Player result not found');
      }
      const answer = playerResult.answers[answerId];
      return answer;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteAnswer(playerResultId: string, answerId: string): Promise<any> {
    try {
      const playerResult = await PlayerResult.findById(playerResultId);
      let answerIndex = playerResult.answers.findIndex((obj: any) => obj._id == answerId);
      playerResult.answers.splice(answerIndex, 1);
      playerResult.score -= playerResult.answers[answerIndex].point;
      await PlayerResult.findByIdAndUpdate(playerResultId, playerResult, {
        new: true,
      });
      return 'Answer deleted successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateAnswer(playerResultId: string, answerId: string, data: any): Promise<any> {
    try {
      const { questionIndex, answered, answerIndex, time } = data;
      let playerResult;
      let quiz;
      let correctAnswerIndex;
      let points = 0;

      playerResult = await PlayerResult.findById(playerResultId);
      if (playerResult == null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Player Result not found');
      }

      let answerPosition = playerResult.answers.findIndex(obj => obj._id == answerId);
      playerResult.score -= playerResult.answers[answerPosition].points;
      quiz = await Quiz.findById(playerResult.quizId);
      correctAnswerIndex = quiz.questionList[questionIndex].correctAnswer;
      if (answered && answerIndex === correctAnswerIndex) {
        points = calculatePoints(quiz, time);
      }
      playerResult.score += points;
      playerResult.answers[answerPosition] = {
        _id: answerId,
        questionIndex,
        answered,
        answerIndex,
        time,
      };
      const updatedPlayerResult = await PlayerResult.findByIdAndUpdate(playerResultId, playerResult, {
        new: true,
      });

      return updatedPlayerResult;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addPlayerResult(playerId: string, gameId: string, data: any): Promise<any> {
    try {
      const { score, answers } = data;
      const newPlayerResult = new PlayerResult({
        playerId,
        gameId,
        score,
        answers,
      });

      const user = await User.findById(playerId);
      user.point += score;
      user.save();

      await newPlayerResult.save();
      return { newPlayerResult, user };
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default PlayerResultService;
