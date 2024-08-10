export interface Author {
	id: number;
	name: string;
	avatar: string;
}

export interface Data {
	id: number;
	created: string;
	text: string;
	author: number;
	parent: null | number;
	likes: number;
}

export interface IPagination {
	pagination: {
		page: number;
		size: number;
		total_pages: number;
	};
	data: Data[];
}

export type TComment = {
	id: number;
	created: string;
	text: string;
	author: number;
	parent: number | null;
	likes: number;
	likedByUser?: boolean;
	replies?: TComment[];
};

export type TCommentsResponse = {
	data: TComment[];
	pagination: {
		page: number;
		total_pages: number;
	};
};
