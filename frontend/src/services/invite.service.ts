import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Invite } from 'src/models/invite.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  readonly pathBase = 'invites';
  readonly pathPendingInvites = this.pathBase + '/pending';

  constructor(private apiService: ApiService) {}

  public getPendingInvites(): Observable<Invite[]> {
    return this.apiService.get<Invite[]>(this.pathPendingInvites);
  }

  public respondInvite(inviteId: string, inviteData: Invite): Observable<void> {
    return this.apiService.patch(this.pathBase + '/' + inviteId, inviteData);
  }

  public declineInvite(inviteId: string): Observable<void> {
    return this.apiService.delete(this.pathBase + '/' + inviteId);
  }
}
