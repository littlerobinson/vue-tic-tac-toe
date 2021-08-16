# Ensure that every command in this Makefile
# will run with bash instead of the default sh
SHELL := /usr/bin/env bash

################
# Public tasks #
###############

# This is the default task
all: help

install: ## Install project
	yarn install

build: ## Build for production
	yarn run build

build-dev: ## Build in develppemnt mode
	yarn run build --mode development

build-report: ## Build with report
	yarn run build --report

lint-inspect: ## Inspect code
	yarn run lint

lint-fix: ## Fix code lint
	yarn run lint --fix

run: ## Run in dev mode
	yarn run dev

test-unit: ## Run in dev mode
	yarn run test-unit

.PHONY: all build build-dev build-report lint-inspect lint-fix run-dev

#################
# Private tasks #
#################

help: ## List available commands
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: help
