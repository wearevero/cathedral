# Declare variable paths
ui_path := "packages/ui"
eslint_config_path := "packages/eslint-config"
typescript_config_path := "packages/typescript-config"
apps_path := "apps"
packages_path := "packages"

# List available commands
default:
	@just --list

# Install turborepo dependencies
install-turbo:
	pnpm install

# Install dependencies for all apps
install-apps:
	#!/usr/bin/env bash
	for dir in {{apps_path}}/*; do
		if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
			echo "Installing dependencies in $dir..."
			cd "$dir" && pnpm install && cd - > /dev/null
		fi
	done

# Install dependencies for all packages
install-packages:
	#!/usr/bin/env bash
	for dir in {{packages_path}}/*; do
		if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
			echo "Installing dependencies in $dir..."
			cd "$dir" && pnpm install && cd - > /dev/null
		fi
	done

# Install all dependencies (root + apps + packages)
install-all:
	@echo "Installing root dependencies..."
	@just install-turbo
	@echo "Installing apps dependencies..."
	@just install-apps
	@echo "Installing packages dependencies..."
	@just install-packages
	@echo "✓ All dependencies installed!"

# Install dependencies ui package
install-ui:
	cd {{ui_path}} && pnpm install

# Update dependencies ui package
bump-ui:
	cd {{ui_path}} && pnpm bump-ui

# Running tests ui package
test-ui:
	cd {{ui_path}} && pnpm run test

# Running linter ui package
lint-ui:
	cd {{ui_path}} && pnpm run lint

# Format ui package
format-ui:
	cd {{ui_path}} && pnpm run format

# Build ui package
build-ui:
	cd {{ui_path}} && pnpm run build