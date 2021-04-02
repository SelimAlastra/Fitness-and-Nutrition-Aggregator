describe('Test', function() {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
       });

    it('Basic User Login Test', function() {
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
        cy.get('input[placeholder="Search…"]').focus().click().type('{enter}abs');
        cy.contains('10 minute ABS WORKOUT').should('exist');
    });

    it('Basic User Dashboard Test', function() {
        cy.visit('http://localhost:3000/clientDashboard/60639559dd5a59ea908e4cb7');
        cy.contains('LOGO');
    });

    /* 
        Note: Due to secure routing implemented in the application, integration tests seem to 
        require starting from the login to reach the functionality we are trying to test.
        Need to find workaround.
    */
  it('Searchbox functionality Test', function() { 
        //cy.visit('http://localhost:3000/clientDashboard/60639559dd5a59ea908e4cb7');           
        //cy.get('input[data-testid="searchBox"]').click({force: true}).type('{enter}abs');
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
        cy.get('input[placeholder="Search…"]').focus().click().type('{enter}abs');
        cy.contains('10 minute ABS WORKOUT').should('exist');
    }); 

    /* it('Professional Login Test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Professionals').should('be.visible');
        cy.get('button').contains('Professionals').click();
        cy.focused();
        cy.contains('Log In').should('exist');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log In').click();
        cy.url().should('include', '/professionalDashboard/6063969add5a59ea908e4cb9'); 
    });
 */
    /* it('Form functionality Test', function() {
            cy.get('input[name="title"]').type('Fitness plan');
            cy.get('#form').get('input[name="message"]').type('Visit my profile for more information');
            cy.get('input[name="tags"]').type('fitness,plan,healthy');
            cy.get('button').contains('Submit').click();
            cy.get('input[placeholder="Searching…"]').type('fitness');
            cy.get('Fitness plan').should('exist');
    });  */
});