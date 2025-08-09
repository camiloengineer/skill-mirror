// Application Services - Dependency Injection Container
import {
  GetCharactersUseCase,
  GetCharacterByIdUseCase,
  GetCharactersByRoleUseCase,
  GetCharactersByCompanyTypeUseCase,
  GetActiveCharactersUseCase,
} from "../use-cases/get-characters";
import {
  CreateInterviewUseCase,
  StartInterviewUseCase,
  SendMessageUseCase,
  CompleteInterviewUseCase,
  GetInterviewUseCase,
  GetActiveInterviewsUseCase,
} from "../use-cases/interview-management";
import { InMemoryCharacterRepository } from "../../infrastructure/repositories/in-memory-character-repository";
import { InMemoryCompanyRepository } from "../../infrastructure/repositories/in-memory-company-repository";
import { InMemoryInterviewRepository } from "../../infrastructure/repositories/in-memory-interview-repository";
import {
  seedCharacters,
  seedCompanies,
} from "../../infrastructure/storage/seed-data";

// Singleton repositories (in-memory for now)
let characterRepository: InMemoryCharacterRepository | null = null;
let companyRepository: InMemoryCompanyRepository | null = null;
let interviewRepository: InMemoryInterviewRepository | null = null;

// Initialize repositories with seed data
const initializeRepositories = async () => {
  if (!characterRepository) {
    characterRepository = new InMemoryCharacterRepository();
    characterRepository.seed(seedCharacters());
  }

  if (!companyRepository) {
    companyRepository = new InMemoryCompanyRepository();
    companyRepository.seed(seedCompanies());
  }

  if (!interviewRepository) {
    interviewRepository = new InMemoryInterviewRepository();
  }
};

// Character Use Cases Factory
export const createCharacterUseCases = async () => {
  await initializeRepositories();

  return {
    getCharacters: new GetCharactersUseCase(characterRepository!),
    getCharacterById: new GetCharacterByIdUseCase(characterRepository!),
    getCharactersByRole: new GetCharactersByRoleUseCase(characterRepository!),
    getCharactersByCompanyType: new GetCharactersByCompanyTypeUseCase(
      characterRepository!
    ),
    getActiveCharacters: new GetActiveCharactersUseCase(characterRepository!),
  };
};

// Interview Use Cases Factory
export const createInterviewUseCases = async () => {
  await initializeRepositories();

  return {
    createInterview: new CreateInterviewUseCase(
      interviewRepository!,
      characterRepository!,
      companyRepository!
    ),
    startInterview: new StartInterviewUseCase(
      interviewRepository!,
      characterRepository!
    ),
    sendMessage: new SendMessageUseCase(interviewRepository!),
    completeInterview: new CompleteInterviewUseCase(interviewRepository!),
    getInterview: new GetInterviewUseCase(interviewRepository!),
    getActiveInterviews: new GetActiveInterviewsUseCase(interviewRepository!),
  };
};

// Repository Access (for direct access if needed)
export const getRepositories = async () => {
  await initializeRepositories();

  return {
    characterRepository: characterRepository!,
    companyRepository: companyRepository!,
    interviewRepository: interviewRepository!,
  };
};
