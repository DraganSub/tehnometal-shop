import axios from 'axios';
import { IProduct } from '../../types';

class ProductService {
  get baseUrl(): string {
    return process.env.REACT_APP_BASE_DB_URL!;
  }

  async getAllProductsBySubCategory(subId: string): Promise<IProduct> {
    try {
      const response = await axios.get(`${this.baseUrl}products/${subId}.json`);
      const data = await response.data;
      return data;
    } catch (error) {
      // TODO: add error handling
      throw new Error();
    }
  }

  async getProductById(subCatId: string, prodId: string): Promise<IProduct> {
    try {
      console.log(subCatId, prodId);
      const response = await axios.get(
        `${this.baseUrl}products/${subCatId}/${prodId}.json`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      // TODO: add error handling
      throw new Error();
    }
  }
}

const productServiceInstance = new ProductService();
export { productServiceInstance };
