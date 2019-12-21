yarn build

heroku container:push --app=dry-castle-38837 web

heroku container:release --app=dry-castle-38837 web