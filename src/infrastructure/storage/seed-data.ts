import { Character } from "../../domain/entities/character";
import { Company } from "../../domain/entities/company";
import { Name, Description } from "../../domain/value-objects/common";
import {
  CharacterRole,
  Gender,
  CompanyType,
} from "../../domain/value-objects/enums";

export const seedCharacters = (): Character[] => {
  const characters: Character[] = [];

  // HR Characters
  characters.push(
    Character.create({
      name: Name.from("Sofia Martinez"),
      role: CharacterRole.HR,
      gender: Gender.FEMALE,
      company_type: CompanyType.STARTUP,
      description: Description.from(
        "Passionate HR professional with expertise in building inclusive startup cultures and identifying top talent."
      ),
      personality: {
        traits: ["empathetic", "communicative", "intuitive", "collaborative"],
        communication_style:
          "warm and approachable, focuses on cultural fit and team dynamics",
        expertise_areas: [
          "culture building",
          "diversity & inclusion",
          "team dynamics",
          "employee engagement",
        ],
        interview_approach:
          "focuses on behavioral questions, team fit, and company values alignment",
      },
      appearance: {
        avatar_url: "/avatars/sofia-martinez.jpg",
        idle_video_url: "/videos/sofia-martinez-idle.mp4",
        greeting_video_url: "/videos/sofia-martinez-greeting.mp4",
        thinking_video_url: "/videos/sofia-martinez-thinking.mp4",
      },
      is_active: true,
    }),
    Character.create({
      name: Name.from("James Chen"),
      role: CharacterRole.HR,
      gender: Gender.MALE,
      company_type: CompanyType.FAANG,
      description: Description.from(
        "Senior HR Business Partner with extensive experience in scaling teams at major tech companies."
      ),
      personality: {
        traits: ["analytical", "strategic", "professional", "detail-oriented"],
        communication_style:
          "structured and thorough, emphasizes process and scalability",
        expertise_areas: [
          "talent acquisition",
          "performance management",
          "organizational development",
          "compliance",
        ],
        interview_approach:
          "systematic evaluation of experience, leadership potential, and cultural alignment",
      },
      appearance: {
        avatar_url: "/avatars/james-chen.jpg",
        idle_video_url: "/videos/james-chen-idle.mp4",
        greeting_video_url: "/videos/james-chen-greeting.mp4",
      },
      is_active: true,
    })
  );

  // Tech Lead Characters
  characters.push(
    Character.create({
      name: Name.from("Alex Rodriguez"),
      role: CharacterRole.TECH_LEAD,
      gender: Gender.MALE,
      company_type: CompanyType.STARTUP,
      description: Description.from(
        "Full-stack tech lead with a passion for mentoring and building scalable solutions in fast-paced environments."
      ),
      personality: {
        traits: ["innovative", "mentoring", "pragmatic", "collaborative"],
        communication_style:
          "hands-on and practical, enjoys diving into technical details",
        expertise_areas: [
          "full-stack development",
          "system architecture",
          "team leadership",
          "agile methodologies",
        ],
        interview_approach:
          "focuses on problem-solving, coding skills, and technical leadership experience",
      },
      appearance: {
        avatar_url: "/avatars/alex-rodriguez.jpg",
        idle_video_url: "/videos/alex-rodriguez-idle.mp4",
        greeting_video_url: "/videos/alex-rodriguez-greeting.mp4",
      },
      is_active: true,
    }),
    Character.create({
      name: Name.from("Emily Watson"),
      role: CharacterRole.TECH_LEAD,
      gender: Gender.FEMALE,
      company_type: CompanyType.ENTERPRISE,
      description: Description.from(
        "Experienced technical architect specializing in enterprise-grade solutions and team development."
      ),
      personality: {
        traits: ["systematic", "thorough", "reliable", "strategic"],
        communication_style:
          "methodical and comprehensive, emphasizes best practices and standards",
        expertise_areas: [
          "enterprise architecture",
          "security",
          "compliance",
          "technical standards",
        ],
        interview_approach:
          "comprehensive technical evaluation with focus on architecture and best practices",
      },
      appearance: {
        avatar_url: "/avatars/emily-watson.jpg",
        idle_video_url: "/videos/emily-watson-idle.mp4",
        greeting_video_url: "/videos/emily-watson-greeting.mp4",
      },
      is_active: true,
    })
  );

  // CTO Characters
  characters.push(
    Character.create({
      name: Name.from("David Kim"),
      role: CharacterRole.CTO,
      gender: Gender.MALE,
      company_type: CompanyType.FAANG,
      description: Description.from(
        "Visionary CTO with expertise in scaling technology organizations and driving innovation at global scale."
      ),
      personality: {
        traits: ["visionary", "strategic", "analytical", "inspiring"],
        communication_style:
          "high-level strategic thinking with focus on long-term vision and impact",
        expertise_areas: [
          "technology strategy",
          "organizational scaling",
          "innovation",
          "digital transformation",
        ],
        interview_approach:
          "focuses on technical leadership, strategic thinking, and ability to drive large-scale change",
      },
      appearance: {
        avatar_url: "/avatars/david-kim.jpg",
        idle_video_url: "/videos/david-kim-idle.mp4",
        greeting_video_url: "/videos/david-kim-greeting.mp4",
      },
      is_active: true,
    }),
    Character.create({
      name: Name.from("Sarah Thompson"),
      role: CharacterRole.CTO,
      gender: Gender.FEMALE,
      company_type: CompanyType.STARTUP,
      description: Description.from(
        "Technical co-founder and CTO with expertise in building technology from ground up and leading engineering teams."
      ),
      personality: {
        traits: ["entrepreneurial", "hands-on", "adaptive", "growth-minded"],
        communication_style:
          "direct and practical, balances technical depth with business acumen",
        expertise_areas: [
          "startup technology strategy",
          "team building",
          "product development",
          "technical co-founding",
        ],
        interview_approach:
          "evaluates technical vision, startup experience, and ability to wear multiple hats",
      },
      appearance: {
        avatar_url: "/avatars/sarah-thompson.jpg",
        idle_video_url: "/videos/sarah-thompson-idle.mp4",
        greeting_video_url: "/videos/sarah-thompson-greeting.mp4",
      },
      is_active: true,
    })
  );

  return characters;
};

