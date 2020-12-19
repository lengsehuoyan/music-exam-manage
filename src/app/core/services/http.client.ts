import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * 封装HttpClient，主要解决：
 * + 优化HttpClient在参数上便利性
 * + 统一实现 loading
 * + 统一处理时间格式问题
 */
@Injectable()
// tslint:disable-next-line:class-name
export class LYHttpClient {
  constructor(private http: HttpClient) { }

  private _loading = false;

  /** 是否正在加载中 */
  get loading(): boolean {
    return this._loading;
  }

  parseParams(params: any): HttpParams {
    let ret = new HttpParams();
    if (params) {
      // tslint:disable-next-line:forin
      for (const key in params) {
        const _data = params[key];
        // 将时间转化为：时间戳 (秒)
        // if (moment.isDate(_data)) {
        //   _data = moment(_data).unix();
        // }
        ret = ret.set(key, _data);
      }
    }
    return ret;
  }

  appliedUrl(url: string, params?: any) {
    if (!params) { return url; }
    url += url.indexOf('?') >= 0 ? '&' : '?';
    // tslint:disable-next-line:forin
    for (const key in params) {
      url += `${key}=${params[key]}`;
    }
    return url;
  }

  private begin() {
    // console.time('http');
    setTimeout(() => this._loading = true);
  }

  private end() {
    // console.timeEnd('http');
    setTimeout(() => this._loading = false);
  }

  // region: get
  /**
   * GET：返回一个 `string` 类型
   */
  get(url: string, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * GET：返回一个 `JSON` 类型
   */
  get(url: string, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * GET：返回一个 `any` 类型
   */
  get(url: string, params?: any, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any>;

  /**
   * GET 请求
   */
  get(url: string, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any> {
    return this.request('GET', url, Object.assign({
      params
    }, options));
  }

  // endregion
  // region: post
  /**
   * POST：返回一个 `string` 类型
   */
  post(url: string, body: any, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * POST：返回一个 `JSON` 类型
   */
  post(url: string, body: any, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * POST：返回一个 `any` 类型
   */
  post(url: string, body?: any, params?: any, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any>;

  /**
   * POST 请求
   */
  post(url: string, body: any, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any> {
    return this.request('POST', url, Object.assign({
      body,
      params
    }, options));
  }

  // endregion
  // region: delete
  /**
   * DELETE：返回一个 `string` 类型
   */
  delete(url: string, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body',
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * POST：返回一个 `JSON` 类型
   */
  delete(url: string, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe: 'response',
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * POST：返回一个 `any` 类型
   */
  delete(url: string, params?: any, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any>;

  /**
   * POST 请求
   */
  delete(url: string, params: any, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }): Observable<any> {
    return this.request('DELETE', url, Object.assign({
      params
    }, options));
  }

  // endregion
  /**
   * `jsonp` 请求
   *
   * @param {string} url URL地址
   * @param {*} [params] 请求参数
   * @param {string} [callbackParam] CALLBACK值，默认：JSONP_CALLBACK
   */
  jsonp(url: string, params?: any, callbackParam: string = 'JSONP_CALLBACK'): Observable<any> {
    return this.http
      .jsonp(this.appliedUrl(url, params), callbackParam)
      .pipe(
        tap(() => this.end()),
        catchError((res) => {
          this.end();
          return res;
        })
      );
  }

  /**
   * `patch` 请求
   *
   * @param {string} url URL地址
   * @param {*} [body] 请求参数
   */
  patch(url: string, body?: any, params?: any): Observable<any> {
    return this.request('PATCH', url, Object.assign({
      params,
      body: body || null
    }));
  }

  /**
   * `put` 请求
   *
   * @param {string} url URL地址
   * @param {*} [body] 请求参数
   */
  put(url: string, body?: any, params?: any): Observable<any> {
    return this.request('PUT', url, Object.assign({
      params,
      body: body || null
    }));
  }

  /**
   * `request` 请求
   *
   * @param {string} method 请求方法类型
   * @param {string} url URL地址
   * @param {*} [options] 参数
   */
  request(method: string, url: string, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    reportProgress?: boolean;
    withCredentials?: boolean;
  }): Observable<any> {
    this.begin();
    if (options && options.params) {
      options.params = this.parseParams(options.params);
    }
    return this.http.request(method, url, options)
      .pipe(
        tap(() => this.end()),
        catchError((res) => {
          console.log(res);
          this.end();
          return res;
        })
      );
  }
}
