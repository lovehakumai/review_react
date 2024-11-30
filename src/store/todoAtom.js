import { atom, selector } from "recoil";

export const todoAtom = atom({
    key: 'todoAtom',
    default:[]
});

export const todoLastIdSelector = selector({
    key: 'todoLastIdSelector',
    get:({get}) => {
        const todo = get(todoAtom);
        return todo.at(-1)?.id ?? 0;
    }
});