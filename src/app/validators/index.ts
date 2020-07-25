import { FormGroup } from '@angular/forms';

export function checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('password_confirmation').value;
    return pass === confirmPass ? null : { notSame: true }
}