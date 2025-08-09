import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Character } from "../../domain/entities/character";
import type {
  CharacterRole,
  CompanyType,
  Gender,
} from "../../domain/value-objects/enums";

export interface CharacterState {
  characters: Character[];
  selectedCharacter: Character | null;
  loading: boolean;
  error: string | null;
}

export interface CharacterFilters {
  role?: CharacterRole;
  gender?: Gender;
  companyType?: CompanyType;
  activeOnly?: boolean;
}

export const useCharacterStore = defineStore("character", () => {
  // State
  const characters = ref<Character[]>([]);
  const selectedCharacter = ref<Character | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const activeCharacters = computed(() =>
    characters.value.filter((character) => character.is_active)
  );

  const charactersByRole = computed(
    () => (role: CharacterRole) =>
      characters.value.filter((character) => character.role === role)
  );

  const charactersByCompanyType = computed(
    () => (companyType: CompanyType) =>
      characters.value.filter(
        (character) =>
          character.company_type === companyType ||
          character.company_type === "startup"
      )
  );

  const charactersByGender = computed(
    () => (gender: Gender) =>
      characters.value.filter((character) => character.gender === gender)
  );

  const filteredCharacters = computed(() => (filters: CharacterFilters) => {
    let filtered = characters.value;

    if (filters.role) {
      filtered = filtered.filter((c) => c.role === filters.role);
    }

    if (filters.gender) {
      filtered = filtered.filter((c) => c.gender === filters.gender);
    }

    if (filters.companyType) {
      filtered = filtered.filter((c) => c.company_type === filters.companyType);
    }

    if (filters.activeOnly) {
      filtered = filtered.filter((c) => c.is_active);
    }

    return filtered;
  });

  // Actions
  const fetchCharacters = async (filters?: CharacterFilters) => {
    loading.value = true;
    error.value = null;

    try {
      // This would typically call a service/use case
      // For now, we'll simulate with a timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real implementation, this would call the GetCharactersUseCase
      // const result = await getCharactersUseCase.execute(filters)
      // characters.value = result

      // Placeholder for demo
      characters.value = [];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch characters";
    } finally {
      loading.value = false;
    }
  };

  const selectCharacter = async (characterId: string) => {
    loading.value = true;
    error.value = null;

    try {
      // This would call GetCharacterByIdUseCase
      const character = characters.value.find(
        (c) => c.id.value === characterId
      );
      selectedCharacter.value = character || null;

      if (!character) {
        throw new Error("Character not found");
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to select character";
    } finally {
      loading.value = false;
    }
  };

  const clearSelection = () => {
    selectedCharacter.value = null;
  };

  const clearError = () => {
    error.value = null;
  };

  // Utility methods
  const getCharacterById = (id: string): Character | undefined => {
    return characters.value.find((character) => character.id.value === id) as
      | Character
      | undefined;
  };

  const isCharacterSelected = (id: string): boolean => {
    return selectedCharacter.value?.id.value === id;
  };

  return {
    // State
    characters,
    selectedCharacter,
    loading,
    error,

    // Getters
    activeCharacters,
    charactersByRole,
    charactersByCompanyType,
    charactersByGender,
    filteredCharacters,

    // Actions
    fetchCharacters,
    selectCharacter,
    clearSelection,
    clearError,

    // Utilities
    getCharacterById,
    isCharacterSelected,
  };
});
