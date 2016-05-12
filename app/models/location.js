import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({

  // attributes
  lat: attr('number'),
  lng: attr('number'),
  pedestrians_count: attr('number'),
  spots_count: attr('number')

});