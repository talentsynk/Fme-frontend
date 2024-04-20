export interface IMDACompData {
    ID: number;
    CreatedAt: string;
    UpdatedAt ?: string;
    DeletedAt ?: string | null;
    RegisterName: string;
    Address: string;
    StateOfOperation: string;
    UserID ?: number;
    email: string;
    is_active: boolean;
    stcNo ?: number;
    studentNo ?: number;
    coursesNo ?: number;
}