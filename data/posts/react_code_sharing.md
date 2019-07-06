---
title: Multi-app React code sharing in a monorepo
path: '/react_code_sharing_monorepo'
date: 2017-06-16T12:12:00.000Z
original_source: simplesurance.tech
original_link: https://simplesurance.tech/post/multi-app-react-code-sharing-in-a-monorepo/
description: >-
  How we initially approached managing shared components and assets with multiple react js
  apps in a monorepo.
image: /img/puzzle.jpg
---
At simplesurance, we've been busy re-engineering big chunks of our codebase to bring it up to speed with the new technologies and software architecture trends. We're transitioning from symfony/twig apps to a more diverse mesh of microservices and apps. We're also moving towards a single git repository, a monorepo.
A single repo organization brings some challenges, but it opens some possibilities too. Our monorepo contains everything from the microservices, the older symfony apps still in use, as well as the frontend react web and native apps. This opens doors to having more shared code. Frontend-wise, this meant the possibility to finally work with the design team in a company-wide "module palette" and to finally have a consistent, and easily reusable and maintainable design between several apps.
### TOC
 * [Symbolic links](#symbolic-links)
 * [Webpack and resolve.alias](#webpack-and-resolve-alias)
 * [Transpiling exports](#transpiling-exports)
 * [What about assets?](#what-about-assets)
 * [Last notes?](#last-notes)
### Symbolic links
After some lengthy - and highly opinionated - discussion, we went for a directory structure that is something like this:
```shell
ui
├─reactapp1
╎  └─...
├─reactapp2
╎  └─...
└─components
		├─assets
		╎  └─...
		├─common
		╎  ├─Button
		╎  ├─Panel
		╎  └─...
		╎  └─...
		├─config
		╎  ├─colors
		╎  ├─icons
		╎  └─...
		└─inputs
		╎  ├─Input
		╎  ├─TextArea
		╎  └─...
		└─...
```
The initial proposal was simple. We would create a symbolic link from the shared \`components\` directory into each app's source. We liked the solution, so we implemented it, and then it wasn't so simple. Webpack just doesn't deal with symlinks the way one would expect. It actually resolves the symbolic links and then any included packages would not be found in the actual location of the \`components\` directory.
### Webpack and resolve.alias
At this point we were not interested in having our components as an independent node package that we would install into each app. We would like the development process to be more organic where a developer can commit changes to multiple apps and to the shared code in a single pull request. If we were to use our shared code as a third party component that would reduce the developers' flexibility.
Turns our webpack can be told to use external code in a way that is transparent to the app source code using [\`resolve.alias\`](https://webpack.js.org/configuration/resolve/#resolve-alias):

```jsx
	// webpack.config.js
	module.exports = {
		entry: ['babel-polyfill', './src/index.js'],
		module: {
			rules: [{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, '../components'),
					path.resolve(__dirname, 'src')
				],
				loader: 'babel-loader'
			}]
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		resolve: {
			alias: {
				components: path.resolve(__dirname, '../components')
			}
		}
	}
	// Example component
	import React, { Component } from 'react'
	import { Button } from 'components'
	export default class Page extends Component {
		render () {
			return <Button>GO!</Button>
		}
	}
```

This worked well, and the developers liked the solution, and then it didn't work. The paths were correctly resolved but our components, which are written in ES2016, were not being transpiled into ES5. Furthermore, the packages used by the components were still not being imported.
We still didn't want to need to install first-party-as-third-party packages. Would it be possible to import our code as an external package without actually packing it, and thus taking advantage of webpack watching and simpler development flow? Turns out that was also possible.
# Transpiling exports
```shell
ui
├─app1
└─components
	├─src
	╎  ├─inputs
	╎  ├─common
	╎  └─config
	├─.babelrc
	├─index.js
	└─package.json
```
So we ran \`yarn init\` on our shared code folder and gave it some minimum settings. We also set all the dependencies for our components, as well as react, babel, etc. We created a main index.js entry point to out external "package". Next time we ran the main app, webpack would actually transpile the external code using babel and all the dependencies were used. Using npm's or yarn's caching capabilities, sharing dependencies is trivial. Running \`install\` twice is not really a big deal to the deployment time and can be simplified with a yarn script. Last step is to instruct \`babel\` to transpile our shared code before transpiling the app code.

```jsx
// webpack.config.js
include: [
	path.resolve(__dirname, '../components/src'),
	path.resolve(__dirname, 'src'),
],
loader: 'babel-loader'
```

An alternative is to instruct the shared "package" to transpile itself with babel, like this:
```jsx
//index.js
export * from 'babel-loader!./common'
export * from 'babel-loader!./config/colors'
export * from 'babel-loader!./config/icons'
export * from 'babel-loader!./inputs'
```

### What about assets?
We eventually ran into the situation where we would also like to share assets like icons, logos and fonts between apps, so putting them in the shared directory made perfect sense. It was simple to extend our setup to accomodate this. We used the module [\`file-loader\`](https://www.npmjs.com/package/file-loader) to load these files by addind the following rule to our webpack config:
```jsx
{
	test: /\.(png|jpg|svg)$/,
	include:[
		path.resolve(__dirname, '../components/assets')
	],
	loader: 'file-loader',
}]
```

And that's it. We had to add the loader dependency to both our project and to the shared components directory. But other than that, graphics were being loaded after this addition.
```jsx
	import logoDesktop from 'assets/img/logo.svg'
	...
	<img src={logo} alt="Simplesurance Logo"/>
```
### Last Notes
We're constantly trying to improve our approach at this point, and we're excited for the future of the project. We realize it's hard to create a future-proof architecture that won't let us down 4 years in. Specially in the frontend universe where every day there is a new technology that everyone is suddenly using. This is especially true in the Reactjs world where there are 15 competing standards for each feature of this technology. I'm looking at you, CSS in JS, but that's for another time.
