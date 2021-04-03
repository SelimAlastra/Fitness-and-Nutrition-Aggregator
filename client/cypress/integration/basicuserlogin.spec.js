describe('Test', function() {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
       });

    beforeEach(() => {
        cy.visit('/');
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

    it('Basic User Login Test', function() {
        cy.visit('/');
        cy.contains('Basic Users').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('Log In').should('exist');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log In').click();
        // should be redirected to the clientDashboard
        cy.url().should('include', '/clientDashboard/60639559dd5a59ea908e4cb7'); 
        // auth cookie should be present
       //cy.getCookie('XSRF-TOKEN').should('exist')
    });

    /* 
        Note: Due to secure routing implemented in the application, integration tests seem to 
        require starting from the login to reach the functionality we are trying to test.
        Need to find workaround.
        Current Solution: Run login before each test
        cy.request() might help solve this
    */
  it('Searchbox functionality Test', function() { 
        cy.get('input[placeholder="Search…"]').focus().click().type('{enter}abs');
        cy.contains('10 minute ABS WORKOUT').should('exist');
    }); 

});
