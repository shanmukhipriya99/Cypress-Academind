/// <reference types='Cypress' />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');

    cy.contains('Add Task').click();
    cy.contains('Cancel').click();
    cy.get('.modal').should('not.exist');
  });
  it('should create a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('Sample Task');
    cy.get('#summary').type('Sample Summary');
    // cy.get('#category').select('moderate');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
    cy.get('.task h2').contains('Sample Task');
    cy.get('.task p').contains('Sample Summary');
  });
  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    // cy.get('.error-message').should('exist');
    cy.contains('Please provide values');
  });
  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('New Task');
    cy.get('#summary').type('New Summary');
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('moderate');
    cy.get('.task').should('have.length', 0);
    cy.get('#filter').select('urgent');
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('all');
    cy.get('.task').should('have.length', 1);
  });
  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('First Task');
    cy.get('#summary').type('First task summary');
    cy.get('#category').select('low');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    
    cy.contains('Add Task').click();
    cy.get('#title').type('Second Task');
    cy.get('#summary').type('Second task summary');
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);

    cy.get('.task').first().contains('First Task');
    cy.get('.task').eq(1).contains('Second Task');
  });
});
