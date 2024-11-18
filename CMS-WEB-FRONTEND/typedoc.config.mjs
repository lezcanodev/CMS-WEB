/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config= {
    "plugin": ["typedoc-plugin-rename-defaults", /*"typedoc-github-theme"*/],
    "projectDocuments": [ 
        "documents/Guia-del-proyecto.md",
        "documents/Implementacion-de-recurso.md",
        "README.md", 
    ],
    "entryPoints": [
        "src/api/**/*.ts",
        "src/components/**/*.tsx",
        "src/pages/dashboard/**/*.tsx",
        "src/pages/*.tsx",
    ],
    "exclude": [
        "**/node_modules/**",
        "**/src/templates/**", 
        "**/@/templates/**", 
        "**/*.spec.ts",
        "**/src/**/*.thunk.ts",
        //"**/src/**/*.model.ts",
        "**/src/**/*.reducer.ts",
    ],
    
    //"alwaysCreateEntryPointModule": false,
    //"excludeNotDocumentedKinds": ['Module'],
    //disableSources: true,

    "sortEntryPoints": false,
    //"sort": ["source-order"],
    "entryPointStrategy": "expand",
    "out": "docs",
    "name": "Documentación frontend CMS WEB",
    "excludePrivate": true,

    "excludePrivate": true,
    "navigationLinks": {
        "GitHub":  "github.com/lezcanodev/CMS-WEB/tree/dev/CMS-WEB-FRONTEND"
    },
    //"excludeProtected": true,
    //"hideGenerator": true,
    //"watch": true,
    
    //"hostedBaseUrl": "https://example.com",
    //"useHostedBaseUrlForAbsoluteLinks": true,


    'tsconfig': 'tsconfig.json',
};

export default config;