import { InvalidFormatError } from '../errors/invalid-format';
import { UniqueID } from '../value-objects/unique-id';
import { Entity } from './entity';

export class Pet extends Entity {
  private _orgId: UniqueID;

  private _petInfo: {
    name: string;
    description: string;
    size: Size;
    energyLevel: EnergyLevel;
    spaceRequirement: SpaceRequirement;
  };

  private _adoptionRequirements: Set<string>;

  constructor(props: PetProps, id?: string) {
    super(id);

    const { orgId, adoptionRequirements, ...petInfo } = props;

    const validValues = [
      ...Object.values(Size),
      ...Object.values(EnergyLevel),
      ...Object.values(SpaceRequirement),
    ];

    for (const value of [
      petInfo.size,
      petInfo.energyLevel,
      petInfo.spaceRequirement,
    ]) {
      if (!validValues.includes(value)) throw new InvalidFormatError(value);
    }

    this._orgId = orgId;
    this._petInfo = petInfo;
    this._adoptionRequirements = new Set(adoptionRequirements);
  }

  toObject() {
    return Object.freeze({
      id: this.id,
      orgId: this.orgId,
      ...this._petInfo,
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

  get size() {
    return this._petInfo.size;
  }

  get energyLevel() {
    return this._petInfo.energyLevel;
  }

  get spaceRequirement() {
    return this._petInfo.spaceRequirement;
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

  set size(value: Size) {
    this._petInfo.size = value;
  }

  set energyLevel(value: EnergyLevel) {
    this._petInfo.energyLevel = value;
  }

  set spaceRequirement(value: SpaceRequirement) {
    this._petInfo.spaceRequirement = value;
  }
}

interface PetProps {
  orgId: UniqueID;
  name: string;
  description: string;
  size: Size;
  energyLevel: EnergyLevel;
  spaceRequirement: SpaceRequirement;
  adoptionRequirements: string[];
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

export enum SpaceRequirement {
  Narrow = 'narrow',
  Wide = 'wide',
}
