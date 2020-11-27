describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'Tester',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')

  })

  it ('Login form is shown', function() {
    cy.get('#login-form').contains('Login')
  })

  describe('Login', function() {
    beforeEach(function() {

      cy.visit('http://localhost:3000')
    })

    it('Successful login', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('test123')

      cy.get('#login-form').get('button').click()

      cy.contains('Blogs')
    })

    it('Invalid login', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('wrongpass')

      cy.get('#login-form').get('button').click()

      cy.contains('Invalid Credentials')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      const credentials = {
        username: 'Tester',
        password: 'test123'
      }

      const newBlogOne = {
        url: 'www.southpark.com',
        author: 'Cartman',
        title: 'Respect My Authority',
        likes: 5,
      }
      const newBlogTwo = {
        url: 'www.southpark.com',
        author: 'Randy',
        title: 'South Park',
        likes: 200,
      }

      // First get login credentials
      cy.request('POST', 'http://localhost:3001/api/login', credentials)
        .then((res) => {
          localStorage.setItem('loggedBlogUser', JSON.stringify(res.body))
          cy.visit('http://localhost:3000')
        })
        .then(() => { // Then send in a new blog
          cy.request({
            url: 'http://localhost:3001/api/blogs',
            method: 'POST',
            body: newBlogOne,
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
            }
          })
            .then(() => {
              cy.request({
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: newBlogTwo,
                headers: {
                  'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
                }
              })
                .then(() => {
                  cy.visit('http://localhost:3000')
                })

            })
        })
    })

    it('Can create new blog', function () {
      cy.contains('New Blog Entry').click()
      cy.get('#input-title').type('New Blog')
      cy.get('#input-author').type('Jack P')
      cy.get('#input-url').type('www.testing123.com')

      cy.contains('button', 'Create').click()

      cy.contains('New Blog')
      cy.contains('Jack P')
    })

    it('Can like a blog', function(){
      cy.contains('button', 'View').click()
      cy.contains('Likes: 200')
      cy.contains('button', 'Like').click()
      cy.contains('Likes: 201')
    })

    it('Can delete a blog', function() {
      cy.contains('button', 'View').click()
      cy.contains('button', 'Remove').click()
      cy.get('body').should('not.contain', 'SOUTH PARK')
    })

    it('Blogs are in correct order', function() {
      cy.get('.blog .btn-toggle').click({ multiple: true })

      cy.get('.blog .blog-likes').then((items) => {
        expect(items[0]).to.contain.text('Likes: 200')
        expect(items[1]).to.contain.text('Likes: 5')
      })

    })
  })
})