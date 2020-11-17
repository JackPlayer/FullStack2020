describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: "Tester",
      password: "test123"
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it ('Login form is shown', function() {
    cy.get("#login-form").contains("Login")
  })

  describe('Login', function() {

    it('Successful login', function() {
      cy.get('#username').type("Tester")
      cy.get('#password').type("test123")

      cy.get('#login-form').get('button').click()

      cy.contains('Blogs')
    })

    it('Invalid login', function() {
      cy.get('#username').type("Tester")
      cy.get('#password').type("wrongpass")

      cy.get('#login-form').get('button').click()

      cy.contains('Invalid Credentials')
    })
    
  })
})