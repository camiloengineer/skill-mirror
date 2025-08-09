import { UniqueId } from "../value-objects/unique-id";
import { Name, Description, Url } from "../value-objects/common";
import { Gender, CharacterRole, CompanyType } from "../value-objects/enums";

export interface CharacterPersonality {
  traits: string[];
  communication_style: string;
  expertise_areas: string[];
  interview_approach: string;
}

export interface CharacterAppearance {
  avatar_url: string;
  idle_video_url: string;
  greeting_video_url: string;
  thinking_video_url?: string;
  speaking_video_url?: string;
}

export interface CharacterProps {
  id?: UniqueId;
  name: Name;
  role: CharacterRole;
  gender: Gender;
  company_type: CompanyType;
  description: Description;
  personality: CharacterPersonality;
  appearance: CharacterAppearance;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Character {
  private readonly _id: UniqueId;
  private _name: Name;
  private _role: CharacterRole;
  private _gender: Gender;
  private _company_type: CompanyType;
  private _description: Description;
  private _personality: CharacterPersonality;
  private _appearance: CharacterAppearance;
  private _is_active: boolean;
  private readonly _created_at: Date;
  private _updated_at: Date;

  constructor(props: CharacterProps) {
    this._id = props.id || UniqueId.generate();
    this._name = props.name;
    this._role = props.role;
    this._gender = props.gender;
    this._company_type = props.company_type;
    this._description = props.description;
    this._personality = props.personality;
    this._appearance = props.appearance;
    this._is_active = props.is_active;
    this._created_at = props.created_at || new Date();
    this._updated_at = props.updated_at || new Date();
  }

  // Getters
  get id(): UniqueId {
    return this._id;
  }

  get name(): Name {
    return this._name;
  }

  get role(): CharacterRole {
    return this._role;
  }

  get gender(): Gender {
    return this._gender;
  }

  get company_type(): CompanyType {
    return this._company_type;
  }

  get description(): Description {
    return this._description;
  }

  get personality(): CharacterPersonality {
    return this._personality;
  }

  get appearance(): CharacterAppearance {
    return this._appearance;
  }

  get is_active(): boolean {
    return this._is_active;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  // Business methods
  updateName(name: Name): void {
    this._name = name;
    this._updated_at = new Date();
  }

  updateDescription(description: Description): void {
    this._description = description;
    this._updated_at = new Date();
  }

  updatePersonality(personality: CharacterPersonality): void {
    this._personality = personality;
    this._updated_at = new Date();
  }

  updateAppearance(appearance: CharacterAppearance): void {
    this._appearance = appearance;
    this._updated_at = new Date();
  }

  activate(): void {
    this._is_active = true;
    this._updated_at = new Date();
  }

  deactivate(): void {
    this._is_active = false;
    this._updated_at = new Date();
  }

  isCompatibleWith(companyType: CompanyType): boolean {
    return (
      this._company_type === companyType ||
      this._company_type === CompanyType.STARTUP
    );
  }

  getGreetingMessage(): string {
    const greetings = {
      [CharacterRole.HR]:
        "Hi! I'm excited to learn more about you and discuss how you might fit into our team culture.",
      [CharacterRole.TECH_LEAD]:
        "Hello! Let's dive into your technical experience and problem-solving approach.",
      [CharacterRole.CTO]:
        "Welcome! I'm looking forward to discussing your technical vision and leadership experience.",
      [CharacterRole.PRODUCT_MANAGER]:
        "Hi there! Let's talk about your product thinking and user-focused approach.",
      [CharacterRole.SENIOR_ENGINEER]:
        "Hey! Ready to explore some technical challenges and discuss your engineering experience?",
    };
    return greetings[this._role];
  }

  // Static factory methods
  static create(
    props: Omit<CharacterProps, "id" | "created_at" | "updated_at">
  ): Character {
    return new Character(props);
  }

  static fromPersistence(props: CharacterProps): Character {
    return new Character(props);
  }

  // Serialization
  toJSON() {
    return {
      id: this._id.value,
      name: this._name.value,
      role: this._role,
      gender: this._gender,
      company_type: this._company_type,
      description: this._description.value,
      personality: this._personality,
      appearance: this._appearance,
      is_active: this._is_active,
      created_at: this._created_at.toISOString(),
      updated_at: this._updated_at.toISOString(),
    };
  }
}
