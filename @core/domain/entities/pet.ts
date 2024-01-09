import { InvalidFormatError } from '../errors/invalid-format';
import { UniqueID } from '../value-objects/unique-id';
import { Entity } from './entity';

export class Pet extends Entity {
  private _orgId: UniqueID;

  private _petInfo: {
    name: string;
    description: string;
    age: PetEnums.Age;
    size: PetEnums.Size;
    category: PetEnums.Category;
    energyLevel: PetEnums.EnergyLevel;
    independencyLevel: PetEnums.IndependencyLevel;
    spaceRequirement: PetEnums.SpaceRequirement;
  };

  private _photoUrl: URL;
  private _isAdopted: boolean;
  private _adoptionRequirements: Set<string>;

  constructor(props: PetProps, id?: string) {
    super(id);

    const { orgId, photoUrl, isAdopted, adoptionRequirements, ...petInfo } =
      props;

    const validationResults = [];

    Object.keys(PetEnums).forEach((key) => {
      const petInfoKey = key.charAt(0).toLowerCase() + key.slice(1);
      const petInfoValue = petInfo[petInfoKey];

      const validValues = Object.values(PetEnums[key]);
      validationResults.push(validValues.includes(petInfoValue));
    });

    if (validationResults.find((value) => value !== true)) {
      throw new InvalidFormatError('Pet Info');
    }

    this._orgId = orgId;
    this._petInfo = petInfo;
    this._isAdopted = isAdopted;
    this._photoUrl = new URL(photoUrl);
    this._adoptionRequirements = new Set(adoptionRequirements);
  }

  toObject() {
    return Object.freeze({
      id: this.id,
      orgId: this.orgId,
      ...this._petInfo,
      photoUrl: this.photoUrl,
      isAdopted: this.isAdopted,
      adoptionRequirements: Array.from(this._adoptionRequirements),
    });
  }

  get orgId() {
    return this._orgId.value;
  }

  get name() {
    return this._petInfo.name;
  }

  get description() {
    return this._petInfo.description;
  }

  get age() {
    return this._petInfo.age;
  }

  get size() {
    return this._petInfo.size;
  }

  get category() {
    return this._petInfo.category;
  }

  get energyLevel() {
    return this._petInfo.energyLevel;
  }

  get independencyLevel() {
    return this._petInfo.independencyLevel;
  }

  get spaceRequirement() {
    return this._petInfo.spaceRequirement;
  }

  get isAdopted() {
    return this._isAdopted;
  }

  get photoUrl() {
    return this._photoUrl.href;
  }

  get adoptionRequirements() {
    return this._adoptionRequirements;
  }

  set name(value: string) {
    this._petInfo.name = value;
  }

  set description(value: string) {
    this._petInfo.description = value;
  }

  set age(value: PetEnums.Age) {
    this._petInfo.age = value;
  }

  set size(value: PetEnums.Size) {
    this._petInfo.size = value;
  }

  set energyLevel(value: PetEnums.EnergyLevel) {
    this._petInfo.energyLevel = value;
  }

  set independencyLevel(value: PetEnums.IndependencyLevel) {
    this._petInfo.independencyLevel = value;
  }

  set spaceRequirement(value: PetEnums.SpaceRequirement) {
    this._petInfo.spaceRequirement = value;
  }

  set isAdopted(value: boolean) {
    this._isAdopted = value;
  }
}

interface PetProps {
  orgId: UniqueID;
  name: string;
  description: string;
  age: PetEnums.Age;
  size: PetEnums.Size;
  category: PetEnums.Category;
  energyLevel: PetEnums.EnergyLevel;
  independencyLevel: PetEnums.IndependencyLevel;
  spaceRequirement: PetEnums.SpaceRequirement;
  photoUrl: string;
  isAdopted: boolean;
  adoptionRequirements: string[];
}

export namespace PetEnums {
  export enum Category {
    Cat = 'cat',
    Dog = 'dog',
  }

  export enum Age {
    Baby = 'baby',
    Young = 'young',
    Adult = 'adult',
    Senior = 'senior',
  }

  export enum Size {
    Small = 'small',
    Average = 'average',
    Big = 'big',
  }

  export enum EnergyLevel {
    Lower = 'lower',
    Low = 'low',
    Average = 'average',
    High = 'high',
    Higher = 'higher',
  }

  export enum IndependencyLevel {
    Small = 'small',
    Average = 'average',
    High = 'high',
  }

  export enum SpaceRequirement {
    Narrow = 'narrow',
    Wide = 'wide',
  }
}
