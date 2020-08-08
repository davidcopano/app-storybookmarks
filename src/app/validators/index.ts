import { FormGroup } from '@angular/forms';

export function checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('password_confirmation').value;
    return pass === confirmPass ? null : { notSame: true };
}
