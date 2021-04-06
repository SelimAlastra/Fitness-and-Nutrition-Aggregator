describe('Test', function() {

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Professional User').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log in').click();
        cy.url().should('include', '/professionalDashboard/6063969add5a59ea908e4cb9'); 
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Bundles').click({force: true});
        cy.url().should('include', 'services/edit/6063969add5a59ea908e4cb9');
      });

      it('should open pop up to add bundles', function() {
        cy.get('button').contains('Add New Bundle').click();
        cy.focused();
        cy.get('div[role="dialog"]').contains('Add Bundle').should('exist');
    })  

    it('should succesfully add and delete new bundle', function() {
        cy.get('button').contains('Add New Bundle').click();
        cy.focused();
        cy.get('input[placeholder="Title"]').type('Get fit in 2 months bundle');
        cy.get('input[placeholder="Description"]').type('A series of workout to get you in shape in almost no time'); 
        cy.get('input[placeholder="Price"]').type('200$'); 
        cy.get('button').contains('Save').click();
        cy.get('h4').contains('Get fit in 2 months bundle').get('svg[data-icon="trash-alt"]').click();
    })  

    it('should succesfully add video to new bundle', function() {
        cy.get('button').contains('Add New Bundle').click();
        cy.focused();
        cy.get('input[placeholder="Title"]').type('Get fit in 2 months bundle');
        cy.get('input[placeholder="Description"]').type('A series of workout to get you in shape in almost no time'); 
        cy.get('input[placeholder="Price"]').type('200$'); 
        cy.get('button').contains('Save').click();
        cy.get('h4').contains('Get fit in 2 months bundle').should('exist');
        cy.get('svg[class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge"]').click();
        cy.get('div[role="dialog"]').contains('Add Video to Bundle').should('exist');
        cy.get('div[role="dialog"]').get('input[placeholder="Video URL"]').type('https://www.youtube.com/watch?v=aWJo_Fe20aE&ab_channel=TheBodyCoachTV');
        cy.findByTestId("addVideotoBundle").click();
        cy.get('td[class="videoContainer"]').should('exist');
        cy.get('h4').contains('Get fit in 2 months bundle').get('svg[data-icon="trash-alt"]').click();
        

    })  
});