import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    await this.checkState();
    if (this.authService.user?.role === 'admin') {
      await this.router.navigate(["/sports-tricks"]);
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
