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
    beforeEach(function() {
      
      cy.visit('http://localhost:3000')
    })

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

  describe('When logged in', function() {
    beforeEach(function() {
      const credentials = {
        username: "Tester",
        password: "test123"
      }
      cy.request('POST', 'http://localhost:3001/api/login', credentials)
        .then((res) => {
          localStorage.setItem('loggedBlogUser', JSON.stringify(res.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('Can create new blog', function () {
      cy.contains('New Blog Entry').click()
      cy.get('#input-title').type('New Blog')
      cy.get('#input-author').type('Jack P')
      cy.get('#input-url').type('www.testing123.com')

      cy.contains('button', 'Create').click()

      cy.get('.blog-title')
      cy.get('.blog-author')
    })
  })
})