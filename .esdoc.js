const glob = require('glob');

module.exports = {
  source: './src',
  destination: './htmldocs',
  plugins: [
    { name: 'esdoc-ecmascript-proposal-plugin', option: { all: true } },
    { name: 'esdoc-jsx-plugin', option: { enable: true } },
    {
      name: 'esdoc-importpath-plugin',
      option: {
        replaces: [{ from: '^src/.*', to: '' }],
      },
    },
    {
      name: 'esdoc-standard-plugin',
      option: {
        lint: { enable: true },
        coverage: { enable: true },
        accessor: { access: ['public'] },
        undocumentIdentifier: { enable: false },
        unexportedIdentifier: { enable: false },
        typeInference: { enable: false },
        manual: {
          globalIndex: true,
          index: './readme.md',
          files: [
            './docs/manage-your-code-folder-structure.md',
            './docs/unit-testing-components.md',
            './docs/unit-testing-actions.md',
            './docs/unit-testing-reducers.md',
            './docs/unit-testing-selectors.md',
            './docs/integration-testing.md',
            './contributing.md',
            './other/code_of_conduct.md',
            './other/roadmap.md',
          ],
        },
      },
    },
    {
      name: 'esdoc-replace-plugin',
      option: glob.sync('./{docs,other,.}/*.md').map(file => {
        const isManualFile = !file.includes('readme.md');
        const htmlFile = file
          .replace('././', isManualFile ? './htmldocs/manual/' : './htmldocs/')
          .replace('./docs/', './htmldocs/manual/')
          .replace('./other/', './htmldocs/manual/')
          .replace('/readme.md', '/index.html')
          .replace('.md', '.html');

        console.log(`file: ${file}`);
        console.log(`htmlFile: ${htmlFile}`);

        return {
          filepath: htmlFile,
          rules: [
            {
              regexp: '../contributing.md',
              replacement: 'contributing.md',
            },
            {
              regexp: 'docs/(.+?).md',
              replacement: isManualFile ? '$1.html' : 'manual/$1.html',
            },
            {
              regexp: 'other/(.+?).md',
              replacement: isManualFile ? '$1.html' : 'manual/$1.html',
            },
            {
              regexp: 'readme.md',
              replacement: 'index.html',
            },
            {
              regexp: '(.+?).md',
              replacement: isManualFile ? '$1.html' : './manual/$1.html',
            },
          ],
        };
      }),
    },
  ],
};