export const seedCompanies = (): Company[] => {
  return [
    Company.create({
      name: Name.from("TechFlow Innovations"),
      type: CompanyType.STARTUP,
      description: Description.from(
        "Fast-growing Series C startup revolutionizing workflow automation for remote teams."
      ),
      profile: {
        industry: "SaaS / Productivity Tools",
        size: "150-300 employees",
        culture: ["innovative", "collaborative", "fast-paced", "remote-first"],
        values: [
          "customer obsession",
          "continuous learning",
          "transparency",
          "work-life balance",
        ],
        tech_stack: [
          "React",
          "Node.js",
          "TypeScript",
          "AWS",
          "PostgreSQL",
          "Redis",
        ],
        benefits: [
          "equity package",
          "unlimited PTO",
          "remote work",
          "learning budget",
          "health insurance",
        ],
      },
      logo_url: "/logos/techflow-innovations.svg",
      website_url: "https://techflow.example.com",
      is_active: true,
    }),
    Company.create({
      name: Name.from("GlobalTech Systems"),
      type: CompanyType.FAANG,
      description: Description.from(
        "Leading technology company operating at global scale with millions of users worldwide."
      ),
      profile: {
        industry: "Technology / Cloud Services",
        size: "10,000+ employees",
        culture: ["data-driven", "high-performance", "innovative", "diverse"],
        values: [
          "excellence",
          "customer focus",
          "ownership",
          "continuous improvement",
        ],
        tech_stack: [
          "Java",
          "Python",
          "Go",
          "Kubernetes",
          "Microservices",
          "Cloud Native",
        ],
        benefits: [
          "competitive salary",
          "stock options",
          "comprehensive health",
          "career development",
          "global mobility",
        ],
      },
      logo_url: "/logos/globaltech-systems.svg",
      website_url: "https://globaltech.example.com",
      is_active: true,
    }),
    Company.create({
      name: Name.from("Enterprise Solutions Corp"),
      type: CompanyType.ENTERPRISE,
      description: Description.from(
        "Established enterprise software provider serving Fortune 500 companies for over 20 years."
      ),
      profile: {
        industry: "Enterprise Software",
        size: "5,000-10,000 employees",
        culture: [
          "stable",
          "process-oriented",
          "quality-focused",
          "professional",
        ],
        values: [
          "reliability",
          "security",
          "customer success",
          "professional growth",
        ],
        tech_stack: [
          "Java",
          "C#",
          ".NET",
          "Oracle",
          "SQL Server",
          "Enterprise Architecture",
        ],
        benefits: [
          "stable employment",
          "pension plan",
          "health insurance",
          "professional training",
          "work-life balance",
        ],
      },
      logo_url: "/logos/enterprise-solutions.svg",
      website_url: "https://enterprisesolutions.example.com",
      is_active: true,
    }),
  ];
};
