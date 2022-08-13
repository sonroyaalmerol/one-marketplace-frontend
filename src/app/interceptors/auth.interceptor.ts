import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private toast: ToastrService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        const nextHandle = next.handle(req);

        nextHandle.subscribe({ error: (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.toast.error(err.message, "Authentication expired!");
                    this.authService.doLogout();
                }
            }
        } });

        return nextHandle;
    }
}