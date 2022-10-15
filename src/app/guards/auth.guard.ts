import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    await this.checkState();
    if (!this.authService.isLoggedIn) {
      await this.router.navigate(["/sign-up"]);
      return false;
    }
    return true;
  }

  async checkState() {
    return await new Promise((resolve, reject) => {
      const check = () => {
        if (this.authService.isUpdatedState) {
          resolve(true)
        } else {
          setTimeout(check, 10)
        }
      }
      check()
    })
  }
}
