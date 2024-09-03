/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
    "projectDocuments": [ 
        "documents/*.md",
        "README.md", 
    ],
    "entryPoints": [
        "src/api/**/*.ts",
        "src/pages/**/*.tsx"
    ],
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