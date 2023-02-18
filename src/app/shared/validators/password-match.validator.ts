import { ValidatorFn, AbstractControl } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: unknown} | null => {
  const password1 = control.get('password1')?.value;
  const password2 = control.get('password2')?.value;
  return password1 === password2 ? null : { passwordMatch: { value: control.value } };
};
