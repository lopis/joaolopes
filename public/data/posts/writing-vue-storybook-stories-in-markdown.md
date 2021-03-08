---
title: Writing Vue Storybook stories in markdown
published: true
description: Extending @josephuspaye 's work, I started writing vue stories in vue and markdown instead of CSF
tags: vue, js, storybook, mdx
date: 2020-02-15T12:00:00.000Z
---

At [Ecosia](https://www.ecosia.org/) we started last year investing some resources into defining our Design System (DS). Building a DS allows us to focus on streamlining the design and implementation of our UIs, and to be more aware of the impact of our product design decisions. It helps our team move in unison when developing new products or refactoring old ones.

### Moving from Vue Styleguidist?

Most of the frontend stack at [Ecosia](https://www.ecosia.org/?refer=devto) is built around with Vue. We also had a design style-guide built using [Vue Styleguidist](https://vue-styleguidist.github.io). Our style-guide is essentially a list of all the Vue components used across our frontend applications.

Vue Styleguidist is pretty straight forward and flexible. In our current setup, we can write component stories in Markdown with code examples right inside the Vue single-file component. Component props are picked up automatically. That means that even without docs each component gets a docs page.

While this worked great for developers, we found it a bit too bare bones. For the past year there were a series of features we desired that would mean too much custom work to implement them. We also found some limitations in the markdown docs, for instance regarding the use of the store.

## Enter Storybook

[Storybook](https://storybook.js.org). has been around for a long time. It started as "React Storybook" but has grown immensely, and now supports several frameworks. (Fun fact: like Storybook, Vue Styleguidist is also built using React). Storybook users can take advantage of a very active community and rich library of addons.

Out of the box:

- Easy theming using a theme API without the need for CSS;
- 2 base themes: light and dark;
- Allows complex and custom organization of the pages, including nested stories and sections;
- Easy creation of plain text docs besides code documentation;
- Test/visualize each component individually, or all together in a pretty docs page;
- Zoom feature for individual stories

With storybook-maintained addons:

- Ally features (e.g. including audits (<https://github.com/storybookjs/storybook/tree/master/addons/a11y>), and color blindness simulation)
- Responsive design simulation (we can set our list of device dimensions)
- Event and behaviour manipulation
- Event tracking

With community addons:

- Dark mode switcher
- Easier themes
- Easier documentation
- Generation of docs from code
- ...???

## Writing stories - Why not CSF/MDX?

CSF is the recommended way to write component stories in Storybook. However, it's hard to create examples for components with state, e.g. radio buttons. MDX, which is the format recommended for the `docs` addon, has the same issue. And both of them require that I write my stories as a string (due to Vue not being a 2st class citizen in Storybook) which is less than ideal to say the least. Here's an example of a story from the MDX documentation of `addon-docs`:

```jsx
<Story name='basic' height='400px'>{{
  components: { InfoButton },
  template: '<info-button label="I\'m a button!"/>',
}}</Story>
```

[@josephuspaye came up with the brilliant idea](https://dev.to/josephuspaye/using-storybook-with-vue-single-file-components-2od) of creating a simple Webpack loader to load Vue files into a CSF story. This approach has a series of advantages:

- Each individual story is pure Vue.js instead of a string
- State of the story is handled just like in any vue component
- Syntax for styles or scripts is the same as other components and completely isolated from storybook

I identified the following shortcomings in the solution:

- The source of the vue file is not picked up by addon-docs or addon-source;
- Stories are written in CSF which is much less elegant than MDX, which is markdown containing JSX.
- CSF doesn't let you write text between each example, so the documentation with CSF would be all code examples with no change to textual docs

## Markdown All the way

I wanted the documentation of my stories to be as lean as possible. The end result looks like this:

```jsx
<Meta title="Components/Button"
  component={ButtonComponent}
/>

# Buttons

This is the *button component*.
It can be grouped in a button group or
used individually.

<Preview>
  <Story name='HorizontalGroup' inline
    parameters={params(HorizontalGroup)}>
    {story(HorizontalGroup)}
  </Story>
</Preview>
```

The `story` function is based on [@josephuspaye's implementation](https://dev.to/josephuspaye/using-storybook-with-vue-single-file-components-2od) with some changes.

Storybook provides the `addon-source` which display the source code of each individual story. As convenient as it is, it won't work with our setup because `addon-source` works automagically by loading the source of each story file. Because the source of our stories is found in the vue files, we must load them instead and display them in a custom source panel.

First we need to indicate which files we want to load with this new "source loader". The way I did it was to add a tab `<include-source />` at the end of the each story to which I want the source code to be present:

```js
// This is a single story for a Button Group
<template>
  <div>
    <Button variant="solid-primary">
      Primary
    </Button>
    <Button variant="outline-primary">
      Secondary
    </Button>
  </div>
</template>

<script>
import Button from './button';

export default {
  name: 'ButtonExample',
  components: { Button },
};
</script>

<include-source/>
```

Then we create the actual loader:

```js
const fs = require('fs');

module.exports = function (source, sourceMap) {
  // Read the referenced file and remove the <include-source/> block, so it doesn't
  // show up in the source code that will be shown in the UI
  const fileContent = fs
    .readFileSync(this.resourcePath, 'utf8')
    .replace(/<include-source.*\n/, '');

  // Generate a function that'll receive the Vue component and attach the source
  this.callback(
    null,
    `export default function (Component) {
            Component.options.source = ${JSON.stringify(fileContent)};
        }`,
    sourceMap
  );
};
```

Then, we tell webpack to use this loader when loading the `include-source` block type. You could use another test here, such as filtering the `story.vue` extension, but I found the `include-source` approach gives me more control and is not really cumbersome to use.

```js
// main.js

config.module.rules.push({
  resourceQuery: /blockType=include-source/,
  loader: path.resolve(__dirname, 'source-loader.js'),
});
```

Now, we need to tell storybook to use the value added to `Component.options.source` by the loader. There are two places where we want to be able to read the source code of the story: the `addon-docs` code panel, and the individual source panel.

Recalling the MDX code above, you can see I have two functions `story` and `params`:

```jsx
<Preview>
  <Story name='HorizontalGroup' inline
    parameters={params(HorizontalGroup)}>
    {story(HorizontalGroup)}
  </Story>
</Preview>
```

The `story` function simply wraps the story component in a function. If we were using the CSF format, this would be the place to set any additional parameters - namely the source code of the story.

```js
/**
 * This is a convenience function that wraps the story in a function.
 * It can be used to set aditional parameters in CSF stories.
 * For MDX stories, params much be set in the params() function.
 */
export const story = (StoryComponent) => {
  const storyExport = () => StoryComponent;

  return storyExport();
};
```

The params function creates a parameters object to be applied to the story component in MDX and it's where the content of the source tab can be set. This is necessary, otherwise `addon-docs` just displays `story(HorizontalGroup)` as the source code of the story. You could also set this directly in the MDX, but I found this approach allowed for a cleaner MDX syntax.

```js
export const params = (StoryComponent) => {
  const storyParams = {
    docs: {
      inlineStories: true,
      source: {
        code: StoryComponent.source,
      },
    },
  };

  return storyParams;
};
```

Ideally, I would love to be able to simplify the markdown even more like the following, and hide all the boilerplate:

```jsx
<Preview>
  <MyStoryComponent name='HorizontalGroup' story={HorizontalGroup} />
</Preview>
```

Unfortunately, the way that `addon-docs` works, this code is nore _really_ actual JSX, but is instead partially parsed by the MDX loader, which internally expects a certain code structure. Any attempts at removing the boilerplate resulted in storybook crashing or rendering empty stories.

This is also the reason why the official source code panel addon `addon-source` doesn't work with our approach. The internals of that addon expect us to follow a righteous path, but we have rebelled against the oppressing docs. For that reason, we need to create our own source panel. The following addon is adapted from the one used in [@josephuspaye's solution](https://dev.to/josephuspaye/using-storybook-with-vue-single-file-components-2od).

```js
// source-addon.js
import React from 'react';
import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { AddonPanel, SyntaxHighlighter } from '@storybook/components';


const ADDON_ID = 'vueStorySource';
const PARAM_KEY = 'docs';
const PANEL_ID = `${ADDON_ID}/panel`;

// The SourcePanel component (React)
const SourcePanel = ({ active }) => {
  // Use the params from addon-docs
  const docsParams = useParameter(PARAM_KEY, null);
  const source = docsParams && docsParams.source && docsParams.source.code;

  return active && source ?
    React.createElement(
      SyntaxHighlighter,
      {
        language: 'html',
        showLineNumbers: false,
        copyable: true,
        padded: true,
        format: false,
      },
      source
    ) :
    null;
};

// Register the addon
addons.register(ADDON_ID, () => {
  const render = ({ active, key }) => React.createElement(
    AddonPanel,
    { active, key },
    React.createElement(SourcePanel, { active })
  );

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Source',
    render,
    paramKey: PARAM_KEY,
  });
});

```

```js
// manager.js

// Register our custom addon
import './util/source-addon';
```

## Final notes

It's unfortunate that Vue is still a second class citizen in Storybook, but it's still worth exploring all the possibilities provided by this platform. Storybook community and maintainers are very active on github which really helps keeping solutions flowing.

If you want to explore the code I created for this article, head off to [my github repository](https://github.com/lopis/vue-storybook-example).
