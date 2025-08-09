import { Interview } from "../../domain/entities/interview";
import {
  InterviewRepository,
  InterviewFilters,
} from "../../domain/repositories/interview-repository";
import { UniqueId } from "../../domain/value-objects/unique-id";
import {
  InterviewType,
  InterviewStatus,
} from "../../domain/value-objects/enums";

export class InMemoryInterviewRepository implements InterviewRepository {
  private interviews: Interview[] = [];

  async findById(id: UniqueId): Promise<Interview | null> {
    const interview = this.interviews.find((i) => i.id.equals(id));
    return interview || null;
  }

  async findAll(filters?: InterviewFilters): Promise<Interview[]> {
    let filteredInterviews = [...this.interviews];

    if (filters?.character_id) {
      filteredInterviews = filteredInterviews.filter((i) =>
        i.character_id.equals(filters.character_id!)
      );
    }

    if (filters?.company_id) {
      filteredInterviews = filteredInterviews.filter((i) =>
        i.company_id.equals(filters.company_id!)
      );
    }

    if (filters?.type) {
      filteredInterviews = filteredInterviews.filter(
        (i) => i.type === filters.type
      );
    }

    if (filters?.status) {
      filteredInterviews = filteredInterviews.filter(
        (i) => i.status === filters.status
      );
    }

    if (filters?.started_after) {
      filteredInterviews = filteredInterviews.filter(
        (i) => i.started_at && i.started_at >= filters.started_after!
      );
    }

    if (filters?.started_before) {
      filteredInterviews = filteredInterviews.filter(
        (i) => i.started_at && i.started_at <= filters.started_before!
      );
    }

    return filteredInterviews;
  }

  async findByCharacterId(characterId: UniqueId): Promise<Interview[]> {
    return this.interviews.filter((i) => i.character_id.equals(characterId));
  }

  async findByCompanyId(companyId: UniqueId): Promise<Interview[]> {
    return this.interviews.filter((i) => i.company_id.equals(companyId));
  }

  async findByStatus(status: InterviewStatus): Promise<Interview[]> {
    return this.interviews.filter((i) => i.status === status);
  }

  async findActiveInterviews(): Promise<Interview[]> {
    return this.interviews.filter(
      (i) => i.status === InterviewStatus.IN_PROGRESS
    );
  }

  async findCompletedInterviews(): Promise<Interview[]> {
    return this.interviews.filter(
      (i) => i.status === InterviewStatus.COMPLETED
    );
  }

  async save(interview: Interview): Promise<Interview> {
    this.interviews.push(interview);
    return interview;
  }

  async update(interview: Interview): Promise<Interview> {
    const index = this.interviews.findIndex((i) => i.id.equals(interview.id));
    if (index === -1) {
      throw new Error("Interview not found");
    }
    this.interviews[index] = interview;
    return interview;
  }

  async delete(id: UniqueId): Promise<boolean> {
    const index = this.interviews.findIndex((i) => i.id.equals(id));
    if (index === -1) {
      return false;
    }
    this.interviews.splice(index, 1);
    return true;
  }

  async exists(id: UniqueId): Promise<boolean> {
    return this.interviews.some((i) => i.id.equals(id));
  }

  // Helper method for seeding data
  seed(interviews: Interview[]): void {
    this.interviews = [...interviews];
  }

  // Helper method for testing
  clear(): void {
    this.interviews = [];
  }
}
