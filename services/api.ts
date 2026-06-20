import { Platform } from 'react-native';
import { CONFIG } from '@/constants/config';

export interface ContactPayload {
  name: string;
  profession: string;
  phno?: string;
  email?: string;
}

export const ApiService = {
  /**
   * Submits a resume download request to the backend validation endpoint
   */
  async requestResumeAccess(payload: ContactPayload): Promise<boolean> {
    const targetUrl = `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REQUEST_RESUME}`;

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Returns true if status code is 200 OK (accommodates your backend response entity)
      return response.ok;
    } catch (error) {
      console.error('Failed to dispatch resume access request payload:', error);
      return false;
    }
  },

  /**
   * Downloads the user resume binary blob and executes a native save.
   */
  async downloadResume(): Promise<void> {
    const targetUrl = `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.DOWNLOAD_RESUME}`;

    try {
      if (Platform.OS === 'web') {
        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf, application/octet-stream',
          },
        });

        if (!response.ok) throw new Error('Failed to capture binary stream');

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = 'Gagan_Gowda_Resume.pdf'; 
        document.body.appendChild(anchor);
        anchor.click();
        
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        console.warn('File download triggered on native platform.');
      }
    } catch (error) {
      console.error('Failed to execute backend file stream extraction:', error);
      throw error;
    }
  }
};