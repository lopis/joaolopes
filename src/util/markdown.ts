import remark from 'remark'
import frontmatter from 'remark-frontmatter'
import extract from 'remark-extract-frontmatter'
import yaml from 'yaml'
import html from 'remark-html'
import {VFile} from 'vfile'

const fetchMarkdown = (slug: String): Promise<VFile> => {
  return new Promise<VFile>((resolve, reject) => {
    fetch(`/data/${slug}.md`)
    .then((data: Response) => {
      if (data.status === 200) {
        return data.text()
      } else {
        throw new Error(String(data.status))
      }
    })
    .then((md:String) => {
      remark()
        .use(html)
        .use(frontmatter, [{type: 'yaml', marker: '-'}])
        .use(extract, { yaml: yaml.parse })
        .process(md, (err, file:VFile) => {
          if (err) {
            console.error(err);
            reject();
          } else {
            resolve(file);
          }
        })
    })
    .catch((err) => {
      console.log('oopsie')
      reject(err)
    })
  })
}

export default fetchMarkdown
