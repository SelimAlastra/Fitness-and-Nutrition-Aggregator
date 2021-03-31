describe('Test', function() {

    it('Basic User Login/Register Test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Basic Users').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('Log In').should('exist');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log In').click();
        cy.url().should('include', '/clientDashboard/60639559dd5a59ea908e4cb7'); 
    });
});