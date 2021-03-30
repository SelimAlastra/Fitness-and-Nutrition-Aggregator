describe('Test', function(){

    it('test1',function(){
      cy.visit('http://localhost:3000');
      cy.contains('Basic User').click()
      cy.contains('Log in').should('exist')
    })
});