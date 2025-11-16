import api from './api';

export interface FormData {
  title: string;
  description?: string;
  sections: any[];
  settings: {
    anonymous?: boolean;
    oneResponsePerUser?: boolean;
    responseLimit?: number;
    startDate?: Date;
    endDate?: Date;
    requireVerification?: boolean;
    paymentPerResponse?: number;
    verificationPayment?: number;
  };
}

class FormService {
  async getAllForms(params?: { status?: string; limit?: number; skip?: number }) {
    const response = await api.get('/forms', { params });
    return response.data;
  }

  async getFormById(id: string) {
    const response = await api.get(`/forms/${id}`);
    return response.data;
  }

  async getMyForms(params?: { status?: string; limit?: number; skip?: number }) {
    const response = await api.get('/forms/my/forms', { params });
    return response.data;
  }

  async createForm(data: FormData) {
    const response = await api.post('/forms', data);
    return response.data;
  }

  async updateForm(id: string, data: Partial<FormData>) {
    const response = await api.put(`/forms/${id}`, data);
    return response.data;
  }

  async deleteForm(id: string) {
    const response = await api.delete(`/forms/${id}`);
    return response.data;
  }

  async publishForm(id: string) {
    const response = await api.post(`/forms/${id}/publish`);
    return response.data;
  }
}

export default new FormService();
