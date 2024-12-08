import { render } from '@testing-library/react';
import App from "#App.tsx";

describe('App', () => {
	test('Render App', () => {
		const { container } = render(<App />);
		expect(container).toMatchSnapshot();
		expect(1).toEqual(1);
	});
});