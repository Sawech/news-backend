import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  AdminArticleQueryDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto/article.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser, JwtPayload, Roles } from '../../common/decorators/index';

@Controller('api/admin/articles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'EDITOR')
export class AdminArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * GET /api/admin/articles?page=1&limit=20&status=DRAFT&search=climate
   */
  @Get()
  findAll(@Query() query: AdminArticleQueryDto) {
    return this.articlesService.adminFindAll(query);
  }

  /**
   * GET /api/admin/articles/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.adminFindOne(id);
  }

  /**
   * POST /api/admin/articles
   * userId is taken from the JWT — no client-supplied userId accepted.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateArticleDto, @CurrentUser() user: JwtPayload) {
    return this.articlesService.create(dto, user.sub);
  }

  /**
   * PUT /api/admin/articles/:id
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(id, dto);
  }

  /**
   * DELETE /api/admin/articles/:id  — ADMIN only
   */
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
