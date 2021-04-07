describe('Test', function() {

   /*  before(function () {
        cy.fixture('basicUser.json').then(function(basicUser){
            this.basicUser = basicUser
        })
    }) */

    it('Basic User Register Test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Clients').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains("Don't have an account? Sign up!").should('exist');
        cy.contains("Don't have an account? Sign up!").click();
        cy.get('input[placeholder="Enter your email"]').type('basicUsersTest@gmail.com');
        cy.get('input[placeholder="Insert your name here"]').type('basicUsersTest');
        cy.get('input[placeholder="Create your username"]').type('basicUsersTest');
        cy.get('input[placeholder="Enter your password"]').type('test1234');
        cy.get('input[placeholder="Re-enter your password"]').type('test1234');  
        cy.get('button').contains('Register').click();
    });

});