describe('Test', function() {

    it('Basic User Login/Register Test', function() {
        
        cy.contains('Basic User').click()
        cy.contains('Log in').should('exist')
        cy.contains('Log in').click()
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log In').click();
                 

    });

    it('test2', function() {


    });
});