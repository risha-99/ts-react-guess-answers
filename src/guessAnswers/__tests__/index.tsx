import React from "react";
import { screen, render } from "@testing-library/react";
import { Demo } from "../Demo";

describe('checking for the text in the dom', () => {
    test('check test', () => {
        render(<Demo />)
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    })
})
describe('checking for the list items', () => {
    test('checklist length', () => {
        render(<Demo />);
        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBe(2);
    })
})