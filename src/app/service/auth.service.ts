import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../domain';
import {map, switchMap} from 'rxjs/operators';

/**
 * 认证服务主要用于用户的注册和登录功能
 */
@Injectable()
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   *
   * @param http 注入Http
   * @param config 注入基础配置
   */
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) {
  }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: User): Observable<User> {
    const params = new HttpParams().set('email', user.email);
    const uri = `${this.config.uri}/users/`;
    return this.http.post(uri, JSON.stringify(user)).pipe(
      switchMap(res => {
        if ((res as User[]).length <= 0) {
          return throwError('username existed');
        }
        return res as Observable<User>;
      })
    );
  }

  /**
   * 使用用户名和密码登录
   *
   * @param email 用户名
   * @param password 密码（明文）
   */
  login(email: string, password: string): Observable<boolean> {
    const uri = `${this.config.uri}/users/login`;
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post(uri, {params}).pipe(
      map(res => {
        const users = res as User[];
        return users.length !== 0;
      })
    );
  }
}
