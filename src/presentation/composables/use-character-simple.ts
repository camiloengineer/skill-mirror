import { ref, computed } from "vue";
import { Character } from "../../domain/entities/character";
import {
  CharacterRole,
  CompanyType,
  Gender,
} from "../../domain/value-objects/enums";
import { Name, Description } from "../../domain/value-objects/common";

// Simplified composable with mock data to avoid dependency chain issues

export interface UseCharacterParams {
  autoFetch?: boolean;
}

export interface CharacterFilters {
  role?: CharacterRole;
  gender?: Gender;
  companyType?: CompanyType;
  activeOnly?: boolean;
}

// Mock character data for testing
const createMockCharacters = (): Character[] => {
  return [
    Character.create({
      name: Name.from("Sarah Chen"),
      role: CharacterRole.HR,
      gender: Gender.FEMALE,
      company_type: CompanyType.STARTUP,
      description: Description.from(
        "HR professional with expertise in startup cultures and talent acquisition"
      ),
      personality: {
        traits: ["friendly", "professional", "thorough"],
        communication_style: "warm and approachable",
        expertise_areas: ["recruiting", "culture building", "team dynamics"],
        interview_approach: "behavioral questions and cultural fit assessment",
      },
      appearance: {
        avatar_url: "/images/characters/sarah-chen.jpg",
        idle_video_url: "/videos/sarah-idle.mp4",
        greeting_video_url: "/videos/sarah-greeting.mp4",
        thinking_video_url: "/videos/sarah-thinking.mp4",
      },
      is_active: true,
    }),
    Character.create({
      name: Name.from("David Rodriguez"),
      role: CharacterRole.TECH_LEAD,
      gender: Gender.MALE,
      company_type: CompanyType.FAANG,
      description: Description.from(
        "Senior technical leader with expertise in system design and team management"
      ),
      personality: {
        traits: ["analytical", "detail-oriented", "collaborative"],
        communication_style: "direct and technical",
        expertise_areas: [
          "system design",
          "code review",
          "technical leadership",
        ],
        interview_approach:
          "technical problem solving and architecture discussions",
      },
      appearance: {
        avatar_url: "/images/characters/david-rodriguez.jpg",
        idle_video_url: "/videos/david-idle.mp4",
        greeting_video_url: "/videos/david-greeting.mp4",
        thinking_video_url: "/videos/david-thinking.mp4",
      },
      is_active: true,
    }),
    Character.create({
      name: Name.from("Emily Johnson"),
      role: CharacterRole.CTO,
      gender: Gender.FEMALE,
      company_type: CompanyType.ENTERPRISE,
      description: Description.from(
        "Experienced CTO with deep knowledge in enterprise architecture and strategic planning"
      ),
      personality: {
        traits: ["strategic", "visionary", "results-driven"],
        communication_style: "executive and big-picture focused",
        expertise_areas: [
          "enterprise architecture",
          "strategic planning",
          "technology leadership",
        ],
        interview_approach:
          "executive assessment and strategic thinking evaluation",
      },
      appearance: {
        avatar_url: "/images/characters/emily-johnson.jpg",
        idle_video_url: "/videos/emily-idle.mp4",
        greeting_video_url: "/videos/emily-greeting.mp4",
        thinking_video_url: "/videos/emily-thinking.mp4",
      },
      is_active: true,
    }),
  ];
};

export const useCharacterSimple = (params: UseCharacterParams = {}) => {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      let result = createMockCharacters();

      // Apply filters
      if (filters?.role) {
        result = result.filter((char) => char.role === filters.role);
      }

      if (filters?.gender) {
        result = result.filter((char) => char.gender === filters.gender);
      }

      if (filters?.companyType) {
        result = result.filter(
          (char) => char.company_type === filters.companyType
        );
      }

      if (filters?.activeOnly) {
        result = result.filter((char) => char.is_active);
      }

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
      await new Promise((resolve) => setTimeout(resolve, 100));

      const result =
        characters.value.find((char) => char.id.value === id) || null;
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
    await fetchCharacters({ activeOnly: true });
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
