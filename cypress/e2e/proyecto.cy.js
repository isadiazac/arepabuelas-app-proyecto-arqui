/// <reference types="cypress" />

// Comando personalizado para login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000');
  cy.get('input[placeholder="Correo Electrónico"]').type(email);
  cy.get('input[placeholder="Contraseña"]').type(password);
  cy.get('button').contains('Iniciar Sesión').click();
});

describe('Flujos de pruebas - Arepabuelas', () => {
  it('debería permitir iniciar sesión con credenciales válidas', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Correo Electrónico"]').type('admin@arepabuelas.com');
    cy.get('input[placeholder="Contraseña"]').type('admin123');
    cy.get('button').contains('Iniciar Sesión').click();

    cy.url().should('include', '/menu');
    cy.contains('Menú');
  });

  it('debería rechazar credenciales inválidas', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Correo Electrónico"]').type('fake@correo.com');
    cy.get('input[placeholder="Contraseña"]').type('incorrecto');
    cy.get('button').contains('Iniciar Sesión').click();

    cy.contains('Credenciales inválidas'); // Ajusta según tu mensaje real
  });

  it('debería mostrar la vista del menú tras iniciar sesión', () => {
    cy.login('admin@arepabuelas.com', 'admin123');
    cy.url().should('include', '/menu');
    cy.contains('Menú');
  });

  it('debería cerrar sesión correctamente', () => {
    cy.login('admin@arepabuelas.com', 'admin123');
    cy.get('button').contains('Cerrar Sesión').click();
    cy.url().should('include', '/login');
  });
});