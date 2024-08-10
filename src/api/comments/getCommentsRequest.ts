import {
	commentsPage1,
	commentsPage2,
	commentsPage3,
} from '../../data/comments';

export const getCommentsRequest = async (page: number): Promise<unknown> => {
	await new Promise(resolve => setTimeout(resolve, 500));

	switch (page) {
		case 1:
			return commentsPage1;
		case 2:
			return commentsPage2;
		case 3:
			return commentsPage3;
		default:
			return { pagination: { page, size: 6, total_pages: 3 }, data: [] };
	}
};
