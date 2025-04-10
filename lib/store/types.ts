export type SocialLink = {
  platform: string;
  url: string;
};

export type Experience = {
  id: number;
  company: string;
  title: string;
  duration: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  graduationYear: string;
};

export type CustomSection = {
  title: string;
  content: string;
};

export type FontSize = "small" | "medium" | "large";

export interface ResumeStore {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    socialLinks: SocialLink[];
  };
  professionalSummary: string;
  experiences: Experience[];
  education: Education[];
  skills: string;
  customSections: CustomSection[];
  fontSize: FontSize;

  setPersonalInfo: (info: Partial<ResumeStore["personalInfo"]>) => void;
  addSocialLink: () => void;
  removeSocialLink: (index: number) => void;

  setProfessionalSummary: (summary: string) => void;
  addExperience: () => void;
  removeExperience: (id: number) => void;
  updateExperienceDescription: (id: number, content: string) => void;

  addEducation: () => void;
  updateSkills: (skills: string) => void;

  addCustomSection: () => void;
  updateCustomSection: (
    id: number,
    field: keyof CustomSection,
    value: string
  ) => void;
  removeCustomSection: (id: number) => void;

  setFontSize: (size: FontSize) => void;
}
