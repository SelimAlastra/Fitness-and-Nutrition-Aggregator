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
        cy.get('a[href*="admin/BasicUsers/606e1976b98e8e01929206da"]').click();
        cy.url().should('include', 'admin/BasicUsers/606e1976b98e8e01929206da'); 
        cy.contains('ID: 606e1976b98e8e01929206da').should('exist');
        cy.contains('Username: johnthompson').should('exist');
        cy.contains('Email: johnthompson@yahoo.com').should('exist');
        cy.contains('isBanned: false').should('exist');
        cy.contains('DOB: 2021-04-07T00:00:00.000Z').should('exist');
    });

    it('should display professional users', function() {
        cy.get('a').contains('Professional Users').click();
        cy.contains('kane').should('exist');
        cy.contains('markkane@yahoo.com').should('exist');
        cy.get('a[href*="/admin/ProfessionalUsers/606df969e4e6e1191ef7700a"]').click();
        cy.url().should('include', '/admin/ProfessionalUsers/606df969e4e6e1191ef7700a'); 
        cy.contains('ID: 606df969e4e6e1191ef7700a').should('exist');
        cy.contains('Username: kane').should('exist');
        cy.contains('Email: markkane@yahoo.com').should('exist');
        cy.contains('isBanned: false').should('exist');
    });
    
    it('should edit a basic user', function() {
        cy.get('a[href*="admin/BasicUsers/606e1976b98e8e01929206da"]').click();
        cy.url().should('include', 'admin/BasicUsers/606e1976b98e8e01929206da'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/edit/606e1976b98e8e01929206da'); 
        cy.get('input[name="username"]').clear().type('johnthompson1');
        cy.get('input[name="email"]').clear().type('johnthompson1@yahoo.com');
        cy.get('input[name="name"]').clear().type('John Thompson1');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/606e1976b98e8e01929206da'); 
        cy.contains('Username: johnthompson1').should('exist');
        cy.contains('Email: johnthompson1@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson1').should('exist');       
    });

    it('should reset a basic user', function() {
        cy.get('a[href*="admin/BasicUsers/606e1976b98e8e01929206da"]').click();
        cy.url().should('include', 'admin/BasicUsers/606e1976b98e8e01929206da'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/edit/606e1976b98e8e01929206da'); 
        cy.get('input[name="username"]').clear().type('johnthompson');
        cy.get('input[name="email"]').clear().type('johnthompson@yahoo.com');
        cy.get('input[name="name"]').clear().type('John Thompson');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/BasicUsers/606e1976b98e8e01929206da'); 
        cy.contains('Username: johnthompson').should('exist');
        cy.contains('Email: johnthompson@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson').should('exist');            
    });

    it('should edit a professional user', function() {
        cy.get('a').contains('Professional Users').click();
        cy.url().should('include', '/admin/ProfessionalUsers'); 
        cy.get('a[href*="/admin/ProfessionalUsers/606df969e4e6e1191ef7700a"]').click();
        cy.url().should('include', '/admin/ProfessionalUsers/606df969e4e6e1191ef7700a'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/ProfessionalUsers/edit/606df969e4e6e1191ef7700a'); 
        cy.get('input[name="username"]').clear().type('kane1');
        cy.get('input[name="email"]').clear().type('markkane1@yahoo.com');
        cy.get('input[name="name"]').clear().type('Mark Kane1');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/ProfessionalUsers/606df969e4e6e1191ef7700a'); 
        cy.contains('Username: kane1').should('exist');
        cy.contains('Email: markkane1@yahoo.com').should('exist'); 
        cy.contains('Name: Mark Kane1').should('exist');       
    });

    it('should reset a professional user', function() {
        cy.get('a').contains('Professional Users').click();
        cy.url().should('include', '/admin/ProfessionalUsers'); 
        cy.get('a[href*="/admin/ProfessionalUsers/606df969e4e6e1191ef7700a"]').click();
        cy.url().should('include', '/admin/ProfessionalUsers/606df969e4e6e1191ef7700a'); 
        cy.contains('Edit').should('exist').click();
        cy.url().should('include', '/admin/ProfessionalUsers/edit/606df969e4e6e1191ef7700a'); 
        cy.get('input[name="username"]').clear().type('kane');
        cy.get('input[name="email"]').clear().type('markkane@yahoo.com');
        cy.get('input[name="name"]').clear().type('Mark Kane');
        cy.contains('Update').should('exist').click();
        cy.url().should('include', '/admin/ProfessionalUsers/606df969e4e6e1191ef7700a'); 
        cy.contains('Username: kane').should('exist');
        cy.contains('Email: markkane@yahoo.com').should('exist'); 
        cy.contains('Name: Mark Kane').should('exist');           
    });

    /*  it('should ban a basic user', function() {
        cy.contains('johnthompson').should('exist');
        cy.contains('johnthompson@yahoo.com').should('exist');
        cy.get('a[href*="admin/BasicUsers/606e1976b98e8e01929206da"]').click();
        cy.url().should('include', 'admin/BasicUsers/606e1976b98e8e01929206da');
        cy.contains('Ban').should('exist').click();
        cy.contains('Username: johnthompson').should('exist');
        cy.contains('Email: johnthompson@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson').should('exist');  
        cy.wait(500);
        cy.contains('isBanned: true').should('exist');
        cy.contains('Unban').should('exist').click();
        cy.contains('Username: johnthompson').should('exist');
        cy.contains('Email: johnthompson@yahoo.com').should('exist'); 
        cy.contains('Name: John Thompson').should('exist');  
        cy.contains('isBanned: false').should('exist');        
    }); */

    it('should redirect to Reports', function() {
        cy.get('a').contains('Reports').click();
        cy.url().should('include', '/admin/reports'); 
       
        cy.contains('Reporter Username').should('exist');
        cy.contains('Reported Username').should('exist');
        cy.contains('Reason').should('exist');
        cy.contains('Actions').should('exist');
    });
}); 