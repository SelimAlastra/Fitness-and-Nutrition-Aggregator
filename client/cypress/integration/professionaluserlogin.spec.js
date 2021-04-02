describe('Test', function() {

    it('Professional User Login Test', function() {
        cy.visit('http://localhost:3000/');
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

    it('Professional User Dashboard Test', function() {
        cy.visit('http://localhost:3000/professionalDashboard/6063969add5a59ea908e4cb9');
        cy.contains('LOGO');
    });

    it('Form functionality Test', function() {

        cy.visit('http://localhost:3000/');
        cy.contains('Professionals').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('Log In').should('exist');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log In').click();
        cy.url().should('include', '/professionalDashboard/6063969add5a59ea908e4cb9');
        cy.get('input[name="title"]').type('Fitness plan');
        cy.get('input[name="message"]').type('Visit my profile for more information');
        cy.get('input[name="tags"]').type('fitness,plan,healthy');
        cy.get('button').contains('Submit').click();
        cy.get('input[placeholder="Search…').type('fitness');
        cy.contains('#fitness').should('exist');
        cy.contains('#plan').should('exist');
    }); 

});