export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>
}

//

enum HealtCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
};

interface EntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;
}

interface OccupationalHealthCareEntry extends EntryBase {
  type: "OccupationalHealthcare";
  diagnosisCodes?: Array<string>;
  employerName: string;
  sickLeave?: {
      startDate: string,
      endDate: string,
  };
}

interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealtCheckRating;
}

interface HospitalEntry extends EntryBase {
  type: "Hospital";
  diagnosisCodes?: Array<string>;
  discharge: {
      date: string,
      criteria: string,
  };
}

export type Entry = OccupationalHealthCareEntry | HealthCheckEntry | HospitalEntry;
