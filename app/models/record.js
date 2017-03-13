import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  subject: DS.attr(),
  display_content_partner: DS.attr(),
  display_collection: DS.attr(),
  source_url: DS.attr(),
  display_date: DS.attr(),
  creator: DS.attr(),
  category: DS.attr(),
  language: DS.attr(),
  rights: DS.attr(),
  publisher: DS.attr(),
  thumbnail_url: DS.attr(),
  locations: DS.attr()

  //also edit recordFields in controllers/application to determine which model fields show up:
  //  - on the single record "results" page
  //  - as a filterable facet on the sidebar

  //note: Available metadata for this model (access in template through model.meta)
  // result_count, per_page, page, facets
});
