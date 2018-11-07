describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:3000');
    cy.get('#login_login').type('amir');
    cy.get('#login_password').type('1234');
    cy.contains('Log In').click();

    cy.get('.fa-tachometer').trigger('mouseover');
    cy.url().should('include', '/facts_values');
  });
});
