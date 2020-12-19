import { Injectable } from '@angular/core';
import { LYHttpClient } from '../http.client';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface LoginDto {
  username: string;
  password?: string;
}

@Injectable()
export class AuthApi {
  constructor(private http: LYHttpClient) {}

  /**
   * 注册用户
   * @param rinfo
   */
  register(rinfo: LoginDto): Observable<string> {
    return this.http.post('/auth/register', rinfo).pipe(
      map((data) => data.token),
      tap((value) => console.log(value))
    );
  }

  /**
   * 用户登录
   */
  login(rinfo: LoginDto): Observable<any> {
    return this.http.post('/login', rinfo);
  }

  /**
   * 用户注销
   */
  logout(): Observable<any> {
    return null;
  }

  test(): Observable<any> {
    return this.http.get('/test');
  }
}
