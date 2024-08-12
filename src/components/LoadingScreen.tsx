import React from 'react';

const LoadingScreen = () => {
	return (
		<div className="loading-background flex justify-center items-center">
			<span className="loader"></span>
			<span className="text-white">Loading...</span>
		</div>
	);
};

export default LoadingScreen;