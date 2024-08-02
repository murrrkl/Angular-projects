import {HttpInterceptorFn} from "@angular/common/http";

export const authTokenInterceptor: HttpInterceptorFn = (req , next) => {
  console.log(req)
  return next(req)
}
