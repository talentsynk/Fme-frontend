export interface ISTCCompData {
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
    stcNo ?: number;    // remove this when the api is ready
    studentNo ?: number;
    coursesNo ?: number;
}