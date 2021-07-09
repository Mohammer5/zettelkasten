const emptyLineRegExp = new RegExp('^ *$')

export const zettelListe = [
  {
    title: 'First zettel title',
    tags: ['0', '1'],
    content: `
      # Markdown

      Dieser Zettel hat content.
      Das, was hier steht, sollte am besten als HTML und nicht als Markdown dargestellt werden.

      * Bulletpoint
      * Ein weiterer Bulletpoint
    `
  },
  {
    title: 'Second zettel title',
    tags: ['1'],
    content: `
      # Markdown

      Dieser Zettel hat content.
      Das, was hier steht, sollte am besten als HTML und nicht als Markdown dargestellt werden.

      * Bulletpoint
      * Ein weiterer Bulletpoint
    `
  },
].map((zettel, id) => ({ ...zettel, id: `${id}` })).map(data => {
  const lines = data.content.split('\n')
  const contentLines = emptyLineRegExp.test(lines[0])
    ? lines.slice(1)
    : lines
  const spaces = contentLines[0].match(/^\s*/)
  const spaceCount = (spaces ? spaces[0] : '').length

  if (!spaceCount) {
    return data
  }

  const trimmedContent = contentLines
    .map(line => line.slice(spaceCount))
    .join('\n')

  return { ...data, content: trimmedContent }
})
