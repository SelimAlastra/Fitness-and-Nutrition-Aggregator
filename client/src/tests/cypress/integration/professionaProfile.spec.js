describe('Test', function() {

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Service Providers').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log in').click();
        cy.url().should('include', '/professionalDashboard/606df969e4e6e1191ef7700a');  
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Profile').click({force: true});
        cy.url().should('include', 'profile/6063969add5a59ea908e4cb9');
      });

      it('should go to edit my details', function() {
        cy.get('h5').contains('Edit my details').click();
        cy.url().should('include', 'edit/6063969add5a59ea908e4cb9');
    })  
    it('should go to edit my services', function() {
        cy.get('h5').contains('Edit my services').click();
        cy.url().should('include', 'services/edit/6063969add5a59ea908e4cb9');
    })     
});