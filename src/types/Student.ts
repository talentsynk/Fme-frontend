export interface IStudentCompData {
	ID: number;
	StateOfResidence: string;
	FirstName: string;
	LastName: string;
	CoursesTaken: string;
	Email: string;
	IsActive: boolean;
	IsGraduated : boolean;
	UserID: number;
	StudentID: string;
	Gender: string;
	PhoneNumber: string;
	CreatedAt?:string;
	SuspendReason ?: string;
}
