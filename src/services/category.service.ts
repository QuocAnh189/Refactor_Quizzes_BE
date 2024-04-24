import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Category } from '@/models';
import { Service } from 'typedi';

@Service()
class CategoryService {
  public async getCategories(): Promise<any> {
    try {
      const categories = await Category.find();

      if (categories) {
        return categories;
      }
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getCategory(id: string): Promise<any> {
    try {
      const category = await Category.findById(id);

      if (!category) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `category not found`);
      }

      return category;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getCategoryByName(name: string): Promise<any> {
    try {
      const category = await Category.findOne({ name });

      if (!category) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `category not found`);
      }

      return category;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createCategory(data: any): Promise<any> {
    try {
      const { name } = data;

      const categoryExist = await Category.find({ name });
      if (categoryExist) {
        throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `category already exists`);
      }

      const category = new Category({
        name,
      });

      const createdCategory = await category.save();
      return createdCategory;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateCategory(id: string, data: any): Promise<any> {
    try {
      const { name } = data;
      const category = await Category.findById(id);

      if (!category) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'category not found');
      }

      const updateCategory = new Category({ _id: id, name });
      const updatedCategory = await Category.findByIdAndUpdate(id, updateCategory, {
        new: true,
      });

      return updatedCategory;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteCategory(id: string): Promise<any> {
    try {
      const category = await Category.findById(id);

      if (!category) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'category not found');
      }
      await Category.deleteOne({ _id: id });
      return 'Category removed';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default CategoryService;
