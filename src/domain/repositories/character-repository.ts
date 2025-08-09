import { Character } from "../entities/character";
import { UniqueId } from "../value-objects/unique-id";
import { CharacterRole, CompanyType, Gender } from "../value-objects/enums";

export interface CharacterFilters {
  role?: CharacterRole;
  gender?: Gender;
  company_type?: CompanyType;
  is_active?: boolean;
}

export interface CharacterRepository {
  findById(id: UniqueId): Promise<Character | null>;
  findAll(filters?: CharacterFilters): Promise<Character[]>;
  findByRole(role: CharacterRole): Promise<Character[]>;
  findByCompanyType(companyType: CompanyType): Promise<Character[]>;
  findActiveCharacters(): Promise<Character[]>;
  save(character: Character): Promise<Character>;
  update(character: Character): Promise<Character>;
  delete(id: UniqueId): Promise<boolean>;
  exists(id: UniqueId): Promise<boolean>;
}
