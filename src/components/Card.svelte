<script>
  import globe from '../icons/globe.svg?raw'
  import dev from '../icons/dev.svg?raw'
  import github from '../icons/github.svg?raw'
  import mastodon from '../icons/mastodon.svg?raw'

  let pictureUrl = '/photo.jpg';
  let name = 'João Lopes';
  let title = 'Software Engineer';
  let company = 'Ecosia';
  let links = [
    { link: 'jlopes.dev', icon: globe },
    { link: 'github.com/lopis', icon: github },
    { link: 'mastodon.green/@lopis', icon: mastodon },
    { link: 'dev.to/lopis', icon: dev },
  ];
</script>

<div class="card">
  <img class="card-image" src={pictureUrl} alt="" />
  <div class="card-body">
    <h1>{name}</h1>
    <h2>{title}</h2>
    <p>{company}</p>
    <ul class="links">
      {#each links as { link, icon }}
        <li class="link">
          {@html icon}
          <a href={`https://${link}`} target="_blank" rel="noreferrer">{link}</a>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
.card {
  display: flex;
  width: 400px;
  max-width: calc(100% - 20px);
  background: linear-gradient(-20deg, var(--dark2), var(--dark1));
  border-radius: 5px;
  overflow: hidden;
  color: var(--light2);
  margin: auto;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.card-body {
  padding: 8px;
}

.links {
  list-style: none;
  padding: 0;
}

.links :global(svg) {
  height: 20px;
  width: 20px;
}

.link {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.link a {
  color: inherit;
}

h1 {
  font-size: 26px;
  opacity: 0.8;
  margin: 0.9rem 0 0.5rem;
}

h2 {
  font-size: 20px;
  opacity: 0.8;
  margin: 0.2rem 0;
}
</style>
