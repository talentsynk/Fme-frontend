export interface IMDACompData {
    Id: number;
    CreatedAt: string;
    Name: string;
    Address: string;
    StateOfOperation ?: string;
    UserId ?: number;
    email: string;
    is_active: boolean;
    stc_count ?: number;
    student_count ?: number;
    CourseCount ?: number;
}