describe('Test', function() {

    it('Basic User Register Test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Professionals').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('SIGN UP').should('exist');
        cy.contains('SIGN UP').click();
        cy.get('input[placeholder="Enter your email"]').type('professionalUsersTest@gmail.com');
        cy.get('input[placeholder="Insert your name here"]').type('professionalUsersTest');
        cy.get('input[placeholder="Create your username"]').type('professionalUsersTest');
        cy.get('input[placeholder="Enter your profession here"]').type('Test');
        cy.get('input[placeholder="Enter your password"]').type('test1234');
        cy.get('input[placeholder="Re-enter your password"]').type('test1234');  
        cy.get('button').contains('Register').click();
    });
});