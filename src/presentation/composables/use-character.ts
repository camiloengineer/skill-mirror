import { ref, computed } from "vue";
import type { Character } from "../../domain/entities/character";
import {
  CharacterRole,
  CompanyType,
  Gender,
} from "../../domain/value-objects/enums";
import { createCharacterUseCases } from "../../application/services/application-service";

// This composable now uses real use cases with dependency injection

export interface UseCharacterParams {
  autoFetch?: boolean;
}

export interface CharacterFilters {
  role?: CharacterRole;
  gender?: Gender;
  companyType?: CompanyType;
  activeOnly?: boolean;
}

export const useCharacter = (params: UseCharacterParams = {}) => {
  const characters = ref<Character[]>([]);
  const selectedCharacter = ref<Character | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed properties
  const activeCharacters = computed(() =>
    characters.value.filter((char) => char.is_active)
  );

  const charactersByRole = computed(
    () => (role: CharacterRole) =>
      characters.value.filter((char) => char.role === role)
  );

  const charactersByCompanyType = computed(
    () => (companyType: CompanyType) =>
      characters.value.filter(
        (char) =>
          char.company_type === companyType ||
          char.company_type === CompanyType.STARTUP
      )
  );

  // Actions
  const fetchCharacters = async (filters?: CharacterFilters) => {
    loading.value = true;
    error.value = null;

    try {
      const useCases = await createCharacterUseCases();
      const result = await useCases.getCharacters.execute({
        role: filters?.role,
        gender: filters?.gender,
        company_type: filters?.companyType,
        active_only: filters?.activeOnly,
      });

      characters.value = result;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch characters";
    } finally {
      loading.value = false;
    }
  };

  const getCharacterById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const useCases = await createCharacterUseCases();
      const result = await useCases.getCharacterById.execute(id);

      selectedCharacter.value = result;
      return result;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to get character";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchActiveCharacters = async () => {
    loading.value = true;
    error.value = null;

    try {
      const useCases = await createCharacterUseCases();
      const result = await useCases.getActiveCharacters.execute();

      characters.value = result;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : "Failed to fetch active characters";
    } finally {
      loading.value = false;
    }
  };

  const selectCharacter = (character: Character | null) => {
    selectedCharacter.value = character;
  };

  const clearSelection = () => {
    selectedCharacter.value = null;
  };

  const clearError = () => {
    error.value = null;
  };

  // Auto-fetch if requested
  if (params.autoFetch) {
    fetchActiveCharacters();
  }

  return {
    // State
    characters,
    selectedCharacter,
    loading,
    error,

    // Computed
    activeCharacters,
    charactersByRole,
    charactersByCompanyType,

    // Actions
    fetchCharacters,
    fetchActiveCharacters,
    getCharacterById,
    selectCharacter,
    clearSelection,
    clearError,
  };
};
