# typeorm-paginate-nestjs

A pagination utility for NestJS applications using TypeORM.

## Installation

You can install the package using npm or yarn.

### Using npm

```bash
npm install typeorm-paginate-nestjs
```

### Using yarn

```bash
yarn add typeorm-paginate-nestjs
```

## Usage

### Step 1: Import the utility functions and interfaces

In your NestJS service, import the necessary functions and interfaces.

```ts
import { parse, paginate, IPaginateOptions, IPaginated } from "typeorm-paginate-nestjs";
```

### Step 2: Define your service method

Use the `parse` and `paginate` functions in your service method to handle pagination.

```ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { YourEntity } from "./your-entity.entity";
import { parse, paginate, IPaginateOptions, IPaginated } from "typeorm-paginate-nestjs";

@Injectable()
export class YourService {
	constructor(
		@InjectRepository(YourEntity)
		private readonly yourEntityRepository: Repository<YourEntity>
	) {}

	async getPaginatedData(limit: number, page: number): Promise<IPaginated<YourEntity>> {
		const options: IPaginateOptions = parse(limit, page);
		const [data, total] = await this.yourEntityRepository.findAndCount({
			skip: options.page,
			take: options.limit,
		});

		return paginate<YourEntity>({ total, data, options });
	}
}
```

### Step 3: Use the service method in your controller

In your controller, call the service method to get paginated data.

```ts
import { Controller, Get, Query } from "@nestjs/common";
import { YourService } from "./your.service";
import { IPaginated } from "typeorm-paginate-nestjs";
import { YourEntity } from "./your-entity.entity";

@Controller("your-entity")
export class YourController {
	constructor(private readonly yourService: YourService) {}

	@Get()
	async getPaginatedData(@Query("limit") limit: number, @Query("page") page: number): Promise<IPaginated<YourEntity>> {
		return this.yourService.getPaginatedData(limit, page);
	}
}
```

## Interfaces

### IMeta

```ts
interface IMeta {
	totalItems: number;
	itemCount: number;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}
```

### IPaginated

```ts
interface IPaginated<T> {
	items: T[];
	meta: IMeta;
}
```

### IPaginationConfig

```ts
interface IPaginationConfig {
	limit: number;
	page: number;
	query?: any;
}
```

### IPaginateOptions

```ts
interface IPaginateOptions {
	limit: number;
	page: number;
}
```

### IPaginate

```ts
interface IPaginate<T> {
	total: number;
	options: IPaginateOptions;
	data: T[];
}
```

This documentation provides a basic guide to installing and using the `typeorm-paginate-nestjs` package in a NestJS application with TypeORM. Adjust the code as needed to fit your specific use case.
