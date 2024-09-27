/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
    "projectDocuments": [ 
        "documents/Guia-del-proyecto.md",
        "documents/Estructura-del-proyecto.md",
        "README.md", 
    ],
    "entryPoints": [
        "src/api/**/*.ts",
        "src/pages/**/*.tsx"
    ],
    "sortEntryPoints": false,
    "entryPointStrategy": "expand",
    "out": "docs",
    "plugin": ["typedoc-github-theme"],
    "exclude": ["**/node_modules/**","**/src/templates/**", "**/@/templates/**", "**/*.spec.ts"],
    "name": "Documentación frontend CMS WEB",
    "excludePrivate": true,
    "excludeProtected": true,
    "hideGenerator": true,
    'tsconfig': 'tsconfig.json'
};

export default config;