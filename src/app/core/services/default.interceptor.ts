import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, catchError, mergeMap, filter } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService) {}

  private goLogin() {
    const router = this.injector.get(Router);
    router.navigate(['/login']);
  }

  getToken() {
    return this.authService.getToken();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const handle200 = (event: any) => {
      const { status, body } = event;
      if (event instanceof HttpResponse && status >= 200 && status < 300) {
        const { code, msg, t } = body;
        const data = t;
        if (code === 0) {
          event = event.clone({ body: data || true });
        } else if (code > 0) {
          if (code === 7 && t === undefined) {
            // 腾讯vod上传回复信息
          } else {
            const nzmessage = this.injector.get(NzMessageService);
            nzmessage.error(msg || '未知错误');
            event = event.clone({ body: { code, msg, data } });
          }
        }
      }
      return event;
    };
    const errorHandle = (res: HttpResponse<any> | HttpErrorResponse) => {
      const nzmessage = this.injector.get(NzMessageService);
      switch (res.status) {
        case 401:
          this.goLogin();
          break;
        case 404:
          break;
        default:
          // handle other status
          const errResponse = res as HttpErrorResponse;
          if (errResponse) {
            const { error } = errResponse;
            const { msg } = error;
            nzmessage.error(msg || '其他错误');
          }
          break;
      }
      return throwError(res);
      // return throwError(event);
    };
    const getToken$ = of(`Bearer ${this.getToken()}`);
    const getNewReq$ = getToken$.pipe(
      map((token) => {
        const url = `${environment.apiBase}${req.url}`;
        const newReq = req.clone({
          url,
          withCredentials: true,
          setHeaders: { Authorization: token, from: '1' },
        });
        return newReq;
      })
    );
    return getNewReq$.pipe(
      mergeMap((r) =>
        next.handle(r).pipe(
          // event { type :0 } 为跨域试探请求返回内容, 过滤即可
          filter((event) => event.type !== 0),
          map(handle200),
          catchError(errorHandle)
        )
      )
    );
  }
}
