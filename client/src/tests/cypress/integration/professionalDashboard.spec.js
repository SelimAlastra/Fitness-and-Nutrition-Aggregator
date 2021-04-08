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
      });


    it('Professional User Login Test', function() {
        cy.visit('/');
        cy.contains('Service Providers').should('be.visible');
        cy.findByTestId('professionalUsersButton').click();
        cy.focused();
        cy.contains('Log in').should('exist');
        cy.get('input[placeholder="Enter your email"]').type('markkane@yahoo.com');
        cy.get('input[placeholder="Enter your password"]').type('kane1234'); 
        cy.get('button').contains('Log in').click();
        cy.url().should('include', '/professionalDashboard/606df969e4e6e1191ef7700a');  
    });

     it('should have home icon button', function() {
        cy.findByTestId('proHomeButton').focus().should('exist');
    }) 

    it('should have add bundles button', function() {
        cy.findByTestId('addPostButton').focus().click();
        cy.get('div[class="modal-dialog"]').contains("Create Post").should('exist');
    })
    
    it('should have profile page', function() {
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Profile').click({force: true});
         cy.url().should('include', 'profile/606df969e4e6e1191ef7700a');
         cy.contains('Services').should('exist');
    })    
     

    it('Form functionality create post', function() {
        cy.findByTestId('addPostButton').focus().click();
        cy.get('div[class="modal-dialog"]').contains("Create Post").should('exist');
        cy.get('input[name="title"]').type('Fitness plan');
        cy.get('input[name="message"]').type('Visit my profile for more information');
        cy.get('input[name="tags"]').type('findTagTest');
        cy.get('button').contains('Submit').click();
    }); 

     
    it('Form functionality find and delete post just created', function() {
        cy.get('input[placeholder="Search…').focus().type('findTagTest');
        cy.get('div[class="MuiPaper-root MuiCard-root makeStyles-card-29 MuiPaper-elevation1 MuiPaper-rounded"]').contains('#findTagTest').get('button').contains('Delete').click(); 
    });

   /*  it('Form functionality edit post', function() {
        cy.findByTestId('addPostButton').focus().click();
        cy.get('div[class="modal-dialog"]').contains("Create Post").should('exist');
        cy.get('input[name="title"]').type('Fitness plan');
        cy.get('input[name="message"]').type('Visit my profile for more information');
        cy.get('input[name="tags"]').type('findTagTest');
        cy.get('button').contains('Submit').click();
        cy.get('input[placeholder="Search…').focus().type('findTagTest');
        cy.get('div[class="MuiPaper-root MuiCard-root makeStyles-card-29 MuiPaper-elevation1 MuiPaper-rounded"]').contains('findTagTest').get('button[class="MuiButtonBase-root MuiButton-root MuiButton-text"]');
        cy.get('button').contains('Edit').click({force: true});
        cy.get('input[name="tags"]').clear();
        cy.get('input[name="tags"]').type('modifytag');
        cy.get('button').contains('Submit').click();
        cy.get('input[placeholder="Search…').focus().type('modifytag');
        cy.get('div[class="MuiPaper-root MuiCard-root makeStyles-card-29 MuiPaper-elevation1 MuiPaper-rounded"]').contains('#modifytag').should('exist');
    }); */

     /*  it('Form functionality like post', function() {
        cy.get('input[placeholder="Search…').focus().type('bodybuilding');
        cy.get('button[class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSizeSmall MuiButton-sizeSmall"]').findByRole("likeButton").click();
        cy.contains('#bodybuilding').get('button[class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSizeSmall MuiButton-sizeSmall"]').findByRole("likeButton").contains('1').should('exist');
    });  */

    it('should log out', function() {
        cy.findByTestId('proToggleButton').focus().click().focus().get('span').contains('Log out').click({force: true});
        cy.url().should('include', '/', ()=> {
            expect(localStorage.getItem('user')).to.be.null
        })
    })   

});