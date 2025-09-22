import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Autentica um usuário e retorna um JWT' })
  @Post('login')
  async login(@Body() loginData: any) {
    const user = { username: loginData.username || 'seu-manoel', userId: 1 };
    return this.authService.login(user);
  }
}
