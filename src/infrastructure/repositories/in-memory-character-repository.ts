import { Character } from "../../domain/entities/character";
import {
  CharacterRepository,
  CharacterFilters,
} from "../../domain/repositories/character-repository";
import { UniqueId } from "../../domain/value-objects/unique-id";
import { CharacterRole, CompanyType } from "../../domain/value-objects/enums";

export class InMemoryCharacterRepository implements CharacterRepository {
  private characters: Character[] = [];

  async findById(id: UniqueId): Promise<Character | null> {
    const character = this.characters.find((c) => c.id.equals(id));
    return character || null;
  }

  async findAll(filters?: CharacterFilters): Promise<Character[]> {
    let filteredCharacters = [...this.characters];

    if (filters?.role) {
      filteredCharacters = filteredCharacters.filter(
        (c) => c.role === filters.role
      );
    }

    if (filters?.gender) {
      filteredCharacters = filteredCharacters.filter(
        (c) => c.gender === filters.gender
      );
    }

    if (filters?.company_type) {
      filteredCharacters = filteredCharacters.filter(
        (c) => c.company_type === filters.company_type
      );
    }

    if (filters?.is_active !== undefined) {
      filteredCharacters = filteredCharacters.filter(
        (c) => c.is_active === filters.is_active
      );
    }

    return filteredCharacters;
  }

  async findByRole(role: CharacterRole): Promise<Character[]> {
    return this.characters.filter((c) => c.role === role);
  }

  async findByCompanyType(companyType: CompanyType): Promise<Character[]> {
    return this.characters.filter(
      (c) =>
        c.company_type === companyType || c.company_type === CompanyType.STARTUP
    );
  }

  async findActiveCharacters(): Promise<Character[]> {
    return this.characters.filter((c) => c.is_active);
  }

  async save(character: Character): Promise<Character> {
    this.characters.push(character);
    return character;
  }

  async update(character: Character): Promise<Character> {
    const index = this.characters.findIndex((c) => c.id.equals(character.id));
    if (index === -1) {
      throw new Error("Character not found");
    }
    this.characters[index] = character;
    return character;
  }

  async delete(id: UniqueId): Promise<boolean> {
    const index = this.characters.findIndex((c) => c.id.equals(id));
    if (index === -1) {
      return false;
    }
    this.characters.splice(index, 1);
    return true;
  }

  async exists(id: UniqueId): Promise<boolean> {
    return this.characters.some((c) => c.id.equals(id));
  }

  // Helper method for seeding data
  seed(characters: Character[]): void {
    this.characters = [...characters];
  }

  // Helper method for testing
  clear(): void {
    this.characters = [];
  }
}
