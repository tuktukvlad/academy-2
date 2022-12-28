import {register} from "@shopify/theme-sections";
import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';

register('alternate-main-product', {

    productForm: null,

    // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
    onLoad: function () {
        // Do something when a section instance is loaded
        console.log('Section loaded:', this)
        const productHandle = this.container.dataset.handle
        const formElement = this.container.querySelector('#product-form')

        fetch(`/products/${productHandle}.js`)
            .then(response => {
                return response.json();
            })
            .then(productJSON => {
                this.productForm = new ProductForm(formElement, productJSON, {
                    onOptionChange: this.onOptionChange,
                    onFormSubmit: this.onFormSubmit
                });
            });
    },

    // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
    onUnload: function () {
        // Do something when a section instance is unloaded
        console.log('Section unloaded:', this)
        if (!this.productForm) return
        this.productForm.destroy()
    },

    onOptionChange: function (event) {
        const variant = event.dataset.variant;

        if (!variant) return;

        console.log('Variant stock: ', window.variants_inventory[variant.id])

        const url = getUrlWithVariant(window.location.href, variant.id);
        window.history.replaceState({path: url}, '', url);
    },

    onFormSubmit: function (event) {
        event.preventDefault()
        fetch(event.target.action + '.js', {
            method: event.target.method,
            body: new FormData(event.target),
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                const event = new CustomEvent('cart:added', {
                    detail: {
                        header: response.sections['alternate-header']
                    },
                    bubbles: true
                })

                form.dispatchEvent(event)

            })
            .catch(console.error)
    },

    // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
    onSelect: function () {
        // Do something when a section instance is selected
    },

    // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
    onDeselect: function () {
        // Do something when a section instance is deselected
    },

    // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
    onBlockSelect: function (event) {
        // Do something when a section block is selected
    },

    // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
    onBlockDeselect: function (event) {
        // Do something when a section block is deselected
    }
})
