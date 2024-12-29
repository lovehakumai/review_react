describe('Todo App Test', () => {
  beforeEach(()=>{
    cy.intercept('GET', '**').as('pageLoad');
    cy.visit('/todo');
    cy.wait('@pageLoad');
  });
  it("TEST1 : 編集ボタンをクリックして、内容を変更しフォーカスを外すと画面に変更後の値が表示されているかどうか",()=>{
    cy.get('button[aria-label="edit"]').first().click(); // リストの1つ目の編集ボタンをクリック
    cy.get("#standard-basic").should("exist"); // inputタグが表示されている
    cy.get("#standard-basic").clear().type("CYPRESS TODO").blur() // 元の編集内容を変更
    cy.get('p').contains('CYPRESS TODO').should('exist'); // pタグで変更した内容が表示されているかを確認

  });
  it("TEST2 : 削除ボタンをクリックしたら対象のレコードが消えているか",()=>{
    cy.get('button[aria-label="delete"]').first().click();
    cy.get('p').contains('CYPRESS TODO').should('not.exist');
  })
});