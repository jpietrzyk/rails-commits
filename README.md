# Readme

## Description

Simple monolith Rails and React application for browsing latest Rails commits

## Instalation

- Clone this repo `git clone https://github.com/jpietrzyk/rails-commits.git`
- Run `bundle` to install all required gems
- Create database with `bundle exec rake db:create`
- Run migrations with `bundke exec rake db:migrate`
- Run `yarn install` to install all js dependencies
- Create your new GithHub OAuth App (it is required to sign in) https://github.com/settings/developers
  - Set `Homepage url` to http://localhost:3000/
  - Set Authorization callback url to http://localhost:3000/omniauth/github/callback
- Create your API access token (it is required for Graphql API calls) https://github.com/settings/tokens
- Rename `.env.dev` file to `.env` and fill it with your GitHub Credentials
- Run `foreman start -f Procfile.dev` to run rails with webpack
- Enter http://localhost:3000 and Sign in with your GitHub account



## ToDo

- [ ] Use Ruby client to fetch Rails repo history on Github and save to local database
- [ ] Create GraphQL API for RailsNews
- [ ] Refactor React to use local RailsNews API
- [ ] Write tests for js
- [ ] Add more sources with news in Rails World
