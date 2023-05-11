import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";


export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // run something before a request is handeled by the request handler
        console.log("before handler", context)

        return next.handle().pipe(
            map((data: any)=>{
                // run something before response sent out
                console.log("before response", data)
            })
        )
    }
}