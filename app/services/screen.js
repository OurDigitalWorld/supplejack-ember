import EmberScreen, { breakpoint } from 'ember-screen';

export default EmberScreen.extend({
  //Changed from Bootstrap 4 to Bootstrap 3 to fit ember-bootstrap variables
  isMediumAndUp: breakpoint('(min-width: 992px)'),
  isMediumAndDown: breakpoint('(max-width: 992px)')
});
