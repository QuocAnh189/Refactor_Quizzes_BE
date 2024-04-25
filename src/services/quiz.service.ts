import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Category, Grade, Question, Quiz } from '@/models';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

const findQuizById = async quizId => {
  const quiz = await Quiz.findById(quizId)
    .populate('questionList')
    .populate({
      path: 'creator',
      select: ['userName', 'firstName', 'lastName', 'avatar', 'userType'],
    })
    .populate({ path: 'grade', select: 'name' })
    .populate({ path: 'category', select: 'name' })
    .lean();

  // quiz.questionList = quiz?.questionList.map((question: any, index) => {
  //   question.questionIndex = index + 1;
  //   return question;
  // });

  return quiz;
};

const findQuizByCreator = async creatorId => {
  try {
    const quizzes = await Quiz.find({ creator: creatorId })
      .populate('questionList')
      .populate({
        path: 'creator',
        select: ['userName', 'firstName', 'lastName', 'avatar', 'userType'],
      })
      .populate({ path: 'grade', select: 'name' })
      .populate({ path: 'category', select: 'name' });

    // quizzes.map((quiz) => {
    //     quiz.questionList.map((question, index) => {
    //         question.questionIndex = index + 1;
    //         return question;
    //     });
    //     return quiz;
    // });

    return quizzes;
  } catch (error) {
    console.log(error);
  }
};

@Service()
class QuizService {
  public async getQuizById(id: string): Promise<any> {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getQuizzes(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getQuizzesDiscoverPage(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getTeacherQuizzes(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getQuizzesPublics(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getQuizzesBySearch(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createQuiz(data: any): Promise<any> {
    const { name, description, isPublic, creatorId } = data;

    const findQuiz = await Quiz.findOne({ name, creatorId });
    if (findQuiz) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Quiz already exists');
    }

    const newQuiz = new Quiz({
      name,
      description,
      isPublic,
      creatorId,
    });

    const createdQuiz = await Quiz.create(newQuiz);

    return createdQuiz;
  }

  public async importQuiz(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateQuiz(id: string, data: any): Promise<any> {
    const { name, description, coverImage, isPublic, tags, category, grade, pointsPerQuestion } = data;

    const findQuiz = await Quiz.findById(id);
    if (!findQuiz) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No quiz with id: ${id}`);
    }

    if (!name) {
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Name is required');
    }

    if (!description) {
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Description is required');
    }

    if (!pointsPerQuestion) {
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Points per question is required');
    }

    if (pointsPerQuestion === 0) {
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Points per question must be greater than 0');
    }

    if (!tags) {
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Tags is required');
    }

    const newQuiz = new Quiz({
      _id: id,
      name,
      description,
      coverImage,
      isPublic: isPublic ? true : false,
      category,
      grade,
      pointsPerQuestion,
      tags,
    });

    const updatedQuiz = await Quiz.findOneAndUpdate({ _id: id }, newQuiz, {
      new: true,
      runValidators: true,
    });

    return updatedQuiz;
  }

  public async deleteQuiz(id: string): Promise<any> {
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Quiz not found');
      }
      await Quiz.findByIdAndRemove(id);

      return 'Quiz deleted succesfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async likeQuiz(id: string): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async commentQuiz(id: string, comment: any): Promise<any> {
    try {
      const quiz = await Quiz.findById(id);
      // quiz.comments.push(comment);
      const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, {
        new: true,
      });

      return updatedQuiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default QuizService;
