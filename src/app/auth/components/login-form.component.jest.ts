import { render, screen } from '@testing-library/angular';
import { LoginFormComponent } from './login-form.component';

it('should create cards with proper title, subtitle, and content', async () => {
    // TODO: this approach better?
  // Render the component
  // const { getByTestId } = await render(LoginFormComponent);
   // Retrieve the card element
  //  const card = getByTestId('your-card-testid');

  // Render the component
  await render(LoginFormComponent);
  // Retrieve the card element
  const card = screen.getByTestId('form-login');

  // Retrieve the card title, subtitle, and content elements
  const cardTitle = card.querySelector('mat-card-title')?.textContent;
  // const cardContent = card.querySelector('mat-card-content')?.textContent;

  // Your assertions
  expect(cardTitle).toEqual('Login');
  // expect(cardContent).toEqual('Expected Content');
});
