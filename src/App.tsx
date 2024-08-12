import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCommentsRequest } from './api/comments/getCommentsRequest';
import { getAuthorsRequest } from './api/authors/getAuthorsRequest';
import CommentCard from './components/CommentCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { TCommentsResponse, TComment } from './types/interface';
import { useLikes } from './context/LikesContext';
import LoadingScreen from './components/LoadingScreen';
import './index.css';

function App() {
	const {
		data: commentsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: ['comments'],
		queryFn: ({ pageParam = 1 }) => getCommentsRequest(pageParam),
		getNextPageParam: lastPage => {
			const typedLastPage = lastPage as TCommentsResponse;
			const nextPage = typedLastPage.pagination.page + 1;
			return nextPage <= typedLastPage.pagination.total_pages
				? nextPage
				: undefined;
		},
		initialPageParam: 1,
	});

	const { data: authorsData, isLoading: isAuthorsLoading } = useQuery({
		queryKey: ['authors'],
		queryFn: getAuthorsRequest,
	});

	const { totalLikes, isLoading: isLikesLoading } = useLikes();

	if (isAuthorsLoading || isLikesLoading) return <LoadingScreen />;
	if (isError) return <div>Error loading comments: {error.message}</div>;

	const comments = commentsData?.pages.flatMap(page => page.data) || [];

	const usersMap =
		authorsData?.users?.reduce(
			(map: { [x: string]: unknown }, user: { id: string | number }) => {
				map[user.id] = user;
				return map;
			},
			{} as Record<number, { name: string; avatar: string }>
		) || {};

	const sortedComments = comments.sort(
		(a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
	);

	const buildCommentTree = (
		comments: TComment[],
		parentId: number | null
	): TComment[] => {
		return comments
			.filter(comment => comment.parent === parentId)
			.map(comment => ({
				...comment,
				replies: buildCommentTree(comments, comment.id),
			}));
	};

	const rootComments = buildCommentTree(sortedComments, null);

	const totalComments = comments.length;

	return (
		<div className="flex items-center flex-col gap-1 app">
			<div className="flex justify-between w-[600px] text-white">
				<p>{totalComments} Комментариев</p>
				<div className="flex gap-1">
					<FavoriteBorderIcon />
					<p>{totalLikes}</p>
				</div>
			</div>
			<div className="w-[600px] h-[2px] bg-gray-600"></div>
			{rootComments.map((comment: TComment) => (
				<CommentCard
					key={comment.id}
					comment={comment}
					replies={comment.replies || []}
					user={usersMap[comment.author]}
					usersMap={usersMap}
				/>
			))}
			<button
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage || isFetchingNextPage}
				className="text-white w-[200px] bg-slate-600"
			>
				{isFetchingNextPage
					? 'Загрузка...'
					: hasNextPage
					? 'Загрузить еще'
					: 'Нету больше контента'}
			</button>
		</div>
	);
}

export default App;
