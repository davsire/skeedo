import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CONSTANTS } from 'src/shared/constants';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() userData: FormGroup;
  @Output() userDataChange = new EventEmitter<FormGroup>();

  readonly fieldName = CONSTANTS.FIELD_USER_NAME;
  readonly fieldNickName = CONSTANTS.FIELD_USER_NICKNAME;
  readonly fieldPassword = CONSTANTS.FIELD_USER_PASSWORD;
  readonly fieldConfirmPassword = CONSTANTS.FIELD_USER_CONFIRM_PASSWORD;

  _disableFields = false;

  constructor(private formBuilder: FormBuilder) {
  }

  @Input() set disableFields(disable: boolean) {
    this._disableFields = disable;
    disable ? this.userData?.disable() : this.userData?.enable();
  }

  public ngOnInit(): void {
    this.initUserData();
  }

  private initUserData(): void {
    if (this.userData) return;
    this.userData = this.formBuilder.group({
      [this.fieldName]: [{value: null, disabled: this._disableFields}, Validators.required],
      [this.fieldNickName]: [{value: null, disabled: this._disableFields}, Validators.required],
      [this.fieldPassword]: [{value: null, disabled: this._disableFields}, Validators.required],
      [this.fieldConfirmPassword]: [{value: null, disabled: this._disableFields}, [Validators.required, this.confirmPasswordValidator.bind(this)]],
    });
    this.userDataChange.emit(this.userData);
  }

  private confirmPasswordValidator(control: AbstractControl): ValidationErrors {
    if (this.userData?.get(this.fieldPassword).value === control?.value) {
      return null;
    }
    return {differentPassword: true};
  }
}
