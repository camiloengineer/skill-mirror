import { Interview } from "../../domain/entities/interview";
import { InterviewRepository } from "../../domain/repositories/interview-repository";
import { CharacterRepository } from "../../domain/repositories/character-repository";
import { CompanyRepository } from "../../domain/repositories/company-repository";
import { UniqueId } from "../../domain/value-objects/unique-id";
import {
  InterviewType,
  InterviewStatus,
  MessageSender,
  MessageType,
} from "../../domain/value-objects/enums";

export interface CreateInterviewCommand {
  character_id: string;
  company_id: string;
  type: InterviewType;
  title: string;
  description?: string;
}

export interface StartInterviewCommand {
  interview_id: string;
}

export interface SendMessageCommand {
  interview_id: string;
  sender: MessageSender;
  type: MessageType;
  content: string;
  metadata?: Record<string, any>;
}

export interface CompleteInterviewCommand {
  interview_id: string;
  score?: number;
  feedback?: string;
}

export class CreateInterviewUseCase {
  constructor(
    private readonly interviewRepository: InterviewRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(command: CreateInterviewCommand): Promise<Interview> {
    const characterId = UniqueId.from(command.character_id);
    const companyId = UniqueId.from(command.company_id);

    // Validate character exists and is active
    const character = await this.characterRepository.findById(characterId);
    if (!character || !character.is_active) {
      throw new Error("Character not found or inactive");
    }

    // Validate company exists and is active
    const company = await this.companyRepository.findById(companyId);
    if (!company || !company.is_active) {
      throw new Error("Company not found or inactive");
    }

    // Check character compatibility with company
    if (!character.isCompatibleWith(company.type)) {
      throw new Error("Character is not compatible with this company type");
    }

    const interview = Interview.create({
      character_id: characterId,
      company_id: companyId,
      type: command.type,
      status: InterviewStatus.PENDING,
      title: command.title,
      description: command.description,
      messages: [],
    });

    return await this.interviewRepository.save(interview);
  }
}

export class StartInterviewUseCase {
  constructor(
    private readonly interviewRepository: InterviewRepository,
    private readonly characterRepository: CharacterRepository
  ) {}

  async execute(command: StartInterviewCommand): Promise<Interview> {
    const interviewId = UniqueId.from(command.interview_id);
    const interview = await this.interviewRepository.findById(interviewId);

    if (!interview) {
      throw new Error("Interview not found");
    }

    interview.start();

    // Add initial greeting message from character
    const character = await this.characterRepository.findById(
      interview.character_id
    );
    if (character) {
      const greetingMessage = character.getGreetingMessage();
      interview.addMessage(
        MessageSender.AI,
        MessageType.TEXT,
        greetingMessage,
        { is_greeting: true }
      );
    }

    return await this.interviewRepository.update(interview);
  }
}

export class SendMessageUseCase {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(command: SendMessageCommand): Promise<Interview> {
    const interviewId = UniqueId.from(command.interview_id);
    const interview = await this.interviewRepository.findById(interviewId);

    if (!interview) {
      throw new Error("Interview not found");
    }

    if (!interview.isActive()) {
      throw new Error("Interview is not active");
    }

    interview.addMessage(
      command.sender,
      command.type,
      command.content,
      command.metadata
    );

    return await this.interviewRepository.update(interview);
  }
}

export class CompleteInterviewUseCase {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(command: CompleteInterviewCommand): Promise<Interview> {
    const interviewId = UniqueId.from(command.interview_id);
    const interview = await this.interviewRepository.findById(interviewId);

    if (!interview) {
      throw new Error("Interview not found");
    }

    interview.complete(command.score, command.feedback);

    return await this.interviewRepository.update(interview);
  }
}

export class GetInterviewUseCase {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(id: string): Promise<Interview | null> {
    const interviewId = UniqueId.from(id);
    return await this.interviewRepository.findById(interviewId);
  }
}

export class GetActiveInterviewsUseCase {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(): Promise<Interview[]> {
    return await this.interviewRepository.findActiveInterviews();
  }
}
