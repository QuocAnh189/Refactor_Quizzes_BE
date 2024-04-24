import { ObjectId } from 'mongodb';
import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Community, Quiz, User } from '@/models';
import { Service } from 'typedi';

@Service()
class CommunityService {
  public async getCommunities(): Promise<any> {
    try {
      const communities = await Community.find();
      const quizzes = await Quiz.find({ isPublic: true });
      const users = await User.find();

      const communitiesWithQuiz = communities.map((item: any) => {
        let quizList = [];
        let arrayList = [...users];
        const user = arrayList.filter(user => String(user._id) === String(item.creator._id));
        quizzes.map(async (quiz: any) => {
          if (item.quizzes.includes(quiz._id)) {
            quizList.push(quiz);
          }
        });
        return { ...item._doc, quizList, infoCreator: user[0] };
      });
      return communitiesWithQuiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getCommunity(id: string): Promise<any> {
    try {
      const community = await Community.findById(id);
      if (!community) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `community not found`);
      }

      return community;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createCommunity(data: any): Promise<any> {
    try {
      const { name, creatorId, backgroundImage, users, quizzes, field, chatBox } = data;
      const community = new Community({
        name,
        creator: creatorId,
        backgroundImage,
        quizzes,
        users,
        field,
        chatBox,
      });

      const createdCommunity = await Community.create(community);
      if (createdCommunity) {
        return createdCommunity;
      }
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateCommunity(id: string, data: any): Promise<any> {
    try {
      const { name, creatorId, backgroundImage, quizzes, users, field, chatBox } = data;

      const community = new Community({
        _id: id,
        name,
        creator: creatorId,
        backgroundImage,
        quizzes,
        users,
        field,
        chatBox,
      });

      const updatedCommunity = await Community.findByIdAndUpdate(id, community, {
        new: true,
      });

      if (updatedCommunity) {
        return updatedCommunity;
      }
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deletedCommunity(id: string): Promise<any> {
    try {
      await Community.findByIdAndRemove(id);
      return 'Quiz deleted successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addQuizCommunity(id: string, quizId: string): Promise<any> {
    try {
      const community = await Community.findById(id);
      const quiz = await Quiz.findById(quizId);
      const objectIdQuiz = new ObjectId(quizId);

      // if (!community.quizzes.includes(objectIdQuiz)) {
      //   community.quizzes.push(objectIdQuiz);
      // }

      await community.save();
      return quiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteQuizCommunity(id: string, quizId: string): Promise<any> {
    try {
      const community = await Community.findById(id);
      const quiz = await Quiz.findById(quizId);
      community.quizzes = community.quizzes.filter(item => {
        return String(item) !== String(quizId);
      });
      await community.save();
      return quiz;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addMessageChatBox(id: string, data: any): Promise<any> {
    try {
      const { message } = data;
      const community = await Community.findById(id);
      if (!community) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `community not found`);
      }
      community.chatBox.push(message);
      await community.save();

      return 'Successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default CommunityService;
