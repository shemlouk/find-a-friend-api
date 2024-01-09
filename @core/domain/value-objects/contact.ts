import { InvalidFormatError } from '@core/domain/errors/invalid-format';

export class Contact {
  readonly phone: string;
  readonly email: string;

  static phoneRegex = /^(55)?(\d{2})?9\d{8}$/;
  static emailRegex = /^\w+@\w+\.com$/;

  constructor(phone: string, email: string) {
    const isPhoneValid = Contact.phoneRegex.test(phone);
    if (!isPhoneValid) throw new InvalidFormatError('Phone');

    const isEmailValid = Contact.emailRegex.test(email);
    if (!isEmailValid) throw new InvalidFormatError('Email');

    this.phone = phone;
    this.email = email;
  }
}
