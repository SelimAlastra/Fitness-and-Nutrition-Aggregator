describe('Test', function() {

    before(function () {
        cy.fixture('adminUser').then(function(adminUser){
            this.adminUser = adminUser
        })
    })

    it('Admin Login Test', function() {
        cy.visit('http://localhost:3000/admin');
        cy.get('input[placeholder="Enter username"]').type(this.adminUser.username);
        cy.get('input[placeholder="Password"]').type(this.adminUser.password); 
        cy.contains('Login').should('exist');
        cy.contains('Login').click();
        cy.url().should('include', '/admin/6063969add5a59ea908e4cb9'); 
    });
});