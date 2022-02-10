# App Storybookmarks

App Storybookmark

## Generar CHANGELOG

En Windows, con Git Bash y Docker, ejecutar este comando:

```bash
winpty docker run -it --rm -v "$(pwd)":/usr/local/src/your-app githubchangeloggenerator/github-changelog-generator -u davidcopano -p app-storybookmarks
```