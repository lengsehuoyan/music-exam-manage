import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JWTService {
  /** url base64 decode */
  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        console.error('非法 Base64 url字符串!');
        return null;
      }
    }
    // polifyll https://github.com/davidchambers/Base64.js
    return decodeURIComponent(escape(window.atob(output)));
  }

  /**
   * 解码Token
   * @static
   * @param {string} token
   * @returns
   * @memberOf JwtTool
   */
  decodeToken(token: string): any {
    if (token === null || token.length === 0) {
      console.error('token是空的。');
      return null;
    }
    let parts = token.split('.');
    if (parts.length !== 3) {
      console.error('JWT必须包含3个部分。');
      return null;
    }
    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      console.error('不能解码token。');
      return null;
    }
    return JSON.parse(decoded);
  }

  /**
   * 获取token失效时间
   * @static
   * @param {string} token
   * @returns
   * @memberOf JwtTool
   */
  getTokenExpirationDate(token: string) {
    let decoded: any;
    if (token === null) {
      return null;
    }
    decoded = this.decodeToken(token);

    if (!decoded || typeof decoded.exp === 'undefined') {
      return null;
    }
    // The 0 here is the key, which sets the date to the epoch
    let date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * token 是否失效
   * @static
   * @param {string} token
   * @param {number} [offsetSeconds]
   * @returns
   * @memberOf JwtTool
   */
  isTokenExpired(token: string, offsetSeconds?: number) {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return true;
    }
    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
