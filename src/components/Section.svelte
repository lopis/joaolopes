<script lagn="ts">
	export let title = '';

	// You can replace these links with your actual data
	export let sectionLinks = [
		{ text: '', href: '', tags: [''], date: '', icon: '' },
	];
</script>

<section>
	<h2>{title}</h2>
	<ul>
		{#each sectionLinks as { text, href, tags, date, icon }}
			<li data-icon="{icon}">
        <div>
          <a {href}>{text}</a>
        </div>
        <div class="meta">
          {date} · {#each tags as tag} <span class="tag">{tag}</span>{/each}
        </div>
      </li>
		{/each}
	</ul>
</section>

<style>
section {
  margin: 16px;
}

ul {
  padding: 0;
  list-style: none;
}

h2 {
  margin: 45px 0 25px;
  opacity: 0.7;
  font-size: 28px;
}

li {
  margin-bottom: 16px;
  position: relative;
}

li[data-icon]::before {
  content: attr(data-icon);
  float: left;
  background: var(--light1);
  padding: 8px;
  border-radius: 100px;
  margin-right: 8px;
}

.meta {
  margin: 4px 0;
  font-size: 80%;
}

.tag {
  display: inline-block;
  margin-right: 4px;
}

.tag::before {
  content: '#';
}

a,
a:visited {
  color: var(--dark1);
  text-decoration-color: var(--underline);
}
</style>
