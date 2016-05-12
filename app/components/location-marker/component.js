import MarkerLayer from 'current-truck/components/marker-layer';
import observes from 'ember-computed-decorators';

const EventMarker = L.Icon.extend({

  options: {
    iconSize: [40, 40]
  },

  initialize(options) {
    options = L.Util.setOptions(this, options);
  },

  createIcon() {
    let div = document.createElement('div');
    div.className = 'location-marker';
    div.innerHTML = this._createInner();
    return div;
  },

  _createInner() {
    return this.options.pedestriansCount;
  }

});

export default MarkerLayer.extend({

  // attributes
  icon: null,
  pedestriansCount: null,

  // events
  init() {
    this._super();
    let pedestriansCount = this.get('pedestriansCount');
    let icon = new EventMarker({ pedestriansCount });
    this.set('icon', icon);
  },

  @observes('pedestriansCount')
  pedestriansCountDidChange() {
    console.log('change');
    this.element.innerHTML = this.get('pedestriansCount');
  },

  didCreateLayer() {
    // this._super(...arguments);
    if (this.get('hasBlock')) {
      this._popup = this.L.popup({}, this._layer);
      this._popup.setContent(this.get('destinationElement'));
      // register popup on leaflet layer so it can be accessed by spiderfier, don't want it to be called normally
      this._layer.bindPopup(this._popup);
      this._layer._popup = this._popup;

      this._hijackPopup();

      this.popupOpenDidChange();
    }
  },

  willDestroyLayer() {
    // this._super(...arguments);
    if (this.get('hasBlock')) {
      this._layer.closePopup();
      this._layer.unbindPopup();
      delete this._popup;
      delete this._firstNode;
      delete this._lastNode;
    }
  }

});