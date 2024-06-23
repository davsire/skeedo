import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActionModel } from 'src/models/action-model';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent {

  @Input() set menuActions(actions: ActionModel[]) {
    this._menuModel = actions.map(action => ({
      label: action.title,
      command: action.action,
      icon: action.icon,
    }));
  }

  _menuModel: MenuItem[] = [];
}
