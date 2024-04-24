import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Question, Quiz } from '@/models';
import { Service } from 'typedi';

@Service()
class QuestionService {
  public async addQuestion(quizId: string, data: any): Promise<any> {
    try {
      const {
        backgroundImage,
        optionQuestion,
        questionType,
        content,
        pointType,
        answerTime,
        answerList,
        questionIndex,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
      } = data;

      const newQuestion = new Question({
        // creator: req.user.id,
        optionQuestion,
        quiz: quizId,
        questionIndex,
        tags: '',
        isPublic: true,
        questionType,
        pointType,
        answerTime,
        backgroundImage,
        content,
        answerList,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
      });

      const question = await newQuestion.save();
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Quiz not found');
      }
      // quiz.questionList.push(question._id);
      quiz.numberOfQuestions += 1;
      await quiz.save();

      return { question, quiz };
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getQuestions(quizId: string): Promise<any> {
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Question not found');
      }

      return quiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getAllQuestion(): Promise<any> {
    try {
      const questions = await Question.find().populate('creator');
      if (!questions) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Question not found');
      }
      return questions;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getQuestion(quizId: string, questionId: string): Promise<any> {
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Question not found');
      }
      // const question = quiz.questionList[questionId];
      // return question;
      return 'ok';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteQuestion(quizId: string, questionId: string): Promise<any> {
    try {
      const question = await Question.findById(questionId);
      const Index = question.questionIndex;
      const quiz = await Quiz.findById(quizId);
      quiz.numberOfQuestions -= 1;

      // quiz.questionList = quiz.questionList.filter(item => String(item._id) !== questionId);

      // quiz.questionList.map((item: any) => {
      //   if (item.questionIndex > Index) {
      //     item.questionIndex--;
      //     const handleSetIndex = async () => {
      //       const question = await Question.findById(item._id);
      //       question.questionIndex -= 1;
      //       question.save();
      //     };
      //     handleSetIndex();
      //   }
      // });

      await quiz.save();
      await Question.findByIdAndRemove(questionId);
      return quiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createQuestion(data: any): Promise<any> {
    try {
      const {
        backgroundImage,
        optionQuestion,
        questionType,
        content,
        pointType,
        answerTime,
        answerList,
        questionIndex,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
      } = data;

      const newQuestion = new Question({
        backgroundImage,
        optionQuestion,
        questionType,
        content,
        pointType,
        answerTime,
        answerList,
        questionIndex,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
      });
      const question = await newQuestion.save();

      return question;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateQuestion(quizId: string, questionId: string, data: any): Promise<any> {
    try {
      const {
        questionType,
        isPublic,
        optionQuestion,
        backgroundImage,
        content,
        pointType,
        answerTime,
        answerList,
        tags,
        questionIndex,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
      } = data;

      const newQuestion = new Question({
        _id: questionId,
        // creatorId: req.user.id,
        optionQuestion,
        quizId,
        questionIndex,
        tags,
        isPublic,
        questionType,
        pointType,
        answerTime,
        backgroundImage,
        content,
        answerList,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
      });
      const quiz = await Quiz.findById(quizId);

      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Quiz not found');
      }
      await Question.findByIdAndUpdate(questionId, newQuestion, {
        new: true,
      });

      // const questionIndex = quiz.questionList.findIndex((obj: any) => obj._id == questionId);
      // quiz.questionList[questionIndex] = {
      //   _id: questionId,
      //   // creatorId: req.user.id,
      //   optionQuestion,
      //   quizId,
      //   questionIndex: questionIndex + 1,
      //   tags,
      //   isPublic,
      //   questionType,
      //   pointType,
      //   answerTime,
      //   backgroundImage,
      //   content,
      //   answerList,
      //   maxCorrectAnswer,
      //   correctAnswerCount,
      //   answerCorrect,
      // };
      const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quiz, {
        new: true,
      });
      return updatedQuiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default QuestionService;
