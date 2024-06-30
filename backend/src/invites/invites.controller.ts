import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/createInvite.dto';
import { UpdateInviteDto } from './dto/updateInvite.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createInviteDto: CreateInviteDto, @Request() req) {
    return this.invitesService.create(createInviteDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.invitesService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.invitesService.findOne(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInviteDto: UpdateInviteDto,
    @Request() req
  ) {
    return this.invitesService.update(id, updateInviteDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.invitesService.remove(id, req.user);
  }
}
