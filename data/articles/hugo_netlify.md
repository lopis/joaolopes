---
title: 'Hugo, Netlify and dynamic author lists'
path: '/hugo_netlify_dynamic_authors'
date: 2019-01-24T13:49:01.253Z
original_source: simplesurance.tech
original_link: https://simplesurance.tech/post/hugo-netlify-and-dynamic-author-lists/
description: >-
  I explored ways to maintain a list of blog authors in an Hugo+NetlifyCMS blog.
image: /assets/img/pexels-photo-311269.jpeg
---
### TOC
 * [Creating a new Author template](#creating-a-new-author-template)
 * [Creating a new collection of Authors](#creating-a-new-collection-of-authors)
 * [How to find the actual user data](#how-to-find-the-actual-user-data)
 * [Why not Hugo taxonomy?](#why-not-hugo-taxonomy)
 * [The solution](#the-solution)


[Hugo](https://gohugo.io/) is an efficient static site generator written in Go. It's currently powering this same blog you're reading. [Netlify](https://www.netlify.com) is the serverless host of this website. They are both great tools and pair nicely together.

While developing this blog, I though it would be pretty useful to keep a list of blog post authors. I wanted any editor to be able to create and modify authors' data from the netlify cms backend.

## Creating a new Author template

Firstly, I create a fancy template for displaying user data which I added to the post params.

```markdown
---
title: Multi-app React code sharing in a monorepo
date: 2017-06-16T12:12:00.000Z
author:
  name: João Lopes
  image: img/photo/lopis.jpg
  github: lopis
description: How we approached managing shared ...
image: /img/puzzle.jpg
---
```

Then I rendered that data after the blog post content.

```
<div class="author">
  <img src="{{ .Params.author.image }}" alt="">
  <div>
      <span>{{ .Params.author.name }}</span><br>
      <div>
        {{ if .Params.author.github }}
            <a href="www.github.com/{{ .Params.author.github }}">
              <img src="/img/github-logo.svg" height="20" width="20" alt="">
              {{ .Params.author.github  }}
            </a>
        {{ end }}
      </div>
  </div>
</div>
```

## Creating a new collection of Authors

From the netlify side of things, it was all about [creating a new collection](https://www.netlifycms.org/docs/collection-types/) to host the author pages. Each author is saved as a markdown file under `content/authors/author-name.md`.

Hugo would now render these mardkdown files. I initially setup a list of authors in the home page like this:

```html
<h2 class="f2 b lh-title mb3">Authors</h1>

<div class="w-100 flex-ns mhn1-ns flex-wrap mb3">
	{{ range first 4 (where .Data.Pages "Type" "author") }}
		<div class="ph1-ns w-50-ns flex">
			{{ .Render "profile" }}
		</div>
	{{ end }}
</div>
```

Netlify [supports the widget type "relation"](https://www.netlifycms.org/docs/widgets/#relation). This let's me insert an item of type "Author" into an item of type "Post".

```
collections: # A list of collections the CMS should be able to edit
  - name: "post" # Used in routes, ie.: /admin/collections/:slug/edit
    label: "Post" # Used in the UI, ie.: "New Post"
    folder: "site/content/post" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    fields: # The fields each document in this collection have
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - label: "Author"
        name: "author"
        widget: "relation"
        collection: "authors"
        ...
```

So now all everything is connected and Hugo can render the author widget with all the user data right?

## How to find the actual user data

No, of course not. You see, Netlify only saves a string to the markdown for the "relation" field. Hugo doesn't know what a relation type field is - all it sees is a string.

```markdown
title: Multi-app React code sharing in a monorepo
date: 2017-06-16T12:12:00.000Z
author: João Lopes
...
```

In Hugo and Netlify everything is a page - the Post is a page and the User is a page. I want to find the user page and render it inside the post page after its content.

## Why not Hugo taxonomy?

I found an article in the oficial Netflify blog on [how to create author pages in Hugo](https://www.netlify.com/blog/2018/07/24/hugo-tips-how-to-create-author-pages/). This seemed like just what I needed. Unfortunately it makes use of a very useful Hugo feature called **taxonomy**. Taxonomy lets you group pages from different collections by common field names, for instance by "author". It even allows you to add extra meta data to each author like their full name, biography, etc. Unfortunately the taxonomy data storage is kind of incompatible with Netlify.

```
# Hugo directory structure for taxonomy
├─ content/
│  └─ author
│     ├─ john-smith
│     │  └─ _index.md
│     └─ mr-foo-bar
│        └─ _index.md

# Hugo directory for pages of a collection
├─ content/
│  └─ author
│     └─ john-smith.md
│     └─ mr-foo-bar.md
```

And as far as I could tell, it it couldn't be changed. So I was going to have to hack it together.

## The solution

The author field of a post might have been reduced to a plain string, but that doesn't mean Hugo can't find the actual author data. During rendering Hugo templates have access to the variable `.Site.Pages` which includes every page, section or taxonomy that you want - all the Hugo objects are there. To find our author, we'll need to filter these pages by type "author" and match it to the post author. I created a new field called "username" which will act as my "foreign key".

```
<div class="author">
  <!-- Gotta find that user page and render it here -->
  {{ $users    := where .Site.Pages "Type" "author" }}
  {{ $username := where .Site.Pages "Params.user" .Params.user }}

  {{ range $users | intersect $username }}
      {{ .Render "profile" }}
  {{ end }}
</div>
```

`range` is basically Hugo's way to do cycles. `intersect` is how you intersect two filtered groups. It was confusing to reach this construct because the scope inside the `range` is not the same as outside. Inside `range` you don't have access to `.Params.user` of the post anymore - that variable is now scoped to the Author! However for any kind of more static data I would still prefer Hugo's taxonomy.
