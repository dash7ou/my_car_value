import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // if (!request.currentUser) {
    //   return false;
    // }

    // if (!request.currentUser.admin) {
    //   return false;
    // }

    // return true;

    console.log(request.currentUser)
    return request?.currentUser?.admin;
  }
}
