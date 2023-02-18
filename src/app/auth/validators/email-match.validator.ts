import { ValidatorFn, AbstractControl } from '@angular/forms';

export const emailMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: unknown} | null => {
  const email = control.get('email')?.value;
  const email2 = control.get('email2')?.value;
  return email === email2 ? null : { emailMatch: { value: control.value } };
};
