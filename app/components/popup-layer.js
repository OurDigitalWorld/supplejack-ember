import Ember from 'ember';
import PopupLayer from 'ember-leaflet/components/popup-layer';
const { run, get } = Ember;

/**
 * fixes class to work with clustering plugin
 */
export default PopupLayer.extend({
  _addPopupListeners() {
    // we need to hijack the `onAdd` method because we need to
    // render the template *before* the popup is opened.
    // This way, the popup will set its dimensions according to the rendered DOM.
    let oldOnAdd = this._layer.onAdd;
    this._layer.onAdd = (map) => {
      // if we're currently waiting for the animation to end, cancel the wait
      run.cancel(this._destroyAfterAnimation);
      // this will make wormwhole render to the document fragment
      this.set('shouldRender', true);
      // ember-wormhole will render on the afterRender queue, so we need to render after that
      run.next(() => {
        oldOnAdd.call(this._layer, map);
      });
    };
    // we need to user `layerremove` event becase it's the only one that fires
    // *after* the popup was completely removed from the map

    let parentContainer = get(this, 'parentComponent.parentComponent');
    const map = get(parentContainer, '_layer._map');
    if (map) {
      map.addEventListener('layerremove', this._onLayerRemove, this);
    }
  },
  _removePopupListeners: function _removePopupListeners() {
    const parentComponent = this.get('parentComponent.parentComponent');
    const map = get(parentComponent, '_layer._map');
    if (map) {
      map.removeEventListener('layerremove', this._onLayerRemove, this);
    }
  }
});
