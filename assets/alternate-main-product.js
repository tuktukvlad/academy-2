
window.customElements.define('custom-element', class extends HTMLElement {
    constructor() {
        super();
        console.log('custom-element loaded')
    }

    select() {
        console.log(this)
    }
})


Shopify.theme.sections.register('alternate-main-product', {

    customElement: null,

    // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
    onLoad: function() {
        // Do something when a section instance is loaded
        console.log('Section loaded:', this)
        this.customElement = this.container.getElementsByTagName('custom-element')[0] || null
    },

    // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
    onUnload: function() {
        // Do something when a section instance is unloaded
        console.log('Section unloaded:', this)
    },

    // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
    onSelect: function() {
        // Do something when a section instance is selected
        if (!this.customElement) return;
        this.customElement.select()
    },

    // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
    onDeselect: function() {
        // Do something when a section instance is deselected
    },

    // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
    onBlockSelect: function(event) {
        // Do something when a section block is selected
    },

    // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
    onBlockDeselect: function(event) {
        // Do something when a section block is deselected
    }
})
