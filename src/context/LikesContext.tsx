import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from 'react';
import { getCommentsRequest } from '../api/comments/getCommentsRequest';
import { TComment, TCommentsResponse } from '../types';

interface LikesContextType {
	totalLikes: number;
	incrementLikes: () => void;
	decrementLikes: () => void;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [totalLikes, setTotalLikes] = useState<number>(0);

	const fetchTotalLikes = async () => {
		let total = 0;
		for (let page = 1; page <= 3; page++) {
			const response = await getCommentsRequest(page);
			const typedRespose = response as TCommentsResponse;
			const comments = typedRespose.data || [];
			total += comments.reduce(
				(sum: number, comment: TComment) => sum + comment.likes,
				0
			);
		}
		setTotalLikes(total);
	};

	useEffect(() => {
		fetchTotalLikes();
	}, []);

	const incrementLikes = () => {
		setTotalLikes(totalLikes + 1);
	};
	const decrementLikes = () => {
		setTotalLikes(totalLikes - 1);
	};

	return (
		<LikesContext.Provider
			value={{ totalLikes, incrementLikes, decrementLikes }}
		>
			{children}
		</LikesContext.Provider>
	);
};

export const useLikes = () => {
	const context = useContext(LikesContext);
	if (context === undefined) {
		throw new Error('useLikes must be used within a LikesProvider');
	}
	return context;
};
