
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

export const jwtConstants = {
    secret: process.env.JWT_SECRET || (() => {
        throw new Error('JWT_SECRET environment variable is required!');
    })(),
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}
