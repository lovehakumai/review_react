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

describe("[DESCRIBE1] EditProvider Mock Test", ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
        TodoContext.useEdit.mockReturnValue({
            editingId: 1,
            todoAll: [
                { id: 1, memo: "Test Todo", status: "false", createDate: new Date(), lastModified: new Date()},
            ],
            isLoading: false,
            toggleEditMode: jest.fn(),
            latestAllTodo: jest.fn(),
        });
    });

    test("1 - useEdit should provide mock values", ()=>{
        render(
            <TodoContext.EditProvider>
                <TestComponent />
            </TodoContext.EditProvider>
        );

        // check editingId
        const editingId = screen.getByTestId("editingId");
        expect(editingId).toHaveTextContent("1");

        // check isLoading
        const isLoading = screen.getByTestId("isLoading");
        expect(isLoading).toHaveTextContent("false");

        // check todoAl
        const todoItem = screen.getByTestId("todo-1");
        expect(todoItem).toHaveTextContent("Test Todo");
    });
});

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

    describe("1 - 全てのコンポーネントが表示されているかを検証", () => {
        test("Mock SaveIcon and CancelIcon", () => {
            const { Save, Cancel } = jest.requireMock("@mui/icons-material");
            const {TextField} = jest.requireMock("@mui/material");
            render(
                    <>
                        <TextField />
                        <IconButton>
                            <Save color="primary" />
                            <Cancel color="secondary" />
                        </IconButton>
                    </>
                );
        });
        test("1-1 - InputSection", ()=>{
            render(
                <TodoContext.EditProvider>
                        <InputSection />
                </TodoContext.EditProvider>
            );

        })
        test("1-2 - ListSection", ()=>{
            render(
                <TodoContext.EditProvider>
                        <ListSection />
                </TodoContext.EditProvider>
            );
        })
    }
    )

    describe("2 - InputSectionの動作を検証", () => {
        test("2-1 入力枠をクリックした時に入力モードになるか", () => {
            const { container, getByLabelText } = render(
                <TodoContext.EditProvider>
                    <InputSection />
                </TodoContext.EditProvider>
            );
            screen.debug();
            const input = getByLabelText("Your New Todo");
            input.focus();
            expect(input).toHaveFocus();
        });

        test("2-2 保存ボタンを押したときにデータベースへ正しい値が渡されるか", async () => {
            // モックされたsaveTodo
            const mockSaveTodo = saveTodo;
            const {getByLabelText, getByRole} = render(
                <TodoContext.EditProvider>
                    <InputSection />
                </TodoContext.EditProvider>
            );

            // 入力値を変更
            const input = getByLabelText("Your New Todo");
            fireEvent.change(input, { target: { value: "Test Todo" } });

            // 保存ボタンをクリック
            const saveButton = getByRole("button", { name: /save/i });
            console.log("[DEBUG]2-2-2 : ");
            fireEvent.click(saveButton);
            
            // saveTodoが正しい引数で呼び出されたことを検証(mockSaveTodoへの引数が、objectContainingの引数と同じかどうかをみている)
            expect(mockSaveTodo).toHaveBeenCalledWith(
                expect.objectContaining({
                    memo: "Test Todo",
                    status: "false",
                })
            );

            // 呼び出し回数の確認
            expect(mockSaveTodo).toHaveBeenCalledTimes(1);
        });

        test("2-3 入力値がある状態で、削除ボタンを押したとき入力値は全て消えるか", () => {
            render(
                <TodoContext.EditProvider>
                    <InputSection />
                </TodoContext.EditProvider>
            );

            const input = screen.getByLabelText("Your New Todo");
            fireEvent.change(input, { target: { value: "To Be Deleted" } });

            const cancelButton = screen.getByRole("button", { name: /cancel/i });
            fireEvent.click(cancelButton);

            expect(input.value).toBe("");
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

describe("[DESCRIBE3] Check Import ", ()=>{
    
    test("CheckButton renders successfully", () => {
        console.log("[DEBUG]3-1 IconButton : ", IconButton);
        const { getByText } = render(
                <IconButton>aaa</IconButton>
        );
        expect(getByText("aaa")).toBeInTheDocument();
    });
});