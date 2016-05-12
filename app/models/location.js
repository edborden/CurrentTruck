import DS from 'ember-data';
import computed from 'ember-computed-decorators';

const {
  Model,
  attr
} = DS;

export default Model.extend({

  // attributes
  lat: attr('number'),
  lng: attr('number'),
  pedestrians_count: attr('number'),
  spots_count: attr('number'),
  score: attr('number'),

  @computed('score')
  needsVendor() {
    return this.get('score') > 100;
  }

});