import { useState } from 'react';

export const usePagination = () => {
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState<'name' | 'email' | 'completed'>('name');
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');

	const toggleOrder = () => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

	return {
		page,
		limit: 3,
		sortBy,
		order,
		setPage,
		setSortBy,
		toggleOrder
	};
};
