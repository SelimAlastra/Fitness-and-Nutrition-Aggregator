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
    
    it('should have profile page', function() {
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Profile').click({force: true});
         cy.url().should('include', 'profile/6063969add5a59ea908e4cb9');
         cy.contains('Services').should('exist');
         cy.contains('Contact Info').should('exist');
    })    

    it('should have profile settings', function() {
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Settings').click({force: true});
         cy.url().should('include', 'edit/6063969add5a59ea908e4cb9');
         cy.contains('Edit Details').should('exist');
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

    it('should log out', function() {
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Log out').click({force: true});
        // cy.url().should('include', '/');
        cy.url().should('include', '/', ()=> {
            expect(localStorage.getItem('user')).to.be.null
        })
       /*  cy.clearLocalStorage().then((ls) => {
            expect(ls.getItem('_id')).to.be.null
            expect(ls.getItem('email')).to.be.null
            expect(ls.getItem('name')).to.be.null
            expect(ls.getItem('username')).to.be.null
            expect(ls.getItem('type')).to.be.null
          }) */
    })   

});