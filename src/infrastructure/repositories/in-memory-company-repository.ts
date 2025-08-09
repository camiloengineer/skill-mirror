import { Company } from "../../domain/entities/company";
import {
  CompanyRepository,
  CompanyFilters,
} from "../../domain/repositories/company-repository";
import { UniqueId } from "../../domain/value-objects/unique-id";
import { CompanyType } from "../../domain/value-objects/enums";

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];

  async findById(id: UniqueId): Promise<Company | null> {
    const company = this.companies.find((c) => c.id.equals(id));
    return company || null;
  }

  async findAll(filters?: CompanyFilters): Promise<Company[]> {
    let filteredCompanies = [...this.companies];

    if (filters?.type) {
      filteredCompanies = filteredCompanies.filter(
        (c) => c.type === filters.type
      );
    }

    if (filters?.is_active !== undefined) {
      filteredCompanies = filteredCompanies.filter(
        (c) => c.is_active === filters.is_active
      );
    }

    return filteredCompanies;
  }

  async findByType(type: CompanyType): Promise<Company[]> {
    return this.companies.filter((c) => c.type === type);
  }

  async findActiveCompanies(): Promise<Company[]> {
    return this.companies.filter((c) => c.is_active);
  }

  async save(company: Company): Promise<Company> {
    this.companies.push(company);
    return company;
  }

  async update(company: Company): Promise<Company> {
    const index = this.companies.findIndex((c) => c.id.equals(company.id));
    if (index === -1) {
      throw new Error("Company not found");
    }
    this.companies[index] = company;
    return company;
  }

  async delete(id: UniqueId): Promise<boolean> {
    const index = this.companies.findIndex((c) => c.id.equals(id));
    if (index === -1) {
      return false;
    }
    this.companies.splice(index, 1);
    return true;
  }

  async exists(id: UniqueId): Promise<boolean> {
    return this.companies.some((c) => c.id.equals(id));
  }

  // Helper method for seeding data
  seed(companies: Company[]): void {
    this.companies = [...companies];
  }

  // Helper method for testing
  clear(): void {
    this.companies = [];
  }
}
