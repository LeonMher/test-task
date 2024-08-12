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
	isLoading: boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [totalLikes, setTotalLikes] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchTotalLikes = async () => {
		try {
			setIsLoading(true);
			let total = 0;
			for (let page = 1; page <= 3; page++) {
				const response = await getCommentsRequest(page);
				const typedResponse = response as TCommentsResponse;
				const comments = typedResponse.data || [];
				total += comments.reduce(
					(sum: number, comment: TComment) => sum + comment.likes,
					0
				);
			}
			setTotalLikes(total);
		} catch (error) {
			console.error('Error fetching total likes:', error);
		} finally {
			setIsLoading(false);
		}
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
			value={{ totalLikes, incrementLikes, decrementLikes, isLoading }}
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
