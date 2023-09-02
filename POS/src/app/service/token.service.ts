import { Injectable } from '@angular/core';
import {SecureStorage} from '@ionic-native/secure-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'access_token';

  constructor(private secureStorage: SecureStorage) {}

  async setAccessToken(token: string) {
    await this.secureStorage.create('my_app').then((storage) => {
      storage.set(this.TOKEN_KEY, token);
    });
  }

  async getAccessToken(): Promise<string | null> {
    return this.secureStorage.create('my_app').then((storage) => {
      return storage.get(this.TOKEN_KEY);
    });
  }

  async removeAccessToken() {
    await this.secureStorage.create('my_app').then((storage) => {
      storage.remove(this.TOKEN_KEY);
    });
  }
}
