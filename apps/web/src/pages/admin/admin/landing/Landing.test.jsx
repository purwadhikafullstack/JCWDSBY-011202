import Landing from './Landing';

describe('<Landing />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />);
  });
});
