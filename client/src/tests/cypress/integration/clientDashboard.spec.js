 describe('Test', function() {

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Clients').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log in').click();
        cy.url().should('include', '/clientDashboard/606e1976b98e8e01929206da');
      });

    it('Basic User Login Test', function() {
        cy.visit('/');
        cy.contains('Clients').should('be.visible');
        cy.findByTestId('basicUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('johnthompson@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('john1234'); 
        cy.get('button').contains('Log in').click();
        // should be redirected to the clientDashboard
        cy.url().should('include', '/clientDashboard/606e1976b98e8e01929206da'); 
    });

    /* 
        Note: Due to secure routing implemented in the application, integration tests seem to 
        require starting from the login to reach the functionality we are trying to test.
    */
    it('Searchbox functionality Test', function() { 
        cy.get('input[placeholder="Search…"]').focus().click().type('{enter}abs');
        cy.contains('bodybuilding').should('exist');
        cy.contains('fitness').should('exist');
        cy.contains('fatloss').should('exist');
        cy.contains('abs').should('exist');
        cy.contains('biceps').should('exist');
    }); 

    it('should have home icon button', function() {
        cy.findByTestId('homeButton').focus().click();
        cy.url().should('include', '/homePage/606e1976b98e8e01929206da');
    })

    it('should have home page', function() {
        cy.findByTestId('homeButton').focus().click();
        cy.url().should('include', '/homePage/606e1976b98e8e01929206da');
        cy.contains('John Thompson').should('exist');
        cy.contains('Services').should('exist');
        cy.contains('Goals').should('exist');
        cy.contains('Add Goal').should('exist');
        cy.contains('Edit Goals').should('exist');
    })  
    
    it('should have contact us page', function() {
        cy.findByTestId('ToggleButton').focus().click().focus().get('span').contains('Contact').click({force: true});
        cy.url().should('include', '/user/contactUs/606e1976b98e8e01929206da');
        cy.contains('Contact Us').should('exist');
        cy.contains('Subject').should('exist');
        cy.contains('Your message').should('exist');
        cy.get('textarea[placeholder="Write the subject here"]').focus().type('Test Contact');
        cy.get('textarea[placeholder="Write your message here"]').focus().type('Test Contact'); 
        cy.contains('Send').should('exist').click();
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains('Your message has been sent!');
         })
    })   

    it('should have buckets icon button', function() {
        cy.findByTestId('bucketsButton').focus().click();
        cy.url().should('include', '/user/myBuckets/606e1976b98e8e01929206da');
        cy.findByTestId('createNewbucket').should('exist');
        // cy.focused();
        // cy.contains('Bucket Name').should('exist');
        // cy.get('input[placeholder="title"]').type('Test Bucket');
        // cy.contains('Save').should('exist').click();
        // cy.get('span').get('h5').contains('TEST').should('exist');
        // cy.contains('My Buckets').should('exist');
    })

    it('should have services icon button', function() {
        cy.findByTestId('myServicesButton').focus().click();
        cy.url().should('include', '/user/myservices/606e1976b98e8e01929206da');
        cy.contains('You currently have no services.').should('exist');
        //cy.contains('My Bundles').should('exist');
    })

    it('should have profile page', function() {
        cy.findByTestId('ToggleButton').focus().click().focus().get('span').contains('Profile').click({force: true});
         cy.url().should('include', '/user/profile/606e1976b98e8e01929206da');
         cy.contains('John Thompson').should('exist');
         cy.contains('Body Data').should('exist');
         cy.contains('Goals').should('exist');
    })    
    
    it('should log out', function() {
        cy.findByTestId('ToggleButton').focus().click().focus().get('span').contains('Log out').click({force: true});
        cy.url().should('include', '/', ()=> {
            expect(localStorage.getItem('user')).to.be.null
        })
    })  
});
