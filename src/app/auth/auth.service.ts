import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {TokenResponce} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  cookieService = inject(CookieService);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/'

  token: string | null = null; // При запросе будет сохранён вернувшийся токен
  refreshToken: string | null = null;

  // Авторизован или нет
  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }

    return !!this.token; // Перевод строки в boolean
  }

  login(payload: {username: string, password: string}) {
    const fd: FormData = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password); // YDOYfKQWLa

    return this.http.post<TokenResponce>(
      `${this.baseApiUrl}token`,
      fd // Тело запроса
    ).pipe(
      tap(val => {
          this.token = val.access_token;
          this.refreshToken = val.refresh_token;

          // Сохраняем в куки
          this.cookieService.set('token', this.token);
          this.cookieService.set('refresh_token', this.refreshToken);
      })
    )
  }
}
