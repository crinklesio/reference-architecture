# CSS architecture

The framework tries to achieve _simplicity_ for developers. To achieve this, everything is designed around three core principles.

-   **Flexible**: the framework provides a lot of flexibility in its implementation. You can implement everything yourself to your liking (e.g. CSS custom properties or BEM-like classes), use it with CSS libraries (e.g. tailwind), or even combine it with front-end frameworks and extend the principles there (e.g. Svelte scoped styles).
-   **Scalable**: the framework is designed to tackle the most common problems (layout) first, and allow developers to use their preferred method of implementation. This makes the framework scale to the developers’ needs, but with minimal CSS code and knowledge required.
-   **Extensible**: CSS is by default extensible due to the cascade. And this architecture utilises this to the fullest. In addition, clear defined APIs on classes through CSS Custom Properties allow for easy changing of your styles.

## Architecture

A simple three-layered architecture.

-   **Layout**: classes that look at the macro-level of an application. They provide flexible and responsive layout solutions that are common across an application. The patterns can be used on the macro and micro levels. Example: [switcher layout](https://github.com/vyckes/crinkles.dev/blob/main/src/styles/layout/switcher.css).
-   **Utilities**: classes that do one job and do one job well. This is often a class that alters a single property. But utilities like the [`.click-area` class](https://github.com/vyckes/bace-css/blob/main/src/utilities/_click-area.scss) cover more than a single property but still do only one thing.
-   **Components**: correspond to UI components. That what cannot be solved with layout and/or utility classes alone can be solved in blocks. You can choose to cover all styles of a component in a block, or you can only put those styles not covered by other classes in a block.

On an implementation level, there is a lot of flexibility with this architecture. You can use it as structural guidelines for all your CSS code. You can use a framework as Tailwind for the _utilities_ layer. You can co-locate your components as styled-components or CSS modules with your React components.

> **NOTE**: most of the time you require at least a _reset.css_ and/or _global.css_. The purpose of these files is to reset browser stylesheets and set default values on HTML elements specifically (e.g. set the `font-size` of an `h1` element). Depending on technology and framework choices, a _tokens.css_ is used for storing design tokens as CSS custom properties.

## Styling components

In general, a lot of simple layouts and styling can be covered by the _layout_ and _utilities_ classes existing in the CSS architecture. The same goes for default generic components (foundational components) found in many [design systems](/design-systems.md). This is the advised way when working with JavaScript components. However, on bigger projects decisions have to be made on several topics:

-   Application components (feature specific components) often require verbose CSS classes. It needs to be decided if this code is co-located as CSS modules, exists with all the other CSS, or is part of framework specific scoped styles (e.g. Svelte).
-   Where are classes for foundational components (in case this is required, which is not the case for most) stored? With the component, or with all the other CSS.

**Co-location structure example**

```
components/
├── button/
    ├── Button.js
    └── button.module.scss
```

## Class APIs

For layout and component classes, it is advised to define an API, through CSS custom properties. This API shows what can be adapted on the class. Let’s assume a [switcher layout](https://github.com/vyckes/crinkles.dev/blob/main/src/styles/layout/switcher.css) layout. This is a small layout class that instructs the browser to switch from a horizontal to vertical orientation whenever one item becomes smaller than X. There are several things we can control in this class, so these are defined as custom properties. This is the API of the class.

```js
.switcher {
	--layout-gap: 0;
	--layout-width: 0;
	--layout-amount: 2;
}
```

There are several ways to interact with the API of a class.

-   **Class utilities**: these are different from utility classes. The latter are handled in the _utilities_ layer. Class utilities focus on changing one custom variable of a specific class (e.g. `.--gap-1` changes the `--layout-gap` property). Especially when working with SCSS and predefined spacing values, generating class utilities is an easy route.
-   **data-\* attributes**: use `data-gap=“1”` on the HTML to change the value of the custom property from the generic layout class on an element. It requires in the CSS to define `.switcher[data-gap=“1”]` and every version as well. When working with SCSS this can be generated as well.
-   **Cascade**: the cascade can be utilised as well. Define a more meaningful class (e.g. `.post-list`) in the _components_ layer that sets one of the custom properties. Both the layout class and the new class should be applied on the same element. The cascade will handle the rest.

```css
.post-list {
	--layout-amount: 3;
	/* other properties */
}
```

## Implementation tips

-   Use [Fluid typography](https://crinkles.dev/writing/different-approaches-to-fluid-typography-and-layouts/) where possible.
-   Do not apply multiple layout classes on the same element. The chance on conflicting behaviour is big.
-   Give class utilities a distinctive indicator (e.g. prefix them with `--`, such as `.--gap-0`).
-   Group shared class utilities (e.g. those impacting `--layout-gap`) into generic classes, to reduce the codebase and make it more maintainable (e.g. define `.--gap-0` only in one place and use it for various layout classes).
-   State related styles of components should be modeled through [data-\* attributes](https://crinkles.dev/writing/css-data-attributes/), as this makes the connecting with JavaScript more maintainable. Instead of conditionally change the list of CSS classes based on states, use \*data-\*\* attributes to model state. This makes code more maintainable.
-   Group classes based on layer and add separators in the syntax (e.g. `|` or wrap them in `[]` with whitespaces) like the example below. As long as there are no CSS classes defined as these characters, they are ignored but make CSS more readable when multiple classes are defined.

```html
<div
	class="post-list | switcher --gap-1 | bg-black text-white"
	data-selected="false"
></div>
```

```css
.post-list[data-state~="error" i] {
}
```
