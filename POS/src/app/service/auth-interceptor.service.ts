import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor {
  constructor(private tokenService: TokenService) {}

  async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.tokenService.getAccessToken();

    if (!accessToken) {
      // No token found, the user is not authenticated
      return false;
    }

    const tokenData = this.decodeToken(accessToken);

    if (!tokenData || !tokenData.exp) {
      // Token is missing expiration information
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenData.exp < currentTime) {
      // Token has expired
      return false;
    }

    // Token is valid
    return true;
  }

  private decodeToken(token: string): any {
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData;
    } catch (error) {
      return null;
    }
  }


  async logout() {
    // Remove the access token when logging out
    await this.tokenService.removeAccessToken();

    // Additional logout logic, if needed
  }


}
