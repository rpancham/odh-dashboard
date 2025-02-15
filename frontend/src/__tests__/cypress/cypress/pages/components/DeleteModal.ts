import { ByRoleOptions } from '@testing-library/react';
import { Modal } from '~/__tests__/cypress/cypress/pages/components/Modal';

export class DeleteModal extends Modal {
  constructor(title: ByRoleOptions['name'] = /Delete.+\?/) {
    super(title);
  }

  findInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.find().findByLabelText('Delete modal input');
  }

  findSubmitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.findFooter().findByRole('button', { name: /Delete/ });
  }
}

export const deleteModal = new DeleteModal();
