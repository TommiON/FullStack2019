interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}
  
interface CourseNormalPart extends CoursePartWithDescription {
    type: "described";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
    type: "special";
    requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;