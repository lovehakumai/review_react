import React from "react";
import { render, screen, fireEvent, getByLabelText } from "@testing-library/react";
import * as TodoContext from "../src/app/todo/context/TodoContext";
import TodoList from "@/app/todo/components/TodoList";
import InputSection from "../src/app/todo/components/InputSection";
import ListSection from "../src/app/todo/components/ListSection";
import TestComponent from "../src/app/todo/components/TestComponent";
import { saveTodo } from "@/app/actions/todoAction";

// MUIのimportPATHを確認 -- [DESCRIBE3]
import { IconButton, Checkbox } from "@mui/material";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { CheckButton } from "@/app/todo/components/ListItemButtons";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock actions and dependencies
jest.mock("../src/app/actions/todoAction", () => ({
    saveTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    AllTodoLists: jest.fn().mockResolvedValue([
        { id: 1, memo: "Sample Todo 1", status: "false", createDate: new Date(), lastModified: new Date() },
        { id: 2, memo: "Sample Todo 2", status: "true", createDate: new Date(), lastModified: new Date() },
    ]),
}));

// SaveIcon, CancelIconクラスのモック化
jest.mock("@mui/icons-material/Save", () => {
    return function MockSaveIcon(props) {
        console.log("[Mock SaveIcon] Props:", props);
        return <svg {...props} data-testid="mock-save-icon">MockSaveIcon</svg>;
    };
});
jest.mock("@mui/icons-material/Cancel", () => {
    return function MockCancelIcon(props) {
        console.log("[Mock CancelIcon] Props:", props);
        return <svg {...props} data-testid="mock-cancel-icon">MockCancelIcon</svg>;
    };
});
jest.mock("@mui/material", () => ({
    ...jest.requireActual("@mui/material"),
    IconButton: (props) => <button {...props}>{props.children}</button>,
    TextField: ({ label, id, ...props }) => (
        <div>
            <label htmlFor={id}>Your New Todo</label>
            <input id={id} {...props} />
        </div>
    ),
    Checkbox: (props)=>{
        console.log("[Mock CheckBox] Props:", props);
        return <svg {...props} data-testid="mock-checkbox">MockCheckBox</svg>
    },
}));
jest.mock("@mui/icons-material/CheckBoxOutlineBlank", () => {
    return function MockCheckBoxOutlineBlank(props) {
        console.log("[Mock CheckBoxOutlineBlank] Props:", props);
        return <svg {...props} data-testid="mock-checkbox-outline-blank">MockCheckBoxOutlineBlank</svg>;
    };
});
jest.mock("@mui/icons-material/Delete", () => {
    return function MockDelete(props) {
        console.log("[Mock DeleteIcon] Props:", props);
        return <svg {...props} data-testid="mock-delete-icon">MockDelete</svg>;
    };
});
jest.mock("@mui/icons-material/Edit", ()=>{
    return function MockEdit(props) {
        console.log("[Mock Edit] Props:", props);
        return <svg {...props} data-testid="mock-edit-icon">MockEdit</svg>;
    }
})

// useEditをモック化
jest.mock("../src/app/todo/context/TodoContext", ()=>({
    ...jest.requireActual("../src/app/todo/context/TodoContext"),
    useEdit: jest.fn(),
}));

// アクション関数をモック化
jest.mock("@/app/actions/todoAction",()=>({
    ...jest.requireActual("@/app/actions/todoAction"),
    saveTodo: jest.fn(),
}));

describe("[DESCRIBE2] TodoList Application Tests", () => {
    beforeEach(()=>{
        jest.clearAllMocks();
        TodoContext.useEdit.mockReturnValue({
            editingId: null,
            todoAll: [
                { id: 1, memo: "First Todo", status: "false", createDate: new Date(), lastModified: new Date() },
                { id: 2, memo: "Second Todo", status: "true", createDate: new Date(), lastModified: new Date() },
            ],
            isLoading: false,
            toggleEditMode: jest.fn(),
            latestAllTodo: jest.fn(),
        });
    });

    describe("3 - ListSectionの動作を検証", () => {

        test("3-1 初回レンダリング時にLoadingSpinnerになっているのか", () => {
            const {useEdit} = require("../src/app/todo/context/TodoContext");
            useEdit.mockReturnValueOnce({
                isLoading: true,
                todoAll: [],
                editingId: null,
                latestAllTodo: jest.fn(),
                toggleEditMode: jest.fn(),
            })
            const { getByText } = render(
                    <TodoContext.EditProvider>
                        <ListSection />
                    </TodoContext.EditProvider>
            );
            expect(getByText(/NOW LOADING/i)).toBeInTheDocument();
        });
        test("3-2 初期レンダリングで現状のデータが全て表示されるのか", async () => {
            const { findByText } = render(
                    <TodoContext.EditProvider>
                        <ListSection />
                    </TodoContext.EditProvider>
            );

            const FirstTodo = await findByText("First Todo");
            const SecondTodo = await findByText("Second Todo");
            expect(FirstTodo).toBeInTheDocument();
            expect(SecondTodo).toBeInTheDocument();
        });
    });
});