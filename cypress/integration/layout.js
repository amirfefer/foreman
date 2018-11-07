describe('Layout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
  });

  it('hover all menu items', () => {
    cy.get('.fa-tachometer').trigger('mouseover');
    cy.contains('Dashboard').should('be.visible');

    cy.get('.fa-server').trigger('mouseover');
    cy.contains('All Hosts').should('be.visible');

    cy.get('.fa-wrench').trigger('mouseover');
    cy.contains('Host Group').should('be.visible');

    cy.get('.pficon-network').trigger('mouseover');
    cy.contains('Smart Proxies').should('be.visible');

    cy.get('.fa-cog').trigger('mouseover');
    cy.contains('Users').should('be.visible');
  });

  it('taxonomies dropdown', () => {
    cy.contains('Any Organization').click();
    cy.contains('Manage Organizations').should('be.visible');

    cy.contains('Any Location').click();
    cy.contains('Manage Locations').should('be.visible');
  });

  it('notfication drawer', () => {
    cy.get('#notifications_container').click();
    cy.contains('No Notifications Available').should('be.visible');
  });

  it('user dropdwon', () => {
    cy.get('#account_menu').click();
    cy.contains('My Account').should('be.visible');
  });

  it('mobile view', () => {
    cy.viewport(550, 750);
    cy.contains('Toggle navigation').click();
    cy.get('.visible-xs-block .fa-user').click();
    cy.contains('My Account').should('be.visible');
  });
});
