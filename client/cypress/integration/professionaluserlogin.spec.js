describe('Test', function() {

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Professionals').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('Log In').should('exist');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log In').click();
        cy.url().should('include', '/professionalDashboard/6063969add5a59ea908e4cb9'); 
      });


    it('Professional User Login Test', function() {
        cy.visit('/');
        cy.contains('Professionals').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('Log In').should('exist');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log In').click();
        cy.url().should('include', '/professionalDashboard/6063969add5a59ea908e4cb9'); 
        //check for auth and cookies
    });

    it('should have home icon button', function() {
        cy.findByTestId('proHomeButton').focus().should('exist');
        //currently home button redirects to landing page
    })

    it('should have add bundles button', function() {
        cy.findByTestId('addBundlesButton').focus().click();
        cy.url().should('include', '/professional/services/add/6063969add5a59ea908e4cb9');
    })

    it('Form functionality Test', function() {
        cy.get('input[name="title"]').type('Fitness plan');
        cy.get('input[name="message"]').type('Visit my profile for more information');
        cy.get('input[name="tags"]').type('fitness,plan,healthy');
        cy.get('button').contains('Submit').click();
        cy.get('input[placeholder="Search…').focus().type('fitness');
        cy.contains('#fitness').should('exist');
        cy.contains('#plan').should('exist');
    }); 

});