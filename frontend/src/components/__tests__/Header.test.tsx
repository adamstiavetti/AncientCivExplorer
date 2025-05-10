import {render, screen} from "@testing-library/react";
import Header from "../Header.tsx";
import {expect} from "vitest";
import {userEvent} from "@testing-library/user-event";

describe('Header', () => {
    it('should render a header with title', () => {
        const mockMenuClick = vi.fn();

        render(<Header onMenuClick={mockMenuClick}/>);

        expect(screen.getByText('Ancient Earth Explorer')).toBeInTheDocument();
    });

    it('should render a menu button and is functional', async () => {
        const mockClick = vi.fn();

        render(<Header onMenuClick={mockClick}/>);

        const menuButton = screen.getByRole('button', { name: /menu/i});

        expect(menuButton).toBeInTheDocument();

        await userEvent.click(menuButton);
        expect(mockClick).toHaveBeenCalled();
    });

    it('should render a search bar', async () => {
        const mockClick = vi.fn();
        render(<Header onMenuClick={mockClick}/>)

        const searchBar = screen.getByLabelText('search');

        expect(searchBar).toBeInTheDocument();

    });

    it('should render navigation links when menubar is clicked', () => {
        const mockClick = vi.fn();
        render(<Header onMenuClick={mockClick}/>);

        expect

    });
});
