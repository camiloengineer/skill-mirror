import { Character } from "../../domain/entities/character";
import { CharacterRepository } from "../../domain/repositories/character-repository";
import { UniqueId } from "../../domain/value-objects/unique-id";
import {
  CharacterRole,
  CompanyType,
  Gender,
} from "../../domain/value-objects/enums";

export interface GetCharactersQuery {
  role?: CharacterRole;
  gender?: Gender;
  company_type?: CompanyType;
  active_only?: boolean;
}

export class GetCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(query: GetCharactersQuery = {}): Promise<Character[]> {
    const filters = {
      role: query.role,
      gender: query.gender,
      company_type: query.company_type,
      is_active: query.active_only,
    };

    return await this.characterRepository.findAll(filters);
  }
}

export class GetCharacterByIdUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<Character | null> {
    const characterId = UniqueId.from(id);
    return await this.characterRepository.findById(characterId);
  }
}

export class GetCharactersByRoleUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(role: CharacterRole): Promise<Character[]> {
    return await this.characterRepository.findByRole(role);
  }
}

export class GetCharactersByCompanyTypeUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(companyType: CompanyType): Promise<Character[]> {
    return await this.characterRepository.findByCompanyType(companyType);
  }
}

export class GetActiveCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<Character[]> {
    return await this.characterRepository.findActiveCharacters();
  }
}
