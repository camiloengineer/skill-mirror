import { Interview } from "../entities/interview";
import { UniqueId } from "../value-objects/unique-id";
import { InterviewType, InterviewStatus } from "../value-objects/enums";

export interface InterviewFilters {
  character_id?: UniqueId;
  company_id?: UniqueId;
  type?: InterviewType;
  status?: InterviewStatus;
  started_after?: Date;
  started_before?: Date;
}

export interface InterviewRepository {
  findById(id: UniqueId): Promise<Interview | null>;
  findAll(filters?: InterviewFilters): Promise<Interview[]>;
  findByCharacterId(characterId: UniqueId): Promise<Interview[]>;
  findByCompanyId(companyId: UniqueId): Promise<Interview[]>;
  findByStatus(status: InterviewStatus): Promise<Interview[]>;
  findActiveInterviews(): Promise<Interview[]>;
  findCompletedInterviews(): Promise<Interview[]>;
  save(interview: Interview): Promise<Interview>;
  update(interview: Interview): Promise<Interview>;
  delete(id: UniqueId): Promise<boolean>;
  exists(id: UniqueId): Promise<boolean>;
}
