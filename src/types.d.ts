export interface IMeta {
	totalItems: number;
	itemCount: number;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}

export interface IPaginated<T> {
	items: T[];
	meta: IMeta;
}

export interface IPaginationConfig {
	limit: number;
	page: number;
	query?: any;
}

export interface IPaginateOptions {
	limit: number;
	page: number;
}

export interface IPaginate<T> {
	total: number;
	options: IPaginateOptions;
	data: T[];
}
