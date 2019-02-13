const fireEvent = (state, { touches }) => {
	touches.filter(t => t.type === "press").forEach(t => {
		console.log(t)
	});

	return state;
};

export { fireEvent };