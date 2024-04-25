import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Grade } from '@/models';
import { Service } from 'typedi';

@Service()
class GradeService {
  public async getGrades(): Promise<any> {
    const grades = await Grade.find();
    if (!grades) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'grades not found');
    }

    return grades;
  }

  public async getGrade(id: string): Promise<any> {
    const grade = await Grade.findById(id);
    if (!grade) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'grade not found');
    }

    return grade;
  }

  public async getGradeByName(name: string): Promise<any> {
    const grade = await Grade.findOne({ name });
    if (!grade) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'grade not found');
    }
    return grade;
  }

  public async createGrade(data: any): Promise<any> {
    const { name } = data;
    const grade = new Grade({
      name,
    });

    const createdGrade = await Grade.create(grade);
    return createdGrade;
  }

  public async updateGrade(id: string, data: any): Promise<any> {
    const { name } = data;

    const grade = await Grade.findById(id);

    if (!grade) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'grade not found');
    }

    const newGrade = new Grade({ _id: id, name });
    const updatedGrade = await Grade.findByIdAndUpdate(id, newGrade, { new: true });

    return updatedGrade;
  }

  public async deleteGrade(id: string): Promise<any> {
    const grade = await Grade.findById(id);
    if (!grade) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'grade not found');
    }
    await Grade.findByIdAndRemove(id);
    return 'Grade removed';
  }
}

export default GradeService;
