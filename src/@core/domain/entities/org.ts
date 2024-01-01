import { Address } from '../value-objects/address';
import { Contact } from '../value-objects/contact';
import { Password } from '../value-objects/password';
import { Entity } from './entity';

export class Org extends Entity {
  readonly name: string;
  private _contact: Contact;
  private _address: Address;
  private readonly _password: Password;

  constructor(props: OrgProps, id?: string) {
    super(id);

    this.name = props.name;
    this._contact = new Contact(props.phone, props.email);
    this._address = new Address(props.cep, props.city, props.completeAddress);
    this._password = new Password(props.password);
  }

  comparePassword(password: string) {
    return this._password.compare(password);
  }

  toObject() {
    return Object.freeze({
      id: this.id,
      name: this.name,
      contact: { ...this._contact },
      address: { ...this._address },
    });
  }
}

interface OrgProps {
  cep: string;
  city: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  completeAddress: string;
}
