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
  public async getQuiz(id: string): Promise<any> {
    try {
      const quiz = await findQuizById(id);
      if (!quiz) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'quiz not found');
      }

      if (quiz.isDraft) {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'quiz draftis draf');
      }

      return quiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
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

  public async createQuiz(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async importQuiz(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateQuiz(id: string, data: any): Promise<any> {
    try {
      const {
        _id,
        name,
        creator,
        description,
        backgroundImage,
        isPublic,
        tags,
        numberOfQuestions,
        pointsPerQuestion,
        likesCount,
        questionList,
        category,
        grade,
        isDraft,
      } = data;

      const QuizWithIdParam = await Quiz.findById(id).lean();
      if (!QuizWithIdParam) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No quiz with id: ${id}`);
      }

      const QuizWithIdFromBody = await Quiz.findById(_id).lean();
      if (!QuizWithIdFromBody) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No quiz with id: ${_id}`);
      }

      if (!name) {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Name is required');
      }

      if (!description) {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Description is required');
      }

      if (pointsPerQuestion === null || pointsPerQuestion === undefined || pointsPerQuestion === '') {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Points per question is required');
      }

      if (typeof pointsPerQuestion === 'string') {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Points per question must be a number');
      }

      if (pointsPerQuestion === 0) {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Points per question must be greater than 0');
      }

      if (!tags) {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Tags is required');
      }

      if (questionList.length === 0) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Question List must be not empty');
      }

      const categoryResult = await Category.findOne({
        name: category.name,
      }).lean();
      const gradeResult = await Grade.findOne({ name: grade.name }).lean();

      if (!categoryResult) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Category not found');
      }
      if (!gradeResult) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Grade not found');
      }

      const quiz = new Quiz({
        name,
        creator: creator._id,
        likesCount,
        description,
        backgroundImage,
        isPublic,
        tags,
        numberOfQuestions,
        pointsPerQuestion,
        // likesCount,
        questionList: [],
        category: categoryResult._id,
        grade: gradeResult._id,
        isDraft,
      });

      let SavedQuestionList = questionList.map(async item => {
        if (item._id !== undefined && item._id !== null && item._id !== '') {
          const question = await Question.findByIdAndUpdate(item._id, item);
          return question;
        } else {
          const newQuestion = new Question({
            optionQuestion: item.optionQuestion,
            creator: creator._id,
            questionIndex: item.questionIndex,
            tags: item.tags,
            isPublic: true,
            questionType: item.questionType,
            pointType: item.pointType,
            answerTime: item.answerTime,
            backgroundImage: item.backgroundImage,
            content: item.content,
            answerList: item.answerList,
            maxCorrectAnswer: item.maxCorrectAnswer,
            correctAnswerCount: item.correctAnswerCount,
            answerCorrect: item.answerCorrect,
          });

          const question = await newQuestion.save();
          return question;
        }
      });

      // await Promise.all(SavedQuestionList).then(question => {
      //   question.forEach(item => {
      //     quiz.questionList.push(item._id);
      //   });
      // });
      // // quiz._id = new ObjectId(_id);
      // if (quiz.numberOfQuestions !== quiz.questionList.length) quiz.numberOfQuestions = quiz.questionList.length;

      // quiz.isDraft = quiz.questionList.length === 0 ? true : false;

      const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, {
        new: true,
      });

      return updatedQuiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
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
