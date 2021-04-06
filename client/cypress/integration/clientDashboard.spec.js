describe('Test', function() {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
       });

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Basic User').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log in').click();
        cy.url().should('include', '/clientDashboard/60639559dd5a59ea908e4cb7');
      });

    it('Basic User Login Test', function() {
        cy.visit('/');
        cy.contains('Basic User').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log in').click();
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
        cy.contains('10 Minute Home Ab Workout').should('exist');
    }); 

    it('should have home icon button', function() {
        cy.findByTestId('homeButton').focus().click();
        cy.url().should('include', '/homePage/60639559dd5a59ea908e4cb7');
    })

    it('should have home page', function() {
        cy.findByTestId('homeButton').focus().click();
        cy.url().should('include', '/homePage/60639559dd5a59ea908e4cb7');
        cy.contains('John Thompson').should('exist');
        cy.contains('Services you may like').should('exist');
        cy.contains('Goals').should('exist');
        cy.contains('Add Goal').should('exist');
        cy.contains('Edit Goals').should('exist');
    })    

    it('should have my services icon button', function() {
        cy.findByTestId('myServicesButton').focus().click();
        cy.url().should('include', '/user/myservices/60639559dd5a59ea908e4cb7');
        //Add more specific tests once test users are populated with data
        cy.contains('Sorry, no services can be found!').should('exist');
    })

    it('should have profile page', function() {
        cy.findByTestId('ToggleButton').focus().click().focus().get('span').contains('Profile').click({force: true});
         cy.url().should('include', '/profile/60639559dd5a59ea908e4cb7');
         cy.contains('Bio').should('exist');
    })    

    it('should have profile settings', function() {
        cy.findByTestId('ToggleButton').focus().click().focus().get('span').contains('Settings').click({force: true});
         cy.url().should('include', 'edit/60639559dd5a59ea908e4cb7');
         cy.contains('Edit Details').should('exist');
    })  
    
    it('should log out', function() {
        cy.findByTestId('ToggleButton').focus().click().focus().get('span').contains('Log out').click({force: true});
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
