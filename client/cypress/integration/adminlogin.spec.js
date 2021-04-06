describe('Test', function() {

    
    beforeEach(() => {
        cy.visit('http://localhost:3000/admin');
        cy.get('input[placeholder="Enter Username"]').type('admin123');
        cy.get('input[placeholder="Password"]').type('admin123'); 
        cy.contains('Login').should('exist');
        cy.contains('Login').click();
        cy.url().should('include', '/admin/basicusers');
      });

    it('Admin Login Test', function() {
        cy.visit('http://localhost:3000/admin');
        cy.get('input[placeholder="Enter Username"]').type('admin123');
        cy.get('input[placeholder="Password"]').type('admin123'); 
        cy.contains('Login').should('exist');
        cy.contains('Login').click();
        cy.url().should('include', '/admin/basicusers'); 
    });

    it('should log out', function() {
        cy.get('a').contains('Logout').click();
        cy.url().should('include', '/'); 
    });

    it('should display basic users', function() {
        cy.contains('johnthompson').should('exist');
        cy.contains('johnthompson@yahoo.com').should('exist');
        cy.get('a[href*="/admin/BasicUsers/60639559dd5a59ea908e4cb7"]').click();
        cy.url().should('include', '/admin/BasicUsers/60639559dd5a59ea908e4cb7'); 
        cy.contains('ID: 60639559dd5a59ea908e4cb7').should('exist');
        cy.contains('Username: johnthompson').should('exist');
        cy.contains('Email: johnthompson@yahoo.com').should('exist');
        cy.contains('isBanned: false').should('exist');
        cy.contains('DOB: 2021-01-01T00:00:00.000Z').should('exist');
    });

    it('should display professional users', function() {
        cy.get('a').contains('Professional Users').click();
        cy.contains('kane').should('exist');
        cy.contains('markkane@yahoo.com').should('exist');
        cy.get('a[href*="/admin/ProfessionalUsers/6063969add5a59ea908e4cb9"]').click();
        cy.url().should('include', '/admin/ProfessionalUsers/6063969add5a59ea908e4cb9'); 
        cy.contains('ID: 6063969add5a59ea908e4cb9').should('exist');
        cy.contains('Username: kane').should('exist');
        cy.contains('Email: markkane@yahoo.com').should('exist');
        cy.contains('isBanned: false').should('exist');
    });
    
    it('should edit a basic user', function() {
        cy.get('a[href*="/admin/BasicUsers/60639559dd5a59ea908e4cb7"]').click();
        cy.url().should('include', '/admin/BasicUsers/60639559dd5a59ea908e4cb7'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/edit/60639559dd5a59ea908e4cb7'); 
        cy.get('input[name="username"]').clear().type('johnthompson1');
        cy.get('input[name="email"]').clear().type('johnthompson1@yahoo.com');
        cy.get('input[name="name"]').clear().type('John Thompson1');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/60639559dd5a59ea908e4cb7'); 
        cy.contains('Username: johnthompson1').should('exist');
        cy.contains('Email: johnthompson1@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson1').should('exist');       
    });

    it('should reset a basic user', function() {
        cy.get('a[href*="/admin/BasicUsers/60639559dd5a59ea908e4cb7"]').click();
        cy.url().should('include', '/admin/BasicUsers/60639559dd5a59ea908e4cb7'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/edit/60639559dd5a59ea908e4cb7'); 
        cy.get('input[name="username"]').clear().type('johnthompson');
        cy.get('input[name="email"]').clear().type('johnthompson@yahoo.com');
        cy.get('input[name="name"]').clear().type('John Thompson');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/60639559dd5a59ea908e4cb7'); 
        cy.contains('Username: johnthompson').should('exist');
        cy.contains('Email: johnthompson@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson').should('exist');       
    });

    /* it('should edit a professional user', function() {
        cy.get('a').contains('Professional Users').click();
        cy.get('a[href*="/admin/ProfessionalUsers/6063969add5a59ea908e4cb9"]').click();
        cy.url().should('include', '/admin/ProfessionalUsers/6063969add5a59ea908e4cb9'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/edit/60639559dd5a59ea908e4cb7'); 
        cy.get('input[name="username"]').clear().type('johnthompson1');
        cy.get('input[name="email"]').clear().type('johnthompson1@yahoo.com');
        cy.get('input[name="name"]').clear().type('John Thompson1');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/60639559dd5a59ea908e4cb7'); 
        cy.contains('Username: johnthompson1').should('exist');
        cy.contains('Email: johnthompson1@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson1').should('exist');       
    }); */



});