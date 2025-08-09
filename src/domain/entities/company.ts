import { UniqueId } from "../value-objects/unique-id";
import { Name, Description } from "../value-objects/common";
import { CompanyType } from "../value-objects/enums";

export interface CompanyProfile {
  industry: string;
  size: string;
  culture: string[];
  values: string[];
  tech_stack?: string[];
  benefits?: string[];
}

export interface CompanyProps {
  id?: UniqueId;
  name: Name;
  type: CompanyType;
  description: Description;
  profile: CompanyProfile;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Company {
  private readonly _id: UniqueId;
  private _name: Name;
  private _type: CompanyType;
  private _description: Description;
  private _profile: CompanyProfile;
  private _logo_url?: string;
  private _website_url?: string;
  private _is_active: boolean;
  private readonly _created_at: Date;
  private _updated_at: Date;

  constructor(props: CompanyProps) {
    this._id = props.id || UniqueId.generate();
    this._name = props.name;
    this._type = props.type;
    this._description = props.description;
    this._profile = props.profile;
    this._logo_url = props.logo_url;
    this._website_url = props.website_url;
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

  get type(): CompanyType {
    return this._type;
  }

  get description(): Description {
    return this._description;
  }

  get profile(): CompanyProfile {
    return this._profile;
  }

  get logo_url(): string | undefined {
    return this._logo_url;
  }

  get website_url(): string | undefined {
    return this._website_url;
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

  updateProfile(profile: CompanyProfile): void {
    this._profile = profile;
    this._updated_at = new Date();
  }

  updateLogoUrl(logoUrl: string): void {
    this._logo_url = logoUrl;
    this._updated_at = new Date();
  }

  updateWebsiteUrl(websiteUrl: string): void {
    this._website_url = websiteUrl;
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

  getInterviewContext(): string {
    const contexts = {
      [CompanyType.STARTUP]:
        "We're a fast-growing startup looking for adaptable team members who thrive in dynamic environments.",
      [CompanyType.FAANG]:
        "We're a major tech company seeking top-tier talent who can operate at scale and drive innovation.",
      [CompanyType.ENTERPRISE]:
        "We're an established enterprise focused on reliability, best practices, and long-term solutions.",
    };
    return contexts[this._type];
  }

  // Static factory methods
  static create(
    props: Omit<CompanyProps, "id" | "created_at" | "updated_at">
  ): Company {
    return new Company(props);
  }

  static fromPersistence(props: CompanyProps): Company {
    return new Company(props);
  }

  // Serialization
  toJSON() {
    return {
      id: this._id.value,
      name: this._name.value,
      type: this._type,
      description: this._description.value,
      profile: this._profile,
      logo_url: this._logo_url,
      website_url: this._website_url,
      is_active: this._is_active,
      created_at: this._created_at.toISOString(),
      updated_at: this._updated_at.toISOString(),
    };
  }
}
