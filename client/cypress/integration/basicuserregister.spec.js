describe('Test', function() {

    it('Basic User Register Test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Basic Users').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('SIGN UP').should('exist');
        cy.contains('SIGN UP').click();
        cy.get('input[placeholder="Enter your email"]').type('basicUsersTest@gmail.com');
        cy.get('input[placeholder="Insert your name here"]').type('basicUsersTest');
        cy.get('input[placeholder="Create your username"]').type('basicUsersTest');
        //cy.get('input[placeholder="Enter your profession here"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('test1234');
        cy.get('input[placeholder="Re-enter your password"]').type('test1234');  
        cy.get('button').contains('Register').click();
        //cy.url().should('include', '/user/quiz/'); 
        //cy.location('pathname').should('eq', '/user/quiz/:id')
       /*  cy.contains('Woman').should('exist');
        cy.contains('Man').should('exist');
        cy.contains('Other').should('exist'); */
    });
});