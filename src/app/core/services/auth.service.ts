import { Injectable } from '@angular/core';
import { JWTService } from './jwt.service';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  readonly TOKEN_KEY: string = 'yuebo.token';
  readonly EXPIRE_KEY: string = 'yuebo.expire';

  constructor(private readonly jwtService: JWTService) {}

  getTokenObj(): any {
    const token = this.getToken();
    return this.jwtService.decodeToken(token);
  }

  setToken({ token, expire }): void {
    localStorage.setItem(this.EXPIRE_KEY, expire);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * 获取token过期时间
   */
  getExpire(): Date {
    const expire = localStorage.getItem(this.EXPIRE_KEY);
    return moment(expire).toDate();
  }

  /**
   * 获取token字符串
   */
  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
