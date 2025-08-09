import { Company } from "../entities/company";
import { UniqueId } from "../value-objects/unique-id";
import { CompanyType } from "../value-objects/enums";

export interface CompanyFilters {
  type?: CompanyType;
  is_active?: boolean;
}

export interface CompanyRepository {
  findById(id: UniqueId): Promise<Company | null>;
  findAll(filters?: CompanyFilters): Promise<Company[]>;
  findByType(type: CompanyType): Promise<Company[]>;
  findActiveCompanies(): Promise<Company[]>;
  save(company: Company): Promise<Company>;
  update(company: Company): Promise<Company>;
  delete(id: UniqueId): Promise<boolean>;
  exists(id: UniqueId): Promise<boolean>;
}
