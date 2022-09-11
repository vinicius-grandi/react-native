import { render, fireEvent, screen } from '@testing-library/react-native';

const customRender: typeof render = (ui, options) => render(ui, options);

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render, fireEvent, screen };
