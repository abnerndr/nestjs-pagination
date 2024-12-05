import type { IMeta, IPaginate, IPaginated, IPaginateOptions } from "types";

export function parse(limit: number, page: number): IPaginateOptions {
	let options: IPaginateOptions;
	options = {
		limit,
		page: page === 1 ? 0 : (page - 1) * limit,
	};
	return options;
}

export async function paginate<T>({ total, data, options }: IPaginate<T>): Promise<IPaginated<T>> {
	let meta: IMeta;
	meta = {
		totalItems: total,
		itemCount: data.length,
		itemsPerPage: options.limit,
		totalPages: Math.ceil(total / options.limit),
		currentPage: Math.ceil(options.page / options.limit) + 1,
	};
	let paginated: IPaginated<T>;
	paginated = {
		items: data,
		meta,
	};
	return paginated;
}
