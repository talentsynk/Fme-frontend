export interface ISTCCompData {
    Id: number;
    CreatedAt: string;
    Name: string;
    Address: string;
    StateOfOperation ?: string;
    UserId ?: number;
    Email: string;
    is_active: boolean;
    student_count ?: number;
    CourseCount ?: number;
    CertifiedStudentCount ?: number;
    NonCertifedStudentCount ?: number;
}