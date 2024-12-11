import React from "react"
import {render, screen,fireEvent } from "@testing-library/react";
import TimerCount from "./TimerCount";

describe("Timerount Component", ()=>{
    test("renders with initial state", ()=>{
        render(<TimerCount />);
        // 初期カウントの確認
        const countElement = screen.getByText("10");
        expect(countElement).toBeInTheDocument();
        // 初期結果の確認
        const resultElement = screen.queryByText(/Congratulation|Failed/);
        expect(resultElement).tobeNull();
    })
});

test("starts timer when play button is clicked", ()=>{
    jest.useFakeTimers();
})