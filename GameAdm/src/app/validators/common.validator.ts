import { AbstractControl } from '@angular/forms';

export function CheckEmail(control: AbstractControl) {
  if (control.value != "asd") {
    return { emailChecked: true };
  }
  return null;
}
