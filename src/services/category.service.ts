import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Category } from '@/models';
import { Service } from 'typedi';

@Service()
class CategoryService {
  public async getCategories(): Promise<any> {
    const categories = await Category.find();

    if (!categories) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Categories not found');
    }

    return categories;
  }

  public async getCategory(id: string): Promise<any> {
    const category = await Category.findById(id);

    if (!category) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `category not found`);
    }

    return category;
  }

  public async getCategoryByName(name: string): Promise<any> {
    const category = await Category.findOne({ name });

    if (!category) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `category not found`);
    }

    return category;
  }

  public async createCategory(data: any): Promise<any> {
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
  }

  public async updateCategory(id: string, data: any): Promise<any> {
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
  }

  public async deleteCategory(id: string): Promise<any> {
    const category = await Category.findById(id);

    if (!category) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'category not found');
    }
    await Category.deleteOne({ _id: id });
    return 'Category removed';
  }
}

export default CategoryService;
